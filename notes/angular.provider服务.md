# angular provider 服务

参考资料: [https://code.angularjs.org/1.5.9/docs/guide/providers](https://code.angularjs.org/1.5.9/docs/guide/providers)

provider服务是angular的核心服务, 其它的服务是该服务的一个语法糖.
与其他服务相比该服务拥有更多的能力 

provider服务适合注册一些必须在整个应用执行之前注册的一些在全局使用的配置或服务.

provider服务提供一个$get方法. 该$get方法即其他服务中要设置的函数.

$get方法中return的值即注入的服务内容.


```javascript

// provider 服务通常用来注册一些需要在全局执行并且在应用开始之前要执行的方法
	angular.module('app', [])
	.provider('myProvider', function myProviderProvider () {
		// provider的注册函数, 其中的this有一个$get方法, 注册服务时会调用该$get方法得到注册的服务. $get后面的函数即相当于factory中传入的函数.
		console.log('provider:', this);
		this.$get = function () {
			console.log('$get函数:', this);	
			console.log('注册 myProviderProvider');
			// $get中返回的值即在控制器中注入的服务, 可以返回值类型, 函数, 对象等.
			return function () {
				console.log('provider结果函数');
			}
		}
	})
	// factory中的第二个参数即相当于provider中的 this.$get 函数
	.factory('myFactory', function () {
		console.log('注册myFactory');
		// 返回的结果即注入的内容
		return function () {
			console.log('注入的函数');	
		}
	})
	.controller('ctrl', function ($scope, myProvider, myFactory) {
		$scope.msg = '哈哈';
		console.log('controller中的服务myProvider:', myProvider);	
		console.log('controller中的服务myFactory:', myFactory);	
		myProvider()
		myFactory()
	})

```



