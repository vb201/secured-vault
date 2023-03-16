const User = require("../models/user");

const verifyUser = (req, res) => {
  const token = req.params.token;

  // find the user with the token that matches the token in the url
  // if the user is found, set the user's verified property to true
  // redirect the user to the login page

  // Check if token is not expired
  User.findOne({
    verificationToken: token,
  })
    .then((user) => {
      if (user) {
        if (Date.now() > user.verificationTokenExpires) {
          return res.send("Token expired");
        }
        user.verified = true;
        user.save();
        res.redirect("/login");
      } else {
        res.send("User not found");
      }
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(token);
};

module.exports = { verifyUser };
