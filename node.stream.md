# stream 类型

stream 是node中用来处理流式数据的对象

### stream 分类

根据程序的数据流动方向 stream 有三类

- 数据从设备流向程序 (程序 <= <= 设备) readable
- 数据从程序流向设备 (程序 => => 设备) writable
- 数据双向流动 (程序 <= => 设备) transform duplex 

node 中流的操作封装在stream对象中

node中对文件的操作通常通过stream来完成

- 普通文件

- 设备文件 stin, stout

- 网络文件 http, net

nodeJs 中所有的stream都是 [EventEmitter](https://nodejs.org/dist/latest/docs/api/events.html#events_class_eventemitter) 的实例

### readable 可读流



