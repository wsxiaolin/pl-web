const User = require("../../src/index").User;

// 这是一个示例代码，本意是用于编辑大选作品投票
// 由于紫兰斋安全原因，最多只能获取到十个支持，故作废
// 既然已经完成可用了，不妨放出来展示一下库的综合用法


const 参选作品 = ["6673ebf3d46f35b9aadcea6d"];
const list = new Map(); //统计列表，统计每个作品得了哪几票
const map = new Map(); //统计用户投了几票
const result = new Map();
const 错投修正 = new Map();
const 错投修正的作品ID = "66914baf9e258e6b2f503d3e";


// 是否符合投票要求
async function isOldTimer(id, pl) {
  const re = await pl.auth.getUser(id);
  return (
    re.Data.Statistic.ExperimentCount >= 10 &&
    (Date.now() / 1000 - parseInt(id.substring(0, 8), 16)) /
      (30 * 24 * 60 * 60) >
      3
  );
}

async function main() {
  const pl = new User();
  await pl.auth.login();

  // 先搞定错投的
  const re = await pl.messages.get(错投修正的作品ID, "Discussion");
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
  const promises = 参选作品.map(async (item) => {
    console.log("正在为参选作品验票", item);
    const re = await pl.projects.getDerivatives(item, "Discussion");
    const supports = re.Data.Supporters;
    list.set(item, supports);
    await Promise.all(
      supports.map(async (user) => {
        if (!(错投修正.has(user.ID) && 错投修正.get(user.ID).includes(item))) {
          if (await isOldTimer(user.ID, pl)) {
            console.log("\x1b[32m%s\x1b[0m", "有效票", user.Nickname);
            if (map.has(user.ID)) {
              map.set(user.ID, map.get(user.ID) + 1);
            } else {
              map.set(user.ID, 1);
            }
          } else {
            if (!map.has(user.ID)) map.set(user.ID, 0);
            console.log("\x1b[31m%s\x1b[0m", "无效票", user.Nickname);
          }
        }
      })
    );
  });

  // 等待所有票检完成
  await Promise.all(promises);
  console.log("----各用户投票状况(用于加权)----",map);

  console.log("所有作品均已完成验票");

  list.forEach((supports, project) => {
    let 票数 = 1; //规定，每个参选者默认有一票
    supports.forEach((user) => {
      if (map.get(user.ID) > 0) {
        票数 += 1 / map.get(user.ID); //参选者实际得票
      }
    });
    result.set(project, 票数);
  });

  console.log(result);
}

main();
