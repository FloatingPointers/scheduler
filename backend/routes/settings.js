const express = require('express');
const router = express.Router();

const passport = require('passport');
const { applyUserStrategy, storeAuth, employeeAuth } = require('../store/passport.js');
applyUserStrategy(passport);




//store routes

/*
  POST - Update the current settings
  Request Body: {
    storeSettings: {
      name
      email
      startDay
      endDay
      openTime
      closeTime
      roles
    }
  }
  Response Body: {
    success: True if the settings were successfully updated
  }
*/

router.post('/store/updateSettings', passport.authenticate('jwt', { session: false }), storeAuth, storeController.updateSettings);

/*
    GET - Get the current settings
    Response Body: {
        storeSettings: {
            name
            email
            startDay
            endDay
            openTime
            closeTime
            roles
        }
    }
*/
router.get('/store/getSettings', passport.authenticate('jwt', { session: false }), storeAuth, storeController.getSettings);




//employee routes

/*
  POST - Update the current settings
  Request Body: {
    employeeSettings: {
      name
      email
      password
      availability:
        day: [{
            preference: {
                type: String  // Message of employee preference
            },
            hours: [{
                type: bool,
            }],
        }],
      
    }
  }
  Response Body: {
    success: True if the settings were successfully updated
  }
*/

router.post('/employee/updateSettings', passport.authenticate('jwt', { session: false }), employeeAuth, employeeController.updateSettings);

/*
    GET - Get the current settings
    Response Body: {
        employeeSettings: {
            name
            email
            password
            availability:
              day: [{
                  preference: {
                      type: String  // Message of employee preference
                  },
                  hours: [{
                      type: bool,
                  }],
              }],
            
        }
    }
*/

router.get('/employee/getSettings', passport.authenticate('jwt', { session: false }), employeeAuth, employeeController.getSettings);

