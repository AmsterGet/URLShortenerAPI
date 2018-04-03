const models = require("../models");
const utils = require("../utils");

module.exports = function (app) {
  app.get("/links", (req, res) => {
    models.Link.find()
      .catch((error) => {
        console.error(error);
      })
      .then((links) => {
        res.send(links);
      });
  });

  app.post("/addLink", (req, res) => {
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
      user_id: req.body.user_id,
    });

    newLink.save()
      .catch((error) => {
        console.error(error);
      })
      .then((link) => {
        res.send(link);
      });
  });
};
