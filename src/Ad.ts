/**
 * DSP广告JSSDK
 */

import { convertReport } from "./Report";

export class Ad {
  isDevelop: Boolean;
  noIframe: Boolean;

  constructor() {}

  // 初始化参数
  initConfig(options): void {
    this.isDevelop = options.isDevelop || false;
    this.noIframe = options.noIframe || false;
    if (this.noIframe && window.top != window.self) {
      window.top.location.href = window.self.location.href;
    }
  }

  // 数据上报
  report(options): void {
    let { actionId, phone } = options;
    if (!actionId) {
      // console.error('【LaunchJZAd ERROR】\t 转化ID[actionId] 是必须的');
      throw "invalid actionId";
    }
    if (!phone) {
      // console.error('【LaunchJZAd ERROR】\t 手机账号[phone] 是必须的');
      throw "invalid phone";
    }
    convertReport(this.isDevelop, actionId, phone);
  }
}
