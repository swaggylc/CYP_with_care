<template>
  <div class="spu">
    <!-- 三级分类组件 -->
    <Type :scene="scene" />
    <el-card style="margin: 20px 0" v-show="scene == 0">
      <template #header>
        <div class="card-header">
          <span>SPU management</span>
          <el-button
            class="button"
            type="primary"
            icon="Plus"
            :disabled="typeStore.ThreeId == ''"
            @click="addSpu"
          >
            添加spu
          </el-button>
        </div>
      </template>
      <!-- 表格部分 -->
      <el-table border style="margin: 20px 0" :data="spuList">
        <el-table-column label="序号" type="index" align="center" width="100" />
        <el-table-column label="SPU名称" width="250" prop="spuName" />
        <el-table-column
          label="SPU描述"
          porp="description"
          show-overflow-tooltip
        />
        <el-table-column label="操作" width="300" class-name="action">
          <template #default="{ row, $index }">
            <el-button
              icon="Plus"
              type="primary"
              title="添加SKU"
              @click="addSku"
            ></el-button>
            <el-button
              icon="Edit"
              type="primary"
              plain
              title="修改SPU"
              @click="editSpu(row)"
            ></el-button>
            <el-button
              icon="CollectionTag"
              type="info"
              title="查看SKU列表"
            ></el-button>
            <el-button icon="Delete" type="danger" title="删除SPU"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        layout=" prev, pager, next, jumper,->,total, sizes"
        :total="total"
        @current-change="GetSpuList"
        @size-change="changeSize"
      />
    </el-card>
    <el-card style="margin: 20px 0" v-show="scene == 1">
      <SpuForm ref="spuform" @backToZero="backToZero" />
    </el-card>
    <el-card style="margin: 20px 0" v-show="scene == 2">
      <SkuForm @backToZero="backToZero" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import SkuForm from './skuForm.vue'
import SpuForm from './spuForm.vue'
// 引入分类仓库
import useTypeStore from '@/store/modules/type.ts'
let typeStore = useTypeStore()
// 引入请求方法
import { getSPUList } from '@/API/product/spu/index.ts'
// 引入ts类型
import type {
  IGetSPUListResType,
  ISpuListType,
  ISpuType,
} from '@/API/product/spu/type.ts'
import { ElCard, ElMessage } from 'element-plus'

let scene = ref<number>(0) // 场景值   0:显示已有spu列表   1:显示添加/修改spu表单   2:显示添加sku表单
let currentPage = ref<number>(1) // 当前页
let pageSize = ref<number>(10) // 每页显示条数
let total = ref<number>(0) // 总条数
let spuList = ref<ISpuListType>([]) // spu列表数据
let spuform = ref<any>() // spu表单组件的实例

// 监听三级分类Id的变化
watch(
  () => typeStore.ThreeId,
  (newVal) => {
    // 保证三级分类Id有值才能发送请求
    if (newVal) {
      GetSpuList()
    }
  },
)

// 获取spu列表数据的方法
const GetSpuList = async (pager: number = 1) => {
  currentPage.value = pager
  let res: IGetSPUListResType = await getSPUList(
    currentPage.value,
    pageSize.value,
    typeStore.ThreeId,
  )
  // console.log(res);

  if (res.code === 200) {
    spuList.value = res.data.records
    total.value = res.data.total
  } else {
    ElMessage.error('获取数据失败！')
  }
}
// 每页显示条数改变的回调
const changeSize = (val: number) => {
  pageSize.value = val
  GetSpuList()
}

// 点击添加spu按钮的回调
const addSpu = () => {
  scene.value = 1
  // 调用子组件实例的方法，获取数据
  spuform.value.addSpuDataInit(typeStore.ThreeId)
}

// 点击修改spu按钮的回调
const editSpu = (row: ISpuType) => {
  // 切换场景
  scene.value = 1
  // 调用子组件实例的方法，获取数据
  spuform.value.getSpuData(row)
}

// 自定义事件
const backToZero = (obj: any) => {
  let { flag, params } = obj
  scene.value = flag
  // 根据params判断是留在当前页还是跳转到第一页
  if (params == 'update') {
    // 更新留在当前页
    GetSpuList(currentPage.value)
  } else {
    // 添加跳转到第一页
    GetSpuList()
  }
}

// 点击添加sku按钮的回调
const addSku = () => {
  // 切换场景
  scene.value = 2
}


</script>

<style scoped lang="scss">
.spu {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .action {
    button {
      margin: 0 11px;
    }
  }
}
</style>
