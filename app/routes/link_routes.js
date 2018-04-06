const { Link } = require("../models");

module.exports = function (app) {
  app.get("/:shortUrl", (req, res) => {
    const { shortUrl } = req.params;
    const details = {
      shortUrl,
    };

    Link.find(details)
      .then((link) => {
        // increase link's transitions counter here
        res.redirect(link.originalUrl);
      })
      .catch((error) => {
        console.error(error);
        res.send(error);
      });
  });

  app.get("/:shortUrl/info", (req, res) => {
    const { shortUrl } = req.params;
    const details = {
      shortUrl,
    };
    Link.find(details)
      .then((link) => {
        res.send(link);
      })
      .catch((error) => {
        console.error(error);
        res.send(error);
      });
  });

  // for find all links via tagName
  app.get("/:shortUrl/info/:tagName", (req, res) => {
    const { tagName } = req.params;
    const details = {
      tagName,
    };
    // rewrite search request for correct work
    Link.find(details)
      .then((links) => {
        res.send(links);
      })
      .catch((error) => {
        console.error(error);
        res.send(error);
      });
  });
};
