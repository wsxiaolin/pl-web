const User = require("../src/index").User;

async function main() {
  const user = new User();
  await user.auth.login();
  const re = await user.projects.query("Discussion", {
    tags: ["精选"],
    take: 30,
  });
  console.log(re);
}

main();
