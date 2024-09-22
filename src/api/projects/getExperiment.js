const getSummary = require("./getSummary");
const plrequest = require("../axiosInstance");
/**
 * 获取实验存档
 *
 * @param {Object} id - 作品序列号
 * @param {Object} type - Discussion 或 Experiment
 */
module.exports = async function getExperiment(id, type) {
  this._getSummary = getSummary.bind(this);
  const Summary = await this._getSummary(id, type);
  const ContentID = Summary.Data.ContentID;
  const response = await plrequest.post(
    "/Contents/GetExperiment",
    {
      ContentID,
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
