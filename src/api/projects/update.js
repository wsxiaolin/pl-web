const plrequest = require("../axiosInstance");
/**
 * 更新作品
 *
 * @param {Object} s - 更新后的summary，可使用getSummary获取
 * @param {Object} w - workSpace
 */
module.exports = async function update(s, w) {
  const response = await plrequest.post(
    "/Contents/SubmitExperiment",
    {
      Summary: s,
      Workspace: w,
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
