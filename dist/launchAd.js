(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.LaunchAd = factory());
}(this, (function () { 'use strict';

var config = {
    development: {
        api_domain: 'http://adbc8.cnlaunch.com/dsp-api'
    },
    production: {
        api_domain: 'http://jiuzhang.cnlaunch.com/dsp-api'
    }
};

function request(options) {
    if (typeof options == "string") {
        var url_1 = options;
        options = {};
        options.url = url_1;
        if (typeof arguments[1] === "object") {
            options.params = arguments[1];
            if (typeof arguments[2] === "function") {
                options.success = arguments[2];
                if (typeof arguments[3] === "boolean") {
                    options.async = arguments[3];
                }
            }
        }
        else if (typeof arguments[1] === "function") {
            options.success = arguments[1];
        }
    }
    var method = options.method || "get";
    var url = options.url;
    var params = options.params || {};
    var optsData = options.data || {};
    var type = options.type || "formdata";
    var success = options.success || function () { };
    var async = typeof options.async === "undefined" ? true : options.async;
    var xhr = CreateXMLHttpRequest();
    xhr.onreadystatechange = callback;
    var data = null;
    if (params) {
        url += encodeURI(toQueryString(params));
    }
    if (method.toLowerCase() == "get") {
    }
    else {
        data = optsData;
        if (data != null) {
            if (type == "formdata") {
                data = new FormData();
                for (var key in optsData) {
                    data.append(key, optsData[key]);
                }
            }
            else if (type == "json") {
                data = JSON.stringify(optsData);
            }
            else if (type == "text") {
                for (var key in optsData) {
                    data += "&" + key + "=" + optsData[key];
                }
            }
            else if (type == "www") {
                for (var key in optsData) {
                    data += "&" + key + "=" + optsData[key];
                }
            }
        }
    }
    var env = "production";
    if (options.isDevelop) {
        env = "development";
    }
    var api_domain = config[env]["api_domain"];
    if (!/\/$/.test(api_domain)) {
        api_domain += "/";
    }
    url = api_domain.replace(/\/$/, "") + (/^\//.test(url) ? url : "/" + url);
    xhr.open(method, url, async);
    xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
    xhr.send(data);
    function callback() {
        if (xhr.readyState == 4) {
            if (type == "json") {
                try {
                    success.call(null, JSON.parse(xhr.responseText));
                }
                catch (e) {
                    console.error(">>> \u8BF7\u6C42 " + url + " \u5931\u8D25\uFF1A", e);
                    success.call(null, {
                        code: "0002",
                        msg: "解析json失败"
                    });
                }
            }
            else {
                success.call(null, xhr.responseText);
            }
        }
    }
    function toQueryString(json) {
        var data = "?";
        for (var key in json) {
            if (data.length > 1) {
                data += "&";
            }
            data += key + "=" + json[key];
        }
        return data;
    }
    function CreateXMLHttpRequest() {
        var httpobj = null;
        try {
            httpobj = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                httpobj = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e1) {
                httpobj = new XMLHttpRequest();
            }
        }
        return httpobj;
    }
}

/**
 * @param {*广告转化步骤ID} actionId
 * @param {*手机账号} phone
 */
function convertReport(option) {
    var params = {
        devicePhoneNumber: option.phone
    };
    if (option.actionId) {
        params["actionId"] = option.actionId;
    }
    if (option.uuid) {
        params["uuid"] = option.uuid;
    }
    return request({
        isDevelop: option.isDevelop,
        url: "v1/adshare/convert",
        method: "post",
        params: params,
        success: function () { }
    });
}

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
    }
    else if (h != null) {
        return unescape(h[2]);
    }
    else if (q != null) {
        return unescape(q[2]);
    }
    else {
        return null;
    }
}
var Ad = (function () {
    function Ad() {
    }
    // 初始化参数
    Ad.prototype.initConfig = function (options) {
        this.isDevelop = options.isDevelop || false;
        this.noIframe = options.noIframe || false;
        if (this.noIframe && window.top != window.self) {
            var self_origin = window.self.location.origin;
            var self_pathname = window.self.location.pathname;
            var self_search = window.self.location.search;
            var self_hash = window.self.location.hash;
            var uuid = getQueryString("uuid", window.top.location);
            if (uuid) {
                if (self_search.indexOf("?") === -1) {
                    self_search += "?uuid=" + uuid;
                }
                else {
                    self_search += "&uuid=" + uuid;
                }
            }
            window.top.location.href = "" + self_origin + self_pathname + self_search + self_hash;
        }
    };
    // 数据上报
    Ad.prototype.report = function (options) {
        var uuid = options.uuid, actionId = options.actionId, phone = options.phone;
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
    };
    return Ad;
}());

var App = new Ad();

return App;

})));
