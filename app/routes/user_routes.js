const models = require("../models");
const utils = require("../utils");

module.exports = function (app) {
  app.post("/newUser", (req, res) => {
    console.log(req.body);
    const newUser = new models.User({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password,
      mail: req.body.mail,
    });

    newUser.save()
      .then((user) => {
        res.send("Wrote in database: " + JSON.stringify(user));
      })
      .catch((error) => {
        console.error(error);
      });
  });

  app.post("/:userId/links/", (req, res) => {
    console.log(req.body);
    const { originalUrl } = req.body;
    const shortUrl = utils.generateShortUrl(originalUrl);

    const newLink = new models.Link({
      originalUrl,
      shortUrl,
      postDate: new Date(),
      transitions: 0,
      description: req.body.description,
      tags: req.body.tags.split(", "),
      user: mongoose.Types.ObjectId(req.body.userId),
    });

    newLink.save()
      .then((link) => {
        res.send(link);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  app.delete("/:userId/links/:linkId", (req, res) => {
    const { linkId } = req.params;
    const details = {
      _id: new mongoose.Types.ObjectId(linkId),
    };
    models.Link.remove(details)
      .then((link) => {
        console.log("Success!");
        res.send("Link was deleted" + link);
      })
      .catch((error) => {
        console.error(error);
        res.send(error);
      });
  });
};
