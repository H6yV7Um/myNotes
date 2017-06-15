# 负margin的原理及应用

参考资料 [http://www.cnblogs.com/2050/archive/2012/08/13/2636467.html#2457812](http://www.cnblogs.com/2050/archive/2012/08/13/2636467.html#2457812)

** 负margin可以调整元素在文档流中的位置 **

margin-left 为负则元素会向left移动, margin-right为负则右侧元素向左移动.

** 与相对定位的区别: **

相对定位移动元素会保留自身在文档流中的位置. 负margin不会在文档流中保留原来的位置

** 对元素宽度的影响: **

负边距不仅能影响元素在文档流中的位置，还能增加元素的宽度！
这个作用能实现的前提是：该元素没有设定width属性（当然width:auto是可以的。 

块级元素的width + padding + border + margin = 父元素的width. 当自身margin为负时, 会增加width.

** 对浮动的影响 **

margin为负会让出在标准流中的位置, 因为后面的元素会跟上来.



