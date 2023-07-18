<template>
    <el-card class="box-card">
        <!-- 卡片头部 -->
        <template #header>
            <div class="card-header">
                <span>Brand management</span>
                <el-button class="button" type="primary" icon="Plus">添加品牌</el-button>
            </div>
        </template>
        <!-- 卡片身体 -->
        <el-table border style="width: 100%;margin: 20px 0;">
            <el-table-column prop="date" label="序号" width="120" align="center" />
            <el-table-column prop="name" label="品牌名称" />
            <el-table-column prop="address" label="品牌LOGO" />
            <el-table-column prop="address" label="品牌操作" />
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
            layout=" prev, pager, next, jumper,->,total, sizes" :total="total" />
    </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let currentPage = ref(1) // 当前页
let pageSize = ref(10) // 每页显示条数
let total = ref(100) // 总条数

</script>

<style scoped lang="scss">
.box-card {
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>