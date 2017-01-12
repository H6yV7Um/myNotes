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

### 函数声明隐藏实现细节

函数声明隐藏实现细节，置顶绑定成员，当你需要在controller中绑定一个函数时，把它指向一个函数声明，这个函数声明在文件的后面会出现。

为什么？：易读，易识别哪些成员可以在View中绑定和使用。

为什么？：把函数的实现细节放到后面，你可以更清楚地看到重要的东西。

为什么？：由于函数声明会被置顶，所以没有必要担心在声明它之前就使用函数的问题。

为什么？：你再也不用担心当 a依赖于 b时，把var a放到var b之前会中断你的代码的函数声明问题。

为什么？：函数表达式中顺序是至关重要的。

```javascript

/**
* avoid
* Using function expressions
*/
function dataservice($http, $location, $q, exception, logger) {
  var isPrimed = false;
  var primePromise;

  var getAvengers = function() {
    // implementation details go here
  };

  var getAvengerCount = function() {
    // implementation details go here
  };

  var getAvengersCast = function() {
    // implementation details go here
  };

  var prime = function() {
    // implementation details go here
  };

  var ready = function(nextPromises) {
    // implementation details go here
  };

  var service = {
      getAvengersCast: getAvengersCast,
      getAvengerCount: getAvengerCount,
      getAvengers: getAvengers,
      ready: ready
  };

  return service;
}

```

```javascript

/**
* recommended
* Using function declarations
* and accessible members up top.
*/
function dataservice($http, $location, $q, exception, logger) {
    var isPrimed = false;
    var primePromise;

    var service = {
        getAvengersCast: getAvengersCast,
        getAvengerCount: getAvengerCount,
        getAvengers: getAvengers,
        ready: ready
    };

    return service;

    ////////////

    function getAvengers() {
      // implementation details go here
    }

    function getAvengerCount() {
      // implementation details go here
    }

    function getAvengersCast() {
      // implementation details go here
    }

    function prime() {
      // implementation details go here
    }

    function ready(nextPromises) {
      // implementation details go here
    }
}

```

### Controllers

#### controllerAs在View中的语法

使用controllerAs 语法代替直接用经典的$scope定义的controller的方式。

为什么？：controller被构建的时候，就会有一个新的实例，controllerAs 的语法比经典的$scope语法更接近JavaScript构造函数。

为什么？：这促进在View中对绑定到“有修饰”的对象的使用（例如用customer.name 代替name），这将更有语境、更容易阅读，也避免了任何没有“修饰”而产生的引用问题。

为什么？：有助于避免在有嵌套的controllers的Views中调用 $parent。

```javascript
<!-- avoid -->
<div ng-controller="Customer">
  {{ name }}
</div>

```

```javascript
<!-- recommended -->
<div ng-controller="Customer as customer">
  {{ customer.name }}
</div>

```

#### controllerAs在controller中的语法

使用 controllerAs 语法代替 经典的$scope语法 语法。

使用controllerAs 时，controller中的$scope被绑定到了this上。

为什么？：controllerAs 是$scope的语法修饰，你仍然可以绑定到View上并且访问 $scope的方法。

为什么？：避免在controller中使用 $scope，最好不用它们或是把它们移到一个factory中。factory中可以考虑使用$scope，controller中只在需要时候才使用$scope，例如当使用$emit， $broadcast，或者 $on。

```javascript
/* avoid */
function Customer ($scope) {
    $scope.name = {};
    $scope.sendMessage = function() { };
}
```

```javascript
/* recommended - but see next section */
function Customer () {
    this.name = {};
    this.sendMessage = function() { };
}

```

#### 置顶绑定成员

把可绑定的成员放到controller的顶部，按字母排序，并且不要通过controller的代码传播。

为什么？：虽然设置单行匿名函数很容易，但是当这些函数的代码超过一行时，这将极大降低代码的可读性。在可绑定成员下面定义函数（这些函数被提出来），把具体的实现细节放到下面，可绑定成员置顶，这会提高代码的可读性。

```javascript

/* avoid */
function Sessions() {
    var vm = this;

    vm.gotoSession = function() {
      /* ... */
    };
    vm.refresh = function() {
      /* ... */
    };
    vm.search = function() {
      /* ... */
    };
    vm.sessions = [];
    vm.title = 'Sessions';

```

