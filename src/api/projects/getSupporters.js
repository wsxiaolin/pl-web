const plrequest = require("../axiosInstance");
/**
 * 获取作品的介绍等信息，物实遇到缓存过的作品会读取本接口
 *
 * @param {String} id - 查询的作品序列号
 * @param {String} type - Discussion 或 Experiment
 * @param {Number} take - 获取的数量
 * @param {Number} skip - 跳过的数量，比如第一次Skip 0, Take 50之后看看是不是有五十条，如果是就Skip 50, Take 50
 */
module.exports = async function getSupportersy(id, type, take = 50, skip = 0) {
  try {
    const response = await plrequest.post(
      "/Contents/GetSupporters",
      {
        ContentID: id,
        Category: type,
        Skip: skip,
        Take: take,
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
