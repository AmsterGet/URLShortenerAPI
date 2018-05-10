const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const config = require("../config");
const routes = require("./routes");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: config.sessionConfig.secret,
  resave: false,
  saveUninitialized: false,
  unset: "destroy",
  store: new MongoStore({
    url: config.dbConfig.url,
  }),
}));
config.passport();
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-AUTHENTICATION, X-IP, withCredentials, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use("/user/", passport.authenticateUser);
app.use("/file/csv/", passport.authenticateUser);
const port = 1212;

mongoose.connect(config.dbConfig.url)
  .then(() => {
    routes(app);
    return app.listen(port);
  })
  .then(() => {
    console.log("Listening port: " + port);
  })
  .catch((error) => {
    console.log(error);
  });
