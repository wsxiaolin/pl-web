const login = require("./auth/login");
const getMessages = require("./messages/get");
const sendMessages = require("./messages/send");
const query = require("./projects/query");
const test = require("./test");
const getSummary = require("./projects/getSummary");
const getDerivatives = require("./projects/getDerivatives");
const getUser = require("./auth/getUser");
const star = require("./projects/star");
const emoticons = require("./messages/emoticons/index");

class User {
  constructor(username, password) {
    if (username === null) {
      this.username = null;
      this.password = null;
    } else {
      this.username = username || process?.env?.USERNAME || null;
      this.password = password || process?.env?.PASSWORD || null;
    }

    this.messages = {
      get: getMessages.bind(this),
      comment: sendMessages.bind(this),
      emoticons,
    };
    (this.auth = {
      login: login.bind(this),
      getUser: getUser.bind(this),
    }),
      (this.projects = {
        query: query.bind(this),
        getSummary: getSummary.bind(this),
        getDerivatives: getDerivatives.bind(this),
        star: star.bind(this),
      });
  }
  test() {
    test();
  }
}

module.exports = User;
