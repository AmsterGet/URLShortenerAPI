const rootRoutes = require("./rootRoutes");
const userRoutes = require("./userRoutes");
const linkRoutes = require("./linkRoutes");

module.exports = function (app) {
  rootRoutes(app);
  linkRoutes(app);
  userRoutes(app);
};
