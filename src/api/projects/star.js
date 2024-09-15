const plrequest = require("../axiosInstance");
/**
 * 收藏作品
 *
 * @param {Object} id - 作品序列号
 * @param {Object} type - Discussion 或 Experiment
 * @param {boolean} status - true为收藏，false为取消
 */
module.exports = async function star(id, type, status) {
  const response = await plrequest.post(
    "/Contents/StarContent",
    {
      ContentID: id,
      Status: status,
      Category: type,
      type: 0,
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
  return response.data;
};
