const middleware = require("../middleware");
const authRoutesHandler = require("../routesHandlers/authRoutesHandler");

module.exports = (app) => {
  app.post("/signIn", middleware.signIn, authRoutesHandler.signIn);
  app.post("/signUp", middleware.signUp, authRoutesHandler.signUp);
  app.post("/signOut", authRoutesHandler.signOut);
};
