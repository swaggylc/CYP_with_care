<template>
    <div class="right">
        <el-button type="primary" :icon="Refresh" circle size="large" @click="refresh" />
        <el-button type="success" :icon="FullScreen" circle size="large" @click="fullScreen" />
        <el-button type="info" :icon="Setting" circle size="large" />
        <img :src="userStore.avatar" alt="">
        <el-dropdown trigger="click">
            <span class="el-dropdown-link">
                {{ userStore.username }}
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
// 引入移除token的方法
import { Refresh, FullScreen, Setting } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router';
let $router = useRouter()
let $route = useRoute()
// 获取菜单仓库
// @ts-ignore
import useLayoutStore from '@/store/modules/menu.ts'
let useUserLayoutStore = useLayoutStore()
// 获取用户小仓库
// @ts-ignore
import useUserStore from '@/store/modules/user.ts'
let userStore = useUserStore()


// 点击刷新的回调
const refresh = () => {
    useUserLayoutStore.isRefresh = !useUserLayoutStore.isRefresh
}
// 点击全屏按钮的回调
const fullScreen = () => {
    // DOM对象的一个属性，判断是否是全屏状态,若是全屏状态，返回一个ture,否则返回null
    let full = document.fullscreenElement
    if (!full) {
        // 全屏
        // 文档对象的一个方法，用于将当前的文档对象进入全屏状态
        document.documentElement.requestFullscreen()
    } else {
        // 退出全屏
        document.exitFullscreen()
    }
}
// 退出登陆的回调
const logout = () => {
    // 清空token
    userStore.logout()
    // 跳转到登陆页面
    $router.push({
        path: '/login',
        query: {
            redirect: $route.path
        }
    })
}





</script>
<script lang="ts">
export default {
    name: 'Right',
}
</script>
<style scoped lang="scss">
.right {
    display: flex;
    align-items: center;

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 0 20px;
    }

    .el-dropdown-link {
        margin-right: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
    }
}
</style>