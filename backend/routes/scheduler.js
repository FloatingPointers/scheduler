const express = require('express');
const router = express.Router();

const passport = require('passport');
const { applyUserStrategy, storeAuth } = require('../store/passport.js');
applyUserStrategy(passport);

const scheduleController = require('../controller/scheduleController.js');
const employeeController = require('../controller/employeeController.js');








/* --------------------------
   SCHEDULE CONTROLLER ROUTES
   -------------------------- */

/*
  POST - Create a new schedule
  Request Body: {
    scheduleInfo: {
      storeId
      weekStartDate
      startTime
      endTime
    }
  }
  Response Body: {
    newScheduleId: Id of the newly created schedule
  }
*/
router.post('/schedule/createSchedule', passport.authenticate('jwt', { session: false }), storeAuth, scheduleController.createSchedule);



/*
  DELETE - Delete an existing schedule by id
  Response Body: {
    success: True if a schedule object was successfully deleted
  }
  Params:
    id: - the uid of the schedule to be deleted
*/
router.delete('/schedule/:id/deleteSchedule', passport.authenticate('jwt', {session: false}), storeAuth, scheduleController.deleteSchedule)



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
router.get('/schedule/:id/working', passport.authenticate('jwt', { session: false }), storeAuth, scheduleController.working);



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
router.update('/schedule/:id/addShift', passport.authenticate('jwt', { session: false }), storeAuth, scheduleController.addShift);



/*
  UPDATE - Updates a schedule by deleting an existing shift from it
  Request Body: {
    employeeId
    employeeName
  }
  Params:
    id: - the uuid of the schedule
*/
router.update('/schedule/:id/removeShift', passport.authenticate('jwt', { session: false }), storeAuth, scheduleController.removeShift);








/* --------------------------
   EMPLOYEE CONTROLLER ROUTES
   -------------------------- */

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
<<<<<<< HEAD
router.get('/employees/:id/available', passport.authenticate('jwt', { session: false }), storeAuth, employeeController.available);
=======
router.get('/employees/:id/available', passport.authenticate('jwt', { session: false }) , employeeController.available);
>>>>>>> 5289e8133c7bcb6d4d004991cf682b710d58610f

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
router.get('/employees/:id/allEmployees', passport.authenticate('jwt', { session: false }), storeAuth, employeeController.allEmployees);




module.exports = router;