<template>
    <div class="left">
        <div class="icon">
            <el-icon @click="changeStyle">
                <Expand v-if="useUserLayoutStore.isCollapse" />
                <Fold v-else />
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

import useLayoutStore from '@/store/modules/menu.ts'

let useUserLayoutStore = useLayoutStore()



// 点击图标的回调
const changeStyle = () => {
    useUserLayoutStore.isCollapse = !useUserLayoutStore.isCollapse

}





</script>
<script lang="ts">
export default {
    name: "Left"
}
</script>
<style scoped lang="scss">
.left {
    display: flex;

    .icon {
        display: flex;
        align-items: center;
        margin: 0 20px;
        cursor: pointer;
    }

    .bread {
        display: flex;
        align-items: center;
    }
}
</style>