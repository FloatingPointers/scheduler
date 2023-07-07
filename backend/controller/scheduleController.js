let Schedule = require("../models/schedule");

const asyncHandler = require("express-async-handler");


//GET working employees on specified Schedule
exports.working = asyncHandler(async (req, res, next) => {

  //Options from request (optional) (wow)
  let options = req.body.options;


  if ("shiftStart" in options && "shiftEnd" in options) {
    /*
      return specific range (employees working between shiftStart and shiftEnd)
      sorted by employees who start working at an earlier time
      Obtain the requested schedule from db
    */
    let shifts = await Schedule.findById(req.params.id).
      select('shifts').
      elemMatch('shifts', {
        $or: [
          {startTime: { $gte: options.shiftStart }},
          {endTime: { $lte: options.shiftEnd }}
        ]
      }).
      sort({ startTime: 1 });
      
    return res.status(200).json(shifts);

  } else {
    //post every shift
    //Obtain the requested schedule from db
    let shifts = await Schedule.findById(req.params.id).
      select('shifts').
      sort({ startTime: 1 });

    return res.status(200).json(shifts);
  }


});




exports.addShift = asyncHandler(async (req, res, next) => {

  await Schedule.findByIdAndUpdate(req.params.scheduleId, { 
    $push: {['shifts']: req.body.shift}
  });

  return res.status(200);
  
});




exports.removeShift = asyncHandler(async (req, res, next) => {
  
  await Schedule.findByIdAndUpdate(req.params.scheduleId, { 
    $pull: {['shifts']: {
      day: req.body.day,
      employeeID: req.body.employeeID
    }}
  });

  return res.status(200);

});



exports.createSchedule = asyncHandler(async (req, res, next) => {

  const newSchedule = new Schedule({
    ...req.body.scheduleInfo
  });

  await newSchedule.save();

  return res.status(200).json({
    newScheduleId: newSchedule._id
  });

});

exports.updateSchedule = asyncHandler(async (req, res, next) => {

  let schedule = await Schedule.findById(req.body.scheduleId);
  if("weekStartDate" in req.body) schedule.weekStartDate = body.weekStartDate;

  schedule.save();

});


exports.deleteSchedule = asyncHandler(async (req, res, next) => {

  //Returns 1 if an object was deleted
  let success = await Schedule.deleteOne({
    _id: req.body.scheduleId
  });

  return res.status(200).json({
    success: success ? true : false
  });

});



