const mongoose = require("mongoose");

const userScheme = mongoose.Schema({
  name: String,
  mail: String,
  login: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports.userModel = mongoose.model("UserManager", userScheme);
