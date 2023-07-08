const mongoose = require('mongoose');

const Employee = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  storeId: {
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
        type: Boolean,
      }],
    }],
  }

  

});

module.exports = mongoose.model('Employee', Employee);