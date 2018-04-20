const { User } = require("../models");
const { hash } = require("../common/utils");

const userManager = {
  createUser: function createNewUser(userData) {
    const user = {
      name: userData.name,
      login: userData.login,
      mail: userData.mail,
      password: hash(userData.password),
    };
    const newUser = new User(user);
    return newUser.save();
  },
  checkUser: function checkUserData(userData) {
    return User.findOne({ login: userData.login })
      .then((user) => {
        let errorMessage = "Incorrect password!";
        if (!user) {
          errorMessage = "Infamous user!";
        } else if (user.password === hash(userData.password).toString()) {
          console.log("User's password is ok!");
          return Promise.resolve(user);
        }
        return Promise.reject(new Error(errorMessage));
      });
  },
};

module.exports = userManager;
