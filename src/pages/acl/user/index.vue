<template>
  <el-card style="margin: 20px 0">
    <el-form inline class="elform">
      <el-form-item label="用户名：">
        <el-input placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <el-button type="primary" @click="addUser">添加</el-button>
    <el-button type="danger">批量删除</el-button>
    <el-table border style="margin: 20px 0" :data="userArr">
      <el-table-column type="selection" width="80" align="center" />
      <el-table-column label="#" width="100" align="center" type="index"></el-table-column>
      <el-table-column label="id" width="100" prop="id"></el-table-column>
      <el-table-column label="用户名字" prop="name"></el-table-column>
      <el-table-column label="用户名称" prop="username"></el-table-column>
      <el-table-column label="用户角色" prop="roleName"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column label="更新时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作" width="350" align="center">
        <template #="{ row, $index }">
          <el-button type="primary" icon="User" @click="setRole(row)">
            分配角色
          </el-button>
          <el-button type="primary" icon="Edit" @click="EditUser(row)">
            编辑
          </el-button>
          <el-button type="danger" icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
      layout=" prev, pager, next, jumper,->, sizes,total" :total="total" @current-change="GetUserList"
      @size-change="handleSizeChange" />
  </el-card>
  <el-drawer v-model="visible" :show-close="true" size="25%" :title="userParams.id ? '编辑用户' : '添加用户'">
    <el-form :model="userParams" :rules="rules" ref="elform">
      <el-form-item label="用户姓名" prop="username">
        <el-input placeholder="请输入用户名" v-model="userParams.username"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="name">
        <el-input placeholder="请输入用户昵称" v-model="userParams.name"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
        <el-input placeholder="请输入用户密码" v-model="userParams.password"></el-input>
      </el-form-item>
    </el-form>
    <template #footer="">
      <el-button type="primary" @click="confirm">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </template>
  </el-drawer>
  <el-drawer v-model="drawer" title="分配角色">
    <el-form>
      <el-form-item label="用户姓名">
        <el-input v-model="userParams.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色列表">
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
        <!-- 显示所有职位 -->
        <el-checkbox-group v-model="currentRoleList" @change="handleCheckedChange">
          <el-checkbox v-for="role in allRoleList" :key="role.id" :label="role">
            {{ role.roleName }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="addRole">确定</el-button>
      <el-button @click="drawer = false">取消</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
// 引入接口
import {
  getUserList,
  addOrUpdateUser,
  getRoleList,
  assignRole
} from '@/API/acl/user/index.ts'
// 引入ts类型
import {
  UserListResponse,
  User,
  RoleListResponse,
  Role,
  AssignRoleParams
} from '@/API/acl/user/type.ts'
import { ElMessage } from 'element-plus'

let currentPage = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)

let userArr = ref<User[]>([]) // 用户列表数据

let visible = ref<boolean>(false) // 控制添加/修改用户抽屉的显示隐藏
let drawer = ref<boolean>(false) // 控制分配角色抽屉的显示隐藏
let elform = ref<any>()

let userParams = reactive<User>({
  name: '',
  username: '',
  password: '',
})

let allRoleList = ref<Role[]>([]) // 所有角色列表
let currentRoleList = ref<Role[]>([]) // 当前用户的角色列表
let checkAll = ref(false) // 全选按钮
let isIndeterminate = ref(true) // 全选按钮的状态


onMounted(() => {
  GetUserList()
})

// 获取用户列表的方法
const GetUserList = async (pager: number = 1) => {
  currentPage.value = pager
  let res: UserListResponse = await getUserList(
    currentPage.value,
    pageSize.value,
  )
  if (res.code == 200) {
    // 储存数据
    userArr.value = res.data.records
    total.value = res.data.total
  }
}

// 改变每页显示条数的回调
const handleSizeChange = (val: number) => {
  pageSize.value = val
  GetUserList()
}

// 点击添加用户按钮的回调
const addUser = () => {
  visible.value = true
  if (userParams.id) {
    delete userParams.id
  }
  // 清空userParams
  Object.assign(userParams, {
    name: '',
    username: '',
    password: '',
  })
  nextTick(() => {
    // 清除表单的校验
    elform.value.clearValidate()
  })
}

// 点击编辑按钮的回调
const EditUser = (row: User) => {
  visible.value = true
  Object.assign(userParams, row)
  // 重置表单的校验
  nextTick(() => {
    elform.value.clearValidate()
  })
}

// 点击抽屉确定按钮的回调
const confirm = async () => {
  // 校验表单
  await elform.value.validate()
  // 判断是添加还是编辑
  let res: any = await addOrUpdateUser(userParams)
  if (res.code == 200) {
    visible.value = false
    ElMessage.success(userParams.id ? '编辑成功' : '添加成功')
    GetUserList(userParams.id ? currentPage.value : 1)
    // 刷新页面
    window.location.reload()
  } else {
    ElMessage.error(userParams.id ? '编辑失败' : '添加失败')
  }
}

// 点击取消按钮的回调
const cancel = () => {
  visible.value = false
}
// 用户名的校验方法
const validatorUsername = (rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('用户名长度至少5位'))
  }
}
// 昵称的校验方法
const validatorName = (rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('昵称长度至少5位'))
  }
}
// 密码的校验方法
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少6位'))
  }
}

// 表单校验规则
const rules = {
  username: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorUsername,
    },
  ],
  name: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorName,
    },
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorPassword,
    },
  ],
}

// 点击分配角色按钮的回调
const setRole = async (row: User) => {
  // 存储参数传递的用户信息
  Object.assign(userParams, row)
  // 获取职位列表
  let res: RoleListResponse = await getRoleList(userParams.id as number)
  if (res.code == 200) {
    // 存储所有角色列表
    allRoleList.value = res.data.allRolesList
    // 存储当前用户的角色列表
    currentRoleList.value = res.data.assignRoles
  }

  drawer.value = true
}

// 全选按钮的回调
const handleCheckAllChange = (val: boolean) => {
  checkAll.value = val
  if (val) {
    currentRoleList.value = allRoleList.value
  } else {
    currentRoleList.value = []
  }
  isIndeterminate.value = false
}
// 单选按钮的change事件
const handleCheckedChange = (val: any) => {
  let checkedCount = val.length
  // 全选按钮,是否全选
  checkAll.value =
    checkedCount === allRoleList.value.length && checkedCount > 0
  // 样式
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRoleList.value.length
}
// 点击抽屉(分配职位)确定按钮的回调
const addRole = async () => {
  // 收集参数
  let roleIdList = currentRoleList.value.map((item) => item.id as number)
  let userId = userParams.id as number
  let data = {
    roleIdList,
    userId
  }
  // 发送请求
  let res: any = await assignRole(data)
  if (res.code == 200) {
    ElMessage.success('分配角色成功')
    drawer.value = false
    // 重新获取用户列表,留在当前页
    GetUserList(currentPage.value)
  } else {
    ElMessage.error('分配角色失败')
  }
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
