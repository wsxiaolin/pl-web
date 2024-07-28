// 咳咳，只是为了证明咕咕紫的安全策略不咋滴

const User = require("../../src/index").User;

async function main() {
  const user = new User(null, null);
  await user.auth.login();
  //   console.log(user);
  const re = await user.projects.star(
    "66a473d59e258e6b2f529e29",
    "Discussion",
    true
  );
  console.log(re.Status);
  main()
}

for (let i = 0; i < 10; i++) {
    main()
    
}