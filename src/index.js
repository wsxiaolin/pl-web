const login = require("./auth/login");
const getMessages = require("./messages/get");
const query = require("./projects/query");
const test = require("./test");

class User {
  constructor(username, password) {
    this.username = username || process?.env?.username || null;
    this.password = password || process?.env?.password || null;

    this.messages = {
      get: getMessages.bind(this),
    };
    (this.auth = {
      login: login.bind(this),
    }),
      (this.projects = {
        query: query.bind(this),
      });
  }
  test() {
    test.bind(this);
  }
}

module.exports = User;
