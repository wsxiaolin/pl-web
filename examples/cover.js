const User = require("../src/index").User;
const user = new User(process.env.XIAOLIN, process.env.PASSWORD);
async function main() {
  await user.auth.login();
  await user.projects
    .cover(
      "/sdcard/Pictures/Screenshots/Screenshot_20240801_001111_com.hihonor.photos.jpg",
      "Discussion",
      "66a907e2744ed757b46fa824"
    )
    .then(() => {
      console.log("成功");
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      process.exit(0);
    });
}

main();
