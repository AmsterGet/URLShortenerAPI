const middleware = require("../middleware");
const userRoutesHandler = require("../routesHandlers/userRoutesHandler");

module.exports = (app) => {
  app.route("/user/links")
    .get(userRoutesHandler.getUserLinks)
    .post(middleware.checkFileUpload) // , userRoutesHandler.addNewLink
    .put(userRoutesHandler.editLink)
    .delete(userRoutesHandler.removeLink);
  app.route("/user/admin/users")
    .get(userRoutesHandler.getUsers)
    .post(userRoutesHandler.addNewUser)
    .delete(userRoutesHandler.removeUser);
};
