const login = require("./auth/login");
const getComments = require("./messages/getComment");
const sendMessages = require("./messages/send");
const query = require("./projects/query");
const getSummary = require("./projects/getSummary");
const getDerivatives = require("./projects/getDerivatives");
const getUser = require("./auth/getUser");
const star = require("./projects/star");
const emoticons = require("./messages/emoticons/index");
const cover = require("./projects/conver");
const getExperiment = require("./projects/getExperiments");
const getMessage = require("../api/messages/getMeaasge");
const getSupporters = require("./projects/getSupporters");

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
      getComments: getComments.bind(this),
      comment: sendMessages.bind(this),
      getMessage: getMessage.bind(this),
      emoticons,
    };
    this.auth = {
      login: login.bind(this),
      getUser: getUser.bind(this),
    };
    this.projects = {
      query: query.bind(this),
      getSummary: getSummary.bind(this),
      getDerivatives: getDerivatives.bind(this),
      star: star.bind(this),
      cover: cover.bind(this),
      getExperiment: getExperiment.bind(this),
      getSupporters: getSupporters.bind(this),
    };
  }
}

module.exports = User;
