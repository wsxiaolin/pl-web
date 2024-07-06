const { plrequest } = require("../axiosInstance");

/**
 * 按照要求筛选实验区作品列表，需要登录
 *
 * @param {Object} query - 查询参数对象
 * @param {Object} query - Discussion 或 Experiment
 * @param {Array} [query.tags=[]] - 选择的标签，数组之间为与关系，留空全选
 * @param {Array} [query.excludeTags=null] - 排除的标签
 * @param {number} [query.take=18] - 获取的数量
 * @param {String} [query.from=null] - 开始跳过的起始位置的作品ID
 * @param {number} [query.skip=0] - 跳过的数量
 * @return {*}
 */
module.exports = async function queryExperiments(type,query) {
  try {
    const response = await plrequest.post("/Contents/QueryExperiments", {
      Query: {
        Category: type,
        Languages: [],
        ExcludeLanguages: null,
        Tags: [],
        ModelTags: null,
        ExcludeTags: null,
        ModelID: null,
        ParentID: null,
        UserID: null,
        Special: null,
        From: null,
        Skip: 0,
        Take: 8,
        Days: 0,
        Sort: 0,
        ShowAnnouncement: false,
        ...query, //覆盖默认值,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw "获取信息出错";
  }
};
