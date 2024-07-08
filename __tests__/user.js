const User = require("../src/index").User;

describe("User", () => {
  describe("login function", () => {
    test("登录功能正常", async () => {
      const user = new User()
      const re = await user.auth.login();
      expect(re.Status).toBe(200);
    });
  });
});
