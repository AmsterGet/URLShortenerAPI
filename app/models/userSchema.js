const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  login: String,
  password: String,
}, { versionKey: false });

module.exports = userSchema;
