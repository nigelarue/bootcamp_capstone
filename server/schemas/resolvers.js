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
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addProvider: async (parent, args, user) => {

      const schedule = [];
      const tempDay = {};

      const token = signToken(user);

      args.availableDays.forEach(indexDay => {
        switch(indexDay) {
          case "monday":
            tempDay = { 
              day: indexDay,
              startTime: args.mondayRange.startTime,
              endTime: args.mondayRange.endTime,
            }; 
            schedule.push(tempDay);
            return;
          case "tuesday":
            tempDay = { 
             day: indexDay,
             startTime: args.tuesdayRange.startTime,
             endTime: args.tuesdayRange.endTime,
            }; 
            schedule.push(tempDay);
            return;
          case "wednesday":
            tempDay = { 
             day: indexDay,
             startTime: args.wednesdayRange.startTime,
             endTime: args.wednesdayRange.endTime,
            }; 
            schedule.push(tempDay);
            return;
          case "thursday":
            tempDay = { 
             day: indexDay,
             startTime: args.thursdayRange.startTime,
             endTime: args.thursdayRange.endTime,
            }; 
            schedule.push(tempDay);
            return;
          case "friday":
            tempDay = { 
             day: indexDay,
             startTime: args.fridayRange.startTime,
             endTime: args.fridayRange.endTime,
            }; 
            schedule.push(tempDay);
            return;
          case "saturday":
            tempDay = { 
             day: indexDay,
             startTime: args.saturdayRange.startTime,
             endTime: args.saturdayRange.endTime,
             }; 
             schedule.push(tempDay);
             return;
          case "sunday":
            tempDay = { 
             day: indexDay,
             startTime: args.sundayRange.startTime,
             endTime: args.sundayRange.endTime,
             }; 
             schedule.push(tempDay);
             return;
          default:
             return;   
        }
      });

      const tempProvider = {service:  args.service,
        providerDescription: args.providerDescription,
        serviceDescription: args.serviceDescription,
        schedule: schedule, 
        apptLength: args.apptLength,
        user: user,
      }

      const provider = await Provider.create(tempProvider);
      
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
