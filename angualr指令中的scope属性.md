# angular指令中的scope属性

参考资料: [https://code.angularjs.org/1.5.9/docs/api/ng/service/$compile](https://code.angularjs.org/1.5.9/docs/api/ng/service/$compile)

### 取值

- false : 不创建作用域, 使用父scope
- true : 创建新的scope, 通过原型继承父scope
- {...}(an object hash) : 为指令元素创建孤立作用域. 不继承父作用域, 对于需要创建可复用的作用域比较有用, 不会影响父作用域中的数据.

### scope中定义的值类型

scope 中定义的值可以从属性中获取父作用域中的数据

- @ : 映射父作用域中的值, 不会影响父作用域. 值通常是一个字符串. 如

```html

<-- 如下hello会作为字符串处理, 即 hello不会作为angular的表达式计算其值. -->

<my-dir my-attr="hello{{name}}"></my-dir>

```
- = : 双向同步映射.子作用域会同步影响到父作用域中. 对于可选的属性可以使用 "variable=?attr" 加个问号来表示该值是可选的.

```html

<-- 设置为"=" 则会双向绑定, expression 会作为表达式计算其值. -->
<my-dir my-attr="expression"></my-dir>

```

- < : 单向映射. 父作用域会影响子作用域, 子作用域不会影响父作用域. 属性中的值会作为表达式计算其值. 如果指向是一个object, 由于是引用类型, 修改该object后不会watch到改变, 无法触发更新. 同时如果是object的话子scope中的改变会影响到父scope.

```html

<-- 设置为"<" 单向映射, expression 会作为表达式计算其值. -->
<my-dir my-attr="expression"></my-dir>

```

- & : 通常提供一个可以执行的表达式(函数). 该方法会用一个函数包裹并return 该表达式.


```javascript

// 父控制器中

function parentController ($scope) {
	$scope.parentFn = function (haha) {
		console.log('子指令中传过来的值:', haha);
	}
}

// template 如下

<my-dir attr-fn="parentFn(haha)"></my-dir>

// 指令myDir定义的scope如下设置

scope: {
	local: '&attrFn'
},
link (scope) {
	let obj = {
		haha: '我是指令中的数据哈哈'
	};
	scope.local(obj); // 调用执行该函数, 并传入一个对象, 也可以传入scope作用域.
}



// angular 指令中 "&" 的实现
case '&':
    parentGet = $parse(attrs[attrName]); // 获取指令的属性的表达式编译后的getter.

    // Don't assign noop to destination if expression is not valid
    if (parentGet === noop && optional) break;

    // destination 新创建的指令作用域scope, 为指令作用域赋予attr所对应的值. scopeName 是scope属性中定义的local key.
    
    destination[scopeName] = function(locals) {
     // 此处的scope是子指令中传入的 scope, 如果不穿默认是父scope. locals 是指令元素中 parentFn(haha) 的参数 haha. 返回的是 scope[locals] 的值
      return parentGet(scope, locals);
    };
break;

```

**总结: **

- @: 作为字符串处理, 而非表达式. 
- =: 作为表达式处理, 同时是双向绑定.
- <: 作为表达式处理, 单向映射, 
- &: 作为表达式处理, 在父scope中获取表达式的值. 不过表达式会被包裹在一个函数中并返回. 可以用于可执行函数的绑定.


### 多个不同scope类型叠加的结果.

一个元素可以有多个指令.  多个指令的作用域按以下规则叠加.

- no scope + no scope => Two directives which don't require their own scope will use their parent's scope
- child scope + no scope => Both directives will share one single child scope
- child scope + child scope => Both directives will share one single child scope
- isolated scope + no scope => The isolated directive will use it's own created isolated scope. The other - directive will use its parent's scope
- isolated scope + child scope => Won't work! Only one scope can be related to one element. Therefore these - directives cannot be applied to the same element.
- isolated scope + isolated scope => Won't work! Only one scope can be related to one element. Therefore these directives cannot be applied to the same element.

翻译如下:

- false + false : 不创建作用域, 直接使用父scope
- true + false : 创建一个子scope, 几个指令使用同一个子scope.
- true + true: 创建一个子scope, 几个指令使用同一个子scope.
- {} + false: 创建一个孤立scope, 同时孤立scope的指令使用它自己的scope, false的指令使用父scope.
- {} + true: 报错. 一个元素只能绑定一个scope.
- {} + {}: 报错. 一个元素只能绑定一个scope.

### bindToController 属性

需要设置controller的别名. 

bindToController 也可以取 false, true, {}.

- false: 属性绑定到$scope上. 
- true: scope为{}, 直接给$scope赋的值仍然在$scope上. 但是scope属性中的值在建立作用域的时候都会绑定到 this上.
- {}: scope 也是{}. 则bindToController会覆盖scope.




