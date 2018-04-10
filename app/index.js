const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const config = require("../config");
const routes = require("./routes");
const userRoutesHandler = require("./common/userRoutesHandler");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: config.sessionConfig.secret,
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    url: config.dbConfig.url,
  }),
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use("/user/:userLogin/", userRoutesHandler.authenticateUser);
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
    console.log(console, error);
  });
