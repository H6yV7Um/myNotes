
# VUE练习项目知识整理

### vue 项目初始化（创建vue项目）vue-cli 脚手架工具

可以利用vue官方提供的vue-cli工具来初始化一个vue项目

```bash
# 全局安装 vue-cli

$ npm install -g vue-cli

# 创建一个基于 "webpack" 模板的新项目, 按提示操作即可
$ vue init webpack my-project 

# 安装依赖，走你
$ cd my-project
$ npm install
$ npm run dev   // 项目即运行在 localhost:8080 下了

// 初始化git 仓库
git init

// 创建 .gitignore 文件
touch .gitignore

// 编辑忽略规则
open .gitignore

// 写入 
.DS_Store
node_modules/
dist/
npm-debug.log
selenium-debug.log
test/unit/coverage
test/e2e/reports
保存

```
以上即完成vue项目的构建，可以编辑自己的项目了

构建完成的目录结构

![目录结构](images/chatu/vue-study-1.png)

src是进行开发的目录

index.html 是应用入口。
main.js 是webpack的入口文件
App.vue 是入口组件
routers.js 用来编辑路由规则

在 components 中编辑所需的组件。

### vue-cli 坑规避
安装完成 vue-cli 后通过 vue init 可以初始化一个项目

官方提供了多个项目的初始化版本。

输入 vue list 可以查看不同的版本。 

```bash

 browserify - A full-featured Browserify + vueify setup with hot-reload, linting & unit testing.
  ★  browserify-simple - A simple Browserify + vueify setup for quick prototyping.
  ★  browserify-simple-2.0 - A minimal Vue 2.0 Browserify + `vueify` setup for quick prototyping.
  ★  simple - The simplest possible Vue setup in a single HTML file
  ★  simple-2.0 - The simplest possible Vue setup in a single HTML file
  ★  webpack - A full-featured Webpack + vue-loader setup with hot reload, linting, testing & css extraction.
  ★  webpack-simple - A simple Webpack + vue-loader setup for quick prototyping.
  ★  webpack-simple-2.0 - A minimal Vue 2.0 setup for quick prototyping with Wepback & vue-loader

```

这里我们用的是 webpack 版本. 输入命令即可初始化

```bash
vue init webpack 项目名
```
另外还有 browserify 等其他版本。

 webpack-simple 和 webpack 两种的区别在于webpack-simple 没有包括Eslint 检查功能等等功能，


### 编辑组件

每个组件的结构如下

```html
// 编写组件模板
<template>
    <div>
        <header-component/>
        <div>this is template body</div>
        <other-component/>
    </div>
</template>
// 组件样式
<style>
    body{
        background-color:#ff0000;
    }
</style>
// js部分
<script>
    import HeaderComponent from './components/header.vue'
    import OtherComponent from './components/other.vue'
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
            'other-component':OtherComponent,
            HeaderComponent,
        }
    }
</script>
```

### 组件的 style 标签

设置属性 lang='sass' 或 lang='scss' 可以使用sass书写css

属性 scoped 表示作用域。 加上该属性，则样式只针对该模块有效，因为编译后会采用自定义属性作为选择器设置样式。

不设置 scoped 属性编译后的选择器与所书写的一致。

```html
<style lang='scss' scoped>
    $cor : blue;

    h3 {
        color: $cor;
    }
</style>
```


```html
// 设置 scoped 属性
// html 编译后
<div _v-2b3a9744="">
    <h3 _v-2b3a9744="">我是page1</h3>
</div>

// 编译之后的结果为
// 样式编译后
h3[_v-2b3a9744] {
    color: blue;
}

```

### Vue 实例生命周期

vue实例化时的生命周期：
1. 接受到new Vue 方法
2. 建立数据观察 （created）
3. 编译模板 （compiled）
4. 插入页面 （ready）
5. 销毁 （destroyed）


```javascript

<script>
 var myVue = new Vue({
        el: ".test",
        data: {
            a: "我是内容,在控制台输入myVue.a=123456,可以改变我的值"
        },
        created: function () { 
            //在实例创建之后同步调用。此时实例已经结束解析选项，这意味着已建立：数据绑定，计算属性，方法，watcher/事件回调。
            //但是还没有开始 DOM 编译，$el 还不存在,但是实例存在,即this.a存在,可打印出来 。
            console.log("建立");
        },
        beforeCompile: function () {
            console.log("未开始编译");
        },
        compiled: function () { 
            //在编译结束后调用。此时所有的指令已生效，因而数据的变化将触发 DOM 更新。但是不担保 $el 已插入文档。
            console.log("编译完成");
        },
        ready: function () { 
            //在编译结束和 $el 第一次插入文档之后调用，如在第一次 attached 钩子之后调用。注意必须是由 Vue 插入（如 vm.$appendTo() 等方法或指令更新）才触发 ready 钩子。
            console.log("一切准备好了");
        },
        attached :function () {  //myVue.$appendTo(".test2")暂时触发不了,不知道怎么解决
            //在 vm.$el 插入 DOM 时调用。必须是由指令或实例方法（如 $appendTo()）插入，直接操作 vm.$el 不会 触发这个钩子。
            console.log("插入DOM成功");
        },
        detached :function () { //触发事件 myVue.$destroy(true),其中参数true控制是否删除DOM节点或者myVue.$remove()
            //在 vm.$el 从 DOM 中删除时调用。必须是由指令或实例方法删除，直接操作 vm.$el 不会 触发这个钩子。
            console.log("删除DOM成功");
        },
        beforeDestroy: function () {  //触发方式,在console里面打myVue.$destroy();
            //在开始销毁实例时调用。此时实例仍然有功能。
            console.log("销毁前");
        },
        destroyed: function () {   //触发方式,在console里面打myVue.$destroy();其中myVue.$destroy(true)是删除DOM节点,会触发detached函数,但是实例仍然存在
            //在实例被销毁之后调用。此时所有的绑定和实例的指令已经解绑，注意是解绑不是销毁,所有的子实例也已经被销毁。
            console.log("已销毁");
        }
    });
 </script>

```
vue 中的组件没有控制器的概念, 组件的业务逻辑可以写在各个阶段的生命周期中

![vue生命周期](images/chatu/vuelifecycle.png)

### 设置路由
在routers.js中书写路由规则


```javascript

import Vue from 'vue';
import Router from 'vue-router';
import Yule from '../components/Yule/Yule';
import News from '../components/News/News.vue';
import PageOne from '../components/PageOne.vue';

Vue.use(Router);
var router = new Router();

router.map({
    '/' : {
      component : PageOne
    },
    '/yule' : {
        component : Yule,
        title : '我是娱乐版块'
    },
    //路由规则中可以携带param. 
    '/news/:id' : {
        component : News,
        title : '我是新闻版块'
    }
})

export default router;

```

在 App.vue 即vue的入口文件中合适的位置书写路由组件的标签

```html

<template>
    <div id="app">
        <header></header>
        <h1>X3927</h1>
        <router-view></router-view>
        <footer></footer>
    </div>
</template>

```
