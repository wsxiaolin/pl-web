const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

console.log(path.join(__dirname, "__tests__"));

function test() {
  const plTestsDir = "./pl-tests";
  const physicsTestsDir = path.join(__dirname, "tests");

  fs.access(plTestsDir, fs.constants.F_OK, (err) => {
    if (err) {
      console.log("正在创建测试文件夹...");
      exec(
        `cp -r ${physicsTestsDir} ${plTestsDir}`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`Error copying tests: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`Error message from cp command: ${stderr}`);
            return;
          }
          console.log(`Tests copied successfully to ${plTestsDir}`);
          console.log("键入命令 npx jest pl-tests 以开启测试 ");
        }
      );
    } else {
      console.log("键入命令 npx jest pl-tests 以开启测试 ");
    }
  });
}

module.exports = test;
