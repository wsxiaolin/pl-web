const User = require("../src/index").User;

async function main() {
  const user = new User();
  await user.auth.login();
  const re = await user.auth.getUser("65a38fbca3542dcb596cd60e")
  console.log(re.Data.Statistic.ExperimentCount);
}

main();

