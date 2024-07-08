const User = require("physics-lab-web-api");

describe("User", () => {
  describe("login function", () => {
    test("登录功能正常", async () => {
      const user = new User()
      const re = await user.auth.login();
      expect(re.Status).toBe(200);
    });
  });
});