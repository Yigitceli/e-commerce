const User = require("./Models/User");

async function test() {
  const user = await User.query().findById(1);
  console.log(user);
}
test();
