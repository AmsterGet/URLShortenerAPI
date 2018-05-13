// const mongoose = require("mongoose");
const Json2csvParser = require("json2csv").Parser;
// const csv = require("fast-csv");
const { linkManager } = require("../managers/index");
const models = require("../models/index");

const fileRoutesHandler = {
  getLink: (req, res) => {
    const { shortUrl } = req.params;
    const queryDetails = {
      shortUrl,
    };

    models.Link.findOne(queryDetails)
      .then((link) => {
        const csvToSend = linkManager.convertLinksToCsv([link]);
        res.set("Content-Disposition", `attachment; filename=My link (${shortUrl}).csv`);
        res.set("Content-Type", "application/octet-stream");
        res.send(csvToSend);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  },

  getLinks: (req, res) => {
    const userId = req.user;
    const queryDetails = {
      _id: userId,
    };
    models.User.findOne(queryDetails)
      .then((user) => {
        return models.Link.find({ "user": user._id });
      })
      .then((links) => {
        const csvToSend = linkManager.convertLinksToCsv(links);
        res.set("Content-Disposition", "attachment; filename=My links.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csvToSend);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  },

  getTemplate: (req, res) => {
    const fields = [
      "originalUrl",
      "description",
      "tags",
    ];

    const json2csvParser = new Json2csvParser({ fields, delimiter: ";" });
    const csv = json2csvParser.parse();
    res.set("Content-Disposition", "attachment; filename=linkTemplate.csv");
    res.set("Content-Type", "application/octet-stream");
    res.send(csv);
  },
};

module.exports = fileRoutesHandler;
