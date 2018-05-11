const mongoose = require("mongoose");
const csv = require("fast-csv");
const Json2csvParser = require("json2csv").Parser;

const fileRoutesHandler = {
  getLinks: (req, res) => {

  },

  getTemplate: (req, res) => {
    const fields = [
      "originalUrl",
      "description",
      "tags",
    ];

    const json2csvParser = new Json2csvParser({ fields });
    const csv = json2csvParser.parse();
    res.set("Content-Disposition", "attachment; filename=linkTemplate.csv");
    res.set("Content-Type", "application/octet-stream");
    res.send(csv);
  },
};

module.exports = fileRoutesHandler;
