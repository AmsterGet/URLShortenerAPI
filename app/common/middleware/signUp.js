const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { userManager } = require("../../managers/index");

passport.use("signUp", new LocalStrategy({
  usernameField: "login",
  passwordField: "password",
  passReqToCallback: true,
},
(req, login, password, done) => {
  userManager.createUser(req.body)
    .then((user) => {
      console.log("Wrote in database: " + JSON.stringify(user));
      return done(null, user);
    })
    .catch((error) => {
      console.log(error);
      return done(error, false);
    });
}));