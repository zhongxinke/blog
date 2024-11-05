<script setup lang="ts">
const [model, modifiers] = defineModel({ default: 0 });
console.log({ modifiers });
</script>

<template>
  <input type="text" v-model="model" />
</template>

<style lang="scss" scoped></style>
