const faker = require("faker");
const bcrypt = require("bcrypt");

const createFakeUser = () => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  checked: true,
  password: bcrypt.hashSync("123456", 10),
});

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      const fakeUsers = [];
      const desiredFakes = 20;

      for (let index = 0; index < desiredFakes; index++) {
        fakeUsers.push(createFakeUser());
      }

      return knex("users").insert(fakeUsers);
    });
};
