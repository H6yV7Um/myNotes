# ES6知识梳理

### 1. 编译方法

ES6可以通过浏览器端编译以及服务器端编译
服务器端的编译时用的babel编译
浏览器端编译时用的traceur库编译

浏览器端编译引用traceur.js，和traceur-bootstrap.js两个包

```html
<script type="text/javascript" src="lib/traceur.js"></script>
<script type="text/javascript" src="lib/traceur-bootstrap.js"></script>
```

### 2. Let 定义块级作用域变量
let用来定义块作用域变量。 定义的变量在块级作用域中有效
作用：比如在循环中，let定义的变量，会在块作用域下保留下，访问的是就是当前循环的变量值。

```javascript
// 使用var定义变量
var arr = [];
for (var i = 0; i < 5; i++) {
	arr[i] = function () {
		console.log(i)
	}
}
// 调用arr[2]查看i的结果
arr[2](); // 输出5

var arr2 = [];
//使用let定义变量。 块级作用域。
for (let j = 0; j < 5; j++) {
	arr2[j] = function () {
		console.log(j)
	}
}
// 调用arr2[2]查看j的结果
arr2[2](); // 输出2
arr2[3]() // 输出3

```

### const 定义常量

常量：（静态变量） 一旦被定义就不能再被修改
语法 const key = value;
>1. 常量一旦被定义后就不能再被修改。
>2. 定义在块作用域内部的常量，在外部不能访问到
>3. 在定义常量的前面，是不能访问到常量的，因此我们通常要将常量定义在文件的最前面
>4. 常量是不能被重复的定义的，这是为了保证常量定义使用时候的安全型。

```javascript
// 对于静态变量可以用const定义， 防止被修改。 
const PI = Math.PI;
PI = 3 //常量被修改时会报错
const PI = 5 // 报错，同一个常量不能被重复定义。


 if (true) {
 	// 在块作用域内定义一个PI常量，在外部无法访问到
 	const PI = Math.PI;
 }

console.log(PI);
```
### 3. 字符串方法拓展
#### 3.1 startsWith

判断字符串是以参数字符开头的
第一个参数就是字符串
第二个参数表示判断的位置

#### 3.2 endsWith

判断元字符串是以参数字符串结尾的
第一个参数是判断的字符串
第二个参数表示判断的位置

#### 3.3 includes

判断字符串是否包含参数字符串
第一个参数表示被包含的字符串
第二个参数判断的位置

```javascript
//创建一个字符串
var str = '这是一个神奇的网站！';

// 判断str字符串是否是以‘这是’开头的
var res = str.startsWith('这是')
var res = str.startsWith('网站', 7)
var res = str.startsWith('这是', 0)

// console.log(res)

// 判断这个字符串是否是是以！为结尾的，判断字符串时候，一定注意标点符号中文符号还是英文符号
var res = str.endsWith('！')
// 如果我想判断‘神奇结尾’ 输入的位置是几?
res = str.endsWith('神奇', 6)
res = str.endsWith('的', 7)

// console.log(res)

// 判断这个字符串是否包含'个'
res = str.includes('个', 2);

console.log(res)
// 等价于下面的正则方法
console.log(/个/.test(str.slice(3)))
```
### 4. 字符串方法
#### 4.1 模板字符串
可以把模板写在 \` \` 之中。 可以换行书写
能够使用${表达式} 语法


```javascript

//我们喜欢明星是： 
var star = 'me';
// 这套模板支持多行语句
var intro = `<h1>我最喜欢的明星是${star}</h1>
	<p>赶紧介绍一下他</p>`;
console.log(intro);
// 将intro字符串渲染到app的div中
document.getElementById('app').innerHTML = intro;

var ad = [
	{
		"title": "电影节礼包",
		"description": "赢50元券",
		"id": "1",
		"url": "01.png"
	},
	{
		"title": "10元毕业游",
		"description": "学生过暑期",
		"id": "2",
		"url": "02.png"
	},
	{
		"title": "旅拍跳楼价",
		"description": "0元住城堡",
		"id": "3",
		"url": "03.png"
	}
];

