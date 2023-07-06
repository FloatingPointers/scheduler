const mongoose = require('mongoose');

const Employee = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  storeID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  availability:{
    day: [{
      preference: {
        type: String  // Message of employee preference
      },
      hours: [{
        type: bool,
      }],
    }],
  }

  

});

module.exports = mongoose.model('Employee', Employee);