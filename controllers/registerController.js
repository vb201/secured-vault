const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const User = require('../models/user');
const Vault = require('../models/vault');

const register = (req, res, next) => {
  res.render('login/register', { title: 'Register' });
};

const validateNewUser = (name, email, password, confirmPassword) => {
  let errors = [];

  // Check name fied is empty
  if (!name) {
    errors.push({ msg: 'Please enter name' });
  }

  // Check email field is empty
  if (!email) {
    errors.push({ msg: 'Please enter email' });
  }

  // Check password field and confirm password field
  if (!password || !confirmPassword) {
    errors.push({ msg: 'Please enter password' });
  }

  // Check password  field length
  if (password.length < 5) {
    errors.push({ msg: 'Password should atleast be 5 characters' });
  }

  // Match both passwords entered
  if (password !== confirmPassword) {
    errors.push({ msg: "Password don't match" });
  }

  // Check email is valid or not
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.match(validRegex)) errors.push({ msg: 'Email is invalid' });

  return errors;
};

const sendVerificationEmail = (email, id) => {
  // Create a verification token
  const token = crypto.randomBytes(20).toString('hex');

  // Create a verification token expiration date
  const tokenExpiration = Date.now() + 600000; // 10 minutes from now (in milliseconds) (600000) = 10 minutes

  // Save the verification token and expiration date to the user
  User.findByIdAndUpdate(
    id,
    {
      verificationToken: token,
      verificationTokenExpires: tokenExpiration,
    },
    (err, user) => {
      if (err) throw err;
    }
  );

  // Create a verification link
  const nodeEnv = process.env.NODE_ENV;

  let verificationLink = null;
  if (nodeEnv === 'development')
    verificationLink = `http://localhost:3000/verify/${token}`;
  else if (nodeEnv === 'production')
    verificationLink = `https://secured-vault.onrender.com/verify/${token}`;

  // console.log(`Verification link: `, verificationLink);

  // Send the verification email
  const mailOptions = {
    from: 'Secret Vault',
    to: email,
    subject: 'Verify your email',
    html: `<p>Click on the link below to verify your email</p>
    <a href="${verificationLink}">Click Here</a>

    <p>If you didn't sign up for Secured Vault, please ignore this email</p>    
    `,
  };

  // Create a transporter
  const transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    service: 'gmail',
    //   port: 465,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD, // This is the app password of the email id
    },
  });

  // Send the email
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log(`Email sent: ${info.response}`);
  });
};

const registerNewUser = (req, res) => {
  // Get the form values
  const { name, email, password, confirmPassword } = req.body;

  // Validate user input
  let errors = validateNewUser(name, email, password, confirmPassword);

  // Check if there are any errors
  if (errors.length > 0) {
    // If there are errors, render the register page again with the errors
    res.render('login/register', {
      errors,
      name,
      email,
      password,
      confirmPassword,
      title: 'Register',
    });
  } else {
    // If there are no errors, check if the user already exists
    User.findOne({ email: email }).then((user) => {
      if (user) {
        // If the user already exists, render the register page again with the error
        errors.push({ msg: 'Email is already registered' });
        // Render the register page again with the errors
        res.render('login/register', {
          errors,
          name,
          email,
          password,
          confirmPassword,
          title: 'Register',
        });
      } else {
        // If the user doesn't exist, create a new user
        const newUser = new User({
          name,
          email,
          password,
        });

        // Hash the password
        bcrypt.genSalt(13, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            // If there is an error, throw it
            if (err) throw err;

            // Set the password to the hashed password
            newUser.password = hash;

            // Save the user
            newUser
              .save()
              .then((user) => {
                // If the user is saved, send a verification email
                sendVerificationEmail(user.email, user._id);
                console.log(`Mail send Successfully`);
                const newVault = new Vault({
                  user: newUser._id,
                });
                req.flash(
                  'successMsg',
                  'A verification email has been sent to your email'
                );

                newVault.save();

                // Redirect to the login page
                console.log(`Redirecting to login page`);
                res.redirect('/login');
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
  console.log(errors);
};

module.exports = { register, registerNewUser, sendVerificationEmail };
