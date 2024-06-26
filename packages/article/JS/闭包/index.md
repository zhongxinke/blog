# 闭包

可以在一个内层函数访问外层的作用域

例子1:

```js
function foo() {
  const value = 1;
  function bar() {
    console.log(value);
  }
}
foo();
```

例子2:

```js
function foo() {
    const value = 1;
    return bar() {
        console.log(value)
    }
}
const f = foo()
foo()
```

这两个例子都是闭包的形式，区别是例子1没有return函数，并且不会造成内存溢出。所以闭包不一定导致内存泄露。

## 应用场景

- **防抖和节流**
- **实现私有变量**，如：构造函数
- **高阶函数**，如：柯里化
