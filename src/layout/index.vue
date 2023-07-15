<template>
    <div class="layout">
        <!-- 左侧菜单 -->
        <div class="left">
            <Logo></Logo>
            <!-- 菜单 -->
            <el-scrollbar class="scrollbar">
                <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#001529" text-color="#fff">
                    <el-menu-item index="1">
                        <el-icon>
                            <House />
                        </el-icon>
                        <span>首页</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <el-icon>
                            <DataBoard />
                        </el-icon>
                        <span>数据大屏</span>
                    </el-menu-item>
                    <el-sub-menu>
                        <template #title>
                            <el-icon>
                                <Lock />
                            </el-icon>
                            <span>权限管理</span>
                        </template>
                        <el-menu-item index="3-1">item one</el-menu-item>
                        <el-menu-item index="3-2">item two</el-menu-item>
                        <el-menu-item index="3-3">item two</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu>
                        <template #title>
                            <el-icon>
                                <ShoppingBag />
                            </el-icon>
                            <span>商品管理</span>
                        </template>
                        <el-menu-item index="4-1">item one</el-menu-item>
                        <el-menu-item index="4-2">item two</el-menu-item>
                    </el-sub-menu>
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
import {
    House,
    DataBoard,
    Lock,
    ShoppingBag,
} from '@element-plus/icons-vue'
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