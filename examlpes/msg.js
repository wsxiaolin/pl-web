const pl = require("../src/index");

async function main() {
  await pl.user.login();
  const re = await pl.messages.get('6673ebf3d46f35b9aadcea6d')
  re.Data.Comments.forEach((comment) => {
    if (comment.UserID == "6382f6fcfee23205358026d6") return;
    console.log(comment.Nickname, ": ", comment.Content);
  });
  console.log(re);
}
main();
