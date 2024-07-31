const plrequest = require("../axiosInstance");

/**
 * 登录接口，注意：用户名和密码应当在初始化的时候传入，而不是在这里
 */

module.exports = async function login() {
  const response = await plrequest.post(
    "http://physics-api-cn.turtlesim.com/Users/Authenticate",
    {
      Login: this.username,
      Password: this.password,
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
    this.token = response.data.Token;
    this.authCode = response.data.AuthCode;
    return response.data;
  } else {
    if (response.status != 200) console.error("服务器连接失败");
    if (response.data.Status != 200) console.error(response.data);
    throw new Error("登录失败");
  }
};
