const express = require("express");
const router = express.Router();

const passport = require("passport");
const { applyUserStrategy, employeeAuth } = require("../store/passport.js");
applyUserStrategy(passport);

const scheduleController = require("../controller/scheduleController.js");

module.exports = router;

router.get(
  "/schedule/:id/info/:day",
  passport.authenticate("jwt", { session: false }),
  employeeAuth,
  scheduleController.getDayInfo
);
