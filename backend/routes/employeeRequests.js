const express = require("express");
const router = express.Router();

const passport = require("passport");
const { applyUserStrategy, employeeAuth } = require("../store/passport.js");
applyUserStrategy(passport);
const requestController = require("../controller/requestController.js");

router.post(
  "/request/create",
  passport.authenticate("jwt", { session: false }),
  employeeAuth,
  requestController.createReq
);

router.get(
  "/request/getPage/:page",
  passport.authenticate("jwt", { session: false }),
  employeeAuth,
  requestController.getPage
);

router.delete(
  "/request/delete/:id",
  passport.authenticate("jwt", { session: false }),
  employeeAuth,
  requestController.deleteReq
);

router.get(
  "/request/numPages",
  passport.authenticate("jwt", { session: false }),
  employeeAuth,
  requestController.numPages
);

module.exports = router;
