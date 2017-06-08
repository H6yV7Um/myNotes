# vue 中数组变动检测的实现

### 1. js 中实现hook

js中通过重写一些方法可以实现一些hook.

```

// hook 一个 console。log
let _log = console.log
console.log = function (data) {
    // do someting
    _log.call(this, data)
}

```

### 2. 实现方案

vue中实现双向绑定依靠的是数据劫持.
vue中对数组的检测依靠通过重写Array的push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse',
几个Array常用的方法来实现对数组变化的检测.

实现步骤:
>1. 建立空对象 arrayProto, 继承Array.prototype.
>2. 重写 arrayProto.push, pop ... 等方法, 在其中添加observe hook, 在调用这些方法的时候会触发相应的钩子. 进而检测数组的改变
>3. 检测到数组改变后调用相应的watcher
>4. 利用splice方法封装 $set, $remove 方法.

### 3. 实现过程

#### 3.1. 继承Array.prototype对象

```

// 获取数组原型
const arrayProto = Array.prototype;
// 创新新的原型对象
const arrayMethods = Object.create(arrayProto);

```

#### 3.2. 重写数组的push..等方法

```

['push', 'pop', 'shift', 'unshift', 'sort', 'slice'].forEach(function (method) {
	// 获取数组的相应方法
	const originalMethod = arrayMethods[method];
	// 在调用这些方法的时候添加观察钩子
	Object.defineProperty(arrayMethods, method, {
		value: function () {
			let i = arguments.length;
			// 复制参数数组
			const args = new Array(i);
			while (i--) {
				args[i] = arguments[i];
			}
			// 
			const result = originalMethod.apply(this, args);
			// 绑定观察者
			const ob = this.__ob__;
			// 是否更改数组本身
			let inserted;
			switch (method) {
				case 'push':
				inserted = args;
				case 'unshift':
		          inserted = args;
		          break;
		        case 'splice':
		          inserted = args.slice(2);
		          break;
			}
			// 观察新数组
			 inserted && ob.observeArray(inserted)
		     // 触发更新
		     ob.dep.notify()
		     return result

		},
		enumerable: true,
		writable: true,
		configurable: true
	})

```

#### 3.3. Observer模块中更改数组对象的原型指向

```

// Observer 模块的实现
function Observer (value) {
	this.dep = new Dep();
	this.value = value;
	// 如果是数组则更改其原型指向
	if (Array.isArray(value)) {
		value.__proto__ = arrayMethods;
		this.observerArray(value);
	} else {
		this.walk(value);
	}
}
// 如果某项是数组, 继续调用Observer观测该元素
Observer.prototype.observerArray = function (items) {
	for (let i = 0, l = items.length; i < l; i++) {
    	observe(items[i])
  	}
}

```

#### 3.4. Watcher中的update方法

```
// watcher的实现, 只需要更改其update方法
Watcher.prototype.update = function (dep) {
	const value = this.get();
	const oldValue = this.value;
	this.value = value;
	if (value !== this.value || value !== null) {
		this.cb.call(this.vm, value, oldValue);
	    // 移除旧的观察者, 如果没有此函数， 会导致重复调用 $watch 回调函数。
	    // 原因：数组变异过了，并对新数组也进行了观察，
	    dep.subs.shift()
	}
}

```

### 4. 总结

由上面的实现可知, vue是通过重写Array的原型来进行数据劫持而实现数组的检测的. 
同时只重写了 push, pop, shift, unshift, splice, sort 方法, 并封装了$set, $remove 方法
因此直接修改数组或调用其他的数组方法造成的数组值的改变不能调用watchers同步到dom中.

### 5. vue源码

vue 中array部分的实现源码

```

var arrayProto = Array.prototype;
	// 让arrayMethods继承Array的原型上的属性
  var arrayMethods = Object.create(arrayProto) 

  /**
   * Intercept mutating methods and emit events
   */
	// 重写 array的以下几个方法 为其添加监听
  ;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
    // cache original method
    var original = arrayProto[method];
    def(arrayMethods, method, function mutator() {
      // avoid leaking arguments:
      // http://jsperf.com/closure-with-arguments
      var i = arguments.length;
      var args = new Array(i);
      while (i--) {
        args[i] = arguments[i];
      }
      var result = original.apply(this, args);
      var ob = this.__ob__;
      var inserted;
      switch (method) {
        case 'push':
          inserted = args;
          break;
        case 'unshift':
          inserted = args;
          break;
        case 'splice':
          inserted = args.slice(2);
          break;
      }
      if (inserted) ob.observeArray(inserted);
      // notify change
      ob.dep.notify();
      return result;
    });
  });

  /**
   * Swap the element at the given index with a new value
   * and emits corresponding event.
   *
   * @param {Number} index
   * @param {*} val
   * @return {*} - replaced element
   */

  def(arrayProto, '$set', function $set(index, val) {
    if (index >= this.length) {
      this.length = Number(index) + 1;
    }
    return this.splice(index, 1, val)[0];
  });

  /**
   * Convenience method to remove the element at given index or target element reference.
   *
   * @param {*} item
   */

  def(arrayProto, '$remove', function $remove(item) {
    /* istanbul ignore if */
    if (!this.length) return;
    var index = indexOf(this, item);
    if (index > -1) {
      return this.splice(index, 1);
    }
  });

  ```

##### 参考资料

>* [Vue.js 中的数组变动检测](http://www.jianshu.com/p/a4f63ed809d2)