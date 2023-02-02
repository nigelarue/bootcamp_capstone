const { Schema, model } = require('mongoose');

const dateFormat = require('../utils/dateFormat');

const apptSchema = new Schema(
    {
        userBooking: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        providerBooking: {
            type: Schema.Types.ObjectId,
            ref: 'Provider',
        },
        apptLength: {
            type: Int,
        },
        apptDate: {
            type: Date,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
    }
);

const Appt = model('Appt', apptSchema);

module.exports = Appt;