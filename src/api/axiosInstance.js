const axios = require("axios");
const configManager = require("./config");
const util = require("util");

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

plrequest.interceptors.request.use(function (config) {
  const { baseURL, timeout } = configManager.getConfig();
  config.baseURL = baseURL;
  config.timeout = timeout;
  return config;
});

plrequest.interceptors.response.use(function (response) {
  let config = configManager.getConfig();
  if (response.data.Status !== 200) {
    if (config.consoleError) {
      const detail = {
        header: response.config.headers.toJSON
          ? response.config.headers.toJSON()
          : response.config.headers,
        url: configManager.getConfig().baseURL + response.config.url,
        body: JSON.parse(response.config.data),
      };
      console.log("\x1b[36m%s\x1b[0m", "--------physics-lab-web-api----------");
      console.log(util.inspect(detail, { colors: true, depth: null }));
      console.log("\x1b[31m%s\x1b[0m", response.data);
      console.log("\x1b[36m%s\x1b[0m", "--------physics-lab-web-api----------");
    }
    return response;
  } else {
    if (config.consolelog) {
      console.log("\x1b[32m%s\x1b[0m", response.config.url);
    }
    if (config.consoleResponse) {
      console.log(response.data.Data);
    }
    return response;
  }
});

module.exports = plrequest;
