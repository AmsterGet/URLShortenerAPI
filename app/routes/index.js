const userRoutes = require("./user_routes");
const linkRoutes = require("./link_routes");

module.exports = function (app) {
  userRoutes(app);
  linkRoutes(app);
};
