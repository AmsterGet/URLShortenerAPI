const models = require("../models");
const utils = require("../utils");
const { userManager } = require("../managers");

function authenticateUser(req, res) {
  const { userLogin } = req.params;
  if (req.session.user.login !== userLogin) {
    res.redirect(`${req.hostname}/signIn`);
  }
}

module.exports = function (app) {
  app.all("/user/:userLogin", authenticateUser);
  // add new link
  app.route("/user/:userLogin/links/")
    .post((req, res) => {
      console.log(req.body);
      const { userLogin } = req.params;
      const { originalUrl } = req.body;
      const shortUrl = utils.generateShortUrl(originalUrl);

      const details = {
        login: userLogin,
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
    })
    .get((req, res) => {
      // get all user's links
    });

  app.route("/user/:userLogin/links/:shortUrl")
    .put((req, res) => {
      // for edit information about link
    })
    .delete((req, res) => {
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
