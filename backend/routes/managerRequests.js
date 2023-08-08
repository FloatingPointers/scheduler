const express = require("express");
const router = express.Router();

const passport = require("passport");
const { applyUserStrategy, storeAuth } = require("../store/passport.js");
applyUserStrategy(passport);

const requestController = require("../controller/requestController.js");

//get all employee requests by ID
router.get(
  "/request/get/:page/:pending",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  requestController.getStoreRequests
);

//Approve or deny employee requests
router.put(
  "/request/update/:requestId",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  requestController.updateRequest
);

router.get(
  "/request/maxReqs/:pending",
  passport.authenticate("jwt", { session: false }),
  storeAuth,
  requestController.maxReqs
);

module.exports = router;
