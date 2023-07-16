<template>
    <div class="right">
        <el-button type="primary" :icon="Refresh" circle size="large" />
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