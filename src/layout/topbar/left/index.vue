<template>
    <div class="left">
        <div class="icon">
            <el-icon>
                <Operation />
            </el-icon>
        </div>
        <div class="bread">
            <el-breadcrumb :separator-icon="DArrowRight">
                <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>

<script setup lang="ts">
import { DArrowRight } from '@element-plus/icons-vue'

</script>

<style scoped lang="scss">
.left {
    display: flex;

    .icon {
        display: flex;
        align-items: center;
        margin: 0 20px;
    }

    .bread {
        display: flex;
        align-items: center;
    }
}
</style>