<template>
    <div class="right">
        <el-button type="primary" :icon="Refresh" circle size="large" @click="refresh" />
        <el-button type="success" :icon="FullScreen" circle size="large" />
        <el-button type="info" :icon="Setting" circle size="large" />
        <img src="../../../../public/ecut.jpg" alt="">
        <el-dropdown trigger="click">
            <span class="el-dropdown-link">
                admin
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>退出登陆</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import { Refresh, FullScreen, Setting } from '@element-plus/icons-vue'
// 获取菜单仓库
// @ts-ignore
import useLayoutStore from '@/store/modules/menu.ts'
let useUserLayoutStore = useLayoutStore()



// 点击刷新的回调
const refresh=()=>{
    useUserLayoutStore.isRefresh=!useUserLayoutStore.isRefresh
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