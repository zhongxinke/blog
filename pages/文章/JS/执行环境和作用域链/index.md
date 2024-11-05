# 执行环境和作用域链

## 执行环境（执行上下文）

执行上下文是 JavaScript 代码在运行时所需的环境。每当函数调用、代码块执行或全局代码运行时，都会创建一个新的执行上下文。执行上下文分为三种类型：

- 全局执行上下文
- 函数执行上下文
- Eval执行上下文

执行上下文包含了三个重要的属性：

1. 变量对象
2. 作用域链
3. this绑定

用伪代码表示

```js
Context {
    VariableObject {
        arguments // 函数的arguments
        variable // 变量声明
        function // 函数声明
    }
    ScopeChain
    ThisBind
}
```

**创建执行上下文**

执行函数时会创建执行上下文，执行上下文的生命周期：

1. _创建阶段_：

- 变量对象
- 建立作用域链
- 绑定this

2. _执行阶段_：

- 变量赋值
- 执行代码

**执行栈**

每个函数都有自己的执行环境，当执行流进入一个函数时，会创建一个函数执行环境，并将环境推入到一个栈中，而这个函数执行完成之后，栈将其环境弹出，把控制权返回个之前的执行环境。

```js
function third() {}
function second() {}
function first() {
  second();
  third();
}
first();
```

<img src="http://zhongxk.com/blogImg/执行栈.png" title="执行栈" alt="执行栈" width="700px" style="max-width: none" />

**作用域链**

作用域链是保证执行上下文有权访问的所有变量和函数的有序访问。在创建函数时，会创建一个预先包含变量对象的作用域链，这个作用域链保存在内部的<font color=green>[[Scope]]</font>属性中

以second方法为例：

```
[[Scope]]: [
    second的变量对象,
    first的变量对象,
    全局的变量对象
]
```

这就是为什么，在一个函数内，可以访问外部函数的变量
