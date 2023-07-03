const mongoose = require('mongoose');

const Employee = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  storeID: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('Employee', Employee);