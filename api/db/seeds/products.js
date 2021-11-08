const faker = require("faker");

const createFakeProduct = () => ({
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),  
  price: faker.commerce.price(),
  image: faker.image.imageUrl(),
});

exports.seed = function (knex) {
  // Deletes ALL existing entries
  const fakeProducts = [];
  const desiredFakes = 30;

  for (let index = 0; index < desiredFakes; index++) {
    fakeProducts.push(createFakeProduct());
  }
  return knex("products").insert(fakeProducts);
};
