function authenticateUser(req, res, next) {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  res.send({ message: "Auth, please!" });
}

module.exports = authenticateUser;
