const Bot = require("../src/index").Bot;
const myBot = new Bot("", "");
async function main() {
  await myBot.init("6665c697d46f35b9aadb8a63", "Discussion",{},'wordle');
  myBot.start(5);
}
try {
  main();
} catch (error) {}
