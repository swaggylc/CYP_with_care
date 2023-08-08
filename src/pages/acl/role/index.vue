<template>
    <el-card style="margin: 20px 0">
        <el-form inline class="elform">
            <el-form-item label="角色名称：">
                <el-input placeholder="请输入角色名称" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary">搜索</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card>
        <el-button type="primary">添加角色</el-button>
        <!-- 表格 -->
        <el-table border style="margin: 20px 0;">
            <el-table-column label="#" align="center" type="index"></el-table-column>
            <el-table-column label="id" align="center"></el-table-column>
            <el-table-column label="角色名称" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="更新时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="350" align="center">
                <template #="{ row, $index }">
                    <el-button icon="User">分配权限</el-button>
                    <el-button icon="Edit">编辑</el-button>
                    <el-button icon="Delete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
            layout=" prev, pager, next, jumper,->, sizes,total" :total="total" />
    </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'



let currentPage = ref(1)
let pageSize = ref(5)
let total = ref(0)

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