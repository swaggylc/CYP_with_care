<template>
    <div class="topbar">
        <div class="left">
            <Left />
        </div>
        <div class="right">
            <Right />
        </div>
    </div>
</template>

<script setup lang="ts">
// 引入左侧组件
import Left from './left/index.vue'
// 引入右侧组件
import Right from './right/index.vue'
</script>
<script lang="ts">
export default {
    name: 'Topbar',
}
</script>
<style scoped lang="scss">
.topbar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;

    .left {
        display: flex;
        align-items: center;
    }

    .right {
        display: flex;
        align-items: center;
    }
}
</style>