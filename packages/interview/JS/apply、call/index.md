# 手写方法

## 实现call方法

```js
Function.prototype.call = function (ctx, ...args) {
  ctx = ctx === undefined || ctx === null ? globalThis : Object(ctx);

  const key = Symbol("key");
  ctx[key] = this;
  const result = ctx[key](...args);

  delete ctx[key];
  return result;
};
```

## 实现apply方法

```js
Function.prototype.apply = function (ctx, args) {
  ctx = ctx === undefined || ctx === null ? globalThis : Object(ctx);

  const key = Symbol("key");
  ctx[key] = this;
  const result = ctx[key](...args);

  delete ctx[key];
  return result;
};
```

## 实际应用

**Object.prototype.toString.call**

判断对象类型，使用typeof无法判断null、object、array，因为这三者返回的都是object
可以使用下面方式实现区分

```js
Object.prototype.toString.call(null) // [object Null]
Object.prototype.toString.call([]]) // [object Array]
Object.prototype.toString.call({}) // [object Object]
```

**结合Math.max和Math.min**

```js
const nums = [1, 2, 3, 4, 5];
const max = Math.max.apply(null, nums);
const min = Math.min.apply(null, nums);
```
