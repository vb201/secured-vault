const passport = require("passport");

const getLogin = (req, res, next) => {
  res.render("login/login", { title: "Login" });
}



const login = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/vault/all-entries",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
}

module.exports = { getLogin, login };