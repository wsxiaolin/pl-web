const login = require("./login");

/**
 * 登录到turtlesim账户
 * @param {string} username - 用户名（邮箱），匿名登录请留空
 * @param {string} password - 密码，匿名登录请留空
 */
module.exports = async function getToken(username, password) {
  const re = await login(username, password);
  return re.Token || "";
};
