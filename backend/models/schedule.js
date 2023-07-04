const mongoose = requre('mongoose');

const Schedule = new mongoose.Schema({

  startDate: {
    //TODO: Use date for everything
    type: String,  //YYYY-MM-DD - the date of the first day of the schedule   
    required: true 
  },

  startTime: {
    type: String,  //HH:mm - the time that the schedule starts each day
    required: true
  },

  endTime: {
    type: String,  //HH:mm - the time that the schedule ends each day
    required: true
  },

  goalsMet: {
    type: Boolean,
    required: true
  },

  markedAsComplete: {
    type: Boolean,
    required: true
  },

  day: [
    {
      
      goalsMet: { type: Boolean, required: true },
      markedAsComplete: { type: Boolean, required: true },
      totalHours: { type: Integer },
      totalCost: { type: Float },

      shifts: [
        {
          employeeID: {type: ObjectID},
          employeeName: {type: String},
          role: {type: String},
          startTime: {type: String},   //HH:mm - start time of this employee's shift
          endTime: {type: String}     //HH:mm - end time of this employee's shift
        },
      ]

    }
  ]

});



module.exports = mongoose.model("Schedule", Schedule);