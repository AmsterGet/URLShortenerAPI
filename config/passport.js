const passport = require("passport");
const models = require("../app/models");
const LocalStrategy = require("passport-local").Strategy;
const { userManager } = require("../app/managers/index");

module.exports = () => {
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

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    models.User.findById(id, (error, user) => {
      done(error, user);
    });
  });
};
