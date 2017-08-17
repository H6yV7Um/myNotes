# web component

## 简介

将html,css, js封装为一个可以在不同的框架之间通用的可复用组件, 使用的是一些浏览器自身的API来实现, 不依赖外部的框架库. 

当前许多API浏览器都不支持, 可以使用 Chrome部门出的[polymer](https://www.polymer-project.org/)库来做兼容. 该库提供了诸如web component, service worker, HTTP/2的新特性. 

## 主要使用了以下技术

- shadow DOM, 
- HTML 模板(template), 
- HTML导入, <link rel="import" href="my-component.html">
- 自定义元素: 通过 customElements.define('my-component', element); 来注册一个自定义元素my-component, 该元素封装了相应的样式及js逻辑

通过以上技术来实现一个web component

每种技术也都可以单独使用

## 标准新增的内容

Web Components标准定义了以下新内容来支持web components所需的技术

- 四种新的HTML元素: <template>, <content>, <element>, and <shadow>
- 与新元素相关的API接口：HTMLTemplateElement, HTMLContentElement, HTMLElementElement, and HTMLShadowElement
- HTMLLinkElement 接口的拓展，以及 <link> 标签
- 一个注册新元素的接口：Document.registerElement()；以及对Document.createElement() 和 Document.createElementNS() 的修改
- 给自定义元素的原型（prototype）添加新的生命周期回调（lifecycle callbacks)
- 元素的默认样式中添加新的CSS伪类（pseudo-classes） ： :unresolved.
- Shadow DOM: ShadowRoot 、 Element.createShadowRoot()、Element.getDestinationInsertionPoints() 和 Element.shadowRoot
- Event 接口的拓展：Event.path
- Document 接口的拓展
- Web Components 的样式：
  - 新的伪类: :host、:host()、:host-context()
  - 新的伪元素：::shadow 和 ::content
  - 新的组合器（combinator）：/deep/.

## 创建自定义元素



## 参考资料

- [自定义元素](https://developers.google.com/web/fundamentals/getting-started/primers/customelements)
- [W3C草稿](https://www.w3.org/TR/components-intro/)
- [W3C wiki](http://w3c.github.io/webcomponents/spec/custom/)
