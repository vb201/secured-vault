const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Import models
const User = require("../models/user");
const Vault = require("../models/vault");

const { forwardAuthenticated } = require("../config/authenticate");

const { getLogin, login } = require("../controllers/loginController");
const {
  register,
  registerNewUser,
} = require("../controllers/registerController");
const { resetPassword } = require("../controllers/resetPasswordContoller");
const { logout } = require("../controllers/logoutContoller");
const { forgot } = require("../controllers/forgotPasswordController");
const { verifyUser } = require("../controllers/verifyUserController");
const {
  resendEmail,
  getResendEmail,
} = require("../controllers/resendEmailController");

router.route("/").get(forwardAuthenticated, getLogin);

router
  .route("/login")
  .get(forwardAuthenticated, getLogin)
  .post(forwardAuthenticated, login);

router.route("/forgot").get(forwardAuthenticated, forgot);

router
  .route("/register")
  .get(forwardAuthenticated, register)
  .post(registerNewUser);

router.route("/reset").get(resetPassword);

router.route("/logout").get(logout);

router.route("/verify/:token").get(verifyUser);

router
  .route("/resend-verification-email")
  .get(getResendEmail)
  .post(resendEmail);

module.exports = router;
