const mongoose = require("mongoose");

const linkSchema = mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  postDate: Date,
  transitions: Number,
  description: String,
  tags: [],
  user_id: mongoose.Schema.Types.ObjectId,
}, { versionKey: false });

const userSchema = mongoose.Schema({
  name: String,
  login: String,
  password: String,
}, { versionKey: false });

module.exports = {
  User: mongoose.model("User", userSchema),
  Link: mongoose.model("Link", linkSchema),
};
