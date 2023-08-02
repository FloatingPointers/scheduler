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
    default: new Date(),
  },

  end: {
    type: Date,
    default: new Date(),
  },

  status: {
    type: String,
    enum: ["PENDING", "DENIED", "APPROVED"],
    default: "PENDING",
  },

  storeId: {
    type: mongoose.ObjectId,
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
