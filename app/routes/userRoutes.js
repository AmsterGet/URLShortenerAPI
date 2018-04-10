const userRoutesHandler = require("../common/routesHandlers/userRoutesHandler");

module.exports = function (app) {
  app.route("/user/:userLogin/links/")
    .post(userRoutesHandler.addNewLink)
    .get(userRoutesHandler.getUserLinks);
  app.route("/user/:userLogin/links/:shortUrl")
    .put(userRoutesHandler.editLink)
    .delete(userRoutesHandler.removeLink);
};
