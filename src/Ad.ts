/**
 * DSP广告JSSDK
 */
function getQueryString(name, loc) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
  var r = loc.search.substr(1).match(reg);
  var h = loc.hash.substr(3).match(reg);
  var q = loc.pathname.substr(1).match(reg_rewrite);
  if (r != null) {
    return unescape(r[2]);
  } else if (h != null) {
    return unescape(h[2]);
  } else if (q != null) {
    return unescape(q[2]);
  } else {
    return null;
  }
}

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
      let self_origin = window.self.location.origin;
      let self_pathname = window.self.location.pathname;
      let self_search = window.self.location.search;
      let self_hash = window.self.location.hash;
      let uuid = getQueryString("uuid", window.top.location);
      if (uuid) {
        if (self_search.indexOf("?") === -1) {
          self_search += "?uuid=" + uuid;
        } else {
          self_search += "&uuid=" + uuid;
        }
      }
      window.top.location.href = `${self_origin}${self_pathname}${self_search}${self_hash}`;
    }
  }

  // 数据上报
  report(options): void {
    let { uuid, actionId, phone } = options;
    if (!uuid) {
      // console.error('【LaunchJZAd ERROR】\t 分发用户标识ID[uuid] 是必须的');
      throw "invalid uuid!";
    }
    if (!phone) {
      // console.error('【LaunchJZAd ERROR】\t 手机账号[phone] 是必须的');
      throw "invalid phone!";
    }
    convertReport({
      isDevelop: this.isDevelop,
      uuid,
      actionId,
      phone
    });
    // convertReport(this.isDevelop, actionId, phone);
  }
}
