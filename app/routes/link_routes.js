const mongoose = require("mongoose");
const models = require("../models");

module.exports = function (app) {
  app.get("/:shortUrl/info", (req, res) => {
    const { shortUrl } = req.params;
    const details = {
      shortUrl,
    };
    models.Link.find(details)
      .then((link) => {
        res.send(link);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  app.get("/:shortUrl", (req, res) => {
    const { shortUrl } = req.params;
    const details = {
      shortUrl,
    };
    // rewrite it!
    models.Link.find(details)
      .then((link) => {
        res.redirect("/originalUrl");
      })
      .catch((error) => {
        console.error(error);
      });
  });

  // for find all links via tagName
  app.get("/:shortUrl/info/:tagName", (req, res) => {

  });
};
