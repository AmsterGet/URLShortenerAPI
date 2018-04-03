const models = require("../models");

module.exports = function (app) {
  app.post("/addUser", (req, res) => {
    console.log(req.body);
    const newUser = new models.User({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password,
    });

    newUser.save()
      .catch((error) => {
        console.error(error);
      })
      .then((user) => {
        res.send("Wrote in database: " + JSON.stringify(user));
      });
  });
};
