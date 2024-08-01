const User = require("../src/index").User;

async function main() {
  const user = new User();
  await user.auth.login();
  const re = await user.projects.getExperiment("668d3bdb9e258e6b2f4fbaa4","Discussion")
  console.log(re);
}

main();
