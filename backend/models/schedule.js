const mongoose = require("mongoose");

//Test

const day = new mongoose.Schema({
  goalsMet: {
    type: Boolean,
    required: true,
    default: false,
  },
  markedAsComplete: {
    type: Boolean,
    required: true,
    default: false,
  },
  totalHours: {
    type: Number,
    default: 0,
  },
  totalCost: {
    type: Number,
    default: 0,
  },
  startTime: {
    type: String,
    default: "00:00",
    required: true,
  },
  endTime: {
    type: String,
    default: "24:00",
    required: true,
  },
});

const defaultShifts = Array(7)
  .fill()
  .map(() => ({
    startTime: null,
    endTime: null,
  }));

const Schedule = new mongoose.Schema({
  startDate: {
    //TODO: Use date for everything
    type: Date, //YYYY-MM-DD - the date of the first day of the schedule
    required: true,
  },

  startTime: {
    type: Date, //The time (hours) that the schedule starts each day
    required: true,
  },

  endTime: {
    type: Date, //The time (hours) that the schedule ends each day
    required: true,
  },

  goalsMet: {
    type: Boolean,
    required: true,
    default: false,
  },

  markedAsComplete: {
    type: Boolean,
    required: true,
    default: false,
  },

  archived: {
    type: Boolean,
    required: true,
    default: false,
  },

  day: {
    type: [day],
    default: [day, day, day, day, day, day, day],
  },

  //TODO: Update add / remove routes
  employeeInfo: {
    type: [
      {
        // individual shift
        id: mongoose.ObjectId,
        name: { type: String },
        role: { type: String },
        shifts: [
          {
            // individual time
            startTime: { type: Date }, //start time of this employee's shift
            endTime: { type: Date }, //end time of this employee's shift
          },
        ],
      },
    ],
    default: defaultShifts,
  },
});

module.exports = mongoose.model("Schedule", Schedule);
