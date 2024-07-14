const plrequest = require("../axiosInstance");
/**
 * 获取作品的介绍等信息，需要登录
 *
 * @param {Object} id - 查询的作品序列号
 * @param {Object} type - Discussion 或 Experiment
 */
module.exports = async function getDerivatives(id, type) {
  try {
    const response = await plrequest.post(
      "/Contents/GetDerivatives",
      {
        ContentID: id,
        Category: type,
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
  } catch (error) {
    console.error(error);
    throw "获取信息出错";
  }
};
