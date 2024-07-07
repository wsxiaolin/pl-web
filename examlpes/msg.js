const User = require("../src/index");

async function main() {
  const user = new User()
  await user.auth.login();
  const re = await user.messages.get("64df27eb738530998da62927", "User", 5);
  re.Data.Comments.forEach((comment) => {
    if (comment.UserID == "6382f6fcfee23205358026d6") return;
    console.log(comment.Nickname, ": ", comment.Content);
  });
}
main();
