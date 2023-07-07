const mongoose = requre('mongoose');

const day = new mongoose.Schema({
  goalsMet: { 
    type: Boolean, 
    required: true, 
    default: false 
  },
  markedAsComplete: { 
    type: Boolean, 
    required: true, 
    default: false 
  },
  totalHours: { 
    type: Number, 
    default: 0 
  },
  totalCost: { 
    type: Number, 
    default: 0 
  },
});

const Schedule = new mongoose.Schema({

  startDate: {
    //TODO: Use date for everything
    type: Date,  //YYYY-MM-DD - the date of the first day of the schedule   
    required: true 
  },

  startTime: {
    type: Date,  //The time (hours) that the schedule starts each day
    required: true
  },

  endTime: {
    type: Date,  //The time (hours) that the schedule ends each day
    required: true
  },

  goalsMet: {
    type: Boolean,
    required: true,
    default: false
  },

  markedAsComplete: {
    type: Boolean,
    required: true,
    default: false
  },

  day: {
    type:[day],
    default: [
      day,
      day,
      day,
      day,
      day,
      day,
      day,
    ]
  },

  
  shifts: [
    { // individual shift
      day: {type: Number, min: 0, max: 6}, //0-6, 0 is Sunday 
      employeeID: {type: ObjectID},
      employeeName: {type: String},
      role: {type: String},
      startTime: {type: Date},   //start time of this employee's shift
      endTime: {type: Date}     //end time of this employee's shift
    },
  ]

});



module.exports = mongoose.model("Schedule", Schedule);