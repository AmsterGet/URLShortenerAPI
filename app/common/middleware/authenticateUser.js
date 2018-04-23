function authenticateUser (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send({ message: "Auth, please!" });
}

module.exports = authenticateUser;
