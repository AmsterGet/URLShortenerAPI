const { userManager } = require("../managers");
const models = require("../models");

const rootRoutesHandler = {
  signIn: (req, res, next) => {
    userManager.checkUser(req.body)
      .then((user) => {
        if (user) {
          req.session.user = { id: user._id, login: user.login };
          models.Link.find({ "user": user._id })
            .then((links) => {
              console.log(links);
              res.send({
                login: user.login,
                name: user.name,
                mail: user.mail,
                links: links || [],
              });
            });
        } else {
          return next(new Error());
        }
      })
      .catch((error) => {
        console.error(error);
        return next(error);
      });
  },

  signUp: (req, res) => {
    userManager.createUser(req.body)
      .then((user) => {
        console.log("Wrote in database: " + JSON.stringify(user));
        req.session.user = { id: user._id, login: user.login };
        res.send(user);
      })
      .catch((error) => {
        console.error(error);
        res.send(error);
      });
  },

  signOut: (req, res) => {
    if (req.session.user) {
      delete req.session.user;
      res.send({
        message: "Sign out was complete!",
      });
    }
  },
};

module.exports = rootRoutesHandler;

// app.get("/", (req, res) => { // request like /?shortUrl="ad1sda" - REWRITE IT for UI's needs
//   const { shortUrl } = req.query;
//   res.redirect(`${req.hostname}/${shortUrl}/info`);
// });
