<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <!-- 渲染 一级路由layout的子路由过渡动画-->
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script setup lang="ts">

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