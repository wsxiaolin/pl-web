const plrequest = require("../../src/axiosInstance.js");

module.exports = async function getMessages(
  TargetID,
  Content,
  TargetType = "Discussion"
) {
  try {
    const response = await plrequest.post(
      "/Messages/PostComment",
      {
        TargetID,
        TargetType,
        Language: "Chinese",
        ReplyID: "",
        Content,
        Special: null,
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
    throw "发送消息出错";
  }
};
