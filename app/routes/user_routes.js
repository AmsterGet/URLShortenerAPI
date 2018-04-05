const models = require("../models");
const utils = require("../utils");

module.exports = function (app) {
  // add new link
  app.post("/:userLogin/links/", (req, res) => {
    console.log(req.body);
    // add link's unique check here
    const { originalUrl } = req.body;
    const shortUrl = utils.generateShortUrl(originalUrl);

    const details = {
      login: req.body.login,
    };

    models.User.find(details)
      .then((user) => {
        const newLink = new models.Link({
          originalUrl,
          shortUrl,
          postDate: new Date(),
          transitions: 0,
          description: req.body.description,
          tags: req.body.tags.split(", "),
          user: user._id,
        });

        return newLink.save();
      })
      .then((link) => {
        res.send(link);
      })
      .catch((error) => {
        console.error(error);
        res.send(error);
      });
  });
  // get all user's links
  app.get("/:userLogin/links/", (req, res) => {

  });
  // for edit information about link
  app.put("/:userLogin/links/:shortUrl", (req, res) => {

  });

  app.delete("/:userLogin/links/:shortUrl", (req, res) => {
    const { shortUrl } = req.params;
    const details = {
      shortUrl,
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
