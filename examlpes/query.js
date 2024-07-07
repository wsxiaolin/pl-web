const User = require("../src/index");

async function main() {
  const user = new User("xiegushi2022@outlook.com","***")
  await user.auth.login();
  console.log(user);
  const re = await user.projects.query("Discussion",{
    tags: ["精选"],
    take: 1,
  });
  console.log(re);
}
main();

