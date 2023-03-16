const mongoose = require("mongoose");

const requiredString = {
  type: String,
  required: true,
};

const UserSchema = new mongoose.Schema({
  name: requiredString,
  email: requiredString,
  password: requiredString,
  date: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: null,
  },
  verificationTokenExpires: {
    type: Date,
    default: null,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
