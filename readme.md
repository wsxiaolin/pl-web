# 物理实验室网络 API 接口

这是[物理实验室 APP](https://turtlesim.com/products/physics-lab/index-cn.html)的一些常用网络接口的封装，可用于自建脚本机器人、搜集作品数据等公开的个人信息

## 安装

使用 npm 进行安装：

```bash
npm install physics-lab-web-api
```

## 运行测试

使用 jest 完成测试内容，请先配置环境变量：username,password，**或者执行下面代码后在生成的目录中手动在neew的时候传参）**

创建文件执行以下代码创建测试目录，接着按照提示运行 jest

```
const PL = require("physics-lab-web-api")
PL.test()
```

## 使用方法

欢迎使用 physics-lab-web-api（以下简称 plapi）在导入相关包后，可以直接调用相关方法，在[方法列表](apilist.md)内查看方法列表，您也可以参考[api 接口文档](https://github.com/wsxiaolin/apidoc.git)的内容，文档内容不保证正确，本接口内容保证已经测试通过

new 的时候请传入用户名和密码，未传参数自动进行匿名登录，部分功能可能会有限制）

由于物实接口返回内容比较复杂，**强烈建议大家自己打印一下返回内容**

参数的话文档注释有些写的，编辑器会自动提示的，强烈建议一遍翻着文档一遍 coding

示例代码（更多请查看 examples 文件夹，会和包一起安装，放在插件目录下）：

```javascript
const User = require("physics-lab-web-api");

async function main() {
  const user = new User();
  await user.auth.login();
  const re = await user.messages.get("64df27eb738530998da62927", "User", 5);
  re.Data.Comments.forEach((comment) => {
    if (comment.UserID == "6382f6fcfee23205358026d6") return;
    console.log(comment.Nickname, ": ", comment.Content);
  });
}
main();
```
