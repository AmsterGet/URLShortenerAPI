const models = require("../models");
const utils = require("../utils");

const userManager = {
  createUser: function createNewUser(userData) {
    const user = {
      name: userData.name,
      login: userData.login,
      mail: userData.mail,
      password: utils.hash(userData.password),
    };
    const newUser = new models.User(user);
    return newUser.save();
  },
  getUser: function getUserData(login) {
    return models.User.findOne(login);
  },
  checkUser: function checkUserData(userData) {
    return models.User.findOne({ login: userData.login })
      .then((user) => {
        if (user.password === utils.hash(userData.password).toString()) {
          console.log("User's password is ok!");
          return Promise.resolve(user);
        }
        return Promise.reject(new Error("Incorrect password!"));
      });
  },
};

module.exports = userManager;
