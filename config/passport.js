const localStategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Import user model
const User = require("../models/user");

module.exports = (passport) => {
  passport.use(
    new localStategy({ usernameField: "email" }, (email, password, done) => {
      // Match user
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            // If user not found
            return done(null, false, {
              message: "This email is not registered",
            });
          }

          if (user.verified) {
            // If user is verified
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;

              if (isMatch) {
                // If password matches
                // Check if user is verified
                // if (user.verified) {
                //   // If user is verified
                return done(null, user);
                // } else {
                //   // If user is not verified
                //   // TODO: Send message to verify email
                //   return done(null, false, {
                //     message: "Please verify your email",
                //     testFlag: true,
                //   });
                // }
              } else {
                // If password doesn't match
                return done(null, false, { message: "Password is incorrect" });
              }
            });
          } else {
            // If user is not verified
            // TODO: Send message to verify email
            return done(null, false, {
              message: "Please verify your email",
              testFlag: true,
            });
          }
          // Match password
        })
        .catch((err) => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
