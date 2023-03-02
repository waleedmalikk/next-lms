"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
require("dotenv").config();
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
    for (let index = 0; index < 10; index++) {
      let dummyUser = {
        id: uuidv4(),
        username: `johndoe_${index}`,
        email: `example_${index}@example.com`,
        password: await bcrypt.hash(
          "password",
          parseInt(process.env.SALT_ROUNDS)
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(dummyUser);
    }
    return queryInterface.bulkInsert("Users", users);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