```javascript
/* recommended */
function Sessions() {
    var vm = this;

    vm.gotoSession = gotoSession;
    vm.refresh = refresh;
    vm.search = search;
    vm.sessions = [];
    vm.title = 'Sessions';

    ////////////

    function gotoSession() {
      /* */
    }

    function refresh() {
      /* */
    }

    function search() {
      /* */
    }
```
注：如果一个函数就是一行，那么只要不影响可读性就把它放到顶部。

```javascript 
/* avoid */
function Sessions(data) {
    var vm = this;

    vm.gotoSession = gotoSession;
    vm.refresh = function() {
        /**
         * lines
         * of
         * code
         * affects
         * readability
         */
    };
    vm.search = search;
    vm.sessions = [];
    vm.title = 'Sessions';
```

```javascript
/* recommended */
function Sessions(dataservice) {
    var vm = this;

    vm.gotoSession = gotoSession;
    vm.refresh = dataservice.refresh; // 1 liner is OK
    vm.search = search;
    vm.sessions = [];
    vm.title = 'Sessions';

```

### Directives

#### 一个directive一个文件

一个文件中只创建一个directive，并依照directive来命名文件。

为什么？：虽然把所有directive放到一个文件中很简单，但是当一些directive是跨应用的，一些是跨模块的，一些仅仅在一个模块中使用时，想把它们独立出来就非常困难了。

为什么？：一个文件一个directive也更加容易维护。

> 注： "最佳实践：Angular文档中有提过，directive应该自动回收，当directive被移除后，你可以使用element.on('$destroy', ...)或者scope.$on('$destroy', ...)来执行一个clean-up函数。"

```javascript

/* avoid */
/* directives.js */

angular
    .module('app.widgets')

    /* order directive仅仅会被order module用到 */
    .directive('orderCalendarRange', orderCalendarRange)

    /* sales directive可以在sales app的任意地方使用 */
    .directive('salesCustomerInfo', salesCustomerInfo)

    /* spinner directive可以在任意apps中使用 */
    .directive('sharedSpinner', sharedSpinner);

function orderCalendarRange() {
    /* implementation details */
}

function salesCustomerInfo() {
    /* implementation details */
}

function sharedSpinner() {
    /* implementation details */
}

```

``` javascript

/* recommended */
/* calendarRange.directive.js */

/**
* @desc order directive that is specific to the order module at a company named Acme
* @example <div acme-order-calendar-range></div>
*/
angular
    .module('sales.order')
    .directive('acmeOrderCalendarRange', orderCalendarRange);

function orderCalendarRange() {
    /* implementation details */
}

```

```javascript

/* recommended */
/* customerInfo.directive.js */

/**
* @desc sales directive that can be used anywhere across the sales app at a company named Acme
* @example <div acme-sales-customer-info></div>
*/
angular
    .module('sales.widgets')
    .directive('acmeSalesCustomerInfo', salesCustomerInfo);

function salesCustomerInfo() {
    /* implementation details */
}

```

```javascript

/* recommended */
/* spinner.directive.js */

/**
* @desc spinner directive that can be used anywhere across apps at a company named Acme
* @example <div acme-shared-spinner></div>
*/
angular
    .module('shared.widgets')
    .directive('acmeSharedSpinner', sharedSpinner);

function sharedSpinner() {
    /* implementation details */
}

```

#### 推荐把指令注册为元素或属性, 避免把指令注册为类名

注册为类名非常不清晰, 容易搞错.

```Javascript
<!-- avoid -->
<div class="my-directive"></div>
```

#### Directives和ControllerAs

directive使用controller as语法，和view使用controller as保持一致。

为什么？：因为不难且有必要这样做。

注意：下面的directive演示了一些你可以在link和directive控制器中使用scope的方法，用controllerAs。这里把template放在行内是为了在一个地方写出这些代码。

