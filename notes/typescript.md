# typescript 学习笔记

## Basic types 基础类型

Boolean,  Number, String, Array, String,

- Number: 支持二进制, 八进制, 十六进制字面量
- string: 支持模板字符串使用反引号 \`, 可以用 ${expression} 插入替换变量
- Array: 支持两种定义形式, 1. 元素类型 + [], 2. Array + 元素类型. Array<eleType\>

```typescript

let name: string = '令狐冲';
let age: number = 21;
let sentence: string = `Hello, I am ${ name }
I am ${age} years old`;
// 定义数组有2种形式
let arr: number[] = [1, 2, 3]; // 元素类型 + []
let arr2: Array<string> = ['哈哈', '嘻嘻', '么么哒']; // Array + 元素类型

```

#### Tuple 类型数组

```typescript

// Tuple 类型数组
let tuple1: [string, number]; // 指定原数组类型, 超出定义的元素会遵循格式 [string|number]
tuple1 = ['华山派', 99]; // 正确定义
// tuple1 = [999, '华山派']; 错误, 第0位定义的是string, 第1位定义的是number.
let _s = tuple1[0].substr(0); // 正确, string有substr方法
// let _s = tuple1[0].substr(1); // 错误, number类型没有substr方法
// tuple1 = ['华山派', 99, 8766, '嵩山派']; // 错误
tuple1 = ['华山派', 99]; // 正确
let tuple2: [string|number]; // 指定元素是string或number
tuple2 = ['华山派']; // 正确
tuple2 = [999]; // 正确

```

#### Enum 枚举类型

* 枚举类型可以用来定义一组有名的数值常量 (enum is helpful to standard a set of datatypes)
* 可以通过name来获取数值, 也可以通过数值来获取该值的name
* enum类型下标默认从0开始, 递增, 也可以给成员指定下标

```typescript

enum Color {Red, Blue = 888, Green};
let r: Color = Color.Red; // 0
let b: Color = Color.Blue; // 888
let g: Color = Color.Green; // 889 没有指定的值会递增
let ColorName = Color[888]; // 通过值获取名称 Blue
console.log(b, g, ColorName);

// 编译后的结果

 var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Blue"] = 888] = "Blue";
    Color[Color["Green"] = 889] = "Green";
})(Color || (Color = {}));
var r = Color.Red; // 0
var b = Color.Blue; // 888
var g = Color.Green; // 889 没有指定的值会递增
var ColorName = Color[888]; // 通过值获取名称 Blue
console.log(b, g, ColorName);

// 常数枚举类型, 在编译后枚举定义会被删除, 只保留成员引用的值. 
const enum Week {
    Sunday,
    Monday,
    Tuesday,
    Saturday = 6
};
let d:Week = Week.Sunday;
console.log('d:', d);

// 编译后

var d = 0 /* Sunday */;
console.log('d:', d);

```

#### Any 类型, Void 类型

Any 类型
不指定类型, 在编译时确定, 可以赋值为任何类型, 该类型可以很好的适配js.

Void 类型, 只能被赋值为null 或 undefined.
对于没有返回值的函数可以使用该类型

```typescript


    /**
     * Any 类型
     * 不指定类型, 在编译时确定, 可以赋值为任何类型, 该类型可以很好的适配js.
     */
    let notSure: any = 999;
    notSure = '九阴真经';
    notSure = true;
    console.log('notSure:', notSure);

    /**
     * Void 类型, 只能被赋值为null 或 undefined.
     * 对于没有返回值的函数可以使用该类型
     */
    function noValReturn (a, b): void {
        console.log(a + b);
    }
    noValReturn(2, 6);
    let unusable: void = null;
    unusable = undefined;
    console.log('unusable', unusable);

```

#### Null and Undefined

Null 或 undefined 类型只能被赋予该值
null / undefined 默认是其他类型的子类型(subtypes).
其他基本类型如string / number 等可以被赋值为null / undefined

```typescript

let n: null = null;
let u: undefined = undefined;
// n = undefined; // 报错
let s: string = '九阴真经';
s = undefined; // 正确
s = null; // 正确
console.log(n, u, s);

```

#### never

never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。这意味着声明为 never 类型的变量只能被 never 类型所赋值，在函数中它通常表现为抛出异常或无法执行到终止点（例如无线循环），示例代码如下：

```typescript

let x: never;
let y: number;

// 运行错误，数字类型不能转为 never 类型
x = 123;

// 运行正确，never 类型可以赋值给 never类型
x = (()=>{ throw new Error('exception')})();

// 运行正确，never 类型可以赋值给 数字类型
y = (()=>{ throw new Error('exception')})();

// 返回值为 never 的函数可以是抛出异常的情况
function error(message: string): never {
    throw new Error(message);
}

// 返回值为 never 的函数可以是无法被执行到的终止点的情况
function loop(): never {
    while (true) {}
}

```

#### Type assertions 类型断言

有时候自己可以确定某个值的最后类型. 可以使用断言, 这样编译器就不需要再做类型检查了.

类型断言有2种语法尖角号或as

```typescript

let activity: any = '华山论剑';
// <>语法
let len: number =  (<string>activity).length;
// as 语法
let len2: number = (activity as string).length;
console.log(len, len2);

