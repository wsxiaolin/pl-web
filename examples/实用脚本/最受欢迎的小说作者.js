const User = require("../../src/index").User;

const list = [];
const map = new Map();

async function main() {
  const pl = new User();
  await pl.auth.login();
  for (let i = 0; i < 50; i++) {
    const re = await pl.projects.query("Discussion", {
      tags: ["小说"],
      take: 20,
      Skip: 20 * i,
      From: list[list.length - 1],
    });
    re.Data.$values.forEach((i) => {

      list.push(i.ID);
      if (map.has(i.User.ID)) {
        map.set(i.User.ID, [
          map.get(i.User.ID)[0] + i.Supports,
          i.User.Nickname,
        ]);
      } else {
        map.set(i.User.ID, [i.Supports, i.User.Nickname]);
      }
    });
  }

  const sortedEntries = Array.from(map.entries()).sort((a, b) => {
    return b[1][0] - a[1][0];
  });

  sortedEntries.forEach((entry) => {
    const key = entry[0]; // 键名
    const value1 = entry[1][0]; // 键值第一项（数字）
    const value2 = entry[1][1]; // 键值第二项（姓名）
    console.log(`<user=${key}>${value2}</user>：${value1}`);
  });
}

main();
