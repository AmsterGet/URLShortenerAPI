function authenticateUser (req, res, next) {
  console.log(req.user);
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.send({ message: "Auth, please!" });
  }
}

module.exports = authenticateUser;
