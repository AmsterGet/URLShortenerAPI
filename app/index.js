const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require("../config/db");
const routes = require("./routes");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 1212;

mongoose.connect(dbConfig.url)
  .then(() => {
    routes(app);
    app.listen(port, () => {
      console.log("Listening port: " + port);
    });
  })
  .catch((error) => {
    console.error.bind(console, error);
  });
