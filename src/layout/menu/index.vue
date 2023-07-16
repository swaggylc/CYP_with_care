<template>
    <template v-for="(item, index) in menuData" :key="index">
        <!-- 没有子路由 -->
        <template v-if="!item.children">
            <el-menu-item v-if="!item.meta.hidden" :index="item.path">
                <template #title>
                    <span>tubiao</span>
                    <span>{{ item.meta?.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <!-- 有子路由但数量为一 -->
        <template v-if="item.children && item.children.length == 1">
            <el-menu-item v-if="!item.children[0].meta.hidden" :index="item.children[0].path">
                <template #title>
                    <span>tubiao</span>
                    <span>{{ item.children[0].meta?.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <!-- 有子路由且两个以上 -->
        <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
            <template #title>
                <span>tubiao</span>
                <span>{{ item.meta?.title }}</span>
            </template>
            <Menu :menuData="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
defineProps(['menuData'])
</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>

<style scoped lang="scss"></style>