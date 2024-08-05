const axios = require("axios");
const configManager = require("./config");

let plrequest = axios.create({
  baseURL: configManager.getConfig().baseURL,
  timeout: configManager.getConfig().timeout,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "zh-CN",
    "x-API-Version": "2411",
  },
});

plrequest.interceptors.request.use(
  function (config) {
    // Dynamically update baseURL and timeout based on current config
    config.baseURL = configManager.getConfig().baseURL;
    config.timeout = configManager.getConfig().timeout;
    return config;
  },
  function (error) {
    error.response && console.error(error.response);
    return Promise.reject(error.messages);
  }
);

plrequest.interceptors.response.use(
  function (response) {
    let config = configManager.getConfig();
    if (response.data.Status !== 200) {
      if (config.consoleError) {
        console.log("--------physics-lab-web-api----------");
        console.error("\x1b[31m%s\x1b[0m", response.data);
        console.log("请求URL:", response.config.url);
        console.log("请求头:", response.config.headers);
        console.log("请求体:", JSON.parse(response.config.data));
      }
      throw new Error("physics-lab-web-api请求未成功");
    } else {
      if (config.consolelog) {
        console.log("\x1b[32m%s\x1b[0m", response.config.url);
      }
      if (config.consoleResponse) {
        console.log(response.data.Data);
      }
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

module.exports = plrequest;