const fs = require("fs").promises;
const path = require("path");

const games = new Map();
let answers = [];
let wordlist = [];
let flag = false; //是否已经加载词语列表

async function loadWords(filename) {
  const data = await fs.readFile(filename, "utf8");
  return data.split("\n").map((line) => line.trim());
}

async function init() {
  wordlist = await loadWords(path.join(__dirname, "data", "wordlist.txt"));
  answers = await loadWords(path.join(__dirname, "data", "wordle.txt"));
  flag = true;
}

async function startNewGame(userid) {
  if (!games.has(userid)) {
    const gameData = {
      history: [],
      answer: await pickWord(),
      attempts: 0,
      status: "开始",
    };
    games.set(userid, gameData);
  }
  return games.get(userid);
}

async function pickWord() {
  while (true) {
    let word = answers[Math.floor(Math.random() * answers.length)];
    if (word.length == 5) return word;
  }
}

function colorResult(guess, answer) {
  let answerArr = answer.split("");
  return guess.split("").map((l, i) => {
    if (l == answerArr[i]) return `<color=#3BA250>${l}</color>`;
    if (answerArr.includes(l)) return `<color=#DD8500>${l}</color>`;
    return `<color=#ccc>${l}</color>`;
  });
}

async function playGame(userid, guess) {
  if (guess.length != 5) return "单词长度必须为5";
  flag || (await init());
  let coloredResult;

  let game = await startNewGame(userid);

  if (guess) {
    if (!wordlist.includes(guess)) return "单词未收录";
    coloredResult = colorResult(guess, game.answer).join("");
    game.history.push({ guess, result: coloredResult });
    game.attempts++;

    if (guess === game.answer) {
      game.status = "成功";
    } else if (game.history.length >= 6) {
      game.status = "失败";
    }
  }

  const returnObj = {
    userid,
    status: game.status,
    history: game.history,
    answer: game.answer,
    text:
      "\n" +
      game.history
        .map((json) => {
          return json.result;
        })
        .join("\n"),
  };


  const deepCopyReturnObj = JSON.parse(JSON.stringify(returnObj));

  if (game.status !== "开始") {
    games.delete(userid);
  }

  return deepCopyReturnObj;
}

async function processFunction(msg, botInstance) {
  try {
    const result = await playGame(msg.UserID, msg.Content);
    if (typeof result == "string") return result;
    if (result.status == "成功") return `回答正确，答案为${result.answer}`;
    if (result.status == "失败")
      return `次数用光啦，答案为${result.answer}，已经自动开启下一回合游戏~`;
    return result.text;
  } catch (error) {
    return error;
  }
}

module.exports = processFunction;
