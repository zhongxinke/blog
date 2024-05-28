<script setup lang="ts">
const alignProps = ["center", "start", "end"] as const;
const directionProps = ["column", "row"] as const;
const justifyProps = ["center", "start", "end", "around", "between"] as const;

withDefaults(
  defineProps<{
    direction?: (typeof directionProps)[number];
    justify?: (typeof justifyProps)[number];
    align?: (typeof alignProps)[number];
  }>(),
  {
    direction: "column",
    justify: "center",
    align: "center"
  }
);
</script>

<template>
  <div :class="['flex', direction, 'justify-' + justify, 'align-' + align]">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  box-sizing: border-box;

  &.column {
    flex-direction: column;
  }

  &.row {
    flex-direction: row;
  }
}
.justify {
  @at-root {
    #{&}-center {
      justify-content: center;
    }
    #{&}-start {
      justify-content: flex-start;
    }
    #{&}-end {
      justify-content: flex-end;
    }
    #{&}-around {
      justify-content: space-around;
    }
    #{&}-between {
      justify-content: space-between;
    }
  }
}
.align {
  @at-root {
    #{&}-center {
      align-items: center;
    }
    #{&}-top {
      align-items: flex-start;
    }
    #{&}-end {
      align-items: flex-end;
    }
  }
}
</style>
