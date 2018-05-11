const passport = require("passport");
const checkFileUpload = require("./checkFileUpload");

module.exports = {
  signIn: passport.authenticate("signIn"),
  signUp: passport.authenticate("signUp"),
  checkFileUpload,
};
