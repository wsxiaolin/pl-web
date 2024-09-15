const plrequest = require("../axiosInstance");
/**
 * 获取用户信息（非当前登录用户）
 *
 * @param {Object} id - 用户序列号
 */
module.exports = async function getUser(id) {
  const response = await plrequest.post(
    "/Users/GetUser",
    {
      ID: id,
    },

    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "zh-CN",
        "x-API-Token": this.token,
        "x-API-AuthCode": this.authCode,
      },
    }
  );
  if (response.data.Status == 404) throw new Error("用户不存在");
  return response.data;
};
