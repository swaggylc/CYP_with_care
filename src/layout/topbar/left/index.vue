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
                <!-- 动态展示路由标题 -->
                <el-breadcrumb-item :to="item.path" v-for="(item,index) in $route.matched" :key="index" v-show="item.meta.title">
                <span>{{ item.meta.title }}</span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { DArrowRight } from '@element-plus/icons-vue'
import useLayoutStore from '@/store/modules/menu.ts'
let useUserLayoutStore = useLayoutStore()

let $route = useRoute()

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