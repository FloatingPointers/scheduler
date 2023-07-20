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
  
  //passportjs adds user property after authenticating
  let user = req.user;  

  console.log(user.accountRef)
  let employeesFromSchedule = await Employee.find({
    employer: user.accountRef
  });

  return res.status(200).json(employeesFromSchedule);

});

exports.deleteEmployee = asyncHandler(async(req, res, next) => {

  await Employee.findByIdAndDelete(req.params.id);

  return res.status(200);

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
