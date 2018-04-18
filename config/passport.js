const passport = require("passport");
const models = require("../app/models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    models.User.findById(id, (error, user) => {
      done(error, user);
    });
  });
};
