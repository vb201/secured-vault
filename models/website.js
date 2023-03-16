const mongoose = require("mongoose");

const requiredString = {
  type: String,
  required: true,
};

const WebsiteSchema = new mongoose.Schema({
  name: requiredString,
  url: requiredString,
  email: requiredString,
  password: requiredString,
  favourate: { type: Boolean },
});

const Website = mongoose.model("Website", WebsiteSchema);

module.exports = Website;
