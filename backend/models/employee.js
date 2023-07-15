const mongoose = require('mongoose');

const Employee = new mongoose.Schema({

  //Employee must have EITHER email OR username
  username: {
    type: String
  },
  email: {
    type: String
  },

  //Optional, for display / searching purposes
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },

  //A reference to the store that this employee is currently in (if any)
  employer: {
    type: mongoose.ObjectId
  },

  //The weekly availability of this employee
  availability:{
    day: [{
      preference: {
        type: String  // Message of employee preference
      },
      hours: [{
        type: Boolean,
      }],
    }],
  }

  

});

module.exports = mongoose.model('EMPLOYEE', Employee);