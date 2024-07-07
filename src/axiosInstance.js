const axios = require("axios");

const plrequest = axios.create({
  baseURL: "https://physics-api-cn.turtlesim.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "zh-CN",
    "x-API-Version": "2411",
  },
});

module.exports = plrequest;
