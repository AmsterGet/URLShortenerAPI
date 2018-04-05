const mongoose = require("mongoose");

const linkScheme = mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  postDate: Date,
  transitions: Number,
  description: String,
  tags: [],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "UserManager" },
}, { versionKey: false });

module.exports.linkModel = mongoose.model("Link", linkScheme);
