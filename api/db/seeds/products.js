const faker = require("faker");
const axios = require("axios");

const createFakeProduct = async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data;
};

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("products")
    .del()
    .then(async function () {
      const data = await createFakeProduct();      
      const final = data.map((item) => {
        const { rating, ...info } = item;        
        return info;
      });

      return knex("products").insert(final);
    });
};
