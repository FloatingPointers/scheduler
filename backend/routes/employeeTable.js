const express = require('express');
const router = express.Router();

const passport = require('passport');
const { applyUserStrategy, storeAuth } = require('../store/passport.js');
applyUserStrategy(passport);

const scheduleController = require('../controller/scheduleController.js');
const employeeController = require('../controller/employeeController.js');



router.get('/employee/allEmployees', passport.authenticate('jwt', { session: false }), storeAuth, employeeController.allEmployees);

router.get('/employee/:id/deleteEmployee', passport.authenticate('jwt', { session: false }), storeAuth, employeeController.deleteEmployee);

module.exports = router;