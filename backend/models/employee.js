const mongoose = require("mongoose");

const defaultAvailability = Array(7)
  .fill()
  .map(() => ({
    preference: "",
    hours: Array(24).fill(true),
  }));

const Employee = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  //Optional, for display / searching purposes
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },

  //A reference to the store that this employee is currently in (if any)
  employer: {
    type: mongoose.ObjectId,
  },

  //The weekly availability of this employee
  availability: {
    type: [
      {
        preference: { type: String, default: "" }, // Message of employee preference
        hours: {
          type: [
            {
              type: Boolean,
            },
          ],
          default: Array(24).fill(false),
        },
      },
    ],
    default: defaultAvailability,
  },
});

module.exports = mongoose.model("EMPLOYEE", Employee);
