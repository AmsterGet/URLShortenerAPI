function authenticateUser () {
  return function (req, res, next) {
    console.log("From auth" + req.user + "   " + req.method);
    if (req.isAuthenticated()) {
      return next();
    }
    res.send({ message: "Auth, please!" });
  };
}

module.exports = authenticateUser;
