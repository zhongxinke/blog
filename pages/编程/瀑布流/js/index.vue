<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import { createElement } from '../utils/createElement';
    import useWaterfall from './useWaterfall';
    const elements = ref<any[]>([])
    const WIDTH = 100
    const {getPosition, containerRef} = useWaterfall({
        width: WIDTH,
        grap: 10
    })

    
    onMounted(async () => {
        for (let i = 0; i < 30; i++) {
            const element = createElement(WIDTH)
            const {height, backgroundColor} = await element.load()
            const {left, top} = getPosition(height, i)
            elements.value.push({
                left, 
                top,
                height,
                backgroundColor
            })
        }
    })
</script>

<template>
    <div class="container" ref="containerRef">
        <div class="item" v-for="(element, index) in elements" :style="{ 
            width: WIDTH + 'px',
            height: element.height + 'px', 
            backgroundColor: element.backgroundColor ,
            left: element.left + 'px',
            top: element.top + 'px'
        }">{{ index }}</div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    position: relative;
    border: 1px solid #ccc;
    box-sizing: border-box;
}
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }
    to {
        opacity: 1;
        transform: none;
    }
}
.item {
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeInUp 0.5s ease-in-out;
}
</style>
