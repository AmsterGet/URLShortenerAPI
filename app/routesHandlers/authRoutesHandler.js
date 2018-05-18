const authRoutesHandler = {
  signIn: (req, res, next) => {
    console.log(req.error);
    const { user } = req;
    if (user) {
      res.send({
        login: user.login,
        name: user.name,
        mail: user.mail,
        role: user.role,
      });
    } else {
      console.log(req.error);
      res.send(req.error);
      return next(req.error);
    }
  },

  signUp: (req, res) => {
    if (req.user) {
      res.send(req.user);
    } else if (req.error()) {
      res.send({ error: req.error().message });
    }
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
