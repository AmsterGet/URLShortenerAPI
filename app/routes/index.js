const rootRoutes = require("./root_routes");
const userRoutes = require("./user_routes");
const linkRoutes = require("./link_routes");

module.exports = function (app) {
  rootRoutes(app);
  linkRoutes(app);
  userRoutes(app);
};
