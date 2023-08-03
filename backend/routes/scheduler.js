const express = require("express");
const router = express.Router();

const passport = require("passport");
const { applyUserStrategy, storeAuth } = require("../store/passport.js");
applyUserStrategy(passport);

const scheduleController = require("../controller/scheduleController.js");
const employeeController = require("../controller/employeeController.js");

/* --------------------------
   SCHEDULE CONTROLLER ROUTES
   -------------------------- */

/*
  POST - Create a new schedule
  Request Body: {
    scheduleInfo: {
      storeId
      startDate
      startTime
      endTime
    }
  }
  Response Body: {
    newScheduleId: Id of the newly created schedule
  }
*/
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  scheduleController.createSchedule
);

/*
  GET - Get 3 most recent schedules
  Response Body: {
    [
      schedules (only contain) {
        _id
        startDate
        isMarkedComplete
        goalsMet
        issues
      }
    ]
  }
*/
router.get(
  "/recentSchedules",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  scheduleController.getRecentSchedules
);

/*
  GET - A page of schedules
  Response Body: {
    [
      schedules (only contain) {
        _id
        startDate
        isMarkedComplete
        goalsMet
        issues
      }
    ]
  }
*/
router.get(
  "/paginatedSchedules/:page/:showArchived",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  scheduleController.getPaginatedSchedules
);

/*
GET - maximum number of pages for a table of schedules
Request Params {
  archived: true/false
}
Response Body {
  maxPages
}
*/
router.get(
  "/maxSchedulePages/:archived",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  scheduleController.maxSchedules
);

/*
  DELETE - Delete an existing schedule by id
  Response Body: {
    success: True if a schedule object was successfully deleted
  }
  Params:
    id: - the uid of the schedule to be deleted
*/
router.delete(
  "/schedule/:id/deleteSchedule",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  scheduleController.deleteSchedule
);

/*
  POST - Set archvial status of a schedule by id
  Request Body: {
    id
    archived: true/false
  }
*/
router.post(
  "/archive",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  scheduleController.archiveSchedule
);

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
  "/schedule/:id/working",
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
  "/employees/:id/available",
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
  "/employees/allEmployees",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  employeeController.allEmployees
);

module.exports = router;
