const { LengthRequired } = require("http-errors");
const mongoose = require("mongoose");

const requiredString = {
  type: String,
  required: true,
} 

const ApplicationSchema = new mongoose.Schema({
  name: requiredString,
  device: requiredString,
  email: requiredString,
  password: requiredString,
  favourate: { type: Boolean, default: false},
});

const Application = mongoose.model("Application", ApplicationSchema);
module.exports = Application;
