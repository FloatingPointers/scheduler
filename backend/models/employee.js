const mongoose = require("mongoose");

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
  availability: [
    {
      preference: { type: String }, // Message of employee preference
      hours: [{ type: Boolean }],
    },
  ],
});

module.exports = mongoose.model("EMPLOYEE", Employee);
