var express = require('express');
var router = express.Router();

const passport = require('passport');
const { applyUserStrategy } = require('../store/passport');
applyUserStrategy(passport);

const Schedule = require('../models/schedule');
const Employee = require('../models/employee');

import employee from '../../models/employee.js';
import timeInRange from '../../store/utils.js';






router.get('/scheduler', passport.authenticate('jwt', { session: false }) , async function(req, res, next) {
  
  try {
    // TODO: Optimize with date Object in db
    let currentSched = await Schedule.findById(req.body.scheduleID);
    let day = req.body.day;

    //Optional fields to filter employees by
    let options = req.body.options; // role, workingShifts, start, end

    let start = null;
    let end = null;
    if("start" in options && "end" in options) {
      start = options.start;
      end = options.end;
    } else {
      start = currentSched.startTime;
      end = currentSched.endTime;
    }

    
    
    //Send the list of people currently working for the (selected?) shift
    if(options.workingShifts) {
      
      //If a start and end time was selected, return people 
      let shiftsInRange = [];
      currentSched.day[day].shifts.forEach(shift => {
        if(timeInRange(shift.start, shift.end, start, end)) {
          shiftsInRange.push(shift);
        }
      });

      return res.status(200).json(
        ...shiftsInRange.toJSON()
      );
      
    } 
    //Send the list of people available to be scheduled for the (selected?) shift
    else {

      let employees; //bojo!!!
      if("role" in options) employees = await Employee.find().where('role').equals(options.role);
      else employees = await Employee.find();
      
      employees.filter((employee) => {
                                                                                                                                                                                                                                                                                                                          
      });
      return res.status(200).json(
        ...employees.toJSON() //yum
      );
      
    
        //yum yum
              //yum yum yum
      //yum
    }
    //yum yum       
  } catch(err) {
    return res.status(400).json({ error: "Bad Request: " + err });
  }
//yum yum yum
});

module.exports = router;
