const express = require("express");
const router = express.Router();

const passport = require("passport");
const { applyUserStrategy, storeAuth } = require("../../store/passport.js");
applyUserStrategy(passport);

const scheduleController = require("../../controller/scheduleController.js");

var overviewRouter = require("./overview");
var editorRouter = require("./editor");

router.use("/overview", overviewRouter);
router.use("/editor", editorRouter);

/* --------------------------
   GENERAL SCHEDULE ROUTES
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
  DELETE - Delete an existing schedule by id
  Response Body: {
    success: True if a schedule object was successfully deleted
  }
  Params:
    id: - the uid of the schedule to be deleted
*/
router.delete(
  "/delete/:id",
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
  POST - Update any information included in request to the specified schedule
  Request Body: {
    any schedule fields to be updated
  }
  Response Body: {
    updated states of changed fields
  }
  Params: id
*/
router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  scheduleController.updateSchedule
);

/* -----------------------
    SCHEDULE HOME ROUTES
   ----------------------- */

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

module.exports = router;
