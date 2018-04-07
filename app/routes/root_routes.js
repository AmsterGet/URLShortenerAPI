const { userManager } = require("../managers");

module.exports = function (app) {
  app.get("/", (req, res) => { // request like /?shortUrl="ad1sda" - REWRITE IT for UI's needs
    const { shortUrl } = req.query;
    res.redirect(`${req.hostname}/${shortUrl}/info`);
  });
  // authorize user
  app.post("/signIn", (req, res, next) => { // Done
    userManager.checkUser(req.body)
      .then((user) => {
        if (user) {
          req.session.user = { id: user._id, login: user.login };
          res.redirect(`${req.hostname}/user/${user.login}/links`);
          // res.send(user);
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
  app.post("/signUp", (req, res) => { // Done
    userManager.createUser(req.body)
      .then((user) => {
        console.log("Wrote in database: " + JSON.stringify(user));
        req.session.user = { id: user._id, login: user.login };
        // res.redirect(`${req.hostname}/user/${user.login}/links`);
        res.send(req.session);
      })
      .catch((error) => {
        console.error(error);
        res.send(error);
      });
  });

  app.post("/signOut", (req, res) => { // Done
    if (req.session.user) {
      delete req.session.user;
      res.redirect(`${req.hostname}/`);
    }
  });
};