var tpl = '';
// 将数据渲染到页面中
for (var i = 0; i < ad.length; i++) {
	// 同ad[i]的数据渲染模板，并保存在tpl字符串中
	tpl += `
		<a href="#product/${ad[i].id+10}">
			<h3>${ad[i].title}</h3>
			<p>${ad[i].description}</p>
			<img src="img/product/${ad[i].url}" alt="" />
		</a>
	`
}
// 将得到的tpl渲染到页面中, 使用了repeat方法
document.getElementById('app').innerHTML = tpl.repeat(2);

```

#### 4.2 repeat方法， 重复字符串n次

```javascript
var str = "我是原字符串";
var str_new = str.repeat(3); // 字符串重复3次,一共得到3份字符串

```

#### 4.3 raw 方法

返回原始字符串，该方法不会将字符串中转义字符转义

```javascript
// raw不会将转义字符转义，它是String对象的一个方法，所以使用时候要通过String对象
console.log(`success \n 111`)
var a = String.raw`success \n 111`
console.log(a === 'success \\n 111')
console.log('success \\n 111')

```

### 5. Array对象的扩展

#### 5.1 from 把类数组对象转为数组对象
该方法可以接受两个参数
第一个参数表示类对象，
第二个参数表示处理函数，在这个函数中我们可以处理类对象每个成员，这个函数有两个参数
第一个参数表示value值，（类数组的成员值）
第二个参数表示索引值
返回值会保留最终结果，如果没有返回值，那么from函数直接结果就是由undefined构成的一个新数组

```html
//html 结构
<ul>
	<li>1 1 1</li>
	<li>2 2 2</li>
	<li>3 3 3</li>
</ul>

```

```javascript
//js部分
// 获取页面中的所有li元素
var lis = document.querySelectorAll('ul li');	// 返回的结果是一个类数组对象


// 判断lis是否是数组
// console.log(lis instanceof Array)  //false
// console.log(Array.isArray(lis)) //false
// console.log(Object.prototype.toString.call(lis)) //[object NodeList]


// 有时候为了处理方便我们需要将它变成一个数组, 通过 Array.from 可以实现
var arr = Array.from(lis);
console.log(arr instanceof Array) //true
console.log(Array.isArray(arr)) //true
console.log(Object.prototype.toString.call(arr)) //[object Array]
console.log(arr,555);


// from可以传递两个参数
var arr = Array.from(lis, function (value, index) {
    //在循环中可以修改每一项的值。此时会修改页面中li中的内容
	value.innerHTML = value.innerHTML + '修改了';
	// 将value返回，返回值会组成新的数组
	return value;
})

// 打印arr，查看from方法执行完毕的返回值
console.log(arr)

```

#### 5.2. of

将一组值转化成一个数组，为了解决源生Array构造函数创建数组的一个问题的。
Array当传递参数不同，传递的参会表示不同的含义，如果一参数，这个参数表示的数组的长度，当传递两个或者多个参数时候，这些表示数组的成员，
Of为了解决Array构造的参数不同得到结果行为不一致的问题
参数表示数组的成员，不论参数十几个

```javascript

// 源生js创建数组
console.log(Array().length)	// 得到的是一个空数组
console.log(Array(5).length) 	// 得到的是一个有5个undefine构成数组
console.log(Array(5, 6).length) 	// 得到是一个有5,6构成的数组

//of方法用来解决传递参数不同得到属性的行为不一致的问题
console.log(Array.of())  \\ []
console.log(Array.of(5)) \\ [5]
console.log(Array.of(5, 6)) \\ [5, 6]
console.log(Array.of(5, 6, 7)) \\ [5, 6, 7]

```

#### 5.3 find
获取符合条件的第一个数组成员值

```javascript
// 东北F4
var arr = ['刘能', '赵四', '小沈阳', '宋小宝'];

