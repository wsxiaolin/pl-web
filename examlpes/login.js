const pl = require("../src/index");

async function main() {
  const re = await pl.user.login();
  // const token = await pl.user.getToken()
  console.log(re);
}
main();
