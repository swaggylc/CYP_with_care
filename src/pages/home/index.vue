<template>
    <div>
        主页
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
// 获取用户小仓库
import useUserStore from '@/store/modules/user';
let userStore = useUserStore();

onMounted(() => {
    // 通知用户小仓库，发送请求，获取用户信息
    userStore.GetUserInfo();
});







</script>

<style scoped></style>