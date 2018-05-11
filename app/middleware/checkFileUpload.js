// const models = require("../models/index");
const userRoutesHandler = require("../routesHandlers/userRoutesHandler");

function checkFileUpload(req, res, next) {
  if (req.files) {
    userRoutesHandler.addCsvLinks(req, res, next);
  } else {
    userRoutesHandler.addNewLink(req, res, next);
  }
}

module.exports = checkFileUpload;
