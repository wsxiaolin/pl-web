const fs = require("fs");
const path = require("path");

class Locale {
  constructor(filePath) {
    this.data = new Map();
    this.filePath = filePath;
    this.loadFromDisk();
    setInterval(() => this.saveToDisk(), 10000);
  }

  loadFromDisk() {
    try {
      const data = fs.readFileSync(this.filePath, "utf8");
      const jsonData = JSON.parse(data);
      for (const { userId, prompt } of jsonData) {
        this.data.set(userId, prompt);
      }
    } catch (error) {
      console.error("Error loading data from disk:", error);
    }
  }

  saveToDisk() {
    try {
      const data = Array.from(this.data.entries()).map(([userId, prompt]) => ({
        userId,
        prompt,
      }));
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), "utf8");
    } catch (error) {
      console.error("Error saving data to disk:", error);
    }
  }

  addOrUpdate(userId, prompt) {
    this.data.set(userId, prompt);
  }
}

module.exports = Locale;
// // 使用示例
// const dataFilePath = path.join(__dirname, 'Wbots-1-32-mini.json');
// const persistentMap = new Locale(dataFilePath);

// // 添加或更新数据
// persistentMap.addOrUpdate('user1', 'Hello, world!');

// console.log(persistentMap.data);
