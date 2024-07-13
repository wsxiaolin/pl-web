const pl = require("../src/index").User;

const 参选作品 = [];
const list = new Map(); //统计列表，统计每个作品得了哪几票
const map = new Map(); //统计用户投了几票
const result = new Map();
const 错投修正 = new Map();
const 错投修正的作品ID = "66914baf9e258e6b2f503d3e";

async function main() {
  // 先搞定错投的
  const re = await pl.messages.get(错投修正的作品ID, "Discussion", "all");
  for (const comment of re.Data.Comments) {
    // ["谁错投了"，["错的作品1","错的作品2"]]
    if (错投修正.has(comment.UserID)) {
      错投修正.set(comment.UserID, [
        ...错投修正.get(comment.UserID),
        comment.Content,
      ]);
    } else {
      错投修正.set(comment.UserID, [comment.Content]);
    }
  }

  // 这里先得到每个用户投了几票
  参选作品.forEach(async (item) => {
    // item 为参选作品的id
    const re = await pl.projects.get(item);
    let supports = re.支持的数组; // ["userID1","userID2"]
    list.set(item, supports);
    supports.forEach(async (user) => {
      if (!(错投修正.has(user) && 错投修正.get(user).includes(item))) {
        // 过滤错误的投票
        if (await pl.isOldTimer(user)) {
          // 过滤不是老（准确的说是符不符合投票标准）的用户
          if (map.has(user)) {
            map.set(user, map.get(user) + 1);
          } else {
            map.set(user, 1);
          }
          return user;
        } else {
          if (!map.has(user)) map.set(user, 0); //标记为0表示没有投票资格
        }
      }
    });
  });

  list.forEach((project, supports) => {
    let 票数 = 1; //规定，每个参选者默认有一票
    supports.forEach((user) => {
      if (map.get(user) > 0) {
        票数 += 1 / map.get(user); //参选者实际得票
      }
    });
    result.set(project, 票数);
  });
}

main();
