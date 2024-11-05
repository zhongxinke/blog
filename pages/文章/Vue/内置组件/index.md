# 内置组件

- Suspence
- KeepLive
- Transition

## Suspence

<script stepup>
</script>


<Suspense v-if="false">
    <template #default>
        完成
    </template>
    <template #fallback>
       <div class="loading">loading</div>
    </template>
</Suspense>