// find 搜索符合条件的数组成员
var res = arr.find(function (value, index, arr) {
	// 判断明星名字中含有小字
	return value.indexOf('小') > -1;
})
```

#### 5.4 findIndex
 
获取符合条件的第一个数组的索引值
这两个方法都会接受一个函数作为参数，这个函数接收三个参数，
第一个参数表示数组成员的值
第二个参数表示数组成员的索引值
第三个参数表示原数组
返回的表示是否符合条件
这两个方法与filter的区别是，filter是贪婪的搜索，这个是非贪婪搜索，


```javascript
// 东北F4
var arr = ['刘能', '赵四', '小沈阳', '宋小宝'];

// 获取符合条件成员索引值
var res = arr.findIndex(function (value, index, arr) {
	return value.indexOf('小') > -1;
})

console.log(res);

```
#### 5.5 keys; values; entries

keys
表示数组所有成员索引值，返回的是一个迭代器对象
values
表示数组所有成员的值，返回的是一个迭代器对象
entries
保留的是，将数组成员的索引值以及数组成员的值，保留在一个新数组中，并把这些新数组保留在一数组返回的是一个数组迭代器对象


```javascript
// 东北F4
var arr = ['刘能', '赵四', '小沈阳', '宋小宝'];

// 保留是所有数组成员索引值
var keys = arr.keys();

console.log(keys);  //ArrayIterator {}

// for of 是数组迭代器提供的一种语法
for (var key of keys) {
	console.log(key)
}

// 保留的是所有数组成员的值
var values = arr.values();
for (var value of values) {
	console.log(value)
}

// 保留的是，将数组成员的索引值以及数组成员的值，保留在一个新数组中，并把这些新数组保留在一数组返回的是一个数组迭代器对象
var entries = arr.entries();
for (var item of entries) {
	console.log(item)
}

console.log(entries instanceof Object)
```

### 6. 对象的拓展

#### 6.1 对象定义

Es6为定义对象拓展了很多语法
1 我们在定义一个对象时，如果对象的属性与属性值对应的变量同名，我们可以简写属性名
2 在定义对象时候，我们可以对对象的属性应用表达式
3 在定义对象时候，如果对象属性名称与对象属性对应的方法名称相同，我们可以省略属性以及function，像定义类中的方法一样定义这个属性方法

```javascript
// 返回一个{x：10， y：20}；
function Point(x, y) {
	// ES6允许我们直接引入变量，不用对对象添加同名属性
	return {x, y}
	//等价于
	// return {
	// 	x : x,
	// 	y : y
	// }
}

// 测试Point方法
console.log(Point(10, 20));  //Object {x: 10, y: 20}

// 允许我们在定义对象时候，对对象属性应用表达式
var a = 'aa';
var b = 'bb'
var obj = {
	// 通过a，b两个变量添加一个新属性
	[a + b]: 'blue'
};

console.log(obj)  //Object {aabb: "blue"}

// 定义函数属性，这种属性叫方法
let oo = {
	// ES6允许我们在定义方法时候，可以省略方法对应的属性名称，去函数名称
	say () {
		console.log('hello')
	}
}

//等价于
// let oo = {
// 	say : function(){
// 		console.log("hello");
// 	}
// }

console.log(oo);
oo.say()
```

#### 6.2 Object.is  判断两个值是否相等
判断两个值是否相等
可以区分 0， -0
Object.is(0,-0)  // false

#### 6.3 assign 扩展对象， 浅复制

是对象拓展的一个方法，用来对原有对象拓展属性的。
Assign接收多个参数，
第一个参数表示要被拓展的对象，
后面参数表示对第一个参数复制属性的对象
该方法返回值是拓展后的第一个参数对象
注意，该方法是对对象属性的一个浅复制，是对对象的一个直接引用，jquery中我们可以对extend进行深复制，


```javascript
let obj1 = {
	a: 'red'
};
let obj2 = {
	b: 'green'
};
let obj3 = {
	c: {
		color: 'blue'
	}
};
// 我们想让obj1获取obj2和obj3的属性，可以通过assign方法实现
var res = Object.assign(obj1, obj2, obj3);//返回的res结果与obj1 相等

