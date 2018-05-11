const fileRoutesHandler = require("../routesHandlers/fileRoutesHandler");

module.exports = (app) => {
  app.route("/file/csv/")
    .get(fileRoutesHandler.getLinks);
  app.get("/file/template", fileRoutesHandler.getTemplate);
  app.get("/file/csv/wholeDB", () => {});
};
