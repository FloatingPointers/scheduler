const asyncHandler = require("express-async-handler");

var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validationResult = require("express-validator");

const User = require("../models/user");
const Employee = require("../models/employee");
const Store = require("../models/store");
const config = require("../store/config");
const { sendEmail } = require("../store/emailer");
const { v4: uuidv4 } = require("uuid");
const { redis } = require("../store/redis");

async function generateInviteCode() {
  let inviteCode;
  let isTaken = true;
  do {
    inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    isTaken = await Store.exists({ inviteCode }); //if broken use findone inviteCode:inviteCode
  } while (isTaken);
  return inviteCode;
}

exports.getDisplayName = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  return res.status(200).json({ name: req.user.name });
});

exports.login = asyncHandler(async (req, res, next) => {
  //passportjs adds user property after authenticating
  let user = req.user;

  //Sign an auth token for the user
  const token = jwt.sign(
    {
      id: user._id,
      type: user.type,
    },
    config.passport.secret,
    {
      expiresIn: 1000000,
    }
  );

  console.log("User Login Successful: " + req.user);

  //Respond with the logged in user along with their auth token, (excluding their hashed password)
  const userToReturn = { ...user.toJSON(), ...{ token } };
  delete userToReturn.hashedPassword;
  return res.status(200).json(userToReturn);
});

exports.signup = asyncHandler(async (req, res, next) => {
  console.log("Entering Login Request Handler");

  //Ensure the frontend specified a valid user type
  if (req.body.type !== "EMPLOYEE" && req.body.type !== "STORE")
    return res.status(400).json({ error: "Invalid user type specified" });

  //Attempt to find an existing user with the same credentials specified by the one requesting to sign up
  let found;

  //Ensure no user exists with either the same email or password
  if (req.body.username && req.body.email) {
    found = await User.findOne({
      type: req.body.type,
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (found && found.username === req.body.username)
      return res.status(400).json({ error: "This username is already taken" });
    else if (found && found.email === req.body.email)
      return res
        .status(400)
        .json({ error: "This email is already registered" });
  }

  //If the user attempted to sign up without an email or a unique username, return an error
  else {
    return res
      .status(400)
      .json({ error: "No unique username or email was specified" });
  }

  //Now that it has been verified that a user with these same login credentials does not exist
  //Do the following:

  //Create either a new store or employee account for the user
  let linkedAccount;
  let name;
  if (req.body.type === "STORE") {
    linkedAccount = new Store({
      //name: req.body.storeName,
      inviteCode: await generateInviteCode(),
    });
    name = req.body.storeName;

    //Upload the store account to the database
    await linkedAccount.save();
  } else {
    const inviteCode = req.body.inviteCode;

    const store = await Store.findOne({ inviteCode });

    if (!store._id)
      return res.status(404).json({ error: "Invite Code is not valid" });

    linkedAccount = new Employee({
      username: req.body.username,
      email: req.body.email,
      //firstName: req.body.firstName,
      //lastName: req.body.lastName,
      employer: store._id,
    });
    name = linkedAccount.firstName + linkedAccount.lastName;
    //Upload the employee account to the database
    await linkedAccount.save();
    store.employees.push(linkedAccount._id);
    await store.save();
  }

  //Create a new user account, store the user's hashed password in it, and link the user's employee or store account
  let user;
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    user = new User({
      name: name,
      hashedPassword: hashedPassword,
      type: req.body.type,
      accountRef: linkedAccount._id,
      username: req.body.username,
      email: req.body.email,
      employerRef: linkedAccount.employer,
    });

    //Upload the user account credentials to the database
    await user.save();

    //Celebrate profusely
    res.end(req.body.type + " account creation successful");
  });
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return;
  const token = uuidv4();
  await redis.set(
    "forgotPassword:" + token,
    user._id,
    "ex",
    1000 * 60 * 60 * 24
  );
  const url = `http://localhost:3000/changePassword?token=${token}`;
  await sendEmail(
    user.email,
    "Scheduler App: Forgot Password Request",
    `
      <div>
        <h1><a href=${url}>Click here to change password</a> </h1>
        <p>Or copy this link into your browser: ${url}</p>
        <p>This link will expire in 24 hours. If you did not request a password reset, you can ignore this email.</p>
      </div>
    `
  );
  res.status(200).json({ success: true });
});

exports.verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.body.token;
  const success = (await redis.exists("forgotPassword:" + token)) == 1;
  console.log(success);
  return res.status(200).json({ success });
});

exports.changePassword = asyncHandler(async (req, res, next) => {
  const token = req.body.token;
  const userId = await redis.get("forgotPassword:" + token);
  if (!userId) {
    return res.status(404).json({ error: "Token is expired" });
  }
  const newPassword = await bcrypt.hash(req.body.password, 10);
  await User.findByIdAndUpdate(userId, { hashedPassword: newPassword });
  await redis.del("forgotPassword:" + token);
  return res.status(200).json({ success: true });
});
