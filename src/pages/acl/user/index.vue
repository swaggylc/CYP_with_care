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
    <el-button type="primary">添加</el-button>
    <el-button type="danger">批量删除</el-button>
    <el-table border style="margin: 20px 0">
      <el-table-column type="selection" width="80" />
      <el-table-column label="#" width="100" align="center"></el-table-column>
      <el-table-column label="id" width="100"></el-table-column>
      <el-table-column label="用户信息"></el-table-column>
      <el-table-column label="用户名称"></el-table-column>
      <el-table-column label="用户角色"></el-table-column>
      <el-table-column label="创建时间"></el-table-column>
      <el-table-column label="更新时间"></el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template #="{ row, $index }">
          <el-button type="primary" icon="User">分配角色</el-button>
          <el-button type="primary" icon="Edit">编辑</el-button>
          <el-button type="danger" icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout=" prev, pager, next, jumper,->, sizes,total"
      :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let currentPage = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(40)
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
