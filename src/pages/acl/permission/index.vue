<template>
    <el-table :data="menuListData" style="width: 100%; margin-bottom: 20px" row-key="id" border>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="权限值" align="center" />
        <el-table-column prop="updateTime" label="修改时间" align="center" />
        <el-table-column prop="address" label="操作" align="center" width="280">
            <template #="{ row, $index }">
                <!-- row是单个菜单权限对象 -->
                <el-button type="primary" :disabled="row.level == 4" @click="addMenu(row)">{{ row.level == 3 ? "添加功能" :
                    "添加菜单"
                }}</el-button>
                <el-button :disabled="row.level == 1" @click="editMenu(row)">编辑</el-button>
                <el-popconfirm title="确定删除该项吗?" width="180" @confirm="deleteMenuById(row.id)">
                    <template #reference>
                        <el-button :disabled="row.level == 1" type="danger">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" :title="addOrUpdateParams.id ? '编辑菜单' : '添加菜单'" width="30%">
        <el-form label-width="70">
            <el-form-item label="名称">
                <el-input placeholder="请输入名称" v-model="addOrUpdateParams.name" />
            </el-form-item>
            <el-form-item label="权限值">
                <el-input placeholder="请输入权限值" v-model="addOrUpdateParams.code" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="AddOrUpdateMenu">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
// 引入接口
import { getMenuList, addOrUpdateMenu, deleteMenu } from '@/API/acl/menu/index.ts'
// 引入ts类型
import type { MenuListType, MenuItem, AddOrUpdateMenuParamsType } from '@/API/acl/menu/type.ts'
import { ElMessage } from 'element-plus';

let menuListData = ref<MenuItem[]>([])  // 菜单列表数据
let dialogVisible = ref<boolean>(false) // 添加菜单对话框的显示隐藏
let addOrUpdateParams = reactive<AddOrUpdateMenuParamsType>({       // 添加或者编辑菜单的参数
    pid: 0, // 父级菜单id
    name: '',// 菜单名称
    code: '',// 菜单权限编码
    level: 0,// 菜单层级
})



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
const addMenu = (row: MenuItem) => {
    // 清空数据
    Object.assign(addOrUpdateParams, {
        pid: 0,
        name: '',
        code: '',
        level: 0,
    })
    dialogVisible.value = true
    // 收集数据
    addOrUpdateParams.pid = row.id as number
    addOrUpdateParams.level = row.level + 1
}
// 点击编辑按钮的回调
const editMenu = (row: MenuItem) => {
    dialogVisible.value = true
    // 收集数据
    Object.assign(addOrUpdateParams, row)
}
// 对话框点击确定按钮的回调
const AddOrUpdateMenu = async () => {
    let res: any = await addOrUpdateMenu(addOrUpdateParams)
    if (res.code === 200) {
        getMenuListData()
        dialogVisible.value = false
        ElMessage.success(addOrUpdateParams.id ? "编辑成功" : "添加成功")
    } else {
        ElMessage.error(addOrUpdateParams.id ? "编辑失败" : "添加失败")
    }
}
// 气泡框确认按钮的回调
const deleteMenuById = async (id: number) => {
    let res: any = await deleteMenu(id)
    if (res.code === 200) {
        getMenuListData()
        ElMessage.success("删除成功")
    } else {
        ElMessage.error("删除失败")
    }
}





</script>

<style scoped></style>