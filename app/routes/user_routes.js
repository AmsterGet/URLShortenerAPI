const models = require("../models");
const utils = require("../utils");
const { linkManager } = require("../managers");

function authenticateUser(req, res) {
  const { userLogin } = req.params;
  if (req.session.user.login !== userLogin) {
    res.send("SignIn, please!");
  }
}

module.exports = function (app) {
  app.use("/user/:userLogin/", authenticateUser);

  app.route("/user/:userLogin/links/")
    // add new link
    .post((req, res) => { // Done
      console.log(req.body);
      const { userLogin } = req.params;
      const { originalUrl } = req.body;
      const shortUrl = utils.generateShortUrl(originalUrl);
      const queryDetails = {
        login: userLogin,
      };
      const tags = linkManager.mapTagsToNotes(req.body.tags.split(", "));

      models.User.find(queryDetails)
        .then((user) => {
          const newLink = new models.Link({
            originalUrl,
            shortUrl,
            postDate: new Date(),
            transitions: 0,
            description: req.body.description,
            tags,
            user: user._id,
          });
          return newLink.save();
        })
        .then((link) => {
          res.send(link); // or notification that record written
        })
        .catch((error) => {
          console.error(error);
          res.send(error);
        });
    })

    // get all user's links
    .get((req, res) => { // Done
      const { userLogin } = req.params;
      const queryDetails = {
        login: userLogin,
      };
      models.User.find(queryDetails)
        .then((user) => {
          return models.Link.find({ "user._id": user._id });
        })
        .then((links) => {
          res.send(links);
        })
        .catch((error) => {
          console.error(error);
          res.send(error);
        });
    });

  app.route("/user/:userLogin/links/:shortUrl")
    // for edit information about link
    .put((req, res) => { // Done
      const { shortUrl } = req.params;
      const queryDetails = {
        shortUrl,
      };
      const tags = linkManager.mapTagsToNotes(req.body.tags.split(", "));
      const updateDetails = {
        description: req.body.description,
        tags,
      };

      models.Link.findOneAndUpdate(queryDetails, { $set: updateDetails })
        .then((link) => {
          res.send(link); // or notification that record updated
        })
        .catch((error) => {
          console.error(error);
          res.send(error);
        });
    })

    // remove user's link
    .delete((req, res) => { // Done
      const { shortUrl } = req.params;
      const details = {
        shortUrl,
      };
      models.Link.remove(details)
        .then((link) => {
          console.log("Success - link was deleted!");
          res.send("Link was deleted" + link);
        })
        .catch((error) => {
          console.error(error);
          res.send(error);
        });
    });
};
