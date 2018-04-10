const models = require("../../models/index");
const utils = require("../utils/index");
const { userManager, linkManager } = require("../../managers/index");

const userRoutesHandler = {
  addNewLink: (req, res) => {
    console.log(req.body);
    const { userLogin } = req.params;
    const { originalUrl } = req.body;
    const shortUrl = utils.generateShortUrl();
    const queryDetails = {
      login: userLogin,
    };
    const tags = linkManager.mapTagsToNotes(req.body.tags.split(", "));
    userManager.getUser(queryDetails)
      .then((user) => {
        console.log(user);
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
  },

  getUserLinks: (req, res) => {
    const { userLogin } = req.params;
    const queryDetails = {
      login: userLogin,
    };
    userManager.getUser(queryDetails)
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
  },

  editLink: (req, res) => { // Done
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
  },

  removeLink: (req, res) => { // Done
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
  },

  authenticateUser: (req, res, next) => { // TODO: fix it
    // const { userLogin } = req.params;
    // if (req.session.user.login !== userLogin) {
    //   res.send("SignIn, please!");
    // }
    next();
  },
};

module.exports = userRoutesHandler;
