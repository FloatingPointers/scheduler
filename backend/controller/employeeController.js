let Employee = require("../models/employee");
const asyncHandler = require("express-async-handler");

//employee.js
exports.available = asyncHandler(async(req, res, next) => {
    
  let available = await Employee.find({storeID: req.params.id}).
    select({
      [`availability.day.${req.body.dayIndex}.hours`] : {
        $all: [true],
        $slice: [req.body.startHour, req.body.endHour - req.body.startHour + 1], //remove +1 if broken
      }
    });

  return res.status(200).json(available);
});

exports.allEmployees = asyncHandler(async(req, res, next) => {

  return res.status(200).json(await Employee.find().limit(20));

});


