# 函数柯里化 curring.

函数的柯里化是指把一个接受多个参数的函数转变为接受一个参数并返回一个接受剩余参数的函数, 且这个返回的函数执行结果与原函数的执行结果相同的技术.

柯里化每消费一个参数, 都会返回一个新的部分配置的函数, 这为函数组合提供了更灵活的手段, 并且使得接口更为流畅.

应用:

- 参数复用
- 提前返回
- 延迟计算/执行

```javascript

// 计算程序员员工需缴纳的公积金 8%, 税 12% 等...
function cal (percent) {
    return function (salary) {
        return salary * percent;
    }
}
// 这样可以得到2个新的函数用于计算
var gongjijin = cal(0.08);
var tax = cal(0.12);
// 程序员A的收入为35k.
var gongjijin_a = gongjijin(35);
var tax_a = tax(35);
// 程序员B的收入为55.
var gongjijin_b = gongjijin(55);
var tax_b = gongjijin(55);
// ....

// 在上面的方法里实现了参数的复用.

// 延迟计算/执行
// 计算一年的总工资
var countSalay = (function () {
    var salaryArr = [];
    return function (salary_month) {
        if (typeof salary_month !== 'undefined') {
            salaryArr.push(salary_month);
        } else {
            var all = 0;
            for (var i = 0; i < salaryArr.length; i++) {
                all += salaryArr[i];
            }
            return all;
        }
    }
})()

// 提前返回

// 绑定事件的兼容性处理 普通方法, 每次执行都要做if, else 判断,才能得到兼容的事件绑定函数
var addEvent = function(el, type, fn, capture) {
    if (window.addEventListener) {
        el.addEventListener(type, function(e) {
            fn.call(el, e);
        }, capture);
    } else if (window.attachEvent) {
        el.attachEvent("on" + type, function(e) {
            fn.call(el, e);
        });
    }
};

// 采用curring处理, 只做一次if, else判断, 提前得到了兼容的事件函数.
var addEvent = (function(){
    if (window.addEventListener) {
        return function(el, sType, fn, capture) {
            el.addEventListener(sType, function(e) {
                fn.call(el, e);
            }, (capture));
        };
    } else if (window.attachEvent) {
        return function(el, sType, fn, capture) {
            el.attachEvent("on" + sType, function(e) {
                fn.call(el, e);
            });
        };
    }
})();


```

## 反柯里化 uncurring

在调用一个方法时, 不用考虑这个对象被设计时, 是否拥有这个方法, 只要这个方法适用该对象, 我们就可以对该对象使用该方法.

```javascript

// uncurring
Function.prototype.uncurring = function () {
    var self = this;
    return function () {
        var obj = Array.prototype.shift.call(arguments);
        self.apply(obj, arguments);
    }
}

var obj = {
    0: 1,
    length: 1
};
var push = Array.prototype.push.uncurring();
push(obj, 2); // obj 自身没有push方法, 但是适用该方法, 就可以使用该方法

// 输出 {0: 1, 1: 2, length: 2}

```

参考资料:

- [http://www.jianshu.com/p/f5033cec605e](http://www.jianshu.com/p/f5033cec605e);
- [http://www.zhangxinxu.com/wordpress/2013/02/js-currying/](http://www.zhangxinxu.com/wordpress/2013/02/js-currying/)