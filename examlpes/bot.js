const Bot = require("../src/index").Bot;
const axios = require("axios");
async function processFunction(msg, botInstance) {
  try {
    const result = await axios.get(
      "https://api.lolimi.cn/API/AI/mm.php?msg=" + encodeURIComponent(msg)
    );
    console.log("成功");
    return result.data.data.output;
  } catch (error) {
    return "沫沫不太懂呢，请再说一次";
  }
}

const myBot = new Bot("", "", processFunction);

async function main() {
  await myBot.init("6673ebf3d46f35b9aadcea6d", "Discussion");
  myBot.start(5);
}

main();
