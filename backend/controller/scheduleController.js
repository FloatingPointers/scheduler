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
    let shifts = await Schedule.findById(req.params.id)
      .select("shifts")
      .elemMatch("shifts", {
        $or: [
          { startTime: { $gte: options.shiftStart } },
          { endTime: { $lte: options.shiftEnd } },
        ],
      })
      .sort({ startTime: 1 });

    return res.status(200).json(shifts);
  } else {
    //post every shift
    //Obtain the requested schedule from db
    let shifts = await Schedule.findById(req.params.id)
      .select("shifts")
      .sort({ startTime: 1 });

    return res.status(200).json(shifts);
  }
});

exports.addShift = asyncHandler(async (req, res, next) => {
  await Schedule.findByIdAndUpdate(req.params.scheduleId, {
    $push: { ["shifts"]: req.body.shift },
  });

  return res.status(200);
});

exports.removeShift = asyncHandler(async (req, res, next) => {
  await Schedule.findByIdAndUpdate(req.params.scheduleId, {
    $pull: {
      ["shifts"]: {
        day: req.body.day,
        employeeId: req.body.employeeId,
      },
    },
  });

  return res.status(200);
});

exports.createSchedule = asyncHandler(async (req, res, next) => {
  console.log("Got request to create schedule");

  const newSchedule = new Schedule({
    ...req.body,
  });

  await newSchedule.save();

  return res.status(200).json({
    id: newSchedule._id,
  });
});

exports.getRecentSchedules = asyncHandler(async (req, res, next) => {
  const schedules = await Schedule.find({})
    .limit(3)
    .sort({ startDate: -1, archived: 1 })
    .select("startDate markedAsComplete goalsMet archived");

  return res.status(200).json(schedules);
});

exports.getPaginatedSchedules = asyncHandler(async (req, res, next) => {
  console.log("page: " + req.params.page);

  const schedules = await Schedule.find({})
    .skip(10 * req.body.page)
    .limit(10)
    .sort({ startDate: -1, archived: 1 })
    .select("startDate markedAsComplete goalsMet archived");

  return res.status(200).json(schedules);
});

exports.archiveSchedule = asyncHandler(async (req, res, next) => {
  console.log("Archiving Schedule: " + req.body.id);
  await Schedule.findByIdAndUpdate(req.body.id, {
    archived: req.body.archived,
  });

  return res.status(200);
});

exports.updateSchedule = asyncHandler(async (req, res, next) => {
  let schedule = await Schedule.findById(req.body.scheduleId);
  if ("weekStartDate" in req.body) schedule.weekStartDate = body.weekStartDate;

  schedule.save();
});

exports.deleteSchedule = asyncHandler(async (req, res, next) => {
  //Returns 1 if an object was deleted
  let success = await Schedule.deleteOne({
    _id: req.body.scheduleId,
  });

  return res.status(200).json({
    success: success ? true : false,
  });
});