// 我们将res结果以及三个对象打印出来
console.log(res === obj1) // true
console.log(obj1)
console.log(obj2)
console.log(obj3)
console.log(obj1.c === obj3.c) //true
```
### 7. Symbol 类型

是ES6 新增的一种新的数据类型，表示独一无二的，通常用来定义一些属性，来避免属性名重名
定义Symbol类型，通过Symbol来定义，参数可以是一个字符串，注意该方法不能通过new关键创建，
不论Symbol传递任何字符串参数，得到的结果都是表示一个独一无二的数据。
通过typeof可以判断该数据的原始数据类型是symbol
该数据类型可以通过toString转化成字符串

```javascript
var a = 'color';
var b = 'color';
obj = {
	[a] : "red",
	[b] : "green"
}
console.log(obj);  // Object {color: "green"} 只有一个属性
// [a]得到的结果是color，[b]得到的结果是color，所以obj得到的两个属性是同名的，因此前面的会被后面的覆盖，因此obj只有一个属性，为了解决这类问题，我们可以通过Symbol实现

// 定义Symbol数据，要通过Symbol构造函数定义，注意该函数不能使用new关键字,参数只接收字符串
var sym1 = Symbol('color');
var sym2 = Symbol('color');
console.log(sym1 == sym2) //false
console.log(String('color') === String('color')) //false

// 定义一个对象
var obj = {
	[sym1] : 'red',
	[sym2] : 'green'
};

// Symbol是一种新的数据类型，可以通过typeof查看原始数据类型
console.log(typeof sym1);  //symbol
console.log(sym1); //Symbol(color)
console.log(sym1.toString()) //Symbol(color)
console.log(obj) //Object {Symbol(color): "red", Symbol(color): "green"}
```

### 8. Proxy 代理

有时我们为了保护对象内部的属性，状态，方法，行为等等，不让外界其他人能够访问到，此时我们可以通过代理来实现，这样带来相当于一种屏障，来保护这个对象，ES6为我们提供代理对象，我们可以通过Proxy带来对象来实现对代理对象的创建，通过new实现
语法new Proxy(代理对象，屏障对象)
这个屏障比较特殊，方法不是可以任意定的，我们只能通过get来获取代理对象的信息，set来设置原始对象的信息，但是，他们不是直接处理对象的，在处理之前会过滤这些人为操作

```javascript
var Star = {
	name: "zhang",
	msg: ''
}
// proxy 构造函数第一个参数表示代理
var agentProxy = new Proxy(Star, {
	// 不想让别人知道我的隐私
	get: function (target, key) {
		// console.log(target, key)
		if (key === 'girlFriend') 
			return 'no'
		return target[key]
	},
	set: function (target, key, value) {
		// console.log(target, key, value)
		if (key === 'girlFriend') {
			return 'no';
		}
		target[key] = value;
		return value;
	}
})

var gf = agentProxy.girlFriend;
console.log(gf)  // no
console.log(agentProxy.name)  // zhang
console.log(agentProxy.msg = 'hello')  // hello
console.log(agentProxy.msg)  // hello
console.log(Star)  // Object {name: "zhang", msg: "hello"}
// 设置明星的女朋友
console.log(agentProxy.girlFriend = 'wang')  // wang
console.log(Star)  // Object {name: "zhang", msg: "hello"}

```

### 9. 函数拓展

#### 9.1 默认参数
我们可以对参数直接用=赋值一个默认值，这样，当用户使用函数时候，不传递参数也有参数值，就是默认参数值

```javascript
// ES6允许我们在定义参数时候，直接通过=赋值默认参数
 function setFontColor(color = 'green') {
 	// 将h1的字体设置成参数颜色
 	document.getElementById('app').style.color = color;
 }
 
 setFontColor('red')
 setFontColor()
