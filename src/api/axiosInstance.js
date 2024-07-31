const axios = require("axios");
const config = require("./config")

let requestConfig;

const plrequest = axios.create({
  httpsAgent: new (require("https").Agent)({
    rejectUnauthorized: config.checkHttpsAgent,
  }),
  baseURL: config.baseURL,
  timeout: config.timeout,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "zh-CN",
    "x-API-Version": "2411",
  },
});

plrequest.interceptors.request.use(
  function (config) {
    requestConfig = config;
    return config;
  },
  function (error) {
    error.response && console.error(error.response);
    return Promise.reject(error.messages);
  }
);

plrequest.interceptors.response.use(function (response) {
  if (response.data.Status !== 200) {
    if (config.consoleError) {
      console.log("--------physics-lab-web-api----------");
      console.error("\x1b[31m%s\x1b[0m", response.data);
      console.log("请求URL:", requestConfig.url);
      console.log("请求头:", requestConfig.headers);
      console.log("请求体:", requestConfig.data);
    }
    throw new Error("physics-lab-web-api请求未成功");
  } else {
    (config.consolelog || config.consoleResponse) &&
      console.log("\x1b[32m%s\x1b[0m", requestConfig.url);

    config.consoleResponse && console.log(response.data.Data);
  }
  return response;
});

module.exports = plrequest;
