const pl = require("../src/index");

describe("User", () => {
  describe("getMessages function", () => {
    test("获取黑洞区作品评论", async () => {
      await pl.user.login();
      const re = await pl.messages.get("6673ebf3d46f35b9aadcea6d");
      expect(re.Data.Comments).toBeDefined();
      expect(re.Data.Comments.length).toBeGreaterThan(0);
    });
  });

  describe("getMessages function", () => {
    test("获取用户主页留言", async () => {
      const username = process.env.PLUSERNAME;
      const password = process.env.PLPASSWORD;
      await pl.user.login(username, password);
      const re = await pl.messages.get("64df27eb738530998da62927", "User", 5);
      expect(re.Data.Comments).toBeDefined();
      expect(re.Data.Comments.length).toBeGreaterThan(4);
    });
  });
});
