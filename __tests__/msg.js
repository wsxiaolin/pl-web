const User = require("../src/index").User;

describe("User", () => {
  describe("getMessages function", () => {
    test("获取黑洞区作品评论", async () => {
      const user = new User("xiegushi2022@outlook.com","***");
      await user.auth.login();
      const re = await user.messages.get("6673ebf3d46f35b9aadcea6d");
      expect(re.Data.Comments).toBeDefined();
      expect(re.Data.Comments.length).toBeGreaterThan(0);
    });
  });

  describe("getMessages function", () => {
    test("获取用户主页留言", async () => {
      const user = new User("xiegushi2022@outlook.com","***");
      await user.auth.login();
      const re = await user.messages.get("64df27eb738530998da62927", "User", 5);
      expect(re.Data.Comments).toBeDefined();
      expect(re.Data.Comments.length).toBeGreaterThan(4);
    });
  });
});
