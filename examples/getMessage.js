const User = require("../src/index").User;

async function main() {
  const user = new User();
  await user.auth.login();
  const commnets = await user.messages.getComments("603e3cff47304d6fc25e7f5f","User");
  const msg = await user.messages.getMessage(commnets.Data.Comments[5].ID);
  console.log(msg);
}

main();
