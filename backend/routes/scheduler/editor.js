const express = require("express");
const router = express.Router();

const passport = require("passport");
const { applyUserStrategy, storeAuth } = require("../../store/passport.js");
applyUserStrategy(passport);

const scheduleController = require("../../controller/scheduleController.js");
const employeeController = require("../../controller/employeeController.js");

module.exports = router;

/*
 =====================

 ROUTES for SCHEDULE EDITOR PAGE
 /scheduler/editor/

 =====================
*/

/*
  GET - Employees working for selected shift
  Request Body: {
    
  }
  Params:
    id: - the uid of the schedule
*/
router.get(
  "/schedule/:id/:day/working/",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  scheduleController.working
);

/*
  UPDATE - Updates a schedule by creating a new shift
  Request Body: {
    shift : {
      employeeId
      employeeName
      role
      startTime
      endTime
    }
  }
  Params:
    id: - the uid of the schedule
*/
router.post(
  "/schedule/:id/addShift",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  scheduleController.addShift
);

/*
  UPDATE - Updates a schedule by deleting an existing shift from it
  Request Body: {
    employeeId
    employeeName
  }
  Params:
    id: - the uuid of the schedule
*/
router.put(
  "/schedule/:id/removeShift",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  scheduleController.removeShift
);

/* --------------------------
   EMPLOYEE CONTROLLER ROUTES
   -------------------------- */

/*
  GET - Employees available to work for a selected shift
  Params: {
    startTime - both startTime and endTime to be used together or not at all, represents the start and end of the client's selection (ex 4am-2pm)
    endTime
  }
  Params:
    id: - the uid of the store
*/
router.get(
  "/employee/available/:dayIndex/:startDate/:endDate",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  employeeController.available
);

/*
  GET - All employees working at the store
*/
router.get(
  "/employee/allEmployees",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  employeeController.allEmployees
);

/*
  GET - General information about a particular day of a schedule
  Params:
    - id - id of the schedule
    - day
  Response Body: {
    startTime
    endTime
  }
*/
router.get(
  "/schedule/:id/info/:day",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  scheduleController.getDayInfo
);
