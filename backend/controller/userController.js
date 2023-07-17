const asyncHandler = require("express-async-handler");

var jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const validationResult  = require("express-validator");

const User = require('../models/user');
const Employee = require('../models/employee');
const Store = require('../models/store');
const config = require('../store/config');

async function generateInviteCode() {
  let inviteCode;
  let isTaken = true;
  do {
    inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    isTaken = await Store.exists({ inviteCode }); //if broken use findone inviteCode:inviteCode
  } while (isTaken);
  return inviteCode;
}

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
  delete userToReturn.hashedPassword;
  return res.status(200).json(userToReturn);

});





exports.signup = asyncHandler(async (req, res, next) => {

  console.log("Entering Login Request Handler");

  //Ensure the frontend specified a valid user type
  if(req.body.type !== "EMPLOYEE" && req.body.type !== "STORE") return res.status(400).json({error: "Invalid user type specified" });


  //Attempt to find an existing user with the same credentials specified by the one requesting to sign up
  let found;
  
  //Ensure no user exists with either the same email or password
  if(req.body.username && req.body.email) {
    found = await User.findOne({
      type: req.body.type,
      $or: [
        {username: req.body.username},
        {email: req.body.email}
      ]
    });

    if(found && found.username === req.body.username) return res.status(400).json({error: "This username is already taken" });
    else if(found && found.email === req.body.email) return res.status(400).json({error: "This email is already registered" });
  }

  //If the user attempted to sign up without an email or a unique username, return an error
  else {
    return res.status(400).json({ error: "No unique username or email was specified"});
  }


  //Now that it has been verified that a user with these same login credentials does not exist
  //Do the following:

  //Create either a new store or employee account for the user
  let linkedAccount;
  if(req.body.type === "STORE") {

    linkedAccount = new Store({
      name: req.body.storeName,
      inviteCode: await generateInviteCode(), 
      
    });

  } else {

    linkedAccount = new Employee({
      username: req.body.username,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })
    
  }

  //Upload the store/employee account to the database
  await linkedAccount.save();

  //Create a new user account, store the user's hashed password in it, and link the user's employee or store account
  let user;
  bcrypt.hash(req.body.password, 10, async(err, hashedPassword) => {
    user = new User({
      hashedPassword: hashedPassword,
      type: req.body.type,
      accountRef: linkedAccount._id,
      username: req.body.username,
      email: req.body.email
    });

    //Upload the user account credentials to the database
    await user.save();

    //Celebrate profusely
    res.end(req.body.type + " account creation successful");
  })

})