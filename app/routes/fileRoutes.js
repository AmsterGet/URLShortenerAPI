const fileRoutesHandler = require("../routesHandlers/fileRoutesHandler");

module.exports = (app) => {
  app.route("/file/csv/")
    .get(fileRoutesHandler.getLinks)
    .post(fileRoutesHandler.addLinks);
  app.get("/file/csv/wholeDB", () => {});
};
