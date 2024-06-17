<script setup lang="ts">
type A = keyof any;
import { computed } from "vue";

const props = withDefaults(
  defineProps<{ rowCount?: number; customStyle?: Object }>(),
  { rowCount: 1 }
);

const newStyle = computed(() => {
  const rowStyle =
    props.rowCount > 1 ? { "-webkit-line-clamp": props.rowCount } : null;
  return {
    ...rowStyle,
    ...props.customStyle
  };
});
</script>

<template>
  <div :class="[rowCount === 1 ? 'single' : 'multi']" :style="newStyle">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.single {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
.multi {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}
</style>
