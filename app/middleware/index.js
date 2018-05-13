const passport = require("passport");
const checkFileUpload = require("./checkFileUpload");
const checkUserRole = require("./checkUserRole");

module.exports = {
  signIn: passport.authenticate("signIn"),
  signUp: passport.authenticate("signUp"),
  checkFileUpload,
  checkUserRole,
};
