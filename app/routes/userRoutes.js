const userRoutesHandler = require("../common/routesHandlers/userRoutesHandler");
// const authenticateUser = require("../common/middleware/authenticateUser");

module.exports = (app) => {
  app.route("/user/:userLogin/links/")
    .get(userRoutesHandler.getUserLinks)
    .post(userRoutesHandler.addNewLink)
    .put(userRoutesHandler.editLink)
    .delete(userRoutesHandler.removeLink);
};
