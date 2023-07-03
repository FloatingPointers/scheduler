var express = require('express');
const passport = require('passport');
var jwt = require('jsonwebtoken');
var router = express.Router();
const bcrypt = require("bcryptjs");
const validationResult  = require("express-validator");

const User = require('../models/user');
const config = require('../store/config');
const {applyUserStrategy, applyLoginStrategy} = require('../store/passport');
const employee = require('../models/employee');

applyUserStrategy(passport);
applyLoginStrategy(passport);



router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  let user = req.user;  //passportjs adds user property after authenticating
  // Sign token
  const token = jwt.sign({ id: user._id }, config.passport.secret,
    {
      expiresIn: 1000000,
    });
  const userToReturn = { ...user.toJSON(), ...{ token } };
  delete userToReturn.hashedPassword;
  console.log("IM IN");
  return res.status(200).json(userToReturn);
});

router.post("/sign-up", async (req, res, next) => {
  console.log("SUPER");
  try {
    let found = null;
    if(req.body.type === "store"){
      found = await User.findOne({type: "store", storeID: req.body.storeID});
      if(found) {
        return res.status(400).json({ error: 'StoreID already exists' });
      }
    } else if(req.body.type === "employee"){
      found = await User.findOne({type: "employee", username: req.body.username, storeID: req.body.storeID});
      if(found) {
        return res.status(400).json({ error: 'Employee username exists at StoreID' });
      }
    } else {
      return res.status(400).json({ error: 'Incorrect Type' });
    }
    
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      // otherwise, store hashedPassword in DB
      let user = null;
      if(req.body.type === "store"){
        user = new User({
          storeID: req.body.storeID,
          hashedpassword: hashedPassword,
          type: req.body.type
        });
        employee = new employee({
          username: req.body.username,
          storeID: req.body.storeID,
        });
        employee.save();
      } else if(req.body.type === "employee"){
        user = new User({
          username: req.body.username,
          storeID: req.body.storeID,
          hashedpassword: hashedPassword,
          type: req.body.type
        });
        employee = new employee({
          username: req.body.username,
          storeID: req.body.storeID,
        });
        employee.save();
      }
      const result = await user.save();
    });
    res.redirect("/");
  } catch(err) {
    return next(err);
  };
});


module.exports = router;
