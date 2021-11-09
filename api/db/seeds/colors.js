const faker = require("faker");

const createFakeColor = () => ({
  name: faker.commerce.color(),
});
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("colors")
    .del()
    .then(function () {
      const fakeColors = [];
      const desiredColors = 3;
      // Inserts seed entries
      for (let index = 0; index < desiredColors; index++) {
        fakeColors.push(createFakeColor());
      }
      return knex("colors").insert(fakeColors);
    });
};
