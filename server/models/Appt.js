const { Schema, model } = require("mongoose");

const dateFormat = require("../utils/dateFormat");

const apptSchema = new Schema({
  userBooking: {
    type: String
    // ref: "User",
  },
  providerBooking: {
    type: String
    // ref: "Provider",
  },
  apptLength: {
    type: Number,
  },
  apptDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

// const Appt = model("Appt", apptSchema);

module.exports = apptSchema;
