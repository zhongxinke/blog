# 盒模型

浏览器进行布局时，会计算元素的大小

一个盒子由：content、padding、margin、border组成

## 模型分类

- 标准模型：不包括padding、border

- 怪异模型：包括padding、border

## box-sizing

通过`box-sizing`属性设置模型

```
box-sizing: content-box;

box-sizing: border-box;
```
