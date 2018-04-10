# Service Worker

[service worker简介](https://developers.google.com/web/fundamentals/primers/service-workers/?hl=zh-cn)

## 注意事项

- 不能直接访问dom, 通过postMessage接口与页面通信, 页面收到信息后可以完成DOM操作
- 可以控制页面所发出的网络请求的处理方式
- 在不用时会被中止, 并在下次需要时重启, 
- 只支持HTTPS

## 生命周期

其生命周期完全独立于网页. 

注册 -> 安装 -> 激活 -> 运行

![生命周期](./images/chatu/sw-lifecycle.png)


### 注册

```javascript

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

```

sw会接受自身js文件所在的路径的所有的fetch请求
如文件路径为 https://cctv.com/assets/sw.js 则会接受https://cctv.com/assets/ 该域下的所有fetch事件.



### 调试工具

chrome://inspect/#service-workers
chrome://serviceworker-internals/

