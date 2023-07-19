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
                <template #default="{ row }">
                    <el-button size="default" type="primary" icon="Edit" @click="editBrand(row)">Edit</el-button>
                    <el-popconfirm title="确定删除该品牌吗?" width="200" @confirm="DeleteBrand(row)">
                        <template #reference>
                            <el-button size="default" type="danger" icon="Delete">Delete</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
            layout=" prev, pager, next, jumper,->,total, sizes" :total="total" @current-change="GetBrandList"
            @size-change="changeSize" />
    </el-card>
    <!-- 对话框 -->
    <el-dialog v-model="dialogFormVisible" :title="formData.id ? '修改品牌' : '添加品牌'">
        <el-form ref="form" style="width: 70%;" :model="formData" :rules="rules">
            <el-form-item label="品牌名称" label-width="80px" prop="tmName">
                <el-input placeholder="请输入品牌名称" v-model="formData.tmName"></el-input>
            </el-form-item>
            <el-form-item label="品牌logo" label-width="80px" prop="logoUrl">
                <el-upload class="avatar-uploader" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
                    :show-file-list="false" action="/api/admin/product/fileUpload">
                    <img v-if="formData.logoUrl" :src="formData.logoUrl" class="avatar" />
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
import { ref, onMounted, reactive, nextTick } from 'vue'
import { getBrandList, addOrUpdateBrand, deleteBrand } from '@/API/product/brand/index.ts'
import type { IBrandListRes, IBrandList, IBrandItem } from '@/API/product/brand/type.ts'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
let currentPage = ref<number>(1) // 当前页
let pageSize = ref<number>(5) // 每页显示条数
let total = ref<number>(0) // 总条数
let brandList = ref<IBrandList>([]) // 品牌列表
let dialogFormVisible = ref<boolean>(false) // 对话框显示隐藏
let formData = reactive<IBrandItem>({   // 对话框表单数据
    logoUrl: '',
    tmName: ''
})
let form = ref<any>() // 获取表单实例

onMounted(() => {
    GetBrandList()
})



// 获取品牌列表的方法
const GetBrandList = async (pager: number = 1) => {
    currentPage.value = pager
    let res: IBrandListRes = await getBrandList(currentPage.value, pageSize.value)
    if (res.code === 200) {
        brandList.value = res.data.records
        total.value = res.data.total
    }
}

// 点击每页显示条数的回调
const changeSize = (val: number) => {
    pageSize.value = val
    // 重新获取品牌列表
    GetBrandList(1)
}
// 点击添加品牌按钮的回调
const addBrand = () => {
    dialogFormVisible.value = true
    // 重置表单数据
    formData.logoUrl = ''
    formData.tmName = ''
    if (formData.id) {
        delete formData.id
    }
    // 重置表单校验结果
    // 第一种方法：ts的问号语法
    // form.value?.clearValidate()
    // 第二种方法：使用nextTick
    nextTick(() => {
        form.value.clearValidate()
    })
}
// 点击修改品牌按钮的回调
const editBrand = (data: any) => {
    dialogFormVisible.value = true
    // 将数据回显
    Object.assign(formData, data)
    // 重置表单校验结果
    form.value?.clearValidate()
}
// 点击取消按钮的回调
const cancel = () => {
    dialogFormVisible.value = false
}
// 点击确定按钮的回调
const confirm = async () => {
    // 表单校验
    await form.value.validate()
    dialogFormVisible.value = false
    let res: any = await addOrUpdateBrand(formData)
    if (res.code === 200) {
        ElMessage.success(formData.id ? '修改成功' : '添加成功')
        // 关闭对话框
        dialogFormVisible.value = false
        // 重新获取品牌列表
        GetBrandList(formData.id ? currentPage.value : 1)
    } else {
        ElMessage.error(formData.id ? '修改失败' : '添加失败')
        // 关闭对话框
        dialogFormVisible.value = false
    }
}

// 文件上传前的钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type === 'image/png' || rawFile.type === 'image/jpeg') {
        if (rawFile.size / 1024 / 1024 < 2) {
            return true
        } else {
            ElMessage.error('上传图片大小不能超过2M')
            return false
        }
    } else {
        ElMessage.error('请上传png或者jpg格式的图片')
        return false
    }
}
// 文件上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (res, file) => {
    if (res.code === 200) {
        formData.logoUrl = res.data
        ElMessage.success('上传成功')
        // 清除校验结果
        form.value.clearValidate('logoUrl')
    } else {
        ElMessage.error('上传失败')
    }
}

// 品牌名称的自定义校验规则
const validatorTmName = (rule: any, value: string, callback: any) => {
    if (value.length < 2 || value.length > 10) {
        callback(new Error('品牌名称长度在2-10之间'))
    } else {
        callback()
    }
}
// 品牌logo的自定义校验规则
const validatorLogoUrl = (rule: any, value: string, callback: any) => {
    if (!value) {
        callback(new Error('品牌logo不能为空'))
    } else {
        callback()
    }
}

// 自定义校验规则
const rules = {
    tmName: [
        { required: true, trigger: 'change', validator: validatorTmName },
    ],
    logoUrl: [
        { required: true, validator: validatorLogoUrl }
    ]
}

// 删除品牌的回调
const DeleteBrand = async (row: any) => {
    let res: any = await deleteBrand(row.id)
    if (res.code === 200) {
        ElMessage.success('删除成功')
        // 重新获取品牌列表
        GetBrandList(brandList.value.length > 1 ? currentPage.value : currentPage.value - 1)
    } else {
        ElMessage.error(res.data || '删除失败')
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