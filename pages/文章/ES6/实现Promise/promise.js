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

  isIterable(obj) {
    return obj !== null && typeof obj[Symbol.iterator] === "function";
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

const p = CustomPromise.race([1, 2, 3]);
p.then(
  data => {
    console.log({ data });
  },
  err => {
    console.log({ err });
  }
);
