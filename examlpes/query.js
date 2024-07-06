const pl = require("../src/index");

async function main() {
  await pl.user.login();
  const re = await pl.projects.query("Discussion",{
    tags: ["精选"],
    take: 1,
  });
  console.log(re.Data.$values);
}

main();
