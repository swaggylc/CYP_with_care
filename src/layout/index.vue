<template>
    <div class="layout">
        <!-- 左侧菜单 -->
        <div class="left">
            <Logo></Logo>
            <!-- 菜单 -->
            <el-scrollbar class="scrollbar">
                <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#001529" text-color="#fff">
                    <Menu :menuData="userStore.menuList"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="top">
            top
        </div>
        <!-- 内容展示 -->
        <div class="content">
            content
        </div>
    </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
// import {
//     House,
//     DataBoard,
//     Lock,
//     ShoppingBag,
// } from '@element-plus/icons-vue'

// 获取用户仓库
import useUserStore from '@/store/modules/user.ts'
let userStore = useUserStore()

</script>

<style scoped lang="scss">
.layout {
    width: 100%;
    height: 100vh;

    .left {
        background-color: $leftMenuBgColor;
        width: $leftMenuWidth;
        height: 100vh;
        padding: 20px;

        .scrollbar {
            height: calc(100vh - 80px);
            border: nono;
            .el-menu{
                border: none;
            }
        }
    }

    .top {
        position: fixed;
        top: 0;
        left: $leftMenuWidth;
        background-color: $topNavBgColor;
        width: calc(100% - #{$leftMenuWidth});
        height: $topNavHeight;
    }

    .content {
        position: absolute;
        width: calc(100% - #{$leftMenuWidth});
        height: calc(100vh - #{$topNavHeight});
        left: $leftMenuWidth;
        top: $topNavHeight;
        padding: 20px;
        overflow: auto;
    }
}
</style>