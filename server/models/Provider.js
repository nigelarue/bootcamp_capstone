const { Schema, model } = require("mongoose");

const userSchema = require("./User");
const apptSchema = require("./Appt");

const providerSchema = new Schema(
  {
    buisnessName: {
      type: String,
      required: true,
      unique: true,
    },
    service: [
      {
        type: String,
      },
    ],
    // description of provider/bio
    providerDescription: {
      type: String,
    },
    // description of service provider
    serviceDescription: [
      {
        type: String,
      },
    ],
    // sources user and availabity models
    username: {
      type: String,
    },
    appointments: {
      type: Schema.Types.ObjectId,
      ref: "Appt",
    },
    schedule: [
      {
        day: {
          type: String,
        },
        startTime: {
          type: String,
        },
        endTime: {
          type: String,
        },
      },
    ],
    // Storing number the amount of minutes in an appoint. (e.g. an hour and a half is stored as 90).
    apptLength: [
      {
        type: Number,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Provider = model("Provider", providerSchema);

module.exports = Provider;
