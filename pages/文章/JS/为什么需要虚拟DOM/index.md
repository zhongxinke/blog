# 为什么需要虚拟DOM

虚拟DOM（Virtual DOM）是一种编程概念，它是将真实DOM与JavaScript对象之间的一种映射关系。

1.框架设计
数据驱动模式，数据一变，界面更新。细粒度只能定位到组件，无法定位到具体的DOM节点。
数据变化时，组件内部全量的生成真实dom，代价太昂贵，通过对比，精准找到真实dom

2.解耦运行环境
虚拟DOM可以实现跨平台，跨框架，跨浏览器的开发。