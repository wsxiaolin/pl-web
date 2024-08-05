const User = require("./api/index");
const Bot = require("./bot/index.js");
const { setConfig, getConfig } = require("./api/config.js");

module.exports = {
  User,
  Bot,
  setConfig: function(newConfig) {
    setConfig(newConfig);
  },
  getConfig: function() {
    return getConfig();
  }
};