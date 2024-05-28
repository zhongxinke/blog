# 自定义指令

除了官方提供的v-model、v-show等指令，还可以自定义指令（Custom Directives）

## Usage

**组件内定义指令**

```vue
<script setup lang="ts">
const vFocus = {
  mounted: el => el.focus()
};
</script>

<template>
  <input v-focus />
</template>
```

**全局定义指令**

```ts
const app = createApp({});

app.directive("focus", {
  mounted: el => el.focus()
});
```

## 实现自定义指令

**v-debounce**

先来定义下使用方式，1000（默认500）表示延迟时间，immediate表示是否立即执行，接收一个函数

```vue
<script setup>
const onClick = () => {
  console.log("click");
};
</script>
<template>
  <button v-debounce:1000.immediate="onClick">按钮</button>
  <button v-debounce:immediate="onClick">按钮</button>
  <button v-debounce="onClick">按钮</button>
</template>
```

实现逻辑

```ts
import type { App } from "vue";

interface Debounce extends HTMLElement {
  _debounceHandler?: () => void;
  _timer?: NodeJS.Timeout | null;
}
export default (app: App) => {
  app.directive("debounce", {
    mounted: (el: Debounce, binding) => {
      if (typeof binding.value !== "function") {
        throw new Error(
          "v-debounce directive exepects a function as the value"
        );
      }

      const delay = binding.arg === "immediate" ? 500 : binding.arg || 500;
      const immediate =
        binding.arg === "immediate" || binding.modifiers.immediate;

      el._debounceHandler = () => {
        if (el._timer) clearTimeout(el._timer);

        if (immediate && !el._timer) {
          binding.value();
        }

        el._timer = setTimeout(() => {
          if (!immediate) {
            binding.value();
          }
          el._timer = null;
        }, +delay);
      };
      el.addEventListener("click", el._debounceHandler);
    },
    unmounted: (el: Debounce) => {
      if (el._timer) {
        clearTimeout(el._timer);
      }
      if (el._debounceHandler) {
        el.removeEventListener("click", el._debounceHandler);
        delete el._debounceHandler;
      }
    }
  });
};
```
