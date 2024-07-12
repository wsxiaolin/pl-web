const User = require("../api/index");
const wordle = require("./game/wordle/index");

const botTypes = [
  {
    name: "wordle",
    process: wordle,
    replyConfig: { replyRequired: false, readHistory: false },
  },
];

const defaltReplyConfig = {
  ignoreReplyToOters: true,
  readHistory: true,
  replyRequired: true,
};

class Bot extends User {
  constructor(username, password, processFunction) {
    super(username, password);
    this.processFunction = processFunction;
    this.pending = new Set();
    this.finnish = new Set();
  }
  async init(
    targetID,
    targetType,
    replyConfig = {},
    botType = null,
    skills = {}
  ) {
    const login = await this.auth.login();
    this.botID = login.Data.User.ID;
    this.targetID = targetID;
    this.targetType = targetType;
    this.replyConfig = { ...defaltReplyConfig, ...replyConfig };
    if (botType) {
      botTypes.forEach((obj) => {
        if (obj.name == botType) {
          this.processFunction = obj.process;
          this.replyConfig = {
            ...this.replyConfig,
            ...obj.replyConfig,
            ...replyConfig,
          };
        }
      });
    }
  }
  async start(interval) {
    interval = Math.max(4000, Math.min(interval * 1000, 4000));

    const data = await this.messages.get(this.targetID, this.targetType, 20);
    if (this.replyConfig.readHistiry == true) {
      let index = "";
      const msglist = data.Data.Comments.reverse();
      for (let comment of msglist) {
        if (comment.UserID == this.botID) {
          index = comment.ID;
          console.log(this.replyConfig);
        }
      }
      this.startIndex = index;
    } else {
      this.startIndex =
        data.Data.Comments.length >= 1 ? data.Data.Comments[0].ID : "";
    }
    await this.messages.comment(
      this.targetID,
      "-----服务开启----",
      this.targetType
    );

    async function get() {
      const re = await this.messages.get(this.targetID, this.targetType, 20);
      const that = this;
      for (let comment of re.Data.Comments) {
        // 过滤消息
        if (comment.ID == this.startIndex) break;
        if (comment.UserID == this.botID) continue;
        if (this.pending.has(comment.ID)) continue;
        if (this.finnish.has(comment.ID)) continue;
        if (
          comment.Content.includes("回复<") &&
          this.replyConfig.ignoreReplyToOters == true &&
          comment.Content.includes(this.botID) == false
        )
          continue;
        if (
          comment.Content.includes(this.botID) == false &&
          this.replyConfig.replyRequired
        )
          continue;
        console.log("成功捕获到消息，来自", comment.Nickname);

        this.pending.add(comment.ID);
        const reply = await this.processFunction(comment, this);
        if (reply == "") continue;
        const msg = `回复@${comment.Nickname}: ${reply}`;
        this.messages
          .comment(this.targetID, msg, this.targetType, comment.UserID)
          .then(() => {
            console.log("回复成功");
            that.finnish.add(comment.ID);
            that.pending.delete(comment.ID);
          });
      }
    }

    setInterval(get.bind(this), interval);
  }
}
module.exports = Bot;
