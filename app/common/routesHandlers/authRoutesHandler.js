const models = require("../../models/index");

const authRoutesHandler = {
  signIn: (req, res, next) => {
    console.log(req.cookie + res);
    const { user } = req;
    if (user) {
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
  },

  signUp: (req, res) => {
    if (req.user) {
      res.send(req.user);
    }
    res.send(req.error);
  },

  signOut: (req, res) => {
    req.logOut();
    req.session.destroy();
    res.send({
      message: "Sign out was complete!",
    });
  },
};

module.exports = authRoutesHandler;
