<template>
    <div class="layout">
        <!-- 左侧菜单 -->
        <div class="left" :class="{ fold: useUserLayoutStore.isCollapse }">
            <Logo class="logo"></Logo>
            <!-- 菜单 -->
            <el-scrollbar class="scrollbar">
                <el-menu :collapse="useUserLayoutStore.isCollapse" :default-active="$route.path"
                    class="el-menu-vertical-demo" background-color="#001529" text-color="#fff">
                    <Menu :menuData="userStore.menuList"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="top" :class="{ fold: useUserLayoutStore.isCollapse }">
            <Topbar />
        </div>
        <!-- 内容展示 -->
        <div class="content" :class="{ fold: useUserLayoutStore.isCollapse }">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
// 左侧菜单logo
import Logo from './logo/index.vue'
// 左侧菜单
import Menu from './menu/index.vue'
// 内容展示
import Main from './main/index.vue'
// 引入顶部导航
import Topbar from './topbar/index.vue'

// 获取用户仓库
import useUserStore from '@/store/modules/user.ts'
let userStore = useUserStore()
// 获取菜单仓库
// @ts-ignore
import useLayoutStore from '@/store/modules/menu.ts'
let useUserLayoutStore = useLayoutStore()
//@ts-ignore
import { useRoute } from 'vue-router';
let $route = useRoute()




</script>
<script lang="ts">
export default {
    name: 'Layout',
}
</script>

<style scoped lang="scss">
.layout {
    width: 100%;
    height: 100vh;

    .left {
        background-color: $leftMenuBgColor;
        width: $leftMenuWidth;
        height: 100vh;
        padding: 20px 0;
        transition: all 0.5s;

        &.fold {
            width: $leftMenuCollapsedWidth;
        }

        .scrollbar {
            height: calc(100vh - 80px);
            border: nono;
            margin-left: 10px;

            .el-menu {
                border: none;
            }
        }
    }

    .top {
        position: fixed;
        top: 0;
        left: $leftMenuWidth;
        width: calc(100% - #{$leftMenuWidth});
        height: $topNavHeight;
        transition: all 0.5s;

        &.fold {
            width: calc(100% - #{$leftMenuCollapsedWidth});
            left: $leftMenuCollapsedWidth
        }
    }

    .content {
        position: absolute;
        width: calc(100% - #{$leftMenuWidth});
        height: calc(100vh - #{$topNavHeight});
        left: $leftMenuWidth;
        top: $topNavHeight;
        padding: 20px;
        overflow: auto;
        background-color: orange;
        transition: all 0.5s;

        &.fold {
            width: calc(100% - #{$leftMenuCollapsedWidth});
            left: $leftMenuCollapsedWidth
        }
    }
}
</style>