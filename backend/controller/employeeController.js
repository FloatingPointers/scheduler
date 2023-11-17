let Employee = require("../models/employee");
const asyncHandler = require("express-async-handler");

const EMPLOYEE_QUERY_LIMIT = 20;

exports.available = asyncHandler(async (req, res, next) => {
  const dayIndex = parseInt(req.params.dayIndex, 10);
  const { startDate, endDate } = req.params;

  let startHour = new Date(startDate).getHours();
  let endHour =
    new Date(endDate).getHours() + (new Date(endDate).getMinutes() > 0 ? 1 : 0);

  let available = await Employee.aggregate([
    {
      $match: {
        storeId: req.params.id,
      },
    },
    {
      $addFields: {
        dayAvailability: {
          $arrayElemAt: ["$availability", dayIndex],
        },
      },
    },
    {
      $addFields: {
        hoursInRange: {
          $slice: ["$dayAvailability.hours", startHour, endHour - startHour],
        },
      },
    },
    {
      $addFields: {
        isAvailable: {
          $allElementsTrue: ["$hoursInRange"],
        },
      },
    },
    {
      $match: {
        isAvailable: true,
      },
    },
    {
      $project: {
        firstName: 1,
        lastName: 1,
        dayAvailability: 1,
        isAvailable: 1,
      },
    },
    {
      $limit: EMPLOYEE_QUERY_LIMIT,
    },
  ]);

  return res.status(200).json(available);
});

exports.allEmployees = asyncHandler(async (req, res, next) => {
  let user = req.user;

  let employeesFromSchedule = await Employee.find({
    employer: user.accountRef,
  }).limit(EMPLOYEE_QUERY_LIMIT);

  return res.status(200).json({ result: employeesFromSchedule });
});

exports.deleteEmployee = asyncHandler(async (req, res, next) => {
  await Employee.findByIdAndDelete(req.params.id);
  // TODO: DELETE RELATED REQUESTS

  return res.status(200);
});

exports.updateSettings = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, availability } = req.body;

  let employee = await Employee.findById(req.user.accountRef);
  employee.firstName = firstName;
  employee.lastName = lastName;
  employee.availability = availability;
  await employee.save();

  return res.status(200).json({ success: true });
});

exports.getSettings = asyncHandler(async (req, res, next) => {
  let employee = await Employee.findById(req.user.accountRef);
  const { firstName, lastName, availability } = employee;

  return res.status(200).json({
    firstName,
    lastName,
    availability,
  });
});
