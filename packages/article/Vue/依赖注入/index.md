# 依赖注入

在不使用状态管理工具时，如果父组件的值要传给后代组件，那么props需要逐级传递，这就导致了一些不需要props的组件也要接收props。为了解决这一问题，vue提供了依赖注入

## Usage

**Provide(提供)**

提供给后代组件数组的

```vue
<script setup>
import { provide } from "vue";
provide(key, value);
</script>
```

**Inject(注入)**

要注入上层组件提供的数据

```vue
<script setup>
import { inject } from "vue";
const data = inject(key);
</script>
```

### 技巧

**Symbol**

可以创建一个文件存放Symbo对象，可以保证其唯一性

```js
// keys.js
export const key = Symbol("key");
```

**配合响应式数据使用**

注入方组件可能需要修改数据，建议在提供方组件声明一个更改数据的方法

```vue
<!-- 提供方组件 -->
<script setup>
import { provide, ref, readonly } from "vue";
const data = ref(0);
function update() {
  data.value++;
}
provide("key", {
  data,
  update
});
// 设置为只读
provide("key", readonly(data));
</script>
```
