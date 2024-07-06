const axios = require("axios");

let auth = {
  token: null,
  authCode: null,
};

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

// 请求拦截器
plrequest.interceptors.request.use(
  async (config) => {
    if (auth.token == null) throw new Error("请先登录！");
    config.headers["x-API-Token"] = auth.token;
    config.headers["x-API-AuthCode"] = auth.authCode;

    return config;
  },
  (error) => {
    console.warn(error);
    return Promise.reject(error);
  }
);

module.exports.plrequest = plrequest;
module.exports.auth = auth;
