# Physics Lab Network API Interface

This is a wrapper for some commonly used network interfaces of the [Physics Lab App](https://turtlesim.com/products/physics-lab), which can be used to build script bots, collect work data, and other publicly available personal information.

## Installation

Install using npm:

```bash
npm install physics-lab-web-api
```

## Reference Examples

After installation, you can try running the files in the `examples` folder located under `/node_modules/physics-lab-web-api`. These include several preset scripts and usage examples.

## Usage

Welcome to using `physics-lab-web-api` (hereafter referred to as `plapi`). After importing the relevant packages, you can directly call the provided methods. Please refer to the [Method List](./apilist.md) for a list of available methods.

### `pl.User`

When creating a new instance, please pass in the username and password. Passing `null` will automatically log in anonymously. If no parameters are passed, it will read the local environment variables `USERNAME` and `PASSWORD`; if these do not exist, it will log in anonymously. Some features may be restricted while logged in anonymously. Note that **parameters are not passed during login**.

The response content from the Physics Lab API is complex, so we **strongly recommend printing out the returned content**.

The documentation comments provide details about the parameters; your editor should automatically prompt you with this information. We strongly suggest reading through the documentation while coding.

Sample code (more examples can be found in the `examples` folder, which is installed along with the package):

```javascript
const User = require("physics-lab-web-api").User;

async function main() {
  const user = new User();
  await user.auth.login();
  const result = await user.messages.get("64df27eb738530998da62927", "User", 5);
  result.Data.Comments.forEach((comment) => {
    if (comment.UserID === "6382f6fcfee23205358026d6") return;
    console.log(comment.Nickname, ": ", comment.Content);
  });
}
main();
```

### `pl.Bot`

`Bot` inherits from `User` but requires additional parameters. The standard workflow is as follows:

```javascript
const Bot = require("../src/index").Bot;

async function processFunction(message, botInstance) {
  return "Capture successful";
}

const myBot = new Bot("xiegushi2022@outlook.com", "***", processFunction);

async function main() {
  await myBot.init("6673ebf3d46f35b9aadcea6d", "Discussion", {}, {});
  myBot.start(5);
}

main();
```

#### `init`

- The first two parameters specify the location to reply, which are the Physics Lab ID (object serial number) and type (User, Experiment, Discussion).
- The third parameter specifies the message capture strategy.
- The fourth parameter specifies the pre-defined bot type.

Here is a code snippet that explains each type, with corresponding implementations located in `node_modules/physics-lab-web-api/src/bot/`. You can find an introduction for each skill in the `introduction.md` files below them:

```javascript
// Optional bot types, just fill in the name, e.g.: myBot.init("6673ebf3d46f35b9aadcea6d", "Discussion", {}, "wordle");
const botTypes = [
  {
    name: "wordle", // Word guessing game
    process: wordle,
    replyConfig: { replyRequired: false, readHistory: false },
  },
  {
    name: "Wbotsmini", // Bot that supports setting prompt words to some extent
    process: Wbotsmini,
    replyConfig: { replyRequired: false, readHistory: true },
  },
];

// Default message capture strategy
const defaultReplyConfig = {
  ignoreReplyToOthers: true, // Ignore replies to others
  readHistory: false, // Whether to read unreplied historical content before startup
  replyRequired: true, // Whether to only read messages that are replies to the bot
};
```

#### `start`

After calling `start`, the bot will first post a message indicating that it has started running. It will then periodically fetch information from the monitored location at the specified interval and automatically reply to messages. **Note**: The bot filters out messages that do not require a reply. In the future, we plan to provide rule configuration options similar to ESLint. If there are no messages to reply to, the console will not display any output.

#### `processFunction`

This function is passed the comment object and the bot instance. Its return value is used as the **reply to the user**. However, **if a bot type is specified, this function will be overridden and can be omitted**.
Priority: Built-in bot type > User configuration > Default values