const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Book.js
const apptSchema = require('./Appt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // set savedAppts to be an array of data that adheres to the apptSchema
    savedAppts: [apptSchema],
    firstName: {
        type: String,
        required: true,
        array: {
            type: String,
            validate: {
                validator: function (value) {
                    return /^[a-zA-Z]+$/.test(value)
                },
                message: "Only letter characters are allowed in this field."
            }
        }
    },
    surName: {
        type: String, 
        required: true,
        array: {
            type: String,
            validate: {
                validator: function (value) {
                    return /^[a-zA-Z]+$/.test(value)
                },
                message: "Only letter characters are allowed in this field."
            }            
        }
    },
    dateOfBirth: {
        array: {
            type: Date,
            validate: {
                validator: function (value) {
                    return /^\d{4}-\d{2}-\d{2}$/.test(value);
                },
                message: "Invalid date format. Use YYYY-MM-DD."
            }
        }
    },
    isProvider: {
        type: Boolean,
    },
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `apptCount` with the number of saved books we have
userSchema.virtual('apptCount').get(function () {
  return this.savedAppts.length;
});

const User = model('User', userSchema);

module.exports = User;
