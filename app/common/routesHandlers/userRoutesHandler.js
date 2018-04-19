const models = require("../../models/index");
const utils = require("../utils/index");
const { userManager, linkManager } = require("../../managers/index");

const userRoutesHandler = {
  addNewLink: (req, res) => {
    const { userLogin } = req.params;
    const { originalUrl } = req.body;
    const shortUrl = utils.generateShortUrl();
    const queryDetails = {
      login: userLogin,
    };
    const tags = linkManager.mapTagsToNotes(req.body.tags.split(", "));
    models.User.findOne(queryDetails)
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
        res.send(link);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  },

  getUserLinks: (req, res) => {
    const { userLogin } = req.params;
    const queryDetails = {
      login: userLogin,
    };
    models.User.findOne(queryDetails)
      .then((user) => {
        console.log("-------------------------------------------------------------");
        console.log(user);
        return models.Link.find({ "user": user._id });
      })
      .then((links) => {
        console.log(links);
        res.send({ links });
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  },

  editLink: (req, res) => {
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
        console.log(error);
        res.send(error);
      });
  },

  removeLink: (req, res) => {
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
        console.log(error);
        res.send(error);
      });
  },
};

module.exports = userRoutesHandler;
