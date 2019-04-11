import config from '../Config';

function request(options) {
  if (typeof options == 'string') {
    let url = options;
    options = {};
    options.url = url;
    if (typeof arguments[1] === 'object') {
      options.params = arguments[1];

      if (typeof arguments[2] === 'function') {
        options.success = arguments[2];
        if (typeof arguments[3] === 'boolean') {
          options.async = arguments[3];
        }
      }
    } else if (typeof arguments[1] === 'function') {
      options.success = arguments[1];
    }
  }

  let method = options.method || 'get';
  let url = options.url;
  let params = options.params || {};
  let optsData = options.data || {};
  let type = options.type || 'formdata';
  console.log('type:', type);
  let success = options.success || function() {};
  let async = typeof options.async === 'undefined' ? true : options.async;

  let xhr = CreateXMLHttpRequest();
  xhr.onreadystatechange = callback;
  var data = null;
  if (params) {
    url += encodeURI(toQueryString(params));
  }
  if (method.toLowerCase() == 'get') {
    // TODO Sth...
  } else {
    data = optsData;
    if (data != null) {
      if (type == 'formdata') {
        data = new FormData();
        for (var key in optsData) {
          data.append(key, optsData[key]);
        }
      } else if (type == 'json') {
        data = JSON.stringify(optsData);
      } else if (type == 'text') {
        for (var key in optsData) {
          data += '&' + key + '=' + optsData[key];
        }
      } else if (type == 'www') {
        for (var key in optsData) {
          data += '&' + key + '=' + optsData[key];
        }
      }
    }
  }

  let env = 'production';
  if (options.isDevelop) {
    env = 'development';
  }
  let api_domain = config[env]['api_domain'];
  if (!/\/$/.test(api_domain)) {
    api_domain += '/';
  }
  url = api_domain.replace(/\/$/, '') + (/^\//.test(url) ? url : '/' + url);
  xhr.open(method, url, async);
  xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
  if (type == 'json') {
    // xhr.setRequestHeader('Content-Type', 'application/json');
  } else if (type == 'www') {
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  }
  console.log('>>> send Data：', typeof data, data);
  xhr.send(data);

  function callback() {
    if (xhr.readyState == 4) {
      if (type == 'json') {
        try {
          success.call(null, JSON.parse(xhr.responseText));
        } catch (e) {
          console.error(`>>> 请求 ${url} 失败：`, e);

          success.call(null, {
            code: '0002',
            msg: '解析json失败',
          });
        }
      } else {
        success.call(null, xhr.responseText);
      }
    }
  }

  function toQueryString(json) {
    var data = '?';
    for (var key in json) {
      if (data.length > 1) {
        data += '&';
      }
      data += key + '=' + json[key];
    }
    return data;
  }

  function CreateXMLHttpRequest() {
    var httpobj = null;
    try {
      httpobj = new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {
      try {
        httpobj = new ActiveXObject('Microsoft.XMLHTTP');
      } catch (e1) {
        httpobj = new XMLHttpRequest();
      }
    }
    return httpobj;
  }
}

export default request;
