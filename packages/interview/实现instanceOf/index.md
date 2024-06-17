# instanceOf

## 源码

```js
function Instanceof(L, R) {
  const o = R.prototype;
  L = L.__proto__;
  while (true) {
    if (L.__proto__ === null) return false;

    if (L.__proto__ !== o) return false;

    L = L.__proto__;
  }
}
```
