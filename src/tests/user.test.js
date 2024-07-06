const pl = require("physics-lab-web-api");

describe("User", () => {
  describe("login function", () => {
    test("登录功能正常", async () => {
      const re = await pl.user.login();
      expect(re.Status).toBe(200);
    });
  });

  describe("getToken function", () => {
    test("可以正确获取Token", async () => {
      const token = await pl.user.getToken();
      expect(token).toBeTruthy();
    });
  });
});
