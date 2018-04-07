const { Link } = require("../models");

module.exports = function (app) { // Done
  app.get("/:shortUrl", (req, res) => {
    const { shortUrl } = req.params;
    const queryDetails = {
      shortUrl,
    };

    Link.findOneAndUpdate(queryDetails, { $inc: { transitions: 1 } })
      .then((link) => {
        res.redirect(link.originalUrl);
      })
      .catch((error) => {
        console.error(error);
        res.send(error);
      });
  });

  app.get("/:shortUrl/info", (req, res) => { // Done
    const { shortUrl } = req.params;
    const queryDetails = {
      shortUrl,
    };
    Link.find(queryDetails)
      .then((link) => {
        res.send(link);
      })
      .catch((error) => {
        console.error(error);
        res.send(error);
      });
  });

  // for find all links via tagName
  app.get("/:shortUrl/info/:tagName", (req, res) => { // Done
    const { tagName } = req.params;
    const queryDetails = {
      "tags.tagName": tagName,
    };
    Link.find(queryDetails)
      .then((links) => {
        res.send(links);
      })
      .catch((error) => {
        console.error(error);
        res.send(error);
      });
  });
};