```

#### 9.2 获取剩余参数, rest 参数语法

我们可以通过...语法来获取剩余参数，这种方法叫做 rest参数，其他的参数可以用参数变量来表示
这里num类似arguments，但是避免了对arguments的依赖（在箭头函数中是不允许使用arguments，此时我们可以通过rest参数语法来实现）
这种运算符，是将参数转化成一个类数组对象

```javascript
function add (num1, num2,  ...num) {
	// 在里面判断num来处理数据
	// for (var i of num) {
	// 	console.log(i)
	// }
	console.log(num)
}

```
  ... 语法也可以用来代替数组中的元素作为参数传入方法
这种运算符是将数组转化成参数


```javascript
// dealColor方法用来处理传递的参数color值
function dealColor (...color) {
	console.log(color)
}
var colors = ['red', 'green', 'blue', 'orange']
// 有时候，我们将所有参数保存在一个数组中，那么此时，我们想将这个数组中每个成员作为参数传递进来，怎么办
// dealColor.apply(null, colors)
dealColor(...colors)
```

也可以用来展开对象

```
let objClone = { ...obj };
```

#### 9.3 箭头函数

定义语法 ( ) => { }
该语法中，我们不能使用arguments，但是要想获取参数，一种是通过rest参数语法获取，一种是通过声明变量方式获取
ES6中不允许我们对箭头函数执行new语法，

```javascript
var add = (num1, num2, num3,...num) => {
	console.log(arguments) //[]
	console.log(num1, num2, num3) //1,2,3
	console.log(num)  // [4,5,6]
}

var res1 = add(1,2,3,4,5,6);

```
箭头函数的this永远指向定义时候的作用域，在哪个对象里面定义，那么他的this就是执行哪个对象，当使用call或者是apply更改作用域时候，箭头函数的this没有被更改

### 10. set对象

目前我们学的知识，表示集合的数据结构有数组，有对象，set对象就是ES6中新增一种表示集合的数据结构，代表的意义表示一个没有重复值的数组，数组中每个成员的值是唯一的，set也是一个类，所以我们想创建set数据对象，要通过new关键字来实现
该构造函数接收一个数组作为参数，得到的实例化对象会对该参数数组去重，也就是说参数的数组中不论有多少个相同值，得到结果就是一个
实例化对象属性和方法
Size属性，表示set对象的长度
Add方法，表示对set对象添加成员，返回值是set实例化对象，所以我们可以对set对象链式调用add方法
	delete方法，表示删除对象中的成员，返回值是一个布尔值，表示删除成功或者失败
成功 true
失败 false
Has方法，表示set实例化对象中是否有某值
存在该值，true
不存在该值，false
Clear方法，表示清空set实例化对象
注意，对set添加成员时候，不会进行数据类型的转化，添加一个字符串类型1 和添加一个数字类型的1，看作两个不同的值

```javascript
var s = new Set([0, 1, 0, 1, 0, 1, 1, 1]);

// 添加一个字符串1
s.add("1")
s.add(2)
s.clear();
s.has(1)
s.delete(1)

// for of 遍历 set
for(var kk of s){
	console.log(kk);
}

