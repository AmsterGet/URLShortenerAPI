const models = require("../models");
const utils = require("../utils");

module.exports = function (app) {
  app.get("/", (req, res) => { // request like /?shortUrl="ad1sda"
    const { shortUrl } = req.query;
    res.redirect(`/${shortUrl}/info`);
  });
  // for authorization
  app.post("/singIn", (req, res) => {
    // utils.verifyUser(req.body);
    // create session and redirect to `/&{userLogin}/links` or reject
  });
  // register new user, create session and redirect to `/&{userLogin}/links`
  app.post("/signUp", (req, res) => {
    console.log(req.body);
    const newUser = new models.User({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password, // don't forget to encrypt user's password with "crypto" module
      mail: req.body.mail,
    });

    newUser.save()
      .then((user) => {
        console.log("Wrote in database: " + JSON.stringify(user));
        res.redirect(`/${user.login}/links`);
      })
      .catch((error) => {
        console.error(error);
        res.send(error);
      });
  });
};
