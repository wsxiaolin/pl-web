const plrequest = require("../axiosInstance");

/**
 * 登录接口，注意：用户名和密码应当在初始化的时候传入，而不是在这里
 */

module.exports = async function login() {
  const response = await plrequest.post(
    "/Users/Authenticate",
    {
      Login: this.username,
      Password: this.password,
      Version: 2411,
      Device: {
        Identifier: Math.floor(Math.random() * Math.pow(2, 160)).toString(16).padStart(40, '0'),
        Language: "Chinese",
      },
      Statistic: null,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "zh-CN",
      },
    }
  );
  if (response.data.Status === 200) {
    this.token = response.data.Token;
    this.authCode = response.data.AuthCode;
    return response.data;
  } else {
    if (response.status != 200) console.error("服务器连接失败");
    if (response.data.Status != 200) console.error(response.data);
    throw new Error("登录失败");
  }
};