```


### 11. WeakSet 对象

是set的一种数据结构，只不过它只能添加对象
它与set比较没有size属性，没有clear方法，没有forEach方法，只有add，delete，has方法

```javascript
var ws = new WeakSet();
ws.add(window);
ws.add({a: 111})
ws.add('abc')
console.log(ws)
```

### 12. map 对象

是表示集合数据的一种数据结构，
Map对象是一个‘超对象’，我们传统的对象，定义属性的时候，我们只能用字符串定义，但是map允许我们定义对象属性时候，是任意类型的，
Map对象是对Object的一个拓展，但是他的实现很像set对象，只不过多了一个get方法

Size属性，表示属性的个数
Set方法，为map实例对象添加属性，
第一个参数表示属性名称
第二个参数表示属性值
返回值是一个map实例化对象，因此我们可以链式调用set方法添加属性

Get方法，是用来获取map对象中添加的属性值的，传递参数表示属性名称，
返回值就是该属性对应的值

Has方法，用来判断参数属性是否在map对象中
存在该属性，返回值是true
不存在该属性，返回值是false

Delete方法，用来删除map对象中的某个属性的
删除成功，返回true
删除失败，返回false

forEach方法用来循环map对象的，参数是一个回调函数
回调函数的第一个参数表示map对象的value
回调函数的第二个参数表示map对象的key
回调函数的第三个参数表示map对象

Map对象不能使用for循环遍历
Map对象不能使用for in循环
Map对象可以使用for of循环来遍历map对象

```javascript
var m = new Map();
// 对map实例化对象添加属性，要用set方法,
m.set('color', 'red')
// 添加对象属性
m.set(document, 'green');

console.log(m.size)

m.get(document)

m.has(false)

m.delete(null)

m.forEach(function () {
	console.log(arguments)
})

for (var [key, value] of m) {
	console.log(key, value)
}
```
### 13. WeakMap 对象

同weakset与set关系一样 ，weakmap是一种弱map，因此它的属性和方法要比map少很多
同weakset一样，他们存储的数据都不被记录在垃圾回收机制中，只有get，set，has，delete几个方法
它设置对象的属性必须是对象，所以传递其他类型会报错，null也不可以传递


### 14. 迭代器（遍历器）Iterator

在ES6没有这样的对象，它只是提供了一种接口，所以在ES6中找不到该对象，但是在一些操作中作为接口存在
当调用for of方法时候，会在内部调用该接口，
当对数据解析的时候会调用该接口
当使用...语法时候会调用该接口
当调用set，map，weakset,weakmap等等对象会实现该接口，
是否实现该接口的标示识能否通过for of循环遍历

```javascript
// 数据结构解析
var s = new Set([0, 2, 1]);
console.log(s);
var [x, y] = s;
console.log(x, y)


// ...语法
var colors = ['red', 'blue', 'yellow'];
var arr = ['green', ...colors, 'orange'];
console.log(arr)
for (var i of arr) {
	console.log(i)
}

// 调用set， map等构造函数时候
var m = new Map();
```

### 15 for of 循环
当使用传统for循环遍历数组时候，比较麻烦，语句比较多
ES5提供的forEach方法可以很便捷的访问数组成员，但是不能使用break，cotinue，甚至return意义都变了
For in循环，遍历数组时候，会将索引值转化成字符串，并且会获取其他不必要的属性设置原型对象上的属性，for in循环就是为遍历对象设计的
For of循环，可以使用break，continue，return，并且意义没有变，可以很便捷的获取数组成员的值，但是在该循环中无法获取遍历的索引值值，

```javascript
for (var i of arr) {
	if (i == 'yellow') {
		return;
	}
	console.log(i)
}
```

### 16 generator函数

Generator不是一个对象，也不是一个函数，指的是一类函数，维护着内部状态的一类函数
第一个特点，function关键字与函数名称之间有个*号
第二个特点，函数内部通过yield定义每个成员，即每个状态
对于generate函数内部的状态可以通过next方法获取
Return用来标示状态的结束
Next方法是用来获取下一个状态的，返回值是个对象有两个属性
Value 表示状态
Done 是否遍历完成，false没有完成，true遍历完成

```javascript
// 定义generator函数
function * stateGenerator () {
	yield '早晨起床';
	yield '来上课';
	yield '中午回家吃饭';
	yield '下午上课';
	yield '回家吃饭';
	return '睡觉';
}

