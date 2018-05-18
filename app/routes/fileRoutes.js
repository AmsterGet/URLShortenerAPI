const fileRoutesHandler = require("../routesHandlers/fileRoutesHandler");

module.exports = (app) => {
  app.get("/file/template", fileRoutesHandler.getTemplate);
  app.get("/file/csv/links", fileRoutesHandler.getLinks);
  app.get("/file/csv/links/:shortUrl", fileRoutesHandler.getLink);
  app.get("/file/csv/users", fileRoutesHandler.getUsers);
  app.get("/file/csv/users/:login", fileRoutesHandler.getUser);
};
