const mongoose = require("mongoose");

const linkScheme = mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  postDate: Date,
  transitions: Number,
  description: String,
  tags: [{
    tagName: String,
  }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { versionKey: false });

module.exports = mongoose.model("Link", linkScheme);
