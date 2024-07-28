const plrequest = require("../../api/axiosInstance");

/**
 * 获取留言/评论信息，部分作品需要非匿名登录（传入用户名和密码）
 *
 * @param {*} ID - 获取的相关type的序列号，例如667c0e11d46f35b9aaddb8dd
 * @param {string} [type="Discussion"] - 所获取的对象的类型。Discussion、Experiment、User
 * @param {number} [take=20] - 获取的留言/评论数量
 * @param {*} [from=null] - 从某个commentID开始跳过skip条
 * @param {number} [skip=0] - 跳过的数量
 */

module.exports = async function getMessages(
  ID,
  type = "Discussion",
  take = 20,
  from = null,
  skip = 0
) {
  if (take > 100) throw new Error("消息获取数量一次最多为100条");
  take = -take;
  try {
    const response = await plrequest.post(
      "/Messages/GetComments",
      {
        TargetID: ID,
        TargetType: type,
        CommentID: from,
        Take: take,
        Skip: skip,
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
