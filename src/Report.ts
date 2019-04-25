import request from "./util/request";

/**
 * @param {*广告转化步骤ID} actionId
 * @param {*手机账号} phone
 */
export function convertReport(option) {
  let params = {
    devicePhoneNumber: option.phone
  };
  if (option.actionId) {
    params["actionId"] = option.actionId;
  }
  if (option.uuid) {
    params["uuid"] = option.uuid;
  }
  console.log('adshare-jssdk>>> 开始执行数据上报...', params);
  return request({
    isDevelop: option.isDevelop,
    async: option.async,
    url: `v1/adshare/convert`,
    method: "post",
    params: params,
    success: () => {}
  });
}
