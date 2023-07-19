<template>
    <el-card>
        <el-form inline>
            <el-form-item label="一级分类">
                <el-select v-model="typeStore.OneId" @change="changeOne">
                    <el-option v-for="item in typeStore.ArrTypeOne" :key="item.id" :label="item.name"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select v-model="typeStore.TwoId" @change="changeTwo">
                    <el-option v-for="item in typeStore.ArrTypeTwo" :key="item.id" :label="item.name"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select v-model="typeStore.ThreeId" @change="changeThree">
                    <el-option v-for="item in typeStore.ArrTypeThree" :key="item.id" :label="item.name"
                        :value="item.id"></el-option>
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

// 第一级分类选中值的回调
const changeOne = (val: number) => {
    // 通知仓库发送请求获取二级分类数据
    typeStore.getTwoTypes(val);
    // 清空二、三级分类数据
    typeStore.TwoId = '';
    typeStore.ThreeId = '';
    typeStore.ArrTypeThree = [];
}
// 第二级分类选中值的回调
const changeTwo = (val: number) => {
    // 通知仓库发送请求获取三级分类数据
    typeStore.getThreeTypes(val);
    // 清空三级分类数据
    typeStore.ThreeId = '';
}
// 第三级分类选中值的回调
const changeThree = () => {

}



</script>

<style scoped lang="scss">
.el-form {
    .el-form-item {
        margin-right: 20px;
        margin-bottom: 0;
    }
}
</style>