const User = require("./Models/User");

async function test() {
  const user = await (await User.query().findById(1)).fullName();
  console.log(user);
}
test();
