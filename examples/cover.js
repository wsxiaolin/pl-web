const User = require("../src/index").User;
const user = new User(process.env.XIAOLIN, process.env.PASSWORD);
async function main() {
  await user.auth.login();
  await user.projects
    .cover(
      "/sdcard/Pictures/Screenshots/Screenshot_20240807_101242_com.huawei.browser.jpg",
      "Discussion",
      "66b2d93a197f935d74b46c6e"
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
