const rootRoutesHandler = require("../common/routesHandlers/rootRoutesHandler");

module.exports = function (app) {
  app.post("/signIn", rootRoutesHandler.signIn);
  app.post("/signUp", rootRoutesHandler.signUp);
  app.post("/signOut", rootRoutesHandler.signOut);
};
