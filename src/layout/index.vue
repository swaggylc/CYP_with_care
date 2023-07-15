<template>
    <div class="layout">
        <!-- 左侧菜单 -->
        <div class="left">
            left
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

</script>

<style scoped lang="scss">
.layout {
    width: 100%;
    height: 100vh;

    .left {
        background-color: $leftMenuBgColor;
        width: $leftMenuWidth;
        height: 100vh;
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