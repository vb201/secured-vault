const resetPassword = (req, res, next) => {
  res.render("login/reset", { title: "Reset Password" });
}

module.exports = { resetPassword };