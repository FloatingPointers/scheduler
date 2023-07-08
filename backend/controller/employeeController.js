let Employee = require("../models/employee");
const asyncHandler = require("express-async-handler");



const EMPLOYEE_QUERY_LIMIT = 20;



exports.available = asyncHandler(async(req, res, next) => {
    
  let available = await Employee.find({storeId: req.params.id}).
    select({
      [`availability.day.${req.body.dayIndex}.hours`] : {
        $all: [true],
        $slice: [req.body.startHour, req.body.endHour - req.body.startHour + 1], //remove +1 if broken
      }
    }).limit(EMPLOYEE_QUERY_LIMIT);

  return res.status(200).json(available);
});


exports.allEmployees = asyncHandler(async(req, res, next) => {

  let employeesFromSchedule = await Employee.find({
    storeId: req.params.id
  }).limit(EMPLOYEE_QUERY_LIMIT);

  return res.status(200).json(employeesFromSchedule);

});



exports.updateSettings = asyncHandler(async(req, res, next) => {
  
    let employee = await Employee.findById(req.user.id);
  
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.availability = req.body.availability;
  
    await employee.save();
  
    return res.status(200).json({success: true});
  
});

exports.getSettings = asyncHandler(async(req, res, next) => {
  
      let employee = await Employee.findById(req.user.id);
      
      return res.status(200).json({employee : employee}); 
    
});
