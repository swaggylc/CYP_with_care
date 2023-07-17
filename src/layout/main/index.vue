<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <!-- 渲染 一级路由layout的子路由过渡动画-->
            <component :is="Component" v-if="live" />
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
// 获取菜单仓库
// @ts-ignore
import useLayoutStore from '@/store/modules/menu.ts'
let useUserLayoutStore = useLayoutStore()

// 控制刷新组件
let live = ref(true)

// 监听仓库的数据变化
watch(() => useUserLayoutStore.isRefresh, () => {
    // 销毁组件
    live.value = false
    // 重新渲染组件
    // 响应式数据发生变化后，在下一次DOM更新循环结束之后执行回调
    nextTick(() => {
        live.value = true
    })
})







</script>
<script lang="ts">
export default {
    name: 'Main',
}
</script>
<style scoped>
.fade-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.fade-enter-active {
    transition: all 0.5s;
}

.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}
</style>