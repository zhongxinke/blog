# Diff算法

## 虚拟DOM

虚拟DOM实际是JS对象，将一个DOM元素转成JS对象的形式

```vue
<div class="container">
    <p class="item">demo</p>
</div>
```

转成：

```js
const Vnode = {
  tagName: "div",
  props: { class: "container" },
  children: [
    {
      tagName: "p",
      props: { class: "item" },
      text: "demo"
    }
  ]
};
```

## 算法对比

通过对比新旧虚拟DOM，找到差异使最小化更新视图。本质上就是比较两个JS对象的差异

## Vue2算法

- 判断是否同类标签，不是则直接替换
- 判断两个节点是否相等，相等则直接返回
- 新旧节点包含文本节点，直接使用新的文本替换
- 旧节点没有子节点，新节点有子节点，直接添加新节点
- 旧节点有子节点，新节点没有，直接删除子节点
- 新旧节点都有子节点

**新旧节点都有子节点的情况**

规定在同级做比对，减少比对次数，如图：

<img src="http://zhongxk.com/blogImg/vue2-diff.png" title="vue2-diff.png" alt="vue2-diff.png" width="700px" style="max-width: none" />

**首尾指针法**

新旧节点分别有头尾指针，俩俩比较
