<template>
    <el-card style="margin: 20px 0">
        <el-form inline class="elform">
            <el-form-item label="角色名称：">
                <el-input placeholder="请输入角色名称" v-model="keyWord" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search" :disabled="keyWord.length == 0 ? true : false">搜索</el-button>
                <el-button @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card>
        <el-button type="primary">添加角色</el-button>
        <!-- 表格 -->
        <el-table border style="margin: 20px 0;" :data="roleList">
            <el-table-column label="#" align="center" type="index" width="80"></el-table-column>
            <el-table-column label="id" align="center" prop="id" width="120"></el-table-column>
            <el-table-column label="角色名称" align="center" show-overflow-tooltip prop="roleName"></el-table-column>
            <el-table-column label="创建时间" align="center" show-overflow-tooltip prop="createTime"></el-table-column>
            <el-table-column label="更新时间" align="center" show-overflow-tooltip prop="updateTime"></el-table-column>
            <el-table-column label="操作" width="350" align="center">
                <template #="{ row, $index }">
                    <!-- row代表单个职位对象 -->
                    <el-button icon="User" type="primary">分配权限</el-button>
                    <el-button icon="Edit">编辑</el-button>
                    <el-button icon="Delete" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
            layout=" prev, pager, next, jumper,->, sizes,total" :total="total" @size-change="changeSize"
            @current-change="GetRoleList" />
    </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 引入接口
import { getRolesList } from '@/API/acl/role/index.ts'
// 引入ts类型
import type { IRoleListType, IRoleItem } from '@/API/acl/role/type.ts'
import { ElMessage } from 'element-plus';

// 引入仓库
import useLayoutStore from '@/store/modules/menu.ts'
let menuStore = useLayoutStore()

let currentPage = ref(1)
let pageSize = ref(5)
let total = ref(0)

let keyWord = ref<string>('')
let roleList = ref<IRoleItem[]>([]) // 角色列表

onMounted(() => {
    GetRoleList()
})




// 获取角色列表的方法
const GetRoleList = async (pager: number = 1) => {
    currentPage.value = pager
    let res: IRoleListType = await getRolesList(currentPage.value, pageSize.value, keyWord.value)
    if (res.code == 200) {
        roleList.value = res.data.records
        total.value = res.data.total
    } else {
        ElMessage.error('获取角色列表失败!')
    }
}
// 改变每页显示条数的回调
const changeSize = (val: number) => {
    pageSize.value = val
    GetRoleList()
}
// 点击搜索按钮的回调
const search = () => {
    GetRoleList(1)
}
// 点击重置按钮的回调
const reSet = (val: any) => {
    menuStore.isRefresh = !menuStore.isRefresh
}





</script>

<style scoped lang="scss">
.elform {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-form-item {
        margin-bottom: 0;
    }
}
</style>