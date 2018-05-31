# redux 学习笔记

## install

```
yarn add redux react-redux redux-thunk
```

## 三大原则

1. Single source of truth 单一数据源
所有的数据挂载在同一个store上

2. state is read-only 单向数据流

state是只读的, 唯一可以修改state的方法是action. 

action是用来描述所发生的事件的对象

action可以被打印, 序列化, 储存, 调试测试, 回放

3. Changes are made with pure functions 使用纯函数来执行修改

reducers是纯函数, 传入state, action, 返回一个新的state. 用来描述action如何改变state. 


## Action

action 是一个普通的js对象. 用来把数据从应用传到store



