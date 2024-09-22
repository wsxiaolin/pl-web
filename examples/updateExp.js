const User = require("../src/index").User;

async function main() {
  const user = new User(process.env.ADMIN, process.env.PASSWORD);
  await user.auth.login();
//   const save = await user.projects.getExperiment(
//     "66a7940d744ed757b46f7f1d",
//     "Discussion"
//   );
  let summary = await user.projects.getSummary(
    "66a7940d744ed757b46f7f1d",
    "Discussion"
  );
  summary.Data.Description.push("[故事]这个实验通过调用物实网络api更新")
  const re = await user.projects.update(summary.Data);
  console.log(re);
}

main();
