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
        <el-table :data="brandList" border style="width: 100%;margin: 20px 0;">
            <el-table-column prop="id" label="序号" width="120" align="center" />
            <el-table-column prop="tmName" label="品牌名称" />
            <el-table-column prop="address" label="品牌LOGO">
                <template #default="{ row }">
                    <img :src="row.logoUrl" style="width: 100px;height: 100px;">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作">
                <template #default="scope">
                    <el-button size="default" type="primary" icon="Edit">Edit</el-button>
                    <el-button size="default" type="danger" icon="Delete">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
            layout=" prev, pager, next, jumper,->,total, sizes" :total="total" />
    </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getBrandList } from '@/API/product/brand/index.ts'
import type { IBrandListRes, IBrandList } from '@/API/product/brand/type.ts'

let currentPage = ref<number>(1) // 当前页
let pageSize = ref<number>(5) // 每页显示条数
let total = ref<number>(0) // 总条数
let brandList = ref<IBrandList>([]) // 品牌列表



onMounted(() => {
    GetBrandList()
})






// 获取品牌列表的方法
const GetBrandList = async () => {
    let res: IBrandListRes = await getBrandList(currentPage.value, pageSize.value)
    console.log(res);
    if (res.code === 200) {
        brandList.value = res.data.records
        total.value = res.data.total
    }
}






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