var sg = stateGenerator();
console.log(sg);  // GeneratorFunctionPrototype {}
console.log(sg.next())  // Object {value: "早晨起床", done: false}
console.log(sg.next())  // Object {value: "来上课", done: false}
console.log(sg.next())  // Object {value: "中午回家吃饭", done: false}
console.log(sg.next())  // Object {value: "下午上课", done: false}
console.log(sg.next())  // Object {value: "回家吃饭", done: false}
console.log(sg.next())  // Object {value: "睡觉", done: true}
console.log(sg.next())  // Object {value: undefined, done: true}
console.log(sg.next())  // Object {value: undefined, done: true}
console.log(sg.next())  // Object {value: undefined, done: true}
```

### 17. class 类

```javascript
class Animal {

	// 构造函数
	constructor (name,age) {
		this.name = name;
		this.age = age;
	}

	// 定义方法
	eat () {
		console.log(this.name + "吃饭");
		// 在函数内部可以获取函数的静态属性方法
		console.log(Dog.run(),111); 
	}

	// static 定义静态属性方法,只能在函数内部调用。 静态方法不会被继承
	static run () {
		//静态方法中的this属性无法被读取
		console.log(this.name + "跑走了");
	}
}

//子类
class Dog extends Animal {

	//构造函数
	constructor (name,age,color,harm) {
		//继承父类的构造函数
		super (name,age);
		// 子类的this属性定义要放在super之后
		this.color = color;
		this.harm = harm;
	}

	// 定义方法
	bite (per) {
		console.log(this.name + "咬了" + per + "一口，造成" + this.harm + "点伤害");
	}

	// 使用get， set定义属性， 在设置或取值的时候会触发相应的方法
	get harmZhi () {
		console.log(this.name + "伤害值是" + this.harm);
	}

	set harmZhi (zhi) {
		this.harm = zhi;
		console.log(this.name + "伤害值修改为了" + this.harm);
	}
}

var xiaobai = new Dog("小白",3,"白色","33")
console.log(xiaobai);
console.log(xiaobai.harm);
console.log(xiaobai.bite("吕洞宾"));
console.log(xiaobai.harmZhi = 44,333); // 设置该属性会调用 set方法
console.log(xiaobai.harm);
// console.log(xiaobai.run()); //无法继承父类的静态方法
```

### 18 module 模块

到目前为止,javascript (ES5及以前) 还不能支持原生的模块化，大多数的解决方案都是通过引用外部的库来实现模块化。比如 遵循CMD规范的 Seajs 和AMD的 RequireJS 。在ES6中，模块将作为重要的组成部分被添加进来。模块的功能主要由 export 和 import 组成.每一个模块都有自己单独的作用域，模块之间的相互调用关系是通过 export 来规定模块对外暴露的接口，通过import来引用其它模块提供的接口。同时还为模块创造了命名空间，防止函数的命名冲突。

ES6模块系统具有以下特性：

>* 使用export关键词导出对象。这个关键字可以无限次使用；
>* 使用import关键字将其它模块导入某一模块中。它可用来导入任意数量的模块；
>* 支持模块的异步加载；
>* 为加载模块提供编程支持。

每个JavaScript代码文件在ES6中都是一个模块。只有模块中的对象需要被外部调用时，模块才会输出对象，其余则都是模块的私有对象。

```javascript
// test.js
//暴露一个变量
var say  = function () {
    
}
export say;
```

#### 18.1 导出模块

从模块里导出对象，ES6为我们提供了不同方法，见下面的讨论。

* 1. 内联导出

ES6模块里的对象可在创建它们的声明中导出。一个模块中可无数次使用export，所有的对象将被一起导出。请看下面的例子：

```javascript

var emp = new Employee(1, "Rina", new Date(1987, 1, 22));  

