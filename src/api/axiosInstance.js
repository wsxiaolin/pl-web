const axios = require("axios");

let requestConfig;
const plrequest = axios.create({
  baseURL: "https://physics-api-cn.turtlesim.com",
  timeout: 10000,
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
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

plrequest.interceptors.response.use(function (response) {
  if (response.data.Status !== 200) {
    console.log("--------physics-lab-web-api----------");
    console.error(response.data);
    
    console.log("请求URL:", requestConfig.url);
    console.log("请求头:", requestConfig.headers);
    console.log("请求体:", requestConfig.data); // 打印请求体
    throw new Error("physics-lab-web-api请求未成功");
  }
  return response;
});

module.exports = plrequest;
