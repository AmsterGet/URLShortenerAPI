const models = require("../models/index");

function checkUserRole(req, res, next) {
  const userId = req.user;
  const queryDetails = {
    _id: userId,
  };
  models.User.findOne(queryDetails)
    .then((user) => {
      if (user.role === "admin") {
        return next();
      }

      return Promise.reject(new Error("Not enough rights!"));
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
}

module.exports = checkUserRole;
