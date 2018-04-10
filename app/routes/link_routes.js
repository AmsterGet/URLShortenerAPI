const linkRoutesHandler = require("../common/linkRoutesHandler");

module.exports = function (app) { // Done
  app.get("/:shortUrl", linkRoutesHandler.shortLinkRedirect);
  app.get("/:shortUrl/info", linkRoutesHandler.getLinkInfo);
  app.get("/:shortUrl/info/:tagName", linkRoutesHandler.findLinksByTagName);
};
