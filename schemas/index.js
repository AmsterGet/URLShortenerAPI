let mongoose = require('mongoose');

export const linkSchema = mongoose.Schema({
    originalUrl: String,
    shortUrl: String,
    postDate: Date,
    transitions: Number,
    description: String,
    tags: [],
    user_id: mongoose.Schema.Types.ObjectId,
});

export const userSchema = mongoose.Schema({
    name: String,
    login: String,
    password: String,
});

