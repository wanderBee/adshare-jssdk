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
<script src="https://cdn.jsdelivr.net/npm/adshare-jssdk@0.1.0/dist/launchAd.min.js"></script>
```

### ES6

```js
import LaunchAd from "adshare-jssdk";
```

## usage

```javascript
/**
 * 初始化initConfig 尽量保证被最先加载
 * 比如 html 引入，可放到 </head> 上方
 */
LaunchAd.initConfig({
  noIframe: false // 是否跳出iframe，true则跳出；默认为false 页面被嵌入到iframe中
});

/* 转化收益上报 */
LaunchAd.report({
  actionId: "", // 转化ID [在dsp平台配置]
  phone: "" // 转化手机号
});
```

## License

[MIT](LICENSE)
