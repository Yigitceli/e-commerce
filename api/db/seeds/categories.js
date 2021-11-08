const faker = require("faker");

const createFakeCategory = () => ({
  name: faker.commerce.department(),
});

exports.seed = function (knex) {
  // Deletes ALL existing entries
  const fakeCategories = [];
  const desiredCategories = 10;
  // Inserts seed entries
  for (let index = 0; index < desiredCategories; index++) {
    fakeCategories.push(createFakeCategory());
  }
  return knex("categories").insert(fakeCategories);
};
