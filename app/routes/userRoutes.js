const userRoutesHandler = require("../routesHandlers/userRoutesHandler");

module.exports = (app) => {
  app.route("/user/links/")
    .get(userRoutesHandler.getUserLinks)
    .post(userRoutesHandler.addNewLink)
    .put(userRoutesHandler.editLink)
    .delete(userRoutesHandler.removeLink);
};
