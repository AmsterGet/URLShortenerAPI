const linkRoutesHandler = require("../routesHandlers/linkRoutesHandler");

module.exports = (app) => {
  app.get("/:shortUrl", linkRoutesHandler.shortLinkRedirect);
  app.get("/:shortUrl/info", linkRoutesHandler.getLinkInfo);
  app.get("/:shortUrl/info/:tagName", linkRoutesHandler.findLinksByTagName);
};
