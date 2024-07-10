const Bot = require("../src/index").Bot;
const myBot = new Bot("", "");
async function main() {
  await myBot.init("668d3bdb9e258e6b2f4fbaa4", "Discussion",{},'wordle');
  myBot.start(5);
}
try {
  main();
} catch (error) {}
