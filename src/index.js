const login = require("./user/login");
const getToken = require("./user/getToken");
const getMessages = require("./messages/get");
const query = require("./projects/query");
const test = require("./test");

module.exports = {
  user: {
    login,
    getToken,
  },
  messages: {
    get: getMessages,
  },
  projects: {
    query,
  },
  test,
};