注意：关于依赖注入的内容，请看[手动依赖注入](#手动添加依赖)。

注意：directive的控制器是在directive外部的，这种风格避免了由于注入造成的return之后的代码无法访问的情况。

```html
<div my-example max="77"></div>
```

```javascript
angular
    .module('app')
    .directive('myExample', myExample);

function myExample() {
    var directive = {
        restrict: 'EA',
        templateUrl: 'app/feature/example.directive.html',
        scope: {
            max: '='
        },
        link: linkFunc,
        controller : ExampleController,
        controllerAs: 'vm',
        bindToController: true // because the scope is isolated
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {
        console.log('LINK: scope.min = %s *** should be undefined', scope.min);
        console.log('LINK: scope.max = %s *** should be undefined', scope.max);
        console.log('LINK: scope.vm.min = %s', scope.vm.min);
        console.log('LINK: scope.vm.max = %s', scope.vm.max);
    }
}

ExampleController.$inject = ['$scope'];

function ExampleController($scope) {
    // Injecting $scope just for comparison
    var vm = this;

    vm.min = 3;

    console.log('CTRL: $scope.vm.min = %s', $scope.vm.min);
    console.log('CTRL: $scope.vm.max = %s', $scope.vm.max);
    console.log('CTRL: vm.min = %s', vm.min);
    console.log('CTRL: vm.max = %s', vm.max);
}
```

```html
<!-- example.directive.html -->
<div>hello world</div>
<div>max={{vm.max}}<input ng-model="{{vm.max}}"/></div>
<div>min={{vm.min}}<input ng-model="{{vm.min}}"/></div>
```

注意：当你把controller注入到link的函数或可访问的directive的attributes时，你可以把它命名为控制器的属性。

```javascript

// Alternative to above example
function linkFunc(scope, el, attr, vm) { // 和上面例子的区别在于把vm直接传递进来
  console.log('LINK: scope.min = %s *** should be undefined', scope.min);
  console.log('LINK: scope.max = %s *** should be undefined', scope.max);
  console.log('LINK: vm.min = %s', vm.min);
  console.log('LINK: vm.max = %s', vm.max);
}

```

当directive中使用了controller as语法时，如果你想把父级作用域绑定到directive的controller作用域时，使用bindToController = true。

为什么？：这使得把外部作用域绑定到directive controller中变得更加简单。

注意：Angular 1.3.0才介绍了bindToController。

```html
<div my-example max="77"></div>
```

```javascript

angular
    .module('app')
    .directive('myExample', myExample);

function myExample() {
    var directive = {
        restrict: 'EA',
        templateUrl: 'app/feature/example.directive.html',
        scope: {
            max: '='
        },
        controller: ExampleController,
        controllerAs: 'vm',
        bindToController: true
      };

    return directive;
}

function ExampleController() {
    var vm = this;
    vm.min = 3;
    console.log('CTRL: vm.min = %s', vm.min);
    console.log('CTRL: vm.max = %s', vm.max);
}

```

```html
<!-- example.directive.html -->
<div>hello world</div>
<div>max={{vm.max}}<input ng-model="vm.max"/></div>
<div>min={{vm.min}}<input ng-model="vm.min"/></div>
```

### 解决Controller的Promises

#### Controller Activation Promises

在activate函数中解决controller的启动逻辑。

为什么？：把启动逻辑放在一个controller中固定的位置可以方便定位、有利于保持测试的一致性，并能够避免controller中到处都是激活逻辑。

为什么？：activate这个controller使得重用刷新视图的逻辑变得很方便，把所有的逻辑都放到了一起，可以让用户更快地看到视图，可以很轻松地对ng-view 或 ui-view使用动画，用户体验更好。

注意：如果你需要在开始使用controller之前有条件地取消路由，那么就用route resolve来代替。

```javascript
/* avoid */
function Avengers(dataservice) {
    var vm = this;
    vm.avengers = [];
    vm.title = 'Avengers';

    dataservice.getAvengers().then(function(data) {
        vm.avengers = data;
        return vm.avengers;
    });
}
```

```javascript
/* recommended */
function Avengers(dataservice) {
    var vm = this;
    vm.avengers = [];
    vm.title = 'Avengers';

    activate();

    ////////////

    function activate() {
        return dataservice.getAvengers().then(function(data) {
            vm.avengers = data;
            return vm.avengers;
        });
    }
}
```



