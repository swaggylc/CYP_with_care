<template>
    <template v-for="(item, index) in menuData" :key="index">
        <!-- 没有子路由 -->
        <template v-if="!item.children">
            <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="goroute">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta?.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <!-- 有子路由但数量为一 -->
        <template v-if="item.children && item.children.length == 1">
            <el-menu-item v-if="!item.children[0].meta.hidden" :index="item.children[0].path">
                <template #title>
                    <el-icon>
                        <component :is="item.children[0].meta.icon"></component>
                    </el-icon>
                    <span>{{ item.children[0].meta?.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <!-- 有子路由且两个以上 -->
        <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta?.title }}</span>
            </template>
            <Menu :menuData="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
defineProps(['menuData'])

const goroute=(data:any)=>{
    // data中的index属性就是路由路径
    console.log(data)
    // this.$router.push(data)
}













</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>

<style scoped lang="scss"></style>