const login = require("./auth/login");
const getMessages = require("./messages/get");
const sendMessages = require("./messages/send");
const query = require("./projects/query");
const test = require("./test");
const getSummary = require("./projects/getSummary");
const getDerivatives = require("./projects/getDerivatives");

class User {
  constructor(username, password) {
    this.username = username || process?.env?.USERNAME || null;
    this.password = password || process?.env?.PASSWORD || null;

    this.messages = {
      get: getMessages.bind(this),
      comment: sendMessages.bind(this),
    };
    (this.auth = {
      login: login.bind(this),
    }),
      (this.projects = {
        query: query.bind(this),
        getSummary: getSummary.bind(this),
        getDerivatives: getDerivatives.bind(this),
      });
  }
  test() {
    test();
  }
}

module.exports = User;
