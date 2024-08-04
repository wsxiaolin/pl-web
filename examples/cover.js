const User = require("../src/index").User;
const user = new User(process.env.XIAOLIN, process.env.PASSWORD);
async function main() {
  await user.auth.login();
  await user.projects
    .cover(
      "/sdcard/Pictures/Screenshots/Screenshot_20240731_205237_com.miHoYo.hkrpg.jpg",
      "Discussion",
      "66aa607c123cc96d5ffbb5c7"
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
