let config = {
  baseURL: "https://physics-api-cn.turtlesim.com",
  timeout: 8000,
  consolelog: true,
  consoleResponse: false,
  consoleError: true,
  checkHttpsAgent: false,
};

function setConfig(newConfig) {
  config = { ...config, ...newConfig };
}

function getConfig() {
  return config;
}

module.exports = {
  setConfig,
  getConfig,
};
