# webpack 学习笔记

### 比较

webpack 与其他打包工具的对比: [http://survivejs.com/webpack/webpack-compared/](http://survivejs.com/webpack/webpack-compared/)

### 安装

```
npm install -g webpack
```

### 主要用处

官网对webpack的定义是MODULE BUNDLER，他的目的就是把有依赖关系的各种文件打包成一系列的静态资源

webpack简单点来说就就是一个配置文件，所有的魔力都是在这一个文件中发生的。 这个配置文件主要分为三大块
entry 入口文件 让webpack用哪个文件作为项目的入口
output 出口 让webpack把处理完成的文件放在哪里
module 模块 要用什么不同的模块来处理各种类型的文件
