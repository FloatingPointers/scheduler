const express = require("express");
const router = express.Router();

const passport = require("passport");
const { applyUserStrategy, storeAuth } = require("../../store/passport.js");
applyUserStrategy(passport);

const scheduleController = require("../../controller/scheduleController.js");
const employeeController = require("../../controller/employeeController.js");

/* GET - general info about each day on this schedule
Response Body: {
    day: [
        {
            goalsMet
            markedAsComplete
            totalHours
            totalCost
        }
    ]
}
Params:
    - id: schedule id
*/
router.get(
  "/:id/status",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  scheduleController.getOverviewDays
);

module.exports = router;
