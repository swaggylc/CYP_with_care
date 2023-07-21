<template>
    <el-form label-width="100">
        <el-form-item label="spu名称">
            <el-input placeholder="请输入spu名称"></el-input>
        </el-form-item>
        <el-form-item label="spu品牌">
            <el-select placeholder="请选择spu品牌">
                <el-option label="魅族" value="魅族"></el-option>
                <el-option label="小米" value="小米"></el-option>
                <el-option label="华为" value="华为"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="spu描述">
            <el-input :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="spu图片">
            <el-upload list-type="picture-card">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
        </el-form-item>
        <el-form-item label="spu销售属性">
            <el-select placeholder="请选择销售属性">
                <el-option label="颜色" value="颜色"></el-option>
                <el-option label="大小" value="大小"></el-option>
                <el-option label="内存" value="内存"></el-option>
            </el-select>
            <el-button style="margin-left: 25px;" type="primary" icon="Plus">添加销售属性</el-button>

        </el-form-item>
        <el-table border style="margin: 20px 0;">
            <el-table-column label="序号" type="index" align="center" width="100" />
            <el-table-column label="属性名" width="150" />
            <el-table-column label="属性值" />
            <el-table-column label="操作" width="150">
                <template #="{ row, $index }">
                    <el-button type="danger" icon="Delete"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-form-item>
            <el-button type="primary">保存</el-button>
            <el-button @click="toZero">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
let $emit = defineEmits(['backToZero'])

//  通过自定义事件，返回到0场景
const toZero = () => {
    $emit('backToZero')
}

</script>

<style scoped></style>