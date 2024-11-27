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