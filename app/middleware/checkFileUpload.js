// const models = require("../models/index");
const userRoutesHandler = require("../routesHandlers/userRoutesHandler");

function checkFileUpload(req, res, next) {
  console.log(req.body);
  if (req.body.originalUrl) {
    userRoutesHandler.addNewLink(req, res, next);
  } else {
    userRoutesHandler.addCsvLinks(req, res, next);
  }
}

module.exports = checkFileUpload;
