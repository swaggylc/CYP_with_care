<template>
    <el-form label-width="100">
        <el-form-item label="spu名称">
            <el-input placeholder="请输入spu名称" v-model="spuParams.spuName"></el-input>
        </el-form-item>
        <el-form-item label="spu品牌">
            <el-select placeholder="请选择spu品牌" v-model="spuParams.tmId">
                <el-option v-for="item in allBrandList" :label="item.tmName" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="spu描述">
            <el-input :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="请输入描述"
                v-model="spuParams.description" />
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
            </el-select>
            <el-button style="margin-left: 25px;" type="primary" icon="Plus">添加销售属性</el-button>

        </el-form-item>
        <el-table border style="margin: 20px 0;" :data="spuSaleAttrList">
            <el-table-column label="序号" type="index" align="center" width="100" />
            <el-table-column label="属性名" prop="saleAttrName" width="150" />
            <el-table-column label="属性值">
                <template #="{ row, $index }">
                    <el-tag v-for="item in row.spuSaleAttrValueList" :key="item.id" class="mx-1" closable>
                        {{ item.saleAttrValueName }}
                    </el-tag>
                </template>
            </el-table-column>
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
import { ref, reactive, nextTick } from 'vue'
// 引入请求方法
import {
    getSPUBrandList,    // 获取spu品牌列表
    getSPUBrandImageList,   // 获取spu图片列表  @param spuId: spuId
    getSPUSaleAttrList, // 获取spu销售属性列表  @param spuId: spuId
    getBaseSaleAttrList // 获取所有销售属性列表
} from '@/API/product/spu/index.ts'
// 引入ts类型
import type {
    ISpuType,
    IGetSPUBrandListResType,
    IGetSPUImageListResType,
    IGetSPUSaleAttrListResType,
    IGetBaseSaleAttrListResType,
    ISpuBrandListType,
    ISpuImageListType,
    ISpuSaleAttrType,
    IBaseSaleAttrListType
} from '@/API/product/spu/type.ts'


let $emit = defineEmits(['backToZero'])

//  通过自定义事件，返回到0场景
const toZero = () => {
    $emit('backToZero')
}
// 存储spu数据
let allBrandList = ref<ISpuBrandListType>([])  // spu品牌列表
let allImageList = ref<ISpuImageListType>([])  // spu图片列表
let spuSaleAttrList = ref<ISpuSaleAttrType[]>([])  // spu销售属性列表
let allSpuSaleAttrList = ref<IBaseSaleAttrListType>([])  // 所有销售属性列表

let spuParams = reactive<ISpuType>({
    spuName: '',    // spu名称
    description: '',    // spu描述
    category3Id: '',    // 三级分类id
    tmId: '',           // 品牌id
    spuSaleAttrList: [],    // spu销售属性列表
    spuImageList: [],   // spu图片列表
})






// 获取spu数据的方法
const getSpuData = async (spu: ISpuType) => {
    spuParams = spu
    // 参数即为父组件传递过来的单个spu数据
    // 1.获取spu品牌列表
    let res: IGetSPUBrandListResType = await getSPUBrandList()
    // console.log(res);
    // 2.获取spu图片列表
    let res2: IGetSPUImageListResType = await getSPUBrandImageList(spu.id as number)
    // console.log(res2);
    // 3.获取spu销售属性列表
    let res3: IGetSPUSaleAttrListResType = await getSPUSaleAttrList(spu.id as number)
    // console.log(res3);
    // 4.获取所有销售属性列表
    let res4: IGetBaseSaleAttrListResType = await getBaseSaleAttrList()
    // console.log(res4);

    // 存储数据
    allBrandList.value = res.data
    allImageList.value = res2.data
    spuSaleAttrList.value = res3.data
    allSpuSaleAttrList.value = res4.data












}
// 对外暴露
defineExpose({
    getSpuData
})




</script>
<script lang="ts">
export default {
    name: 'SpuForm',
}
</script>

<style scoped></style>