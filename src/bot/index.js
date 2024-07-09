const User = require("../api/index");

class Bot extends User {
  constructor(username, password, processFunction) {
    super(username, password);
    this.processFunction = processFunction;
    this.pending = new Set();
    this.finnish = new Set();
  }
  async init(targetID, targetType) {
    const login = await this.auth.login();
    this.botID = login.Data.User.ID;
    this.targetID = targetID;
    this.targetType = targetType;
  }
  async start(interval) {
    interval = Math.max(4000, Math.min(interval * 1000, 4000));

    const data = await this.messages.get(this.targetID, this.targetType, 1);
    this.startIndex = data.Data.Comments[0].ID;
    this.messages.comment(this.targetID, "-----服务开启----", this.targetType);

    async function get() {
      const re = await this.messages.get(this.targetID, this.targetType, 20);
      const that = this;
      for (let comment of re.Data.Comments) {
        if (comment.ID == this.startIndex) break;
        if (comment.UserID == this.botID) continue;
        if (this.pending.has(comment.ID)) continue;
        if (this.finnish.has(comment.ID)) continue;
        console.log("成功捕获到消息：", comment);
        this.pending.add(comment.ID);
        const reply = await this.processFunction(comment, this);
        this.messages
          .comment(this.targetID, reply, this.targetType)
          .then(() => {
            that.finnish.add(comment.ID);
            that.pending.delete(comment.ID);
          });
      }
    }

    setInterval(get.bind(this), interval);
  }
}
module.exports = Bot;
