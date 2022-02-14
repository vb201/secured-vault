const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");

// User model
const User = require("../models/user");
const Vault = require("../models/vault");

const { forwardAuthenticated } = require("../config/authenticate");

/* GET home/login page. */
router.get("/", forwardAuthenticated, (req, res, next) => {
  res.render("login/login", { title: "Login" });
});

/* GET home/login page. */
router.get("/login", forwardAuthenticated, (req, res, next) => {
  res.render("login/login", { title: "Login" });
});

/* GET forgot password page. */
router.get("/forgot", forwardAuthenticated, (req, res, next) => {
  res.render("login/forgot", { title: "Forgot Password" });
});

/* GET register user page. */
router.get("/register", forwardAuthenticated, (req, res, next) => {
  res.render("login/register", { title: "Register" });
});

/* GET reset user page. */
router.get("/reset", (req, res, next) => {
  res.render("login/reset", { title: "Reset Password" });
});

/* GET logout user page. */
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("successMsg", "Vault has been locked successfully");
  res.redirect("/login");
});

/* POST home/login page. */
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/vault/all-entries",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

/* POST register user page. */
router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  let errors = [];

  /* Validation */
  // Check name fied
  if (!name) {
    errors.push({ msg: "Please enter name" });
  }

  // Check email field
  if (!email) {
    errors.push({ msg: "Please enter email" });
  }

  // Check password field
  if (!password) {
    errors.push({ msg: "Please enter password" });
  }

  // Check password length
  if (password.length < 5) {
    errors.push({ msg: "Password should atleast be 5 characters" });
  }

  // Match both passwords
  if (password !== confirmPassword) {
    errors.push({ msg: "Password don't match" });
  }

  // Check email
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.match(validRegex)) errors.push({ msg: "Email is invalid" });

  // No errors
  if (errors.length > 0) {
    res.render("login/register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
      title: "Register",
    });
  } else {
    // Validation Pass
    User.findOne({ email: email }).then((user) => {
      if (user) {
        // User exist
        errors.push({ msg: "Email is already registered" });
        res.render("login/register", {
          errors,
          name,
          email,
          password,
          confirmPassword,
          title: "Register",
        });
      } else {
        const newUser = new User({
          name,
          email,
          password, 
        });

        // Hash password
        // generate salt
        bcrypt.genSalt(13, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            // Set password to hash
            newUser.password = hash;

            // Save User
            newUser
              .save()
              .then((user) => {
                req.flash("successMsg", "You are now registered and can login");
                const newVault = new Vault({
                  user: newUser._id,
                })
                newVault.save()
                res.redirect("/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

module.exports = router;
