const mongoose = require("mongoose");

const userScheme = mongoose.Schema({
  name: String,
  login: String,
  password: String,
  mail: String,
}, { versionKey: false });

module.exports.userModel = mongoose.model("User", userScheme);
