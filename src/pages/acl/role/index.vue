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
        <el-button type="primary" @click="addRole">添加角色</el-button>
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
                    <el-button icon="User" type="primary" @click="setAcl(row)">分配权限</el-button>
                    <el-button icon="Edit" @click="editRole(row)">编辑</el-button>
                    <el-button icon="Delete" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
            layout=" prev, pager, next, jumper,->, sizes,total" :total="total" @size-change="changeSize"
            @current-change="GetRoleList" />
    </el-card>
    <el-dialog v-model="dialogVisible" :title="addOrUpdateParams.id ? '编辑角色' : '添加角色'" width="30%">
        <el-form :model="addOrUpdateParams" :rules="rules" ref="dialogForm">
            <el-form-item label="角色名称" prop="roleName">
                <el-input placeholder="请输入角色名称" v-model="addOrUpdateParams.roleName"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="AddOrUpdateRole">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
    <!-- 抽屉组件,分配权限 -->
    <el-drawer v-model="showDrawer" size="25%">
        <template #header>
            <h4>权限分配</h4>
        </template>
        <template #default>
            <!-- 抽屉主体部分 树形控件-->
            <el-tree ref="tree" :data="PermissionList" show-checkbox node-key="id" default-expand-all
                :default-checked-keys="checkedIdList" :props="defaultProps" />
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancelClick">取消</el-button>
                <el-button type="primary" @click="confirmClick">确定</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
// 引入接口
import { getRolesList, addOrUpdateRole, getAllPermission, assignPermission } from '@/API/acl/role/index.ts'
// 引入ts类型
import type { IRoleListType, IRoleItem, IPermissionListType, IPermissionItem } from '@/API/acl/role/type.ts'
import { ElMessage } from 'element-plus';

// 引入仓库
import useLayoutStore from '@/store/modules/menu.ts'
let menuStore = useLayoutStore()

let currentPage = ref(1)
let pageSize = ref(5)
let total = ref(0)

let keyWord = ref<string>('')
let roleList = ref<IRoleItem[]>([]) // 角色列表

let dialogVisible = ref<boolean>(false) // 是否显示弹窗
let addOrUpdateParams = reactive<IRoleItem>({
    roleName: '',
})
let dialogForm = ref<any>()   // 弹窗表单实例

let showDrawer = ref<boolean>(false) // 是否显示抽屉
let PermissionList = ref<IPermissionItem[]>([]) // 权限列表
let checkedIdList = ref<number[]>([]) // 选中的权限id列表(第四层)
let tree = ref<any>()   // 树形控件实例

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
// 点击弹窗确定按钮的回调
const AddOrUpdateRole = async () => {
    await dialogForm.value.validate()
    let res: any = await addOrUpdateRole(addOrUpdateParams)
    if (res.code == 200) {
        ElMessage.success(addOrUpdateParams.id ? '编辑角色成功!' : '添加角色成功!')
        GetRoleList(addOrUpdateParams.id ? currentPage.value : 1)
        dialogVisible.value = false
    } else {
        ElMessage.error(addOrUpdateParams.id ? '编辑角色失败!' : '添加角色失败!')
    }
}
// 点击编辑按钮的回调
const editRole = (row: IRoleItem) => {
    dialogVisible.value = true
    Object.assign(addOrUpdateParams, row)
    nextTick(() => {
        dialogForm.value.clearValidate()
    })
}
// 点击添加角色按钮的回调
const addRole = () => {
    dialogVisible.value = true
    if (addOrUpdateParams.id) {
        delete addOrUpdateParams.id
    }
    Object.assign(addOrUpdateParams, {
        roleName: '',
    })
    nextTick(() => {
        dialogForm.value.clearValidate()
    })
}
// roleName的验证规则
const validateRoleName = (rule: any, value: string, callback: any) => {
    if (value.trim().length < 2) {
        return callback(new Error('角色名称不能少于2位!'))
    }
    callback()
}
// 表单验证规则
const rules = {
    roleName: [
        { required: true, trigger: 'blur', validator: validateRoleName },
    ],
}

// 点击分配权限按钮的回调
const setAcl = async (row: IRoleItem) => {
    showDrawer.value = true
    Object.assign(addOrUpdateParams, row)
    let res: IPermissionListType = await getAllPermission(row.id as number)
    if (res.code == 200) {
        // 存储权限列表
        PermissionList.value = res.data
        // 过滤出选中的权限id
        checkedIdList.value = filterCheckedId(PermissionList.value, [])
    }
}
// 过滤出选中的权限id
const filterCheckedId = (data: IPermissionItem[], initArr: number[]) => {
    data.forEach(item => {
        if (item.select && item.level == 4) {
            initArr.push(item.id)
        }
        if (item.children && item.children.length > 0) {
            filterCheckedId(item.children, initArr)
        }
    })
    return initArr
}


// 分配权限抽屉取消按钮的回调
const cancelClick = () => {
    showDrawer.value = false
}
// 分配权限抽屉确认按钮的回调
const confirmClick = async () => {
    showDrawer.value = false
    let roleId = addOrUpdateParams.id as number
    // 选中节点的id列表
    let arr = tree.value.getCheckedKeys()
    // 半选的节点的id列表
    let halfCheckedArr = tree.value.getHalfCheckedKeys()
    let permissionIdList = arr.concat(halfCheckedArr)
    let res: any = await assignPermission(roleId, permissionIdList)
    if (res.code == 200) {
        ElMessage.success('分配权限成功!')
        // 关闭抽屉
        showDrawer.value = false
        // 刷新角色列表
        window.location.reload()
    } else {
        ElMessage.error('分配权限失败!')
    }
}













// 树形控件配置对象
const defaultProps = {
    children: 'children',
    label: 'name',
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