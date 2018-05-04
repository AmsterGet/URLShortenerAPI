const mongoose = require("mongoose");

const userScheme = mongoose.Schema({
  name: String,
  mail: {
    type: String,
    unique: true,
  },
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

module.exports = mongoose.model("User", userScheme);
