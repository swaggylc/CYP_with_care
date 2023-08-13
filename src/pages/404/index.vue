<template>
    <div class="err">
        <span>页面走丢了。。。</span>
        <el-button type="primary" @click="toHome">回到首页</el-button>
        <img src="../../assets/images/error_images/404.png" alt="">
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const $router = useRouter()
const toHome = () => {
    $router.push('/home')
}
</script>

<style scoped lang="scss">
.err {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
        font-size: 28px;
        color: #999;
        font-weight: bold;
        // 斜体
        font-style: italic;
        // 字间距
        letter-spacing: 2px;
        margin: 20px 0;
    }
}
</style>