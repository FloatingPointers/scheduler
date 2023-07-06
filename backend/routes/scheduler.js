const express = require('express');
const router = express.Router();

const passport = require('passport');
const { applyUserStrategy } = require('../store/passport.js');
applyUserStrategy(passport);

const scheduleController = require('../controller/scheduleController.js');
const employeeController = require('../controller/employeeController.js');


// Schedule Routes

router.get('/schedule/create', passport.authenticate('jwt', { session: false }) , scheduleController.createSchedule);

router.get('/schedule/:id/delete', passport.authenticate('jwt', { session: false }) , scheduleController.deleteSchedule);

/*
  GET - Employees working for selected shift
  Request Body: {
    options: {
      startTime - both startTime and endTime to be used together or not at all, represents the start and end of the client's selection (ex 4am-2pm)
      endTime
    }
  }
  Params:
    id: - the uid of the schedule
*/
router.get('/schedule/:id/working', passport.authenticate('jwt', { session: false }) , scheduleController.working);


/*
  UPDATE - Updates a schedule by creating a new shift
  Request Body: {
    shift : {
      employeeId
      employeeName
      startTime
      endTime
    }
  }
  Params:
    id: - the uid of the schedule
*/
router.update('/schedule/:id/addShift', passport.authenticate('jwt', { session: false }) , scheduleController.addShift);


/*
  UPDATE - Updates a schedule by deleting an existing shift from it
  Request Body: {
    employeeId
    employeeName
  }
  Params:
    id: - the uuid of the schedule
*/
router.update('/schedule/:id/removeShift', passport.authenticate('jwt', { session: false }) , scheduleController.removeShift);




// Employee Routes

/*
  GET - Employees available to work for a selected shift
  Request Body: {
    options: {
      startTime - both startTime and endTime to be used together or not at all, represents the start and end of the client's selection (ex 4am-2pm)
      endTime
    }
  }
  Params:
    id: - the uid of the store
*/
router.get('/employees/:id/available', passport.authenticate('jwt', { session: false }) , scheduleController.available);

/*
  GET - All employees working at the store
  Request Body: {
    options: {
      startTime - both startTime and endTime to be used together or not at all, represents the start and end of the client's selection (ex 4am-2pm)
      endTime
    }
  }
  Params:
    id: - the uid of the store
*/
router.get('/employees/:id/allEmployees', passport.authenticate('jwt', { session: false }) , employeeController.allEmployees);





module.exports = router;