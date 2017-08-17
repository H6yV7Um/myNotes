[TOC]

# polymer

[官方文档](https://www.polymer-project.org/2.0/docs/devguide/custom-elements)

## custom element 自定义标签

### 自定义标签概念

通过自定义标签要实现一个组件模式. 需要包含以下能力.

- 把类名和自定义标签名联系起来的机制
- 提供一系列的生命周期, 当状态变化的时候能够触发相应的方法函数(如added/removed)
- 通信, 当组件实例的属性发生变化的时候能够触发相应的回调通知父组件

