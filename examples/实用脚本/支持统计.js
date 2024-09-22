const User = require("../../src/index").User;

const 参选作品 = [];
const map = new Map();

async function main() {
  const pl = new User();
  await pl.auth.login();
  for (let i = 0; i < 50; i++) {
    const re = await pl.projects.query("Discussion", {
      tags: ["小说"],
      take: 20,
      Skip: 20 * i,
      From: 参选作品[参选作品.length - 1],
    });
    re.Data.$values.forEach((i) => {
      console.log("成功添加到队列", i.ID);
      参选作品.push(i.ID);
    });
  }

  const promises = 参选作品.map(async (item) => {
    console.log("获取信息：", item);
    const re = await pl.projects.getDerivatives(item, "Discussion");
    const supports = re.Data.Supporters || [];
    await Promise.all(
      supports.map(async (user) => {
        console.log(user.Nickname, "支持数+1");
        if (map.has(user.ID)) {
          map.set(user.ID, map.get(user.ID) + 1);
        } else {
          map.set(user.ID, 1);
        }
      })
    );
  });

  // 等待所有票检完成
  await Promise.all(promises);
  let sortedEntries = Array.from(map.entries());
  sortedEntries.sort((a, b) => b[1] - a[1]);
  let sortedMap = new Map(sortedEntries);

  // 排序
  console.log(sortedMap);
}

main();
