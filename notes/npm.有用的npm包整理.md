[TOC]

# 有用的 npm 包整理

----

## node 相关

### fs-extra

[fs-extra](https://www.npmjs.com/package/fs-extra)

提供一些文件管理的方法,  类似mkdir, copy, ensureDir... 的方法,是对fs模块的扩展, 可以使用fs的所有方法, 安装fs-extra后可以不再require fs模块

### chokidar 文件监听 watch file

[https://www.npmjs.com/package/chokidar](https://www.npmjs.com/package/chokidar)

gulp, karma, PM2,browserify, webpack, BrowserSync, Microsoft's Visual Studio Code, and many others项目中都使用该包作为watch file库 

### scribe

用来处理node中的logger

[https://www.npmjs.com/package/scribe](https://www.npmjs.com/package/scribe)

### cors 处理跨域

主要用来处理跨域, 结合express使用.

[https://github.com/expressjs/cors](https://github.com/expressjs/cors)

### ws websocket

ws 服务端用来实现websocket

[https://www.npmjs.com/package/ws](https://www.npmjs.com/package/ws)

### http-proxy-middleware 请求代理转发中间件

[https://www.npmjs.com/package/http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware)

### commander 命令行处理

[https://npm.taobao.org/package/commander](https://npm.taobao.org/package/commander)

用于node脚本命令行参数处理


### nodemon node进程监视器

用于管理node服务

[https://www.npmjs.com/package/nodemon](https://www.npmjs.com/package/nodemon)


### keygrip 用来做验证

[https://www.npmjs.com/package/keygrip](https://www.npmjs.com/package/keygrip)

### memory-fs 用来在内存中创建文件目录, 

可以在内存中进行读写操作, 极大提高IO效率. webpack devserver 就使用了该机制.

[https://juejin.im/entry/5769f8dc128fe10057d2f4ae](https://juejin.im/entry/5769f8dc128fe10057d2f4ae)


----

## webpack 插件

### 查看项目的包关系

[Webpack Visualizer](http://chrisbateman.github.io/webpack-visualizer/)

可以查看分析当前项目中各个模块文件的占用情况

### http-proxy-middleware 请求转发中间件

[https://www.npmjs.com/package/http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware)

### happypack

[happypack npm地址](https://www.npmjs.com/package/happypack)

[happypack 原理解析](http://taobaofed.org/blog/2016/12/08/happypack-source-code-analysis/)

利用多线程来加速wepack的构建速度




----

## gulp 插件

## 其他

[postCss github地址](https://github.com/postcss/postcss#plugins)

[其他相关文章](http://www.w3cplus.com/blog/tags/516.html)

用来预处理css, 可以增加 autoprefixer, 引入变量混合等

### lerna

[lerna](https://www.npmjs.com/package/lerna)

在一个项目中管理多个子packages的发布

