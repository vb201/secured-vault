const logout = (req, res) => {
  req.logout();
  req.flash("successMsg", "Vault has been locked successfully");
  res.redirect("/login");
}

module.exports = { logout };