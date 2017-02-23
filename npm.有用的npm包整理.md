[TOC]

# 有用的 npm 包整理

## node 文件处理相关

### fs-extra

[fs-extra](https://www.npmjs.com/package/fs-extra)

提供一些文件管理的方法,  类似mkdir, copy, ensureDir... 的方法,是对fs模块的扩展, 可以使用fs的所有方法, 安装fs-extra后可以不再require fs模块

## webpack 插件

### 查看项目的包关系

[Webpack Visualizer](http://chrisbateman.github.io/webpack-visualizer/)

可以查看分析当前项目中各个模块文件的占用情况

### happypack

[happypack npm地址](https://www.npmjs.com/package/happypack)

[happypack 原理解析](http://taobaofed.org/blog/2016/12/08/happypack-source-code-analysis/)

利用多线程来加速wepack的构建速度

## gulp 插件

## 其他

[postCss github地址](https://github.com/postcss/postcss#plugins)

[其他相关文章](http://www.w3cplus.com/blog/tags/516.html)

用来预处理css, 可以增加 autoprefixer, 引入变量混合等

### lerna

[lerna](https://www.npmjs.com/package/lerna)

在一个项目中管理多个子packages的发布

