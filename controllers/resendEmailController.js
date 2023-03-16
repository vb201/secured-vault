const User = require("../models/user");
const { sendVerificationEmail } = require("./registerController");

const resendEmail = (req, res) => {
  const { email } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      req.flash("errorMsg", "User not found");
      res.redirect("/login");
    } else {
      sendVerificationEmail(user.email, user._id);
      req.flash("successMsg", "Verification email has been sent");
      res.redirect("/login");
    }
  });
};

const getResendEmail = (req, res) => {
  res.render("login/resendVerificationEmail");
};

module.exports = { resendEmail, getResendEmail };
