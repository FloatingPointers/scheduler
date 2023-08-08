const mongoose = require("mongoose");

const Request = new mongoose.Schema({
  title: {
    type: String,
  },

  description: {
    type: String,
  },

  start: {
    type: Date,
  },

  end: {
    type: Date,
  },

  archived: {
    type: Boolean,
    default: false,
  },

  status: {
    type: String,
    enum: ["PENDING", "DENIED", "APPROVED"],
    default: "PENDING",
  },

  storeId: {
    type: mongoose.ObjectId,
    required: true,
  },

  senderTag: {
    name: {
      type: String,
    },
    id: {
      type: mongoose.ObjectId,
    },
  },
});

module.exports = mongoose.model("Request", Request);
