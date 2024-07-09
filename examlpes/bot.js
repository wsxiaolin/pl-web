const Bot = require("../src/index").Bot;

async function processFunction(msg, botInstance) {
  return "捕获成功";
}

const myBot = new Bot("xiegushi2022@outlook.com", "***", processFunction);

async function main() {
  await myBot.init("6673ebf3d46f35b9aadcea6d", "Discussion");
  myBot.start(5);
}

main();
