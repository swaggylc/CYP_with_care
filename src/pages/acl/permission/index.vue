<template>
    <el-table :data="menuListData" style="width: 100%; margin-bottom: 20px" row-key="id" border>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="权限值" align="center" />
        <el-table-column prop="updateTime" label="修改时间" align="center" />
        <el-table-column prop="address" label="操作" align="center" width="280">
            <template #="{ row, $index }">
                <!-- row是单个菜单权限对象 -->
                <el-button type="primary" :disabled="row.level == 4">{{ row.level == 3 ? "添加功能" : "添加菜单" }}</el-button>
                <el-button :disabled="row.level == 1">编辑</el-button>
                <el-button :disabled="row.level == 1" type="danger">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 引入接口
import { getMenuList } from '@/API/acl/menu/index.ts'
// 引入ts类型
import type { MenuListType, MenuItem } from '@/API/acl/menu/type.ts'

let menuListData = ref<MenuItem[]>([])

onMounted(() => {
    getMenuListData()
})

// 获取菜单列表的方法
const getMenuListData = async () => {
    let res: MenuListType = await getMenuList()
    if (res.code === 200) {
        menuListData.value = res.data
    }
}









</script>

<style scoped></style>