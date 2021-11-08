const axios = require("axios");

const createFakeProduct = async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  console.log(data);
};

createFakeProduct();
