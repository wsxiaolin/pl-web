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

```javaScript
const PL = require("physics-lab-web-api")
PL.test()
```

**目前已经放弃维护测试，安装后可以尝试运行/node_modules/physics-lab-web-api下examples下的文件**

## 使用方法

欢迎使用 physics-lab-web-api（以下简称 plapi）在导入相关包后，可以直接调用相关方法，在[方法列表](apilist.md)内查看方法列表，您也可以参考[api 接口文档](https://github.com/wsxiaolin/apidoc.git)的内容，文档内容不保证正确，本接口内容保证已经测试通过

### pl.USer

new 的时候请传入用户名和密码，未传参数自动进行匿名登录，部分功能可能会有限制），注意**不是在Login的时候传参**

由于物实接口返回内容比较复杂，**强烈建议大家自己打印一下返回内容**

参数的话文档注释有些写的，编辑器会自动提示的，强烈建议一遍翻着文档一遍 coding

示例代码（更多请查看 examples 文件夹，会和包一起安装，放在插件目录下）：

```javascript
const User = require("physics-lab-web-api").User;

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

### pl.Bot

Bot继承自User，但是需要提供一些新的参数，标准流程如下：

```javaScript
const Bot = require("../src/index").Bot;

async function processFunction(msg, botInstance) {
  return "捕获成功";
}

const myBot = new Bot("xiegushi2022@outlook.com", "***", processFunction);

async function main() {
  await myBot.init("6673ebf3d46f35b9aadcea6d", "Discussion",{});
  myBot.start(5);
}

main();

```
##### init（带有*的仍然在开发）

- 前两个参数为回复的位置，为物实ID和类型（User,Experiment,Discussion）
- *第三个参数为信息捕获策略
- 第四个参数为机器人预制类型

直接上代码你就懂了，每个类型都有对应的介绍，对应逻辑实现都位于`node_modules/physics-lab-web-api/src/bot/`，里面可以在每个技能下方找到介绍.md：
```JavaScript
// 可选的机器人类型，只需填入name即可，例如：myBot.init("6673ebf3d46f35b9aadcea6d", "Discussion",{},"wordle");
const botTypes = [
  {
    name: "wordle",
    process: wordle,
    replyConfig: { replyRequired: false, readHistory: false },
  },
];

// 默认的信息捕获策略
const defaltReplyConfig = {
  ignoreReplyToOters: true, //忽略回复他人的信息
  readHistiory: false, //是否读取开启前未回复的历史内容
  replyRequired: true, // 是否只读取回复机器人的内容
};
```


##### start

在调用start之后，首先会发布一条信息提示bot已经开始运行，之后会每隔参数时间获取一次监听位置的信息，并自动回复内容【注意：Bot会自动过滤无需回复的信息】【后续会考虑提供一些规则参数配置，类比eslint】【若没有需要回复的消息，控制台不会有任何输出】

##### processFunction

会被传入评论对象和Bot实例，返回值会被作为**回复用户**的内容，但是**如果指定了Bottype，该函数会被覆盖，可以不传**
优先级：机器人类型自带 > 用户配置 > 默认值
