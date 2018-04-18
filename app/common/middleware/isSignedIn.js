function isSignedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send({ message: "Auth, please!" });
}

module.exports = isSignedIn;
