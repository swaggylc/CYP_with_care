<template>
  <el-card class="box-card">
    <el-table
      :data="skuList"
      style="width: 100%; margin: 20px 0"
      max-height="700"
      border
    >
      <el-table-column label="序号" width="120" type="index" align="center" />
      <el-table-column prop="skuName" label="名称" width="250" />
      <el-table-column prop="skuDesc" label="描述" width="250" />
      <el-table-column prop="address" label="默认图片" width="250">
        <template #default="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(g)" width="250" />
      <el-table-column prop="price" label="价格(元)" width="250" />
      <el-table-column label="操作" fixed="right" width="300">
        <template #default="{ row }">
          <el-button
            type="success"
            :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
            @click="changeSaleType(row)"
          ></el-button>
          <el-button type="primary" icon="Edit" @click="Edit"></el-button>
          <el-button
            type="info"
            icon="Platform"
            @click="showDetail"
          ></el-button>
          <el-button type="danger" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 15, 20, 25]"
      layout=" prev, pager, next, jumper,->,sizes,total "
      :total="total"
      @current-change="getSkuListFn"
      @size-change="changeSize"
    />
  </el-card>
  <el-drawer v-model="visible" show-close="false" size="35%">
    <template #header="{ close, titleId, titleClass }">
      <h4>查看商品详情</h4>
    </template>
    <!-- 抽屉内容 -->
    <el-card class="box-card">
      <el-descriptions class="margin-top" :column="1" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">名称</div>
          </template>
          Apple iPhone 12 (A2404) 64GB 白色 支持移动联通电信5G 双卡双待手机
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">描述</div>
          </template>
          Apple iPhone 12 (A2404) 128GB 红色 支持移动联通电信5G 双卡双待手机
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">价格</div>
          </template>
          8197
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">平台属性</div>
          </template>
          <el-tag size="small" style="margin: 2px 10px;">苹果手机</el-tag>
          <el-tag size="small" style="margin: 2px 10px;">苹果手机</el-tag>
          <el-tag size="small" style="margin: 2px 10px;">苹果手机</el-tag>

        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">销售属性</div>
          </template>
          <el-tag size="small" type="success" style="margin: 2px 10px;">白色</el-tag>
          <el-tag size="small" type="success" style="margin: 2px 10px;">白色</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- 轮播图 -->
    <el-carousel
      interval="4000"
      type="card"
      height="300px"
      style="margin: 50px 0"
    >
      <el-carousel-item v-for="item in 6" :key="item">
        <img
          src="../../../../public/ecut.jpg"
          alt=""
          style="width: 100%; height: 100%"
        />
      </el-carousel-item>
    </el-carousel>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 引入接口
import {
  getSkuList,
  onSale,
  unSale,
  getSkuInfo,
} from '@/API/product/sku/index.ts'
// 引入ts类型
import type { SkuListRes, SkuItem, SkuInfoRes } from '@/API/product/sku/type.ts'
import { ElMessage } from 'element-plus'

let currentPage = ref<number>(1) // 当前页
let pageSize = ref<number>(10) // 每页显示条数
let total = ref<number>(100) // 总条数

let skuList = ref<SkuItem[]>([]) // sku列表

let visible = ref<boolean>(false) //抽屉的显示与隐藏

onMounted(() => {
  getSkuListFn()
})

// 获取sku列表的方法
const getSkuListFn = async (pager: number = 1) => {
  currentPage.value = pager
  let res: SkuListRes = await getSkuList(currentPage.value, pageSize.value)
  if (res.code === 200) {
    skuList.value = res.data.records
    total.value = res.data.total
  } else {
    ElMessage.error('获取sku列表失败!')
  }
}

// 改变每页显示条数的回调
const changeSize = (value: number) => {
  pageSize.value = value
  getSkuListFn()
}

// 点击上/下架按钮的回调
const changeSaleType = async (row: SkuItem) => {
  // 判断当前商品的上架状态，isSale=1表示已上架，需要调用下架方法；isSale=0表示下架，需要调用上架方法
  if (row.isSale == 1) {
    let res: any = await unSale(row.id)
    if (res.code === 200) {
      ElMessage.success('已下架!')
      // 重新获取sku列表
      getSkuListFn(currentPage.value)
    } else {
      ElMessage.error('下架失败!')
    }
  } else {
    let res: any = await onSale(row.id)
    if (res.code === 200) {
      ElMessage.success('已上架!')
      // 重新获取sku列表
      getSkuListFn(currentPage.value)
    } else {
      ElMessage.error('上架失败!')
    }
  }
}

// 点击编辑按钮的回调
const Edit = () => {
  ElMessage.success('程序猿正在加班开发中...')
}

// 点击info按钮的回调
const showDetail = () => {
  visible.value = true
}
</script>

<style scoped lang="scss">
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
