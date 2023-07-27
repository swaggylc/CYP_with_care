<template>
  <el-card style="margin: 20px 0">
    <el-form inline class="elform">
      <el-form-item label="用户名：">
        <el-input />
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
      <el-table-column
        label="#"
        width="100"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column label="id" width="100" prop="id"></el-table-column>
      <el-table-column label="用户名字" prop="name"></el-table-column>
      <el-table-column label="用户名称" prop="username"></el-table-column>
      <el-table-column label="用户角色" prop="roleName"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column label="更新时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作" width="350" align="center">
        <template #="{ row, $index }">
          <el-button type="primary" icon="User">分配角色</el-button>
          <el-button type="primary" icon="Edit" @click="EditUser(row)">
            编辑
          </el-button>
          <el-button type="danger" icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      layout=" prev, pager, next, jumper,->, sizes,total"
      :total="total"
      @current-change="GetUserList"
      @size-change="handleSizeChange"
    />
  </el-card>
  <el-drawer v-model="visible" :show-close="true" size="25%" title="添加用户">
    <el-form>
      <el-form-item label="用户姓名">
        <el-input placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input placeholder="请输入用户昵称"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input placeholder="请输入用户密码"></el-input>
      </el-form-item>
    </el-form>
    <template #footer="">
      <el-button type="primary">确定</el-button>
      <el-button>取消</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 引入接口
import { getUserList } from '@/API/acl/user/index.ts'
// 引入ts类型
import { UserListResponse, User } from '@/API/acl/user/type.ts'

let currentPage = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)

let userArr = ref<User[]>([]) // 用户列表数据

let visible = ref<boolean>(false) // 控制抽屉的显示隐藏

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
}

// 点击编辑按钮的回调
const EditUser = (row: User) => {
  visible.value = true
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
