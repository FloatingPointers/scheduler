let Schedule = require("../models/schedule");
let mongoose = require("mongoose");

const asyncHandler = require("express-async-handler");

//GET working employees on specified Schedule
exports.working = asyncHandler(async (req, res, next) => {
  //Options from request (optional) (wow)
  const { shiftStart, shiftEnd } = req.params;

  if (shiftStart && shiftEnd) {
    /*
      return specific range (employees working between shiftStart and shiftEnd)
      sorted by employees who start working at an earlier time
      Obtain the requested schedule from db
    */
    let shifts = await Schedule.findById(req.params.id)
      .select(
        `employeeInfo.id employeeInfo.name employeeInfo.role employeeInfo.shifts.${req.params.day}`
      )
      .elemMatch(`employeeInfo.shifts.${req.params.day}`, {
        $or: [
          { startTime: { $gte: shiftStart } },
          { endTime: { $lte: shiftEnd } },
        ],
      })
      .sort({ startTime: 1 });

    return res.status(200).json(shifts);
  } else {
    //post every shift
    //Obtain the requested schedule from db
    let shifts = await Schedule.findById(req.params.id)
      .select(
        `employeeInfo.id employeeInfo.name employeeInfo.role employeeInfo.shifts.${req.params.day}`
      )
      .sort({ startTime: 1 });
    console.log("Got working employees: ", shifts);
    return res.status(200).json({ result: shifts });
  }
});

exports.addShift = asyncHandler(async (req, res, next) => {
  const newShift = {
    startTime: req.body.shift.startTime,
    endTime: req.body.shift.endTime,
  };

  let schedule = await Schedule.findById(req.params.id);

  let employeeIndex = schedule.employeeInfo.findIndex(
    (employee) => employee.id.toString() == req.body.shift.employeeId
  );

  if (employeeIndex === -1) {
    const newEmployee = {
      id: req.body.shift.employeeId,
      name: req.body.shift.employeeName,
      role: req.body.shift.role,
      shifts: [newShift],
    };
    schedule.employeeInfo.push(newEmployee);
  } else {
    schedule.employeeInfo[employeeIndex].shifts.push(newShift);
  }

  await schedule.save();
  return res.status(200).json({ success: true });
});

exports.removeShift = asyncHandler(async (req, res, next) => {
  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(req.body.employeeId)) {
    return res.status(400).json({ error: "Invalid employeeId format" });
  }

  try {
    // Pull the shift based on its unique _id, not the employeeId
    const result = await Schedule.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          shifts: {
            _id: new mongoose.Types.ObjectId(req.body.employeeId),
          },
        },
      },
      { new: true }
    );

    // If the schedule isn't found
    if (!result) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error removing shift:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
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
    startDate: 1,
    startTime: 1,
    endTime: 1,
  });

  return res.status(200).json({
    startDate: info.startDate,
    startTime: info.day[0].startTime,
    endTime: info.day[0].endTime,
  });
});
