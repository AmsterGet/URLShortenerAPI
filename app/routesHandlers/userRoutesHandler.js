const models = require("../models/index");
const csv = require("fast-csv");
// const Json2csvParser = require("json2csv").Parser;
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
    console.log(newLinkData);
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
    const linksFile = req.body;
    const linksToCreate = [];
    console.log(linksFile);

    csv
      .fromString(linksFile.toString(), {
        headers: true,
        ignoreEmpty: true,
        delimiter: ";",
      })
      .on("data", (data) => {
        console.log(data);
        const newLinkData = {
          originalUrl: data.originalUrl,
          description: data.description,
          tags: data.tags,
          user: userId,
        };
        linksToCreate.push(newLinkData);
      })
      .on("end", () => {
        console.log(linksToCreate);
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
        return models.Link.find({ user: user._id });
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
    const queryDetails = {
      shortUrl,
    };
    models.Link.remove(queryDetails)
      .then((status) => {
        console.log("Success - link was deleted!");
        res.send(status);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  },

  getUsers: (req, res) => {
    const queryDetails = {
      role: "user",
    };

    userManager.getUsersList(queryDetails)
      .then((users) => {
        res.send({ users });
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  },

  removeUser: (req, res) => {
    const { login } = req.body;
    const queryDetails = {
      login,
    };
    let userToDelete = {};
    models.User.findOne(queryDetails)
      .then((user) => {
        userToDelete = user;
        return models.Link.remove({ user: user._id });
      })
      .then(() => {
        return models.User.remove({ _id: userToDelete._id });
      })
      .then((status) => {
        console.log(`Success - ${userToDelete.login} and his links was deleted!`);
        res.send(status);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  },
};

module.exports = userRoutesHandler;
