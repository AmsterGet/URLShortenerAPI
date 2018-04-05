const models = require("../models");
const utils = require("../utils");

module.exports.UserManager = {
  createUser: function createNewUser(userData) {
    const user = {
      name: userData.name,
      login: userData.login,
      email: userData.email,
      password: utils.hash(userData.password),
    };
    return new models.User(user).save();
  },
  getUser: function getUserData(login) {
    return models.User.findOne(login);
  },
  checkUser: function checkUserData(userData) {
    return models.User.findOne({ login: userData.login })
      .then((user) => {
        if (user.password === utils.hash(userData.password).toString()) {
          console.log("User's password is ok!");
          Promise.resolve(user);
        }
        Promise.reject(new Error("Incorrect password!"));
      });
  },
};
