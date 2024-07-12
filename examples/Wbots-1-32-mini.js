const Locale = require("../src/bot/chat/locale");
const path = require("path");
const Bot = require("../src/index").Bot;
const axios = require("axios");

const dataFilePath = path.join(__dirname, "Wbots-1-32-mini.json");
const prompts = new Locale(dataFilePath);

async function _post(q, p, t) {
  try {
    const re = await axios.post(
      "https://aichat-wbots-1-32-mini.api.ecylt.top/",
      {
        q: `${q}\n`,

        prompt: `${p}\n`,
      },
      {
        maxRedirects: 5, // 跟随重定向
        timeout: 17000,
      }
    );
    return re.data.response.response;
  } catch (error) {
    if (t >= 20) {
      return error.message;
      console.error(error.message);
    } else {
      t++;
      console.log(t);
      return await _post(q, p, t);
    }
  }
}

async function processFunction(msg) {
  const value = msg.Content.substring(msg.Content.indexOf("/set") + 5);
  let userprompt;

  if (prompts.data.has(msg.UserID)) {
    userprompt = prompts.data.get(msg.UserID);
  } else {
    userprompt = "你是一个机器人助手";
  }

  if (msg.Content.includes("/set")) {
    let match = value;
    userprompt = match;
    prompts.addOrUpdate(msg.UserID, userprompt);
    return `成功设置系统提示词：${userprompt}`;
  }

  const re = await _post(
    msg.Content.substring(msg.Content.indexOf("</user>") + 8),
    userprompt,
    0
  );

  return re;
}
const myBot = new Bot("", "", processFunction);
async function main() {
  await myBot.init("668d3bdb9e258e6b2f4fbaa4", "Discussion", {
    replyRequired: false,
    readHistory:false
  });
  myBot.start(5);
}
try {
  main();
} catch (error) {}
