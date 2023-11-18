const express = require("express");
const router = express.Router();

const passport = require("passport");
const { applyUserStrategy, employeeAuth } = require("../store/passport.js");
applyUserStrategy(passport);

const scheduleController = require("../controller/scheduleController.js");

module.exports = router;

router.get(
  "/schedule/currentSchedule",
  passport.authenticate("jwt", { session: false }),
  employeeAuth,
  scheduleController.getCurrentSchedule
);

router.get(
  "/schedule/:id/startDate/:day",
  passport.authenticate("jwt", { session: false }),
  employeeAuth,
  scheduleController.getDayInfo
);

router.get(
  "/schedule/:id/employeeDisplay",
  passport.authenticate("jwt", { session: false }),
  employeeAuth,
  scheduleController.getEmployeeDisplay
);

router.get(
  "/schedule/:id",
  passport.authenticate("jwt", { session: false }),
  employeeAuth,
  scheduleController.getEmployeeSchedule
);
