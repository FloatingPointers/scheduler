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

const shiftSchema = new mongoose.Schema(
  {
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
  },
  { _id: false }
);

const defaultShifts = Array(7)
  .fill()
  .map(() => ({
    startTime: undefined,
    endTime: undefined,
  }));

const employeeInfoSchema = new mongoose.Schema(
  {
    id: { type: mongoose.ObjectId, required: true },
    name: { type: String, required: true },
    role: { type: String },
    shifts: { type: [shiftSchema], default: [defaultShifts] },
  },
  { _id: false }
);

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
    type: [employeeInfoSchema],
    default: [],
  },
});

module.exports = mongoose.model("Schedule", Schedule);
