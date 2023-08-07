const express = require("express");
const router = express.Router();

const passport = require("passport");
const { applyUserStrategy, storeAuth } = require("../../store/passport.js");
applyUserStrategy(passport);

const scheduleController = require("../../controller/scheduleController.js");
const employeeController = require("../../controller/employeeController.js");

module.exports = router;
