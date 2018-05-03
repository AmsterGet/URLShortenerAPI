function authenticateUser (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.send({ message: "Auth, please!" });
  }
}

module.exports = authenticateUser;
