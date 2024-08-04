const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const plrequest = require("../axiosInstance");
const getSummary = require("../projects/getSummary");

async function uploadFile(filePath, t) {
  const formData = new FormData();
  const f = fs.createReadStream(filePath);

  formData.append("authorization", t.Authorization);
  formData.append("policy", t.Policy);

  formData.append("file", f, { filename: "temp.jpg" });

  try {
    const response = await axios.post(
      "https://v0.api.upyun.com/qphysics",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("上传文件失败:", error);
  }
}

/**
 * 更新作品封面
 * @param {string} filename - 需要上传的图片路径（本地）
 * @param {string} c - 作品分区
 * @param {number} i - 作品ID
 * @returns {Promise<void>} - 无返回值
 */
async function cover(filename, c, i) {
  this._getSummary = getSummary.bind(this);
  const getSummaryResponse = await this._getSummary(i, c);
  const imageIdex = getSummaryResponse.Data.Image + 1;

  try {
    const confirmExperimentResponse = await plrequest.post(
      "/Contents/ConfirmExperiment",
      {
        Category: c,
        SummaryID: i,
        Image: imageIdex,
        Extension: ".png",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": "zh-CN",
          "x-API-Token": this.token,
          "x-API-AuthCode": this.authCode,
        },
      }
    );
    const summaryData = getSummaryResponse.Data;
    const submitExperimentResponse = await plrequest.post(
      "/Contents/SubmitExperiment",
      {
        Request: {
          FileSize: 0 - Math.abs(fs.statSync(filename).size),
          Extension: ".jpg",
        },
        Summary: summaryData,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": "zh-CN",
          "x-API-Token": this.token,
          "x-API-AuthCode": this.authCode,
        },
      }
    );

    await uploadFile(filename, submitExperimentResponse.data.Data.Token);
    await plrequest.post(
      "/Contents/ConfirmExperiment",
      {
        Category: c,
        SummaryID: i,
        Image: imageIdex,
        Extension: ".png",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": "zh-CN",
          "x-API-Token": this.token,
          "x-API-AuthCode": this.authCode,
        },
      }
    );

    Promise.resolve();
  } catch (error) {
    throw error;
  }
}

module.exports = cover;
