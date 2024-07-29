const User = require("../src/index").User;

const user = new User();

async function main() {
  await user.auth.login();

  await user.projects
    .cover(
      "/home/pl-web/__tests__/download.png",
      "Discussion",
      "665ac86a464f6f1f605b1eb8"
    )
    .then(() => {
      console.log("成功");
    });
}

main();
