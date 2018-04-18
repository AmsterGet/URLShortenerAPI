const passport = require("passport");

module.exports = {
  signIn: passport.authenticate("signIn"),
  signUp: passport.authenticate("signUp")
};
