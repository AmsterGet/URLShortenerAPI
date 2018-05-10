const linkRoutesHandler = require("../routesHandlers/linkRoutesHandler");

module.exports = (app) => {
  app.get("/:shortUrl", linkRoutesHandler.shortLinkRedirect);
  app.get("/link/:shortUrl/info", linkRoutesHandler.getLinkInfo);
  app.get("/link/:shortUrl/info/:tagName", linkRoutesHandler.findLinksByTagName);
};
