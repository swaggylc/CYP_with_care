<template>
    <el-card class="box-card">
        <!-- 卡片头部 -->
        <template #header>
            <div class="card-header">
                <span>Brand management</span>
                <el-button class="button" type="primary" icon="Plus" @click="addBrand">添加品牌</el-button>
            </div>
        </template>
        <!-- 卡片身体 -->
        <el-table :data="brandList" border style="width: 100%;margin: 20px 0;">
            <el-table-column label="序号" width="120" align="center" type="index" />
            <el-table-column prop="tmName" label="品牌名称" />
            <el-table-column prop="address" label="品牌LOGO">
                <template #default="{ row }">
                    <img :src="row.logoUrl" style="width: 100px;height: 100px;">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作">
                <template #default="scope">
                    <el-button size="default" type="primary" icon="Edit" @click="editBrand">Edit</el-button>
                    <el-button size="default" type="danger" icon="Delete">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
            layout=" prev, pager, next, jumper,->,total, sizes" :total="total" @current-change="changeCurrent"
            @size-change="changeSize" />
    </el-card>
    <!-- 对话框 -->
    <el-dialog v-model="dialogFormVisible" title="添加品牌">
        <el-form style="width: 70%;">
            <el-form-item label="品牌名称" label-width="80px">
                <el-input placeholder="请输入品牌名称"></el-input>
            </el-form-item>
            <el-form-item label="品牌logo" label-width="80px">
                <el-upload class="avatar-uploader" :show-file-list="false">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getBrandList } from '@/API/product/brand/index.ts'
import type { IBrandListRes, IBrandList } from '@/API/product/brand/type.ts'

let currentPage = ref<number>(1) // 当前页
let pageSize = ref<number>(5) // 每页显示条数
let total = ref<number>(0) // 总条数
let brandList = ref<IBrandList>([]) // 品牌列表
let dialogFormVisible = ref<boolean>(true) // 对话框显示隐藏


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

// 点击页码的回调
const changeCurrent = (val: number) => {
    currentPage.value = val
    // 重新获取品牌列表
    GetBrandList()
}
// 点击每页显示条数的回调
const changeSize = (val: number) => {
    pageSize.value = val
    currentPage.value = 1
    // 重新获取品牌列表
    GetBrandList()
}
// 点击添加品牌按钮的回调
const addBrand = () => {
    dialogFormVisible.value = true
}
// 点击修改品牌按钮的回调
const editBrand = () => {
    dialogFormVisible.value = true
}
// 点击取消按钮的回调
const cancel = () => {
    dialogFormVisible.value = false
}
// 点击确定按钮的回调
const confirm = () => {
    dialogFormVisible.value = false
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

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>