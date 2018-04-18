const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const linkRoutes = require("./linkRoutes");

module.exports = (app) => {
  authRoutes(app);
  linkRoutes(app);
  userRoutes(app);
};
