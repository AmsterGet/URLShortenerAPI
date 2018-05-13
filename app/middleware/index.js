const passport = require("passport");
const checkFileUpload = require("./checkFileUpload");
const checkLinksDownload = require("./checkLinksDownload");

module.exports = {
  signIn: passport.authenticate("signIn"),
  signUp: passport.authenticate("signUp"),
  checkFileUpload,
  checkLinksDownload,
};
