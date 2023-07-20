<template>
    <div>
        <!-- 三级分类组件 -->
        <Type :scene="scene" />
        <el-card style="margin: 20px 0;">
            <template #header>
                <div class="card-header">
                    <span>SPU management</span>
                    <el-button class="button" type="primary" icon="Plus">添加spu</el-button>
                </div>
            </template>
            <!-- 表格部分 -->
            <el-table border style="margin: 20px 0;">
                <el-table-column label="序号" type="index" align="center" width="100" />
                <el-table-column label="SPU名称" width="250" />
                <el-table-column label="SPU描述" />
                <el-table-column label="操作" width="300" />
            </el-table>
            <!-- 分页器 -->
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 7, 9, 11]"
                layout=" prev, pager, next, jumper,->,total, sizes" :total="40" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'


let scene = ref<number>(0)
let currentPage = ref<number>(1)    // 当前页
let pageSize = ref<number>(5)   // 每页显示条数























</script>

<style scoped lang="scss">
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>