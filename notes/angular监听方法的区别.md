[TOC]

# angular监听方法的区别
## angular $emit $broadcast区别

angular 发送事件可以用 
```
$scope.$emit("eventName",data);
$scope.$broadcast("eventName",data);
```

监听事件使用


```
$scope.$on("eventName",function(eve,data){})
```

### 程序验证

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<b ody>
	<div ng-app="app">
		
		<div ng-controller="parent">
			<div ng-controller="self"> 
				<!-- 在此触发事件 -->
				<button ng-click="sendMsg()">发送消息</button>
				<div ng-controller="child">					
				</div>
			</div>
			<div ng-controller="brother">				
			</div>
		</div>
	</div>

<script type="text/javascript" src="a ngular.js"></script>
<script type="text/javascript">
	
	var app = angular.module("app",[])
	.controller("parent",function($scope){
		$scope.$on("msg",function(e,m){
			console.log("我是parent收到" + m + "消息");
		})
	})

	.controller("self",function($scope,$rootScope){
		$scope.sendMsg = function(){
			$scope.$emit("msg","emit消息");
			$scope.$broadcast("msg","broadcast消息");

			$rootScope.$emit("msg","root:emit消息");
			$rootScope.$broadcast("msg","root:broadcast消息");
		}
	})

	.controller("brother",function($scope){
		$scope.$on("msg",function(e,m){
			console.log("我是brother收到" + m + "消息");
		})
	})

	.controller("child",function($scope){
		$scope.$on("msg",function(e,m){
			console.log("我是child收到" + m + "消息");
		})
	})

	</script>
</b ody>
</html>
```
> 这里我们有四个controller, 层级关系如下：


```
ParentCtrl
     -> SelfCtrl (*) 触发事件
         -> ChildCtrl
     -> BrotherCtrl
```     

> 控制台输出结果

```
我是parent收到emit消息消息
我是child收到broadcast消息消息
我是parent收到root:broadcast消息消息
我是child收到root:broadcast消息消息
我是brother收到root:broadcast消息消息
```

### 结论:
>1. $emit 向上级发送事件
>1. $broadcast 向下级发送事件
>1. $rootScope 通过$broadcast 发送的事件都能接收到.

### 事件的属性

|事件属性	目的|
| --------   | -----:  | :----:  |
|event.targetScope	|发出或者传播原始事件的作用域|
|event.currentScope	|目前正在处理的事件的作用域|
|event.name|	事件名称|
|event.stopPropagation()|	一个防止事件进一步传播(冒泡/捕获)的函数(这只适用于使用`$emit`发出的事件)|
|event.preventDefault()	|这个方法实际上不会做什么事，但是会设置`defaultPrevented`为true。直到事件监听器的实现者采取行动之前它才会检查`defaultPrevented`的值。|
|event.defaultPrevented	|如果调用了`preventDefault`则为true|


```
$scope.$on("msg1",function(e,data){
	e.stopPropagation() //阻止向上冒泡,消息传递到该作用域不再向上传播
})

```

### 事件传播的性能问题

$broadcast+$on的方式会通知所有的子作用域，这里就会有性能问题，所以推荐使用$emit+$on的方式,在目标作用域收到消息后阻止消息继续冒泡.为了进一步提升性能，定义的事件处理函数要在作用域销毁时一起释放掉。

使用$emit+$on的方式需要我们将事件监听绑定在$rootScope上，例如：

```
angular
    .module('MyApp')
    .controller('MyController', ['$scope', '$rootScope', function MyController($scope, $rootScope) {
    	//设置监听事件后会返回一个释放该事件的unbind函数, 执行该函数后会释放这个事件.
            var unbind = $rootScope.$on('someComponent.someCrazyEvent', function(){
                console.log('foo');
            });
            $scope.$on('$destroy', unbind);
        }
    ]);
```

但是这种方式有点繁琐，定义多个事件处理函数时整个人都不好了，所以我们来改进一下

利用装饰器来定义一个新的事件绑定函数：

```
angular
    .module('MyApp')
    .config(['$provide', function($provide){
        $provide.decorator('$rootScope', ['$delegate', function($delegate){
            Object.defineProperty($delegate.constructor.prototype, '$onRootScope', {
                value: function(name, listener){
                    var unsubscribe = $delegate.$on(name, listener);
                    this.$on('$destroy', unsubscribe);
                    return unsubscribe;
                },
                enumerable: false
            });
            return $delegate;
        }]);
    }]);


// 用法

    .controller('MyController', ['$scope', function MyController($scope) {
            $scope.$onRootScope('someComponent.someCrazyEvent', function(){
                console.log('foo');
            });
        }
    ]);

```
