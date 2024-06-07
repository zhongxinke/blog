# Promise

## 1.实现sleep方法

```js
async function sleep(func, duration) {
  setTimeout(() => {
    func?.();
  }, duration);
}

async function foo() {
  await sleep(1000);
  await sleep(2000);
  console.log("complete");
}
foo();
```

## 2.使用 Promise 实现红绿灯，红灯 3秒亮一次，黄灯 2秒亮一次，绿灯 1秒亮一次。如何使用 Promise 让三个灯不间断交替重复亮

```js

```
