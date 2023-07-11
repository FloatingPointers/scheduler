const asyncHandler = require("express-async-handler");

var jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const validationResult  = require("express-validator");

const User = require('../models/user');
const Employee = require('../models/employee');
const Store = require('../models/store');
const config = require('../store/config');



exports.login = asyncHandler(async (req, res, next) => {

  //passportjs adds user property after authenticating
  let user = req.user;  

  //Sign an auth token for the user
  const token = jwt.sign(
    { 
      id: user._id, 
      type: user.type 
    }, 
    config.passport.secret,
    {
      expiresIn: 1000000,
    });

  console.log("User Login Successful: " + req.user);
  
  //Respond with the logged in user along with their auth token, (excluding their hashed password)
  const userToReturn = { ...user.toJSON(), ...{ token } };
  delete userToReturn.hashedpassword;
  return res.status(200).json(userToReturn);

});





exports.signup = asyncHandler(async (req, res, next) => {

  console.log("Entering Login Request Handler");

  try {

    //Ensure the frontend specified a valid user type
    if(req.body.type !== "employee" && req.body.type !== "store") return res.status(400).json({error: "Invalid user type specified" });


    //Attempt to find an existing user with the same credentials specified by the one requesting to sign up
    let found;
    
    //If the user is signing up with both an email and password, ensure no user exists with either the same email or password
    if(req.body.username && req.body.email) {
      found = await User.findOne({
        type: req.body.type,
        $or: [
          {username: req.body.username},
          {email: req.body.email}
        ]
      });

      if(found && found.username === req.body.username) return res.status(400).json({error: "This username is already taken" });
      else if(found && found.email === req.body.email) return res.status(400).json({error: "This email is already taken" });
    }

    //Otherwise if the user is only attempting to sign up with an email, check if that email is already taken
    else if(req.body.email) {
      found = await User.findOne({
        type: req.body.type,
        email: req.body.email
      })

      if(found) return res.status(400).json({ error: "This email is already taken" });
    }

    //Otherwise if the user is only attempting to sign up with a username, check if that username is already taken
    else if(req.body.username) {
      found = await User.findOne({
        type: req.body.type,
        username: req.body.username
      })

      if(found) return res.status(400).json({ error: "This username is already taken" });
    }

    //If the user attempted to sign up without an email or a unique username, return an error
    else {
      return res.status(400).json({ error: "No unique username or email was specified"});
    }


    //Now that it has been verified that a user with these same login credentials does not exist
    //Do the following:

    //Create either a new store or employee account for the user
    let linkedAccount;
    if(req.body.type === "store") {

      linkedAccount = new Store({});

      //If the user opted to sign up with a store name, set the store's name
      if(req.body.storeName) linkedAccount.name = req.body.storeName;

    } else {

      linkedAccount = new Employee({})

      //Set the user's email and/or username so that there's something to find them by
      if(req.body.username) linkedAccount.username = req.body.username;
      if(req.body.email) linkedAccount.email = req.body.email;

      //Set the user's first and last name for searching / displaying, if they specified any
      if(req.body.firstname) linkedAccount.firstname = req.body.firstname;
      if(req.body.lastname) linkedAccount.lastname = req.body.lastname;
      
    }

    //Upload the store/employee account to the database
    linkedAccount.save();


    
    //Create a new user account, store the user's hashed password in it, and link the user's employee or store account
    let user;
    bcrypt.hash(req.body.password, 10, async(err, hashedPassword) => {
      user = new User({
        hashedpassword: hashedPassword,
        type: req.body.type,
        accountRef: linkedAccount._id
      });

      //Set the user's unique username and/or password, depending on what they signed up with
      if(req.body.username) user.username = req.body.username;
      if(req.body.email) user.email = req.body.email;

      //Upload the user account credentials to the database
      await user.save();

      //Celebrate profusely
      res.end(req.body.type + " account creation successful");
    })
    
  } catch(err) {
    console.log(err);
    res.end('An unexpected error occurred when creating the account');
  };

})