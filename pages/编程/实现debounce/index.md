# 实现Debounce

```js
function debounce(fnc, { duration = 300, immediate = true } = {}) {
  let timerId;
  return function (...args) {
    if (immediate && !timerId) {
      fnc.apply(this, args);
    }
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      if (!immediate) {
        fnc.apply(this, args);
      } else {
        timerId = null
      }
    }, duration);
  };
}
```
