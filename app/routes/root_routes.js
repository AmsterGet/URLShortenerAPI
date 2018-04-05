const { userManager } = require("../managers");
// fix sessions creation here
module.exports = function (app) {
  app.get("/", (req, res) => { // request like /?shortUrl="ad1sda"
    const { shortUrl } = req.query;
    res.redirect(`/${shortUrl}/info`);
  });
  // for authorization
  app.post("/singIn", (req, res, next) => {
    userManager.checkUser(req.body)
      .then((user) => {
        if (user) {
          req.session.user = { id: user._id, login: user.login };
          res.redirect(`/${req.session.user.login}/links`);
        } else {
          return next(new Error());
        }
      })
      .catch((error) => {
        console.error(error);
        return next(error);
      });
  });
  // register new user, create session and redirect to `/&{userLogin}/links`
  app.post("/signUp", (req, res, next) => {
    userManager.createUser(req.body)
      .then((user) => {
        console.log("Wrote in database: " + JSON.stringify(user));
        req.session.user = { id: user._id, login: user.login };
        // res.redirect(`/${user.login}/links`);
        res.send(user);
      })
      .catch((error) => {
        console.error(error);
        res.send(error);
      });
  });

  app.post("/signOut", (req, res, next) => {
    if (req.session.user) {
      delete req.session.user;
      res.redirect("/");
    }
  });
};
