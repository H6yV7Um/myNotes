# angular全局错误捕获(decorator)

设置全局的错误处理可以方便错误信息的管理.

在angualr中可以通过decorator对$log处理来实现

```javascript
angular.module('app', [])
.config(['$provide', function ($provide) {
	// 调用decorator服务来装饰 $log 服务, $delegate 服务是所装饰的对象的.
	$provide.decorator('$log', ['$delegate', function ($delegate) {

		let arr = ['log', 'info', 'warn', 'error', 'debug'];
        arr.forEach(key => {
            $delegate[key] = decorateFn(key);
        });
        function decorateFn (type) {
            let originalFn = $delegate[type];
            return function () {
                let args = Array.prototype.slice.call(arguments, 0);
                originalFn.apply($delegate, args);
            }
        };
        return $delegate;
	}]);
}]);

```

### $exceptionHandler 是angular中对$log.error的一个装饰服务. 可以通过对该服务重写覆盖来实现错误的捕获


$exceptionHandler 实现源码 [https://github.com/angular/angular.js/blob/master/src/ng/exceptionHandler.js#L3](https://github.com/angular/angular.js/blob/master/src/ng/exceptionHandler.js#L3)

```javascript

// angular 源码 

function $ExceptionHandlerProvider() {
  this.$get = ['$log', function($log) {
    return function(exception, cause) {
      $log.error.apply($log, arguments);
    };
  }];
}

```

重写该服务来实现自定义的错误捕获

```javascript

angular.module('exceptionOverride', []).factory('$exceptionHandler', function() {
    return function(exception, cause) {
        exception.message += ' (caused by "' + cause + '")';
        throw exception;
    };
});

```


