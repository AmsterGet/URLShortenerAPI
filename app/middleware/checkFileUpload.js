// const models = require("../models/index");
const userRoutesHandler = require("../routesHandlers/userRoutesHandler");

function checkFileUpload(req, res, next) {
  console.log("---------------------------------------------");
  console.log(req);
  console.log("---------------------------------------------");
  console.log(req.files);
  console.log(req.file);
  console.log(req.body);
  console.log("---------------------------------------------");
  if (req.body.originalUrl) {
    userRoutesHandler.addNewLink(req, res, next);
  } else {
    userRoutesHandler.addCsvLinks(req, res, next);
  }
}

module.exports = checkFileUpload;
