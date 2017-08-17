[TOC]

# 文件下载

## a 标签

通过设置download 属性可以设置下载的文件名. IE11开始支持. 

```html

<a href="download.txt" download="new file name">点击下载</a>

```

## location.assign

地址错误或遇到跨域请求失败会抛出[DOMException](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMException)错误


```javascript

document.location.assign('https://developer.mozilla.org/en-US/docs/Web/API/Location.reload');

```

## window.location

直接给window.location赋值个下载链接, 也可以下载文件, 并且当前页面的url地址不会改变. 如果下载失败, 当前页面会跳转到失败页面.

```javascript

window.location = 'download.txt';

```

## window.open

在新窗口打开, 执行下载

```
window.open('download.txt', '_blank');
```
