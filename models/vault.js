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
  email: requiredString,
  password: requiredString,
  favourate: { type: Boolean},
});

const ApplicationSchema = new mongoose.Schema({
  name: requiredString,
  device: requiredString,
  email: requiredString,
  password: requiredString,
  favourate: { type: Boolean},
});

const BankCardSchema = new mongoose.Schema({
  name: requiredString,
  cardNumber: requiredString,
  holderName: requiredString,
  expiry: requiredString,
  cvv: requiredString,
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

// const Website = mongoose.model("Website", WebsiteSchema);
// module.exports = Website;

const Vault = mongoose.model("Vault", VaultSchema);
module.exports = Vault;
