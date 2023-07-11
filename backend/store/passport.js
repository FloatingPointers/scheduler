const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const { search } = require('../routes/login');
const config = require('../store/config');
const bcrypt = require("bcryptjs");


// Authenticate User using JWT Token
const applyUserStrategy = passport => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = config.passport.secret;
  passport.use(new JwtStrategy(options, async (payload, done) => {
    try {
      let user = User.find({_id: payload.id, type: payload.type});
      // user found
      if (user) {
        return done(null, user);
      }
      // User not found
      return done(null, false);
    } catch (err) {
      return done(err, false);  
    }
  }));
};

const applyLoginStrategy = passport => {
  passport.use(
    //TODO: Make it so local strategy accepts either username or password
    new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {

      console.log("Attempting login of user " + req.body.email + " with\n username: " + req.body.username + "\n email: " + req.body.email + "\n type: " + req.body.type);

      if(req.body.type !== "store" && req.body.type !== "employee") return done(null, false);

      try {
        let searchParams = {
          type: req.body.type
        }
        if(req.body.email) searchParams = { ...searchParams, email: req.body.email }
        else searchParams = { ...searchParams, username: req.body.username }

        let user = await User.findOne(searchParams);
        console.log("Located user?: " + user);

        if(!user) {
          return done(null, false, { message: "Incorrect credentials" });
        }

        bcrypt.compare(password, user.hashedpassword, (err, res) => {

          if(err) {
            console.log(err);
            return done(err, false);
          }

          if (res) {
            // passwords match! log user in
            console.log(user);
            return done(null, user);
          } else {
            // passwords do not match
            return done(null, false, { message: "Incorrect password" });
          }

        });

      } catch(err) {
        return done(err, false);  // error occurred
      }
    })
  );
};

const employeeAuth = (req, res, next) => {
  if (req.user.type === 'employee') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied' });
  }
};

const storeAuth = (req, res, next) => {
  if (req.user.type === 'store') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied' });
  }
};

module.exports = {
  applyUserStrategy,
  applyLoginStrategy,
  employeeAuth,
  storeAuth
};