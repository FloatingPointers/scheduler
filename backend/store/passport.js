const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../store/config');
const bcrypt = require("bcryptjs");

const applyUserStrategy = passport => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = config.passport.secret;
  passport.use(new JwtStrategy(options, async (payload, done) => {
    try {
      let user = User.find({_id: payload.id});
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
    new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
      try {
        let user = null;
        if(req.body.type === "store"){
          user = await User.findOne({ storeID: req.body.storeID, type: req.body.type });
        } else if(req.body.type === "employee"){
          user = await User.findOne({ storeID: req.body.storeID, type: req.body.type, username: username });
        } else {
          return done(null, false);
        }
        if(user){
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
        } else {
          return done(null, false, { message: "Incorrect credentials" });
        }
      } catch(err) {
        return done(err, false);  // error occurred
      }
    })
  );
};

module.exports = {
  applyUserStrategy,
  applyLoginStrategy
};