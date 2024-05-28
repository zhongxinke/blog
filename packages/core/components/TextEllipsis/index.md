# TextEllipsis

文字省略号，支持多行省略号

## Usage

```vue
<script setup lang="ts">
import TextEllipsis from "@zxk/comonents/TextEllipsis";
</script>

<TextEllipsis>
    这是一段非常非常非常非常非常非常非常长的字符
</TextEllipsis>

<TextEllipsis :row-count="2">
    这是一段非常非常非常非常非常非常非常长的字符这是一段非常非常非常非常非常非常非常长的字符这是一段非常非常非常非常非常非常非常长的字符
</TextEllipsis>
```
