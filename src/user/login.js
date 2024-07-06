const axios = require("axios");
const { auth } = require("../axiosInstance");

/**
 * 登录到turtlesim账户
 * @param {string} username - 用户名（邮箱），匿名登录请留空
 * @param {string} password - 密码，匿名登录请留空
 * @return {string} token
 */
module.exports = async function login(username = null, password = null) {
  const response = await axios.post(
    "http://physics-api-cn.turtlesim.com/Users/Authenticate",
    {
      Login: username,
      Password: password,
      Version: 2411,
      Device: {
        ID: null,
        Identifier: "7db01528cf13e2199e141c402d79190e",
        Platform: "Android",
        Model: "HONOR ROD-W09",
        System: "Android OS 12 / API-31 (HONORROD-W09/7.0.0.186C00)",
        CPU: "ARM64 FP ASIMD AES",
        GPU: "Mali-G610 MC6",
        SystemMemory: 7691,
        GraphicMemory: 2048,
        ScreenWidth: 2560,
        ScreenHeight: 1600,
        ScreenDPI: 360,
        ScreenSize: 8.4,
        Timezone: "Local",
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
    auth.token = response.data.Token;
    auth.authCode = response.data.AuthCode;
    return response.data;
  } else {
    if (response.status != 200) console.error("服务器连接失败");
    if (response.data.Status != 200) console.error(response.data);
    throw new Error("登录失败");
  }
};
