# adshare-jssdk

[![NPM Version](https://img.shields.io/npm/v/adshare-jssdk.svg)](https://www.npmjs.com/package/adshare-jssdk)

[![NPM Badge](https://nodei.co/npm/adshare-jssdk.png?downloads=true)](https://www.npmjs.com/package/adshare-jssdk)

## Install

```bash
$ git clone https://github.com/wanderBee/adshare-jssdk
```

```bash
$ yarn
```

## build

```bash
$ yarn build
```

## Load

### HTML

```html
<script src="https://cdn.jsdelivr.net/npm/adshare-jssdk@0.3.1/dist/launchAd.min.js"></script>
```

### ES6

```js
import LaunchAd from "adshare-jssdk";
```

## usage

> prepare

login in [dsp platform](http://adbc8.instago.com.cn/dsp/) for advertising settings

> in your file

```javascript
/**
 * 初始化initConfig 尽量保证被最先加载
 * 比如 html 引入，可放到 </head> 上方
 */
LaunchAd.initConfig({
  async: true  // 是否异步执行js api
  noIframe: false // 是否跳出iframe，true则跳出；默认为false 页面被嵌入到iframe中
});

/**
 * 转化收益上报
 * @param uuid [String][必传] 分发用户标识
 * @param phone [String][必传] 转化手机号
 * @param actionId [String][非必传] // 转化ID （dsp platform配置）
 */
LaunchAd.report({
  uuid: "",
  actionId: "",
  phone: ""
});
```

## License

[MIT](LICENSE)
