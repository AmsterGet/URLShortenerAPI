const userRoutesHandler = require("../routesHandlers/userRoutesHandler");

function checkLinksDownload(req, res, next) {
  if (req.body.originalUrl) {
    // userRoutesHandler.addNewLink(req, res, next);
  } else {
    // userRoutesHandler.addCsvLinks(req, res, next);
  }
}

module.exports = checkLinksDownload;
