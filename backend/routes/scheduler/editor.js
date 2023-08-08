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
    options: {
      startTime - both startTime and endTime to be used together or not at all, represents the start and end of the client's selection (ex 4am-2pm)
      endTime
    }
  }
  Params:
    id: - the uid of the schedule
*/
router.get(
  "/:id/working",
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
      startTime
      endTime
    }
  }
  Params:
    id: - the uid of the schedule
*/
router.put(
  "/:id/addShift",
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
  "/:id/removeShift",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  scheduleController.removeShift
);

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
router.get(
  "/employee/available",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  employeeController.available
);

/*
  GET - All employees working at the store
  Request Body: {
    options: {
      startTime - both startTime and endTime to be used together or not at all, represents the start and end of the client's selection (ex 4am-2pm)
      endTime
    }
  }
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
  "/:id/info/:day",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  scheduleController.getDayInfo
);
