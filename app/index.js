// import { userSchema } from "../schemas";
// import { linkSchema } from "../schemas";
let mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
    originalUrl: String,
    shortUrl: String,
    postDate: Date,
    transitions: Number,
    description: String,
    tags: [],
    user_id: mongoose.Schema.Types.ObjectId,
});

const userSchema = mongoose.Schema({
    name: String,
    login: String,
    password: String,
});

let db = mongoose.createConnection('mongodb://localhost/url_shortener');
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', function() {
    initModels();
});

function initModels() {
    let User = mongoose.model('user', userSchema);
    let Link = mongoose.model('link', linkSchema);

    let newUser = new User({
        name: "Alex",
        login: "lex",
        password: "",
    });
    console.log(newUser);

    newUser.save((err, newUser) => {
        console.log(newUser.login);
        if (err) return console.error(err);
        console.log(newUser.login);
    });
}
