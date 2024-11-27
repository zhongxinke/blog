<script setup lang="ts">
import { ref } from 'vue'
import {browserPerformChunk, performchunk} from './index'
const container = ref<HTMLElement>()
const create10wElements = () => {
  const taskHandler = (_, i) => {
    const el = document.createElement('div')
    el.innerText = i;
    container.value?.appendChild(el)
  }
  browserPerformChunk(10000, taskHandler)
}
</script>

<template>
  <button @click="create10wElements">创建10w个元素</button>
  <div ref="container"></div>
</template>

<style lang="scss" scoped>

</style>
