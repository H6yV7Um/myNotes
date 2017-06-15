# web 优化

## 浏览器关键时间点 

![加载过程](./images/chatu/perf1.png)

网页加载时间节点

- TTFB: First Byte 首字节
- TTDD: time to document download. 从服务器加载HTML文档的时间
- TTHE: time to head end. HTML文档头部解析完成的时间
- TTSR: time to start render. ：浏览器开始渲染的时间，从用户角度出发则可以定义为用户在页面上看到的第一个内容的时间。 即TTSR越短，用户越早浏览器中的内容，心理上的等待时间会越短。
- Start Render，First Paint 开始渲染，白屏时间
- DOMContentLoaded 网页结构加载解析成DOM
- Load 网页加载完成，包括样式图片iframe等加载

## 首字节 TTFB (Time To First Byte)

从最开始的客户端向服务端发出请求到接受到服务端返回的第一个字节的时间.这个第一个字节不是内容, 而是http头的第一个字节

该指标反应了网络的情况. 

该时间包括dns解析 + socket连接 + 服务器处理请求并响应的时间.

优化角度:
- 优化dns解析
- cdn

### 文档加载 TTDD (Time To Document Download)

从服务器加载HTML文档时间

### 文档解析 TTHE (Time To Head End)

HTML文档头部解析完成所需要的时间.

### 开始渲染时间 TTSR (Time To Start Render)

浏览器开始渲染的时间, 用户看到第一个内容的时间. 

TTSR 时间越短, 用户越早看到浏览器中的内容

TTSR = TTFB + TTDD + TTHE;

** 影响因素 **

- 服务器响应时间
- HTML文档大小
- HTML的HEAD中资源使用情况, 是否有脚本阻塞页面的解析.

** 与Dom相关的事件 **

![dom加载事件](./images/chatu/perf2.png)

通过 window.performance.getEntries(PerformanceEntryFilterOptions); 可以获取性能指标.

- domLoading: 整个过程开始的时间戳, 浏览器开始解析HTML文档第一批收到的字节document
- domInteractive: 可以交互, 浏览器完成解析并且所有HTML 和 DOM 构建完毕的时间点.
- domContentLoaded: 标记 DOM 准备就绪并且没有样式表阻碍 JS执行的时间点 - 意味着我们可以开始构建呈现树了。
  - 很多 JavaScript 框架等待此事件发生后，才开始执行它们自己的逻辑。因此，浏览器会通过捕获 EventStart 和 EventEnd 时间戳，跟踪执行逻辑所需的时间。
- domComplete: 所有资源下载完成, 也即加载旋转图标停止旋转.
- loadEvent: 网页加载的最后一步, 会触发onLoad事件. 

DomContentLoaded 通常标记 [DOM 和 CSSOM 都准备就绪] 的时间 , 通俗的讲就是：页面解析完成的时间，在高级浏览器里有对应的DOM事件 - DOMContentLoaded，Firefox官方的解析如下：

Fired at the page’s Document object when parsing of the document is finished. By the time this event fires, the page’s DOM is ready, but the referenced stylesheets, images, and subframesmay not be done loading; use the “load” event to detect a fully-loaded page.

TTSR指标直接决定着用户对页面速度的体验，与此不同，DOM Ready指标并不直接影响感官体验，往往影响的是交互功能何时可用。为何影响的是交互呢？由于DOMContentLoaded事件触发时是所有DOM节点可以进行操作的时候，比如添加事件、增删改节点等，因此用Javascript实现的一些交互功能往往会在DOMContentLoaded事件中去初始化，也只有在DOMContentLoaded事件触发后这项功能才可用。

这里还要提及的是 DomContentLoaded , DomComplete 这两个时间的差别，网页的Dom内容加载并解析完成时会触发DomContentLoaded，而DomComplete是在网页的资源（css,image等）加载完成后才触发。英文文档原文如下：

The DOMContentLoaded event is fired when all of the page’s DOM content has been loaded and parsed. The load event is fired once all of the document’s resources (images and CSS files, and so forth) have been fully loaded.

### TTDR (Time To Dom Ready)

TTDR = TTSR + TTDC + TTST;

- TTSR: Time to start render. 浏览器开始渲染的时间
- TTDC: time to dom created. dom树创建所消耗时间
- TTST: time to script. BODY中所有脚本加载和执行的时间.

TTDR 主要受以下因素影响.
1. DOM结构的复杂度
2. js脚本的运行时间.

通过对一些实际监控数据的分析得出，在一个通过正常方式加载脚本的页面中，脚本的加载和执行时间往往能占DOM Ready时间的50%左右，由此可见脚本的使用对DOM Ready指标的影响如何的显著！因此，对DOM Ready指标的优化也应该着重从js脚本的使用入手。
当然，随着硬件性能越来越高，脚本的执行时间对于页面加载速度的影响会越来越少；但是，如果有构建一个60fps的web应用，细节往往是非常重要的

### TTI(Time To Interact) 可交互时间

TTI(Time To Interact)指的是页面可交互的时间。页面中的交互包括很多方面，例如点击一个链接、点击一个搜索按钮都属于页面交互的范畴，但是对于衡量性能的TTI则主要指核心功能可以交互的时间。核心功能的定义则是随着页面的不同而不同，例如对于百度首页而言，最为关键的就是搜索框出现的时间、而对于一些购物网站的商品详情页最关键的是购买功能可用和描述出现的时间。而目前的实际情况，TTI大都等于DOM Ready时间，因为不论交互功能是否重要，相关的Javascript都会在DOM Ready后才进行初始化和绑定，而实际上TTI是可以更早的。

通过TTI的定义可以知道，TTI的长短对于用户体验的影响是十分重要的，它影响着用户对核心功能的使用。

影响因素

- start render. 只有内容开始渲染了, 接下来才能开始交互.
- 核心功能HTML元素的显示时间, 决定着核心功能对用户可见的时间.
- 提供用户交互的JS脚本什么时候执行完成 ， 决定着核心Javascript功能可交互的时间

在HTML5应用中，JS模板引擎的使用是非常普遍的，这个使用得好可以提高TTI时间，使用得不好，会比没有使用模板引擎而是通过后端模板引擎渲染的页面更慢。客户端使用JS模板引擎进行渲染的过程必须知会用户，让用户不至于见到一个空白页面，

### 参考资料

- [浏览器关键时间点](http://zhangmhao.github.io/2014/05/20/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%B3%E9%94%AE%E6%97%B6%E9%97%B4%E7%82%B9/)










