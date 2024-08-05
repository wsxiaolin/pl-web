const Pl = require("../src/index");

Pl.setConfig({
  timeout: 5000,
  consolelog: false,
  consoleResponse: false,
  consoleError: false,
  checkHttpsAgent: false,
});

console.log(Pl.getConfig());

async function main() {
  const user = new Pl.User();
  await user.auth.login();
  await user.projects.query("Discussion", {
    Tags: ["精选"],
    Take: 30,
  });
}

main();
