const User = require("physics-lab-web-api");

describe("User", () => {
  describe("getMessages function", () => {
    test("获取黑洞区作品列表", async () => {
      const user = new User();
      await user.auth.login();
      const re = await user.projects.query("Discussion", {
        tags: ["精选"],
        take: 1,
      });
      expect(re.Data.$values).toBeDefined();
      expect(re.Data.$values.length).toBeGreaterThan(0);
    });
  });
});
