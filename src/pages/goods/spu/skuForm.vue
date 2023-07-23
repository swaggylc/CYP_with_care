<template>
  <el-form label-width="70px">
    <el-form-item label="sku名称">
      <el-input
        placeholder="请输入sku名称"
        v-model="skuParams.skuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input
        placeholder="请输入价格(元)"
        type="number"
        v-model="skuParams.price"
      ></el-input>
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input
        placeholder="请输入重量(克)"
        type="number"
        v-model="skuParams.weight"
      ></el-input>
    </el-form-item>
    <el-form-item label="sku描述">
      <el-input
        placeholder="请输入sku描述"
        type="textarea"
        v-model="skuParams.skuDesc"
      ></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form inline class="inform">
        <el-form-item
          v-for="item in attrList"
          :key="item.id"
          :label="item.attrName"
        >
          <el-select v-model="item.AttrIdAndValueId">
            <el-option
              v-for="attrItem in item.attrValueList"
              :key="attrItem.id"
              :label="attrItem.valueName"
              :value="`${item.id},${attrItem.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form inline>
        <el-form-item
          v-for="item in saleAttrList"
          :key="item.id"
          :label="item.saleAttrName"
        >
          <el-select v-model="item.saleAttrIdAndValueId">
            <el-option
              v-for="saleAttrItem in item.spuSaleAttrValueList"
              :key="saleAttrItem.id"
              :label="saleAttrItem.saleAttrValueName"
              :value="`${item.id},${saleAttrItem.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imageList" ref="table">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="照片">
          <template #default="{ row }">
            <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="default"
              @click="setImgDefault(row)"
            >
              设为默认
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">提交</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
// 引入请求方法
import { getAttr } from '@/API/product/attr/index.ts'
import {
  getSPUBrandImageList,
  getSPUSaleAttrList,
  addSKU,
} from '@/API/product/spu/index.ts'

// 引入ts类型
import type {
  ISpuType,
  IGetSPUImageListResType,
  IGetSPUSaleAttrListResType,
  ISpuSaleAttrType,
  ISpuImageListType,
  IAddSkuType,
  ISpuImageType,
  ISkuAttrValue,
} from '@/API/product/spu/type.ts'
import type { IAttrRes, IAttr } from '@/API/product/attr/type.ts'

let attrList = ref<IAttr[]>([]) // 平台属性列表
let saleAttrList = ref<ISpuSaleAttrType[]>([]) // 销售属性列表
let imageList = ref<ISpuImageListType>([]) // 图片列表

// 添加sku所需要的参数
let skuParams = reactive<IAddSkuType>({
  //父组件传递的部分参数
  category3Id: '', // 三级分类id
  tmId: '', // 品牌id
  spuId: '', // spuId
  //通过v-model收集的部分参数
  skuName: '', // sku名称
  skuDesc: '', // sku描述
  price: '', // 价格
  weight: '', // 重量

  skuAttrValueList: [], // sku平台属性
  skuSaleAttrValueList: [], // sku销售属性值列表
  skuDefaultImg: '', // sku默认图片地址
})

let $emit = defineEmits(['backToZero'])
let table = ref<any>() // 获取table组件实例
// 点击取消按钮的回调
const cancel = () => {
  $emit('backToZero', {
    flag: 0,
    params: '',
  })
}

const initSkuData = async (
  OneId: number | string,
  TwoId: number | string,
  row: ISpuType,
) => {
  // 收集sku所需要的部分参数
  skuParams.category3Id = row.category3Id
  skuParams.tmId = row.tmId
  skuParams.spuId = row.id as number

  // 初始化sku数据
  // 1. 获取平台属性
  let res: IAttrRes = await getAttr(OneId, TwoId, row.category3Id)
  // 2. 获取销售属性
  let res2: IGetSPUSaleAttrListResType = await getSPUSaleAttrList(
    row.id as number,
  )
  // 3. 获取图片列表
  let res3: IGetSPUImageListResType = await getSPUBrandImageList(
    row.id as number,
  )

  // 储存数据
  attrList.value = res.data
  saleAttrList.value = res2.data
  imageList.value = res3.data
}

// 点击设为默认按钮的回调
const setImgDefault = (row: ISpuImageType) => {
  // 保证只有一张图片是默认图片
  // 先将所有的图片都设置为非默认图片
  imageList.value.forEach((item: ISpuImageType) => {
    table.value.toggleRowSelection(item, false)
  })
  // 再将当前点击的图片设置为默认图片
  table.value.toggleRowSelection(row, true)
  // 给skuParams设置默认图片
  skuParams.skuDefaultImg = row.imgUrl
}

// 点击提交按钮的回调
const save = async () => {
  // 1.整理参数
  // 1.1 整理平台属性
  skuParams.skuAttrValueList = attrList.value.reduce((prev: any, next: any) => {
    if (next.AttrIdAndValueId) {
      let [attrId, valueId] = next.AttrIdAndValueId.split(',')
      prev.push({
        attrId,
        valueId,
      })
    }
    return prev
  }, [])
  // 1.2 整理销售属性
  skuParams.skuSaleAttrValueList = saleAttrList.value.reduce(
    (prev: any, next: any) => {
      if (next.saleAttrIdAndValueId) {
        let [saleAttrId, saleAttrValueId] = next.saleAttrIdAndValueId.split(',')
        prev.push({
          saleAttrId,
          saleAttrValueId,
        })
      }
      return prev
    },
    [],
  )
  // 2. 发送请求
  let res: any = await addSKU(skuParams)
  console.log(res)

  // 3. 提示用户
  if (res.code === 200) {
    ElMessage.success('添加sku成功')
    // 4. 跳转到spu列表页面,触发父组件的backToZero事件
    $emit('backToZero', {
      flag: 0,
      params: '',
    })
  } else {
    ElMessage.error('添加sku失败')
  }
}

defineExpose({
  initSkuData,
})
</script>

<style scoped lang="scss">
.inform {
  .el-form-item {
    margin-bottom: 15px;
  }
}
</style>
