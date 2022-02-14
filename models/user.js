const { LengthRequired } = require("http-errors");
const mongoose = require("mongoose");

const requiredString = {
  type: String,
  required: true,
} 

const requiredNumber = {
    type: Number,
    required: true,
}

const WebsiteSchema = new mongoose.Schema({
  name: requiredString,
  url: requiredString,
  login: requiredString,
  password: requiredString,
  favourate: { type: Boolean},
});

const ApplicationSchema = new mongoose.Schema({
  name: requiredString,
  device: requiredString,
  login: requiredString,
  password: requiredString,
  favourate: { type: Boolean},
});

const BankCardSchema = new mongoose.Schema({
  name: requiredString,
  number: requiredNumber,
  holderName: requiredString,
  expiryMonth: requiredNumber,
  expiryYear: requiredNumber,
  cvv: requiredNumber,
  favourate: { type: Boolean},
});

const VaultSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  websites: [WebsiteSchema],
  applications: [ApplicationSchema],
  bankCards: [BankCardSchema],
  // notes,
});

const UserSchema = new mongoose.Schema({
  name: requiredString,
  email: requiredString,
  password: requiredString,
  vault: [VaultSchema],
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
