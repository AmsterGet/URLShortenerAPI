const models = require("../models/index");
const csv = require("fast-csv");
const { userManager, linkManager } = require("../managers/index");

const userRoutesHandler = {
  addNewLink: (req, res) => {
    const userId = req.user;
    const newLinkData = {
      originalUrl: req.body.originalUrl,
      description: req.body.description,
      tags: req.body.tags,
      user: userId,
    };
    linkManager.createLinks([newLinkData])
      .then((links) => {
        res.send(links);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  },

  addCsvLinks: (req, res) => {
    const userId = req.user;
    const linksFile = req.files.file;
    const linksToCreate = [];

    csv
      .fromString(linksFile.data.toString(), {
        headers: true,
        ignoreEmpty: true,
      })
      .on("data", (data) => {
        const newLinkData = {
          originalUrl: data.originalUrl,
          description: data.description,
          tags: data.tags,
          user: userId,
        };
        linksToCreate.push(newLinkData);
      })
      .on("end", () => {
        linkManager.createLinks(linksToCreate)
          .then((links) => {
            res.send(links);
          })
          .catch((error) => {
            console.log(error);
            res.send(error);
          });
      });
  },

  getUserLinks: (req, res) => {
    const userId = req.user;
    const queryDetails = {
      _id: userId,
    };
    // console.log(userId);
    models.User.findOne(queryDetails)
      .then((user) => {
        // console.log(user);
        return models.Link.find({ "user": user._id });
      })
      .then((links) => {
        res.send({ links });
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  },

  editLink: (req, res) => {
    const { shortUrl } = req.body;
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
        res.send(link);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  },

  removeLink: (req, res) => {
    const { shortUrl } = req.body;
    const details = {
      shortUrl,
    };
    models.Link.remove(details)
      .then((link) => {
        console.log("Success - link was deleted!");
        res.send(link);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  },
};

module.exports = userRoutesHandler;
