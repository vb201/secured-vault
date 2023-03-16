const mongoose = require("mongoose");

const VaultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  websites: [],
  applications: [],
  bankCards: [],
});

const Vault = mongoose.model("Vault", VaultSchema);

module.exports = Vault;
