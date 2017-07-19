[Toc]

# js设计模式

### 桥接模式

**概述**

在软件系统中，某些类型由于自身的逻辑，它具有两个或多个维度的变化，那么如何应对这种“多维度的变化”？如何利用面向对象的技术来使得该类型能够轻松的沿着多个方向进行变化，而又不引入额外的复杂度？这就要使用Bridge模式。

**意图**

Decouple an abstraction from its implementation so that the two can vary independently.(将抽象部分与实现部分分离，使它们都可以独立的变化。)
对两组或多组相互依赖的类之间解耦

**场景举例**

输入设备有手势, 鼠标等, 输出设备有屏幕, 音响等. 每种输入操作对应相应的输出设备的操作. 如何建立相应的对应关系呢? 通过桥接模式可以将相互依赖的两组对象解耦.

```javascript

// input Device
var Gestures = function (output) {
	this.output = output;
	this.tap = function () { this.output.click(); };
	this.swipe = function () { this.output.move(); }
    this.pan = function () { this.output.drag(); }
    this.pinch = function () { this.output.zoom(); }
};

var Mouse = function (output) {
	this.output = output;
 
    this.click = function () { this.output.click(); }
    this.move = function () { this.output.move(); }
    this.down = function () { this.output.drag(); }
    this.wheel = function () { this.output.zoom(); }
};

// output Devices

var Screen = function () {
    this.click = function () { log.add("Screen select"); }
    this.move = function () { log.add("Screen move"); }
    this.drag = function () { log.add("Screen drag"); }
    this.zoom = function () { log.add("Screen zoom in"); }
};
 
var Audio = function () {
    this.click = function () { log.add("Sound oink"); }
    this.move = function () { log.add("Sound waves"); }
    this.drag = function () { log.add("Sound screetch"); }
    this.zoom = function () { log.add("Sound volume up"); }
};
 
// logging helper
 
var log = (function () {
    var log = "";
 
    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { alert(log); log = ""; }
    }
})();
 
 // 桥接, 在该方法中调用两种类. 产生不同的组合.
function run() {
 
    var screen = new Screen();
    var audio = new Audio();
 
    var hand = new Gestures(screen);
    var mouse = new Mouse(audio);
 
    hand.tap();
    hand.swipe();
    hand.pinch();
 
    mouse.click();
    mouse.move();
    mouse.wheel();
 
    log.show();
}


```

可以看到，通过对象组合的方式，Bridge 模式把两个角色之间的继承关系改为了耦合的关系，从而使这两者可以从容自若的各自独立的变化，这也是Bridge模式的本意。

这样增加了input devices与output devices的耦合。其实这样的担心是没有必要的，因为这种耦合性是由于对象的创建所带来的，完全可以用创建型模式去解决。在应用时结合创建型设计模式来处理具体的问题。

适用性：

在以下的情况下应当使用桥梁模式：

1．如果一个系统需要在构件的抽象化角色和具体化角色之间增加更多的灵活性，避免在两个层次之间建立静态的联系。 
2．设计要求实现化角色的任何改变不应当影响客户端，或者说实现化角色的改变对客户端是完全透明的。
3．一个构件有多于一个的抽象化角色和实现化角色，系统需要它们之间进行动态耦合。 
4．虽然在系统中使用继承是没有问题的，但是由于抽象化角色和具体化角色需要独立变化，设计要求需要独立管理这两者。

总结：

Bridge模式是一个非常有用的模式，也非常复杂，它很好的符合了开放-封闭原则和优先使用对象，而不是继承这两个面向对象原则。

桥接模式与装饰的区别:

装饰模式:

这两个模式在一定程度上都是为了减少子类的数目，避免出现复杂的继承关系。但是它们解决的方法却各有不同，装饰模式把子类中比基类中多出来的部分放到单独的类里面，以适应新功能增加的需要，当我们把描述新功能的类封装到基类的对象里面时，就得到了所需要的子类对象，这些描述新功能的类通过组合可以实现很多的功能组合 .

桥接模式：

桥接模式则把原来的基类的实现化细节抽象出来，在构造到一个实现化的结构中，然后再把原来的基类改造成一个抽象化的等级结构，这样就可以实现系统在多个维度上的独立变化 。

桥接模式的缺点:

桥接模式的引入会增加系统的理解与设计难度，由于聚合关联关系建立在抽象层，要求开发者针对抽象进
行设计与编程。 - 桥接模式要求正确识别出系统中两个独立变化的维度，因此其使用范围具有一定的局限性。

### 外观模式(门面模式)

结构型设计模式. 通过将多个方法的调用封装起来, 提供一个高层接口, 使包装的方法更方便调用. 可以隐藏实现细节, 只关心调用即可.

如: 

```javascript

// 阻止默认事件
function stopEvent (e) {
	e.preventDefault();
	e.stopPropagation();
}

```

### 装饰器模式 Decorator Pattern

参考资料: 

1. [https://en.wikipedia.org/wiki/Decorator_pattern](https://en.wikipedia.org/wiki/Decorator_pattern)

2. [http://design-patterns.readthedocs.io/zh_CN/latest/structural_patterns/decorator.html](http://design-patterns.readthedocs.io/zh_CN/latest/structural_patterns/decorator.html)

In object-oriented programming, the decorator pattern (also known as Wrapper, an alternative naming shared with the Adapter pattern) is a design pattern that allows behavior to be added to an individual object, either statically or dynamically, without affecting the behavior of other objects from the same class.[1] The decorator pattern is often useful for adhering to the Single Responsibility Principle, as it allows functionality to be divided between classes with unique areas of concern.

用来动态的给对象添加新的行为属性而不修改原有的对象. 增加一个修饰类来包裹原来的类. 包裹的方式通常将原有的类作为修饰类的构造函数的参数. 通过装饰类来实现新的功能.  但是原有的类依然可以直接进行调用. 修饰类必须和原有的类有相同的接口.

修饰类是类继承的另一种选择. 类继承需要在编译时增加行为, 修饰类则在运行时增加行为. 

优势: 对于需要编译的语言, 类不能在运行时被创建, 通过装饰器模式可以实现在运行时对类的适配修改. 

要给一个类或对象增加行为或功能可以通过两种方式. 

- 继承: 通过继承可以使子类在拥有父类方法的同时拥有自己的方法, 但是继承是静态的, 在编译前确定的, 不能在运行时动态添加. 
- 关联机制: 将一个对象A嵌入另一个对象B中, 由该B对象在运行时决定是否调用嵌入对象A的行为来扩充自身.  我们将该嵌入对象B 称为装饰器








