const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { userManager } = require("../../managers/index");

passport.use("signIn", new LocalStrategy({
  usernameField: "login",
  passwordField: "password",
},
(login, password, done) => {
  userManager.checkUser({ login, password })
    .then((user) => {
      return done(null, user);
    })
    .catch((error) => {
      console.log(error);
      return done(error, false);
    });
}));
