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
  availability: {
    //Sunday -> Saturday
    week: [{
      day: [{
        hours: [{
          preference: {
            type: String,
            enum: ["available", "not available", "preferred"]
          }
      }],
  }],
  }]
}
  

});

module.exports = mongoose.model('Employee', Employee);