const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: {     //only employees have this
    type: String
  },
  employeeID: {   //only employees have this
    type: String
  },
  storeID: {
    type: String,
    required: true
  },
  hashedpassword: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['employee', 'store'],
    required: true
  }

});

module.exports = mongoose.model('User', User);