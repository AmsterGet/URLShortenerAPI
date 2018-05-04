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
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
    default: "user",
  },
}, { versionKey: false });

module.exports = mongoose.model("User", userScheme);
