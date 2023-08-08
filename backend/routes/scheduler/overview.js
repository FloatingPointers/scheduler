const express = require("express");
const router = express.Router();

const passport = require("passport");
const { applyUserStrategy, storeAuth } = require("../../store/passport.js");
applyUserStrategy(passport);

const scheduleController = require("../../controller/scheduleController.js");
const employeeController = require("../../controller/employeeController.js");

/* GET - general info about each day on this schedule
Response Body: {
    days: [
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
  "/:id/days",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  scheduleController.getOverviewDays
);

module.exports = router;
