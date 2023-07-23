<template>
  <el-card class="box-card">
    <el-table style="width: 100%; margin: 20px 0" border>
      <el-table-column prop="date" label="序号" width="120" />
      <el-table-column prop="name" label="名称" width="250" />
      <el-table-column prop="address" label="描述" width="250" />
      <el-table-column prop="address" label="默认图片" width="250" />
      <el-table-column prop="address" label="重量(g)" width="250" />
      <el-table-column prop="address" label="价格(元)" width="250" />
      <el-table-column prop="address" label="操作" fixed="right" width="300">
        <template #default="{ row }">
          <el-button type="success" size="small" icon="Top"></el-button>
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="info" size="small" icon="Platform"></el-button>
          <el-button type="danger" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 15, 20, 25]"
      layout=" prev, pager, next, jumper,->,sizes,total "
      :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let currentPage = ref<number>(1)    // 当前页
let pageSize = ref<number>(10)    // 每页显示条数
let total = ref<number>(100)    // 总条数
</script>

<style scoped></style>
