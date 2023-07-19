<template>
    <el-card>
        <el-form inline>
            <el-form-item label="一级分类">
                <el-select v-model="typeStore.OneId">
                    <el-option v-for="item in typeStore.ArrTypeOne" :key="item.id" :label="item.name"
                        :value="item.id"></el-option>
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
import { onMounted } from 'vue';

// 引入type仓库
//@ts-ignore
import useTypeStore from '@/store/modules/type.ts';
let typeStore = useTypeStore();



onMounted(() => {
    // 通知仓库发送请求获取分类数据
    typeStore.getOneTypes();
})







</script>

<style scoped lang="scss">
.el-form {
    .el-form-item {
        margin-right: 20px;
        margin-bottom: 0;
    }
}
</style>