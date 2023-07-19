<template>
    <Type />
    <el-card style="margin: 20px 0;">
        <template #header>
            <div class="card-header">
                <span>Property management</span>
                <el-button class="button" type="primary" icon="Plus" :disabled="typeStore.ThreeId == ''">添加属性</el-button>
            </div>
        </template>
        <el-table stripe style="width: 100%" border :data="Attrarr">
            <el-table-column label="序号" width="80" type="index" align="center" />
            <el-table-column prop="attrName" label="属性名称" width="180" />
            <el-table-column prop="address" label="属性值名称">
                <template #default="{ row }">
                    <el-tag style="margin: 5px;" v-for="item in row.attrValueList" :key="item.id" disable-transitions>
                        {{ item.valueName }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template #default="{ row }">
                    <el-button type="primary" size="mini" icon="Edit"></el-button>
                    <el-button type="danger" size="mini" icon="Delete"></el-button>
                </template>
            </el-table-column>>
        </el-table>
    </el-card>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue';
import { getAttr } from '@/API/product/attr/index.ts'
// 引入ts类型
import type { IAttrRes, IAttr } from '@/API/product/attr/type.ts'
// 引入type仓库
//@ts-ignore
import useTypeStore from '@/store/modules/type.ts';
let typeStore = useTypeStore();


let Attrarr = ref<IAttr[]>([])




// 监听三级分类选中值的变化
watch(() => typeStore.ThreeId, () => {
    // 如果三级分类的id发生变化，清空属性数据
    Attrarr.value = []
    // 如果三级分类的id为空，就不发送请求
    if (typeStore.ThreeId === '') return
    getAttrRes()
})

// 获取属性数据的方法
const getAttrRes = async () => {
    // 从仓库中解构
    let { OneId, TwoId, ThreeId } = typeStore;
    let res: IAttrRes = await getAttr(OneId, TwoId, ThreeId)
    console.log(res);

    if (res.code === 200) {
        Attrarr.value = res.data
    }
}







</script>

<style scoped lang="scss">
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>