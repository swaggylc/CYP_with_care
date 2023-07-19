<template>
    <el-card>
        <el-form inline>
            <el-form-item label="一级分类">
                <el-select>
                    <el-option label="通信"></el-option>
                    <el-option label="家电"></el-option>
                    <el-option label="电脑"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select>
                    <el-option label="通信"></el-option>
                    <el-option label="家电"></el-option>
                    <el-option label="电脑"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select>
                    <el-option label="通信"></el-option>
                    <el-option label="家电"></el-option>
                    <el-option label="电脑"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.el-form {
    .el-form-item {
        margin-right: 20px;
        margin-bottom: 0;
    }
}
</style>