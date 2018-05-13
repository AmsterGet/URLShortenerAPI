const models = require("../models");
const { hash } = require("../common/utils");
const Json2csvParser = require("json2csv").Parser;

const userManager = {
  createUser: function createNewUser(userData) {
    const user = {
      name: userData.name,
      login: userData.login,
      mail: userData.mail,
      password: hash(userData.password),
    };
    const newUser = new models.User(user);
    return newUser.save();
  },

  checkUser: function checkUserData(userData) {
    return models.User.findOne({ login: userData.login })
      .then((user) => {
        let errorMessage = "Incorrect password!";
        if (!user) {
          errorMessage = "Infamous user!";
        } else if (user.password === hash(userData.password).toString()) {
          console.log("User's password is ok!");
          return Promise.resolve(user);
        }
        return Promise.reject(errorMessage);
      });
  },

  getUsersList: (queryDetails) => {
    let usersArray = {};

    return models.User.find(queryDetails)
      .then((users) => {
        usersArray = users;
        return Promise.all(users.map((user) => {
          return models.Link.find({ user: user._id });
        }));
      })
      .then((results) => {
        const users = usersArray.map((user, index) => {
          return {
            login: user.login,
            mail: user.mail,
            name: user.name,
            role: user.role,
            linksQuantity: results[index].length,
          };
        });
        return Promise.resolve(users);
      });
  },

  convertUsersToCsv: (users) => {
    const fields = [
      "login",
      "name",
      "mail",
      "role",
      "linksQuantity",
    ];

    const csvUsers = [];
    users.forEach((item) => {
      const currentUserData = {
        login: item.login,
        name: item.name,
        mail: item.mail,
        role: item.role,
        linksQuantity: item.linksQuantity,
      };

      csvUsers.push(currentUserData);
    });
    const json2csvParser = new Json2csvParser({ fields, delimiter: ";" });
    return json2csvParser.parse(csvUsers);
  },
};

module.exports = userManager;
