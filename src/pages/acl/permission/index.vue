<template>
    <el-table :data="menuListData" style="width: 100%; margin-bottom: 20px" row-key="id" border>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="权限值" align="center" />
        <el-table-column prop="updateTime" label="修改时间" align="center" />
        <el-table-column prop="address" label="操作" align="center" width="280">
            <template #="{ row, $index }">
                <!-- row是单个菜单权限对象 -->
                <el-button type="primary" :disabled="row.level == 4" @click="addMenu">{{ row.level == 3 ? "添加功能" : "添加菜单"
                }}</el-button>
                <el-button :disabled="row.level == 1" @click="editMenu(row)">编辑</el-button>
                <el-button :disabled="row.level == 1" type="danger">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="添加菜单" width="30%">
        <el-form label-width="70">
            <el-form-item label="名称">
                <el-input placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="权限值">
                <el-input placeholder="请输入权限值" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 引入接口
import { getMenuList } from '@/API/acl/menu/index.ts'
// 引入ts类型
import type { MenuListType, MenuItem } from '@/API/acl/menu/type.ts'

let menuListData = ref<MenuItem[]>([])  // 菜单列表数据
let dialogVisible = ref<boolean>(false) // 添加菜单对话框的显示隐藏




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

// 点击添加菜单按钮的回调
const addMenu = () => {
    dialogVisible.value = true
}
// 点击编辑按钮的回调
const editMenu = (row: MenuItem) => {
    dialogVisible.value = true
}







</script>

<style scoped></style>