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
            <el-upload list-type="picture-card" v-model:file-list="allImageList" action="/api/admin/product/fileUpload"
                :on-preview="handlePictureCardPreview" :before-upload="beforeUpload">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <el-dialog v-model="dialogVisible" style="height: 100%;width: 100%;">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="spu销售属性">
            <el-select v-model="unseleteAttrIdAndName"
                :placeholder="unSelectSaleAttr.length != 0 ? `还可选择${unSelectSaleAttr.length}个销售属性` : '已选满'">
                <el-option v-for="item in unSelectSaleAttr" :key="item.id" :label="item.name"
                    :value="`${item.id},${item.name}`"></el-option>
            </el-select>
            <el-button style="margin-left: 25px;" type="primary" icon="Plus" :disabled="unseleteAttrIdAndName == ''"
                @click="addSaleAttr">添加销售属性</el-button>

        </el-form-item>
        <el-table border style="margin: 20px 0;" :data="spuSaleAttrList">
            <el-table-column label="序号" type="index" align="center" width="100" />
            <el-table-column label="属性名" prop="saleAttrName" width="150" />
            <el-table-column label="属性值">
                <template #="{ row, $index }">
                    <el-tag style="margin: 5px 10px;" v-for="item in row.spuSaleAttrValueList" :key="item.id" class="mx-1"
                        closable>
                        {{ item.saleAttrValueName }}
                    </el-tag>
                    <el-button type="success" icon="Plus" size="small"></el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template #="{ row, $index }">
                    <el-button @click="spuSaleAttrList.splice($index, 1)" style="width: 100%;" type="danger" icon="Delete"
                        size="small"></el-button>
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
import { ref, computed, reactive } from 'vue'
// 引入请求方法
import { ElMessage } from 'element-plus'
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

let spuParams = ref<ISpuType>({
    spuName: '',    // spu名称
    description: '',    // spu描述
    category3Id: '',    // 三级分类id
    tmId: '',           // 品牌id
    spuSaleAttrList: [],    // spu销售属性列表
    spuImageList: [],   // spu图片列表
})

let dialogVisible = ref<boolean>(false)  // 是否显示预览弹窗
let dialogImageUrl = ref<string>('')  // 预览弹窗的图片地址

let unseleteAttrIdAndName = ref<string>('')  // 未选择的销售属性名



// 获取spu数据的方法
const getSpuData = async (spu: ISpuType) => {
    spuParams.value = spu
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
    allImageList.value = res2.data.map(item => {
        return {
            ...item,
            url: item.imgUrl,
            name: item.imgName
        }
    })
    spuSaleAttrList.value = res3.data
    allSpuSaleAttrList.value = res4.data




}

// 照片墙预览的回调
const handlePictureCardPreview = (file: any) => {
    dialogImageUrl.value = file.url;
    dialogVisible.value = true;

}
// 文件上传前的回调
const beforeUpload = (file: any) => {
    if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif') {
        if (file.size / 1024 / 1024 < 4) {
            return true
        } else {
            ElMessage.error('图片大小不能超过4M')
            return false
        }
    } else {
        ElMessage.error('只能上传jpg/png/gif格式的图片')
        return false
    }
}

// 计算哪个销售属性未被选择
const unSelectSaleAttr = computed(() => {
    let arr: IBaseSaleAttrListType = []
    allSpuSaleAttrList.value.forEach(item => {
        let flag = spuSaleAttrList.value.some(hasAttr => {
            return hasAttr.saleAttrName == item.name
        })
        if (!flag) {
            arr.push(item)
        }
    })
    return arr
})

// 点击添加销售属性按钮的回调
const addSaleAttr = () => {
    // 判断添加的销售属性是否已经存在
    let flag = spuSaleAttrList.value.some(item => {
        return item.saleAttrName == unseleteAttrIdAndName.value.split(',')[1]
    })
    if (flag) {
        ElMessage.error('该销售属性已经存在')
        return
    }



    // 判断是否已经选择了全部销售属性
    if (spuSaleAttrList.value.length == allSpuSaleAttrList.value.length) {
        ElMessage.error('已选择全部销售属性')
        return
    }
    // 1.解构出baseSaleAttrId和saleAttrName
    let [baseSaleAttrId, saleAttrName] = unseleteAttrIdAndName.value.split(',')
    // 2.创建一个新的销售属性对象
    let newSaleAttr: ISpuSaleAttrType = {
        baseSaleAttrId: baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
    }
    // 3.将新的销售属性对象添加到spuSaleAttrList中
    spuSaleAttrList.value.push(newSaleAttr)
    // 4.清空unseleteAttrName
    unseleteAttrIdAndName.value = ''
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