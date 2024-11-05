# 实现Promise

## 1.实现Promise的构造函数

- 构造函数接收一个函数，并传递resolve,reject方法
- 改变state，一旦改变状态就不会再变化
- 保存result，传递给resolve、reject
- 报异常时，调用reject

```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class CustomPromise {
  #state = PENDING;
  #result = undefined;

  #changeState(state, value) {
    if (this.#state === PENDING) {
      this.#state = state;
      this.#result = value;
    }
  }

  constructor(executor) {
    const resolve = value => {
      this.#changeState(FULFILLED, value);
    };
    const reject = reason => {
      this.#changeState(REJECTED, reason);
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
}

const promise = new CustomPromise((resolve, reject) => {
  resolve(1);
});

console.log({ promise });
```

## 2.实现then方法

- then方法接收两个方法参数
- **返回新的Promise**
- **微队列**
- **then方法执行时，状态可能是挂起状态，当状态为pending时，需要用保存onFulfilled和onRejected，等状态改变时执行**
- then方法可以多次执行，可以使用数组保存

```js

class CustomPromise {
    ...
    #handles = []

    #run() {
        if (this.#state === PENDING) return;
        while(this.#handles.length) {
            const {
                onFulfilled,
                onRejected,
                resolve,
                reject
            } = this.#handles.shift()

            if (this.#state === FULFILLED) {
                if (typeof onFulfilled === "function") {
                    onFulfilled(this.#result)
                }
            } else {
                if (typeof onRejected === "function") {
                    onRejected(this.#result)
                }
            }
        }
    }

    #changeState(state, value) {
        if (this.#state === PENDING) {
            ...
            this.#run()
        }
    }

    #mircoTask(fnc) {
        if (typeof process === "object" && process.nextTick === "function") {
            process.nextTick(fnc)
        } else if (typeof MutationObserver === "function") {
            const ob = new MutationObserver(fnc)
            const targetNode = document.createTextNode("1");
            ob.observe(targetNode, {
                characterData: true
            });
            targetNode.data = "2";
        } else {
            setTimeout(fnc, 0)
        }
    }
    then(onFulfilled, onRejected) {
        const promise = new CustomPromise((resolve, reject) => {
           this.handles.push({
                onFulfilled,
                onRejected,
                resolve,
                reject
           })
           this.#run()
        })
    }
}
```

## 3.then的返回值

then的返回值有两种可能：1.非Promise 2.Promise

- 判断Promise，**isPromiseLike()**

```js
class CustomPromise {
    ...
    #isPromiseLike(data) {
        if (data !== null && (typeof data === "object" || typeof data === "function")) {
            return data.then === "function"
        }
        return false;
    }
    #run() {
        ...
        while(this.#handles.length) {
           ...
            if (this.#state === FULFILLED) {
                if (typeof onFulfilled === "function") {
                    try {
                        const data = onFulfilled(this.#result)
                        if (this.#isPromiseLike(data)) {
                            data.then(resolve, reject)
                        } else {
                            resolve(data)
                        }
                    } catch(err) {
                        reject(err)
                    }
                }
            }
        }
    }
    ...
}
```

## 4.实现catch

```js
class CustomPromise {
    ...
    catch(onRejected) {
        return this.then(undefined, onRejected)
    }
}
```

## 5.实现finally

```js
class CustomPromise {
    ...
    finally(onFinally) {
        return this.then((value) => {
            if (typeof onFinally === 'function') {
                onFinally()
            }
            return  value
        }, (reason) => {
            if (typeof onFinally === 'function') {
                onFinally()
            }
            return  reason
        })
    }
}
```

## 6.实现静态方法resolve

```js
class CustomPromise {
    ...
    static resolve(value) {
        if (value instanceof CustomPromise) return value;
        return new CustomPromise((resolve, reject) => {
            if (value && value.then && typeof value.then === "function") {
                value.then(resolve, reject)
            } else {
                resolve(value)
            }
        })
    }
}
```

## 7.实现静态方法reject

```js
class CustomPromise {
    ...
    static reject(reason) {
        return new CustomePromise((_, reject) => {
            reject(reason)
        })
    }
}
```

## 8.实现静态方法all

- 等待所有兑现或第一个拒绝的结果

```js
class CustomPromise {
    ...
    #isIterable(obj) {
        return obj !== null && typeof obj[Symbol.iterator] === 'function'
    }
    static all(value) {
        const p = new CustomPromise((resolve, reject) => {
            const result = [];
            let count = 0;
            let fulfilledCount = 0;
            for (const item of value) {
                const i = count;
                this.resolve(item).then(data => {
                    result[i] = data;
                    fulfilledCount++;
                    if (fulfilledCount === count) {
                        resolve(result);
                    }
                }, reject);
                count++;
            }

            if (count === 0) {
                resolve(count);
            }
        });

        return p;
    }
}
```

## 9.实现静态方法racy

```js
class CustomPromise {
    ...
    static race(value) {
    return new CustomPromise((resolve, reject) => {
      for (const item of value) {
        this.resolve(item).then(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
      }
    });
  }
}
```

## 完整代码

```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class CustomPromise {
  #state = PENDING;
  #result = undefined;
  #handlers = [];

  #isPromiseLike(value) {
    if (
      value !== null &&
      (typeof value === "object" || typeof value === "function")
    ) {
      return typeof value.then === "function";
    }
    return false;
  }
  #runMicroTask(func) {
    if (typeof process === "object" && typeof process.nextTick === "function") {
      process.nextTick(func);
      return;
    }

    if (typeof MutationObserver === "function") {
      const ob = new MutationObserver(func);
      const textNode = document.createTextNode("1");
      ob.observe(textNode, {
        characterData: true
      });
      textNode.data = "2";
      return;
    }

    setTimeout(func, 0);
  }

  #changeState(state, value) {
    if (this.#state === PENDING) {
      this.#state = state;
      this.#result = value;
      this.#run();
    }
  }

  #runOne(callback, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof callback !== "function") {
        const settled = this.#state === FULFILLED ? resolve : reject;
        settled(this.#result);
        return;
      }
      try {
        const data = callback(this.#result);
        if (this.#isPromiseLike(data)) {
          data.then(resolve, reject);
        } else {
          resolve(data);
        }
      } catch (err) {
        reject(err);
      }
    });
  }
  #run() {
    if (this.#state === PENDING) return;
    while (this.#handlers.length) {
      const { onFulfilled, onRejected, resolve, reject } =
        this.#handlers.shift();
      if (this.#state === FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject);
      } else {
        this.#runOne(onRejected, resolve, reject);
      }
    }
  }
  constructor(executor) {
    const resolve = value => {
      this.#changeState(FULFILLED, value);
    };
    const reject = reason => {
      this.#changeState(REJECTED, reason);
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new CustomPromise((resolve, reject) => {
      this.#handlers.push({
        onFulfilled,
        onRejected,
        resolve,
        reject
      });
      this.#run();
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(onFinally) {
    return this.then(
      data => {
        onFinally();
        return data;
      },
      err => {
        onFinally();
        throw err;
      }
    );
  }

  static resolve(value) {
    if (value instanceof CustomPromise) return value;
    return new CustomPromise((resolve, reject) => {
      if (value && value.then && typeof value.then === "function") {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  }

  static reject(reason) {
    return new CustomPromise((_, reject) => {
      reject(reason);
    });
  }
}

new CustomPromise((resolve, reject) => {
  throw 123;
}).catch(e => {
  console.log(e);
});
```
