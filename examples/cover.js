const User = require("../src/index").User;
const user = new User();
async function main() {
  await user.auth.login();
  await user.projects
    .cover(
      "/home/pl-web/__tests__/download.png",
      "Discussion",
      "66a51878744ed757b46f1cba"
    )
    .then(() => {
      console.log("成功");
      
    }).catch((e)=>{console.log(e);});
}

main();