```

## Declaration 声明变量

可以使用 var, let(块级作用域), const(定义常量)或者对象/数组解构方法来声明一个变量.

#### Destructuring 解构

同 ES6 的解构

通过 the rest opreator 剩余运算符 ... 来结构数组和对象

```typescript

 	// 数组解构
    let menpai: string[] = ['华山派', '嵩山派', '衡山派', '少林寺'];
    let [huashan, songshan, ...rest] = menpai; // 利用解构语法创建了3个新的变量huashan, songshan, rest
    console.log(huashan, songshan, rest); // 输出: 华山派 嵩山派 ["衡山派", "少林寺"]
    // 只获取需要的值
    let [, str1, , str2] = menpai;
    console.log('str1:', str1, 'str2:', str2); // 输出: str1: 嵩山派 str2: 少林寺
    // 对象解构
    let linghuchong = {
        name: '令狐冲',
        sex: 'male',
        age: 19,
        skill: '独孤九剑'
    };
    let {name, age} = linghuchong; // 创建2个新的变量 name, age
    console.log('name', name, 'age', age); // 输出:  name 令狐冲 age 19
    // 对象也可以使用rest语法
    let {sex, ...restVal} = linghuchong;
    console.log('sex:', sex, 'restVal:', restVal); // 输出: sex: male ; restVal: {name: "令狐冲", age: 19, skill: "独孤九剑"}

```

#### spread operator 扩展运算符

```typescript

	// spread operator 扩展运算符 ...
    // 数组
    let skill1: string[] = ['独孤九剑', '易筋经'];
    let skill2: string[] = ['吸星大法', '冲灵剑法'];
    let skillAll: Array<string> = [...skill1, ...skill2];
    console.log(skillAll);
    /**
     * 扩展object
     * 后面的属性会覆盖前面的属性
     * 只能扩展自身的可枚举的(enumerable)属性, 不会扩展原型链上的.
     */
    let man = {
        name: 'man',
        arms: 2
    };
    let newPerson = {...man, ...linghuchong};
    let newPerson2 = {...linghuchong, ...man};
    console.log('newPerson:', newPerson); // 输出: {name: "令狐冲", arms: 2, sex: "male", age: 19, skill: "独孤九剑"}
    console.log('newPerson2:', newPerson2); // 输出: {name: "man", sex: "male", age: 19, skill: "独孤九剑", arms: 2}
    class People {
        name = 'people';
        say () {
            console.log('I am ' + this.name);
        }
    }
    let instance = new People();
    console.log('newObject:', {...instance, ...linghuchong}); // 输出 {name: "令狐冲", sex: "male", age: 19, skill: "独孤九剑"}, 无法扩展 say 方法

```

## Interfaces 接口

typescript的核心原则之一就是对值做类型检测. 这种检测方式也被称作duck typing or structure subtyping (鸭式检测或结构性子类型化)

Interface 接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

```typescript

// 接口类型检测的简单实例
// 接口只说明所需的属性及其类型. 不关心多余的值
function say (people: {name: string}) {
    console.log('my name is' + people.name);
}
let linghuchong = {name: '令狐冲', age: 19, legNum: 2};
say(linghuchong);

/**
 * 使用interface 定义接口
 * interface是对参数格式类型的一种描述, 只有当传入的参数符合接口所定义的类型, 才会被允许.
 * 接口不关心参数的顺序, 只关心所需的参数是否存在, 及该参数类型是否正确.
 */
interface people {
    name: string;
    age?: number; // 问号表示该参数可选
    readonly legNum: number; // 属性前添加 readonly表示只读属性
}
// 定义函数 say2, 参数 p 使用接口 people
function  say2 (p: people):void {
    console.log('my name is' + p.name, 'my age is' + p.age);
}
say2(linghuchong);

```

### readonly 只读属性

一些属性只能在创建时定义值, 后续不可以修改, 可以定义为只读属性

```typescript

/**
 * readonly 只读属性
 * 一些属性只能在创建时定义值, 后续不可以修改, 可以定义为只读属性
 */
interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // error! 不可以修改只读属性

/** ReadonlyArray<T>类型 **/
// TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
// a = ro; // error! 把只读数组赋值给一个普通数组也会报错, 不过可以用类型断言重写：
a = ro as number[];

```

** readonly 和 const 区别 **

最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若做为属性则使用readonly

### 函数类型

接口不仅可以描述js对象中属性的类型, 还可以描述一个函数类型

```typescript

// 定义一个函数接口
interface ifWinFn {
    (harmVal1: number, harmVal2: number): boolean;
}
// 定义一个函数变量, 并定义起接口类型
let ifWin: ifWinFn;
// 给该函数变量赋值, 函数中的参数名不一定要与接口中的参数名称一样, 但是参数的类型需要符合.
ifWin = function (val1, val2) {
    if (val1 > val2) {
        return true;
    } else {
        return false;
    }
}
let res = ifWin(99, 123);
console.log('ifWin:', res);

```

### Indexable types 可索引类型接口

用来描述通过索引获取值的类型, 如数组, 对象

描述了对象索引的类型, 及返回值的类型

```typescript

/**
 * Indexable types 可索引类型
 * 索引类型支持2种索引, string, number. 但是, number类型的索引的返回值必须是 string 类型索引的返回值的子类型. 因为 number索引也会被转换为string再去索引对象.
 */

interface stringArray {
    [index: number]: string; // 索引是number, 值是string
}
let arr: stringArray = ['少林', '武当', '崆峒'];
let str: string = arr[0];
console.log(str);

interface NumberDictionary {
    [index: number]: string;
    length: number; // 正确, length 是 number的子类型
    // name: string; // error! 索引'name'的类型不是number的子类型
}
let arr2: NumberDictionary =  ['少林', '武当', '崆峒'];

/**
 * 只读类型索引签名
 */
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
// myArray[2] = "Mallory"; // error! 不能设置, 因为索引签名是只读的

```

### Class Types 类类型接口



