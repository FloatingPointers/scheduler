const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const { search } = require("../routes/login");
const config = require("../store/config");
const bcrypt = require("bcryptjs");

// Authenticate User using JWT Token
const applyUserStrategy = (passport) => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = config.passport.secret;
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        let user = await User.findOne({ _id: payload.id, type: payload.type });
        // user found
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        console.error("Error:", err);
        return done(err, false);
      }
    })
  );
};

const applyLoginStrategy = (passport) => {
  passport.use(
    //TODO: Make it so local strategy accepts either username or password
    new LocalStrategy(
      { passReqToCallback: true },
      async (req, username, password, done) => {
        console.log(
          "Attempting login of user " +
            req.body.email +
            " with\n username or email: " +
            req.body.username +
            "\n type: " +
            req.body.type
        );

        if (req.body.type !== "STORE" && req.body.type !== "EMPLOYEE")
          return done(null, false);

        try {
          let user = await User.findOne({
            type: req.body.type,
            $or: [{ username: username }, { email: username }],
          });
          console.log("Located user?: " + user);

          if (!user) {
            return done(null, false, { message: "Invalid username/email" });
          }

          bcrypt.compare(password, user.hashedPassword, (err, res) => {
            if (err) {
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
        } catch (err) {
          return done(err, false); // error occurred
        }
      }
    )
  );
};

const employeeAuth = (req, res, next) => {
  if (req.user.type === "EMPLOYEE") {
    next();
  } else {
    res.status(403).json({ error: "Access denied" });
  }
};

const storeAuth = (req, res, next) => {
  if (req.user.type === "STORE") {
    next();
  } else {
    res.status(403).json({ error: "Access denied" });
  }
};

module.exports = {
  applyUserStrategy,
  applyLoginStrategy,
  employeeAuth,
  storeAuth,
};
