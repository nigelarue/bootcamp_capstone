const { AuthenticationError } = require("apollo-server-express");
const { User, Provider, Appt } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      const users = await User.find();
      return users;
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.creacte(args);
      const token = signToken(user);

      return { token, user };
    },
    addProvider: async (parent, args) => {
      const provider = await Provider.create(args);

      return provider;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addAppt: async (parent, args, user) => {
      if (args.userBooking) {
        const apptData = args;
        const token = signToken(user);

        const updatedUser = await User.findByIdAndUpdate(
          { _id: args.userBooking },
          { $push: { savedAppts: apptData } },
          { new: true }
        );

        // const updatedProvider = await Provider.findByIdAndUpdate(
        //   { _id: args.providerBooking },
        //   { $push: { appointments: apptData } },
        //   { new: true }
        // );

        // return { apptData, updatedUser, updatedProvider };
        return { apptData, updatedUser, token };
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    removeAppt: async (parent, args) => {
      if (args.userBooking) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: args.userBooking._id },
          { $pull: { savedAppts: args._id } },
          { new: true }
        );

        const updatedProvider = await Provider.findByIdAndUpdate(
          { _id: args.providerBooking._id },
          { $pull: { appointments: args._id } },
          { new: true }
        );

        Appt.findByIdAndDelete(args._id);

        return { updatedUser, updatedProvider };
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
