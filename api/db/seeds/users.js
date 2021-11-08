const faker = require("faker");

const createFakeUser = () => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
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
