const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const linkRoutes = require("./linkRoutes");
const fileRoutes = require("./fileRoutes");

module.exports = (app) => {
  authRoutes(app);
  linkRoutes(app);
  userRoutes(app);
  fileRoutes(app);
};
