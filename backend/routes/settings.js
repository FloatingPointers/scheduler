const express = require("express");
const router = express.Router();

const passport = require("passport");
const {
  applyUserStrategy,
  storeAuth,
  employeeAuth,
} = require("../store/passport.js");
applyUserStrategy(passport);
const storeController = require("../controller/storeController");
const employeeController = require("../controller/employeeController");

//store routes

/*
  POST - Update the current settings
    Request Body: {
        name: name
        settings: {
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

router.put(
  "/store/updateSettings",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  storeController.updateSettings
);

/*
    GET - Get the current settings
    Response Body: {
        name: name
        settings: {
            startDay
            endDay
            openTime
            closeTime
            roles
        }
    }
*/
router.get(
  "/store/getSettings",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  storeController.getSettings
);

/*
GET - Get the default open/close time and start day of week for schedules
Response Body: {
  settings: {
    openTime
    closeTime
    startDay
  }
}
*/
router.get(
  "/store/scheduleSettings",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  storeController.getScheduleSettings
);

//employee routes

/*
  PUT - Update the current settings
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

router.put(
  "/employee/updateSettings",
  passport.authenticate("jwt", { session: false }),
  employeeAuth,
  employeeController.updateSettings
);

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

router.get(
  "/employee/getSettings",
  passport.authenticate("jwt", { session: false }),
  employeeAuth,
  employeeController.getSettings
);

module.exports = router;
