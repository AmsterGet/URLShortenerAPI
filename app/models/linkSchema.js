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

module.exports = linkSchema;
