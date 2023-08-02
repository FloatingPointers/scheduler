const mongoose = require("mongoose");

//Login credentials for both store accounts as well as employee accounts
const User = new mongoose.Schema({
  //Each user must have either a unique username or email for logging in
  username: {
    type: String,
  },
  email: {
    type: String,
  },

  hashedPassword: {
    type: String,
    required: true,
  },

  //Specifies how this account should be handled (as a store manager, or an employee)
  type: {
    type: String,
    enum: ["EMPLOYEE", "STORE"],
    required: true,
  },

  //Store accounts will have an object reference to a store document in the store database,
  //Employee accounts will likewise have an object reference to an employee document in the employees database
  accountRef: {
    type: mongoose.ObjectId,
    required: true,
  },

  //The store that the employee is apart of (if this user is an employee)
  employerRef: {
    type: mongoose.ObjectId,
  },
});

module.exports = mongoose.model("User", User);
