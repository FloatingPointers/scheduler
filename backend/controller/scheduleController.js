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
  const schedules = await Schedule.find({ archived: false })
    .limit(3)
    .sort({ startDate: -1, archived: 1 })
    .select("startDate markedAsComplete goalsMet archived");

  return res.status(200).json(schedules);
});

exports.getPaginatedSchedules = asyncHandler(async (req, res, next) => {
  console.log("page: " + req.params.page);
  console.log("showArchived: " + req.params.showArchived);

  const schedules = await Schedule.find({
    archived: req.params.showArchived === "true",
  })
    .skip(10 * req.params.page)
    .limit(10)
    .sort({ archived: 1, startDate: -1 })
    .select("startDate markedAsComplete goalsMet archived");

  return res.status(200).json(schedules);
});

exports.maxSchedules = asyncHandler(async (req, res, next) => {
  let count = await Schedule.countDocuments({
    archived: req.params.archived === "true",
  });

  return res.status(200).json({
    maxPages: Math.ceil(count / 10),
  });
});

exports.archiveSchedule = asyncHandler(async (req, res, next) => {
  console.log("Archiving Schedule: " + req.body.id);
  await Schedule.findByIdAndUpdate(req.body.id, {
    archived: req.body.archived,
  });
  console.log("Returning response");
  return res.status(200).json({ success: true });
});

//Update any information about a schedule
//    /scheduler/update/:id
exports.updateSchedule = asyncHandler(async (req, res, next) => {
  await Schedule.findByIdAndUpdate(req.params.id, req.body);
  return res.status(200).json({ success: true });
});

exports.deleteSchedule = asyncHandler(async (req, res, next) => {
  //Returns 1 if an object was deleted
  let success = await Schedule.deleteOne({
    _id: req.body.scheduleId,
  });

  if (success) {
    return res.status(200).json({ suceess: true });
  } else {
    return res.status(400).json({ error: "Could not delete schedule" });
  }
});

//GET all general information about a schedule
//    /scheduler/overview/:id/status
exports.getOverviewDays = asyncHandler(async (req, res, next) => {
  let days = await Schedule.findById(req.params.id).select({
    startDate: 1,
    startTime: 1,
    endTime: 1,
    goalsMet: 1,
    markedAsComplete: 1,
    archived: 1,
    day: {
      goalsMet: 1,
      markedAsComplete: 1,
      totalHours: 1,
      totalCost: 1,
    },
  });

  return res.status(200).json(days);
});

//GET all general information about a day
//    /scheduler/editor/:id/info/:day
// 🥺🙏
exports.getDayInfo = asyncHandler(async (req, res, next) => {
  let info = await Schedule.findById(req.params.id).select({
    _id: 0,
    day: { $slice: [+req.params.day, 1] },
  });

  return res.status(200).json({
    startDate: info.startDate,
    startTime: info.day[0].startTime,
    endTime: info.day[0].endTime,
  });
});
