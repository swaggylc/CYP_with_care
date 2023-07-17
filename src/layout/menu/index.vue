<template>
    <template v-for="(item, index) in menuData" :key="index">
        <!-- 没有子路由 -->
        <template v-if="!item.children">
            <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="goRoute">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.meta?.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <!-- 有子路由但数量为一 -->
        <template v-if="item.children && item.children.length == 1">
            <el-menu-item v-if="!item.children[0].meta.hidden" :index="item.children[0].path" @click="goRoute">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
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
import { useRouter } from 'vue-router'
defineProps(['menuData'])
const $router = useRouter()




const goRoute = (data: any) => {
    // data中的index属性就是路由路径
    // console.log(data.index)
    $router.push({
        path: data.index
    })
}





</script>

<script lang="ts">
export default {
    name: 'Menu'
}
</script>

<style scoped lang="scss"></style>