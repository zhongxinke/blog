
export function createElement(width: number) {
    const ratio = Math.random() * 2.6 + 0.5;
    const height = width * ratio;
    const backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    const delay = Math.floor(Math.random() * 1000);
    return {
        load() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        height,
                        backgroundColor
                    });
                }, delay);
            })
        }
    }
}