var express = require('express');
const passport = require('passport');
var jwt = require('jsonwebtoken');
var router = express.Router();
const bcrypt = require("bcryptjs");
const validationResult  = require("express-validator");

const User = require('../models/user');
const config = require('../store/config');
const {applyUserStrategy, applyLoginStrategy} = require('../store/passport');
const Employee = require('../models/employee');
const Store = require('../models/store');

applyUserStrategy(passport);
applyLoginStrategy(passport);



/*
POST - login as either an employee or store account
Request Body: {
  type - "store" or "employee" user type 
  Store { - included only if login is of type "store"
    StoreId
    password
  }
  Employee { - included only if login is of type "employee"
    storeId
    username
    password
  }
}
Response Body: {
  token
  user  - corresponding user object w/o hashedpassword
}
*/


router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  let user = req.user;  //passportjs adds user property after authenticating
  // Sign token
  const token = jwt.sign({ id: user._id, type: user.type }, config.passport.secret,
    {
      expiresIn: 1000000,
    });
  const userToReturn = { ...user.toJSON(), ...{ token } };
  delete userToReturn.hashedpassword;
  console.log("IM IN");
  return res.status(200).json(userToReturn);
});



router.get('/hello', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.status(200).json({message: "hello"});
});

router.post("/sign-up", async (req, res, next) => {
  console.log("SUPER");
  try {
    let found = null;
    if(req.body.type === "store"){
      found = await User.findOne({type: "store", storeId: req.body.storeId});
      if(found) {
        return res.status(400).json({ error: 'StoreId already exists' });
      }
    } else if(req.body.type === "employee"){
      found = await User.findOne({type: "employee", username: req.body.username, storeId: req.body.storeId});
      if(found) {
        return res.status(400).json({ error: 'Employee username exists at StoreId' });
      }
    } else {
      return res.status(400).json({ error: 'Incorrect Type' });
    }
    
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      // otherwise, store hashedPassword in DB
      let user = null;
      if(req.body.type === "store"){
        user = new User({
          storeId: req.body.storeId,
          hashedpassword: hashedPassword,
          type: req.body.type
        });
        let store = new Store({
          username: req.body.storeId,
          storeId: req.body.storeId,
        });
        store.save();
      } else if(req.body.type === "employee"){
        user = new User({
          username: req.body.username,
          storeId: req.body.storeId,
          hashedpassword: hashedPassword,
          type: req.body.type
        });
        let employee = new Employee({
          username: req.body.username,
          storeId: req.body.storeId,
        });
        employee.save();
      }
      const result = await user.save();
      res.end('It worked!');
    });
  } catch(err) {
    console.log(err);
    res.end('It worked!');
  };
});


module.exports = router;
