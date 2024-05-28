<script setup lang="ts">
import TextEllipsis from "./index.vue";
</script>

<template>
  <p>
    <strong>单行</strong>
    <TextEllipsis>
      这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字
    </TextEllipsis>
  </p>
  <p>
    <strong>多行</strong>
    <TextEllipsis :row-count="3">
      这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字
    </TextEllipsis>
  </p>
</template>
