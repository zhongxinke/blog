<script setup lang="ts">
import { ref } from "vue";
import Child from "./child.vue";
const value = ref(0);
</script>

<template>
  <strong>参数</strong>
  <div>value: {{ value }}<br /></div>
  <Child v-model.capitalize.trim="value" placeholder="输入内容" />
</template>

<style lang="scss" scoped></style>
