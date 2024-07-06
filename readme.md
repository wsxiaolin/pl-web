# 物理实验室网络API接口

这是[物理实验室APP](https://turtlesim.com/products/physics-lab/index-cn.html)的一些常用网络接口的封装，可用于自建脚本机器人、搜集作品数据等公开的个人信息

## 安装

使用 npm 进行安装：

```bash
npm install physics-lab-web-api
```

## 运行测试

使用jest完成测试内容，注意，请务必提前配置好**环境变量**username和password对应物实账号。

创建文件执行以下代码创建测试目录，接着暗查提示运行几个

```
const pl = require("physics-lab-web-api");
pl.test()
```

## 使用方法

欢迎使用physics-lab-web-api（以下简称plapi）在导入相关包后，可以直接调用相关方法，在[方法列表](apilist.md)内查看方法列表，您也可以参考[api接口文档](https://github.com/wsxiaolin/apidoc.git)的内容，文档内容不保证正确，本接口内容保证已经测试通过

请注意，在使用任何方法之前，**请先登录（调用login）方法**，之后，plapi会自动存储在执行上下文中token（逻辑位于[axios拦截器](src/axiosInstance.js)，未传参数自动进行匿名登录，部分功能可能会有限制）

由于物实接口返回内容比较复杂，**强烈建议大家自己打印一下返回内容**

参数的话文档注释有些写的，编辑器会自动提示的，强烈建议一遍翻着文档一遍coding

示例代码（更多请查看examples文件夹，会和包一起安装，放在插件目录下）：

```javascript
const pl = require("../src/index");

async function main() {
  await pl.user.login();
  const re = await pl.messages.get('6673ebf3d46f35b9aadcea6d')
  re.Data.Comments.forEach((comment) => {
    if (comment.UserID == "6382f6fcfee23205358026d6") return;
    console.log(comment.Nickname, ": ", comment.Content);
  });
  console.log(re);
}
main();

```