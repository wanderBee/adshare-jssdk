import request from './util/request';

/**
 * @param {*广告转化步骤ID} actionId
 * @param {*手机账号} phone
 */
export function convertReport(isDevelop, actionId, phone) {
  return request({
    isDevelop,
    url: `v1/adshare/convert`,
    method: 'post',
    params: {
      actionId,
      devicePhoneNumber: phone,
    },
    success: () => {},
  });
}
