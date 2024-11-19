import { onMounted, ref } from "vue";

interface Options {
    width: number;
    grap?: number;
}

function getColumns(parentWidth, width, grap) {
    const columns = Math.floor(parentWidth / (width + grap));
    return columns > 0 ? columns : 1;
}

function findMinIndex(columns: number[]) {
    return columns.indexOf(Math.min(...columns));
}

export default function useWaterfall(options: Options) {
    const containerRef = ref<HTMLDivElement>()
    const { grap = 20, width } = options || {};
    let columns: number[] = [];

    onMounted(() => {
        if (!containerRef.value) {
            return;
        }
        const parentWidth = containerRef.value?.offsetWidth ?? 0;
        cal(parentWidth)
    })

    const cal = (parentWidth) => {
        columns = Array.from({ length: getColumns(parentWidth, width, grap) }).fill(0) as number[];

    }
    const getPosition = (height: number, i: number) => {
        if (!containerRef.value) {
            return { x: 0, y: 0 };
        }

        const index = findMinIndex(columns);

        const marginLeft = (containerRef.value.offsetWidth - (width * columns.length + grap * (columns.length - 1))) / 2;
        const left = (width + grap) * index + marginLeft;
        const top = columns[index] + grap;

        columns[index] += height + grap;

        containerRef.value.style.height = `${Math.max(...columns) + grap}px`;
        return { left, top };
    }

    return { containerRef, getPosition }
}