// 直接在申明中导出对象
export class Employee{  
  constructor(id, name, dob){  
    this.id = id;  
    this.name=name;  
    this.dob= dob;  
  }  
  getAge(){  
    return (new Date()).getYear() - this.dob.getYear();  
  }  
}  
export function getEmployee(id, name, dob){  
  return new Employee(id, name, dob);  
}  
```
案例中的模块导出了两个对象： Employee类，getEmployee函数。因对象emp未被导出，所以其仍为模块私有。

* 2. 导出一组对象

尽管内联导出很有效，但在大规模模块中，它就很难发挥作用了，因为我们可能无法追踪到模块导出来的对象。在这种情况下，更好的办法是，在模块的末尾单独进行导出声明，以导出该模块中的全部对象。

使用单独导出声明重写上一案例中的模块，结果如下：

```javascript
class Employee{  
  constructor(id, name, dob){  
    this.id = id;  
    this.name=name;  
    this.dob= dob;  
  }  
  getAge(){  
    return (new Date()).getYear() - this.dob.getYear();  
  }  
}  
function getEmployee(id, name, dob){  
  return new Employee(id, name, dob);  
}  
var x = new Employee(1, "Rina", new Date(1987, 1, 22));  
export {Employee, getEmployee};  
```

```javascript
// test.js
//暴露多个变量
 var name = '吕布';
 var age = '24';
 export {name, age};
 
 export function getName() {
    return name;
  }
 export function getAge(){
   return age;
  } 

```

在导出时，重命名对象也是可以的。如下例所示，Employee在导出时名字改为了Associate，函数GetEmployee改名为getAssociate。

```javascript
export {  
    Associate as Employee,  
    getAssociate as getEmployee  
  }; 
```
* 3. Default导出

使用关键字default，可将对象标注为default对象导出。default关键字在每一个模块中只能使用一次。它既可以用于内联导出，也可以用于一组对象导出声明中。

不用关心模块输出了什么，通过 export default 指令就能加载到默认模块，不需要通过 花括号来指定输出的模块.

下面案例展示了在组导出语句中使用default：

```javascript
export default {  
    Employee,  
    getEmployee  
}; 
```

```javascript
 // default 导出
  export default function getAge() {} 
 
  // 或者写成
  function getAge() {}
  export default getAge;

  // 导入的时候不需要花括号
  import test from './test.js';
```


#### 18.2 导入模块

可以通过import 来引入其它模块，一个模块可以被导入任意数量的模块中。

```javascript
//引入test.js中的name, age 变量
import {name,age} from "./test.js";

// import * as ... from  可以引入模块中的所有暴露的接口
import * as test form './test.js';

// 也可以通过module关键字整体引入一个模块
 module test from 'test.js';

```

* 1. 无对象导入

导入的模块如果只执行一些逻辑语句，不引入对象，可以直接引入

```javascript
import "./test.js"
```

* 2. 导入默认对象

采用 export default导出方式导出的对象，可以在import中直接分配给某个引用

```javascript
import d from "test.js"
```

* 3. 导入命名的对象

一个模块可以导出许多命名对象。如果另一模块想导入这些命名对象，需要在导入声明中一一列出这些对象。

```javascript
import {Employee, getEmployee} from './module1.js';  

import {default as d, Employee} from './module1.js';  
```

// 一条import 语句可以同时导入默认方法和其它变量.

import defaultMethod, { otherMethod } from 'xxx.js';
```

* 4. 导入所有对象

以上几种情况，只有import声明中列举的对象才会被导入并被使用，而其它对象则无法在导入模块中使用。当然，这就要求用户了解哪些对象可以导出并加以利用。如果模块导出大量对象，另一模块想引入所有导出的对象，就必须使用如下声明：

```javascript
import * as allFromModule1 from './module1.js';  
```

 allFromModule1这一别名将指向所有从module1导出的对象。在导入模块中，它们作为属性可被访问。

* 5. 可编程式的按需导入

如果想基于某些条件或等某个事件发生后再加载需要的模块，可通过使用加载模块的可编程API（programmatic API）来实现。使用System.import方法，可按程序设定加载模块。这是一个异步的方法，并返回Promise。

该方法的语法示例如下：

```javascript
System.import('./module1.js')  
    .then(function(module1){  
        //use module1  
    }, function(e){  
        //handle error  
    }); 
```

如果模块加载成功且将导出的模块成功传递给回调函数，Promise将会通过。如果模块名称有误或由于网络延迟等原因导致模块加载失败，Promise将会失败。
