const mongoose = require("mongoose");
const linkSchema = require("./linkSchema");
const userSchema = require("./userSchema");

module.exports = {
  User: mongoose.model("User", userSchema),
  Link: mongoose.model("Link", linkSchema),
};
