const Product = require("./Models/Product");
const User = require("./Models/User");

async function test() {
  const test = await Product.relatedQuery("colors").for(5);
  console.log(test);
}
test();
