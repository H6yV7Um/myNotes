# Angular 推荐的一些书写规范

参考资料:
* [https://github.com/johnpapa/angular-styleguide/blob/master/a1/i18n/zh-CN.md#%E5%8D%95%E4%B8%80%E8%81%8C%E8%B4%A3](https://github.com/johnpapa/angular-styleguide/blob/master/a1/i18n/zh-CN.md#%E5%8D%95%E4%B8%80%E8%81%8C%E8%B4%A3)
为了使代码更具可读性, 安全性及维护性, 推荐项目中以约定的规范来书写.

### 命名函数 vs 匿名函数

控制器推荐使用明明函数.

```javascript
/* avoid */
angular
    .module('app')
    .controller('Dashboard', function() { })
    .factory('logger', function() { });

```

```javascript

/* recommended */

// dashboard.js
angular
    .module('app')
    .controller('Dashboard', Dashboard);

function Dashboard () { }

```