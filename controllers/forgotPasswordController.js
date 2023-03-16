const forgot = (req, res, next) => {
    res.render("login/forgot", { title: "Forgot Password" });
}

module.exports = { forgot };