# 分时函数的封装

<script setup>
import Demo from './demo.vue'
</script>
<Demo />

## 注意点

- 下一次分片什么时候开始

- 每次分片执行多少任务

### 实现思路

```javascript
export function performchunk(datas, handle) {
    console.log('performchunk', datas)
    if (datas === 0) {
        return;
    }

    let i = 0;

    // 开启下一个分片的执行
    function _run() {
        if (i >= datas) {
            return;
        }

        // 一个渲染中，空闲时间开启分片执行
        requestIdleCallback((idle) => {
            while (idle.timeRemaining() > 0 && i < datas) {
                handle?.()
                i++
            }
            _run()
        })
    }
    _run()
}
```

### 优化

```javascript
export function performchunk(datas, handle, scheduler) {

    if (typeof datas === 'number') {
        datas = {
            length: datas
        }
    }
    if (datas.length === 0) {
        return;
    }

    let i = 0;

    // 开启下一个分片的执行
    function _run() {
        if (i >= datas) {
            return;
        }

        // 一个渲染中，空闲时间开启分片执行
        scheduler(goOn => {
            while (goOn() && i < datas.length) {
                handle?.(datas[i], i)
                i++
            }
            _run()
        })
    }
    _run()
}

export function browserPerformChunk(datas, taskHandle) {
    const scheduler = (task) => {
        requestIdleCallback(idle => {
            task(() => idle.timeRemaining())
        })
    }
    performchunk(datas, taskHandle, scheduler)
}
```