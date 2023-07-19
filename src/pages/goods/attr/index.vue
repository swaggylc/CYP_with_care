<template>
    <Type :scene="scene" />
    <div v-show="scene == 0">
        <el-card style="margin: 20px 0;">
            <template #header>
                <div class="card-header">
                    <span>Property management</span>
                    <el-button class="button" type="primary" icon="Plus" :disabled="typeStore.ThreeId == ''"
                        @click="addAttr">添加属性</el-button>
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
                        <el-button type="primary" size="mini" icon="Edit" @click="Edit"></el-button>
                        <el-button type="danger" size="mini" icon="Delete"></el-button>
                    </template>
                </el-table-column>>
            </el-table>
        </el-card>
    </div>
    <div v-show="scene == 1">
        <el-card style="margin: 20px 0;">
            <el-form inline>
                <el-form-item label="属性名称">
                    <el-input placeholder="请输入属性名称"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" icon="Plus">添加属性值</el-button>
            <el-button type="primary">取消</el-button>
            <el-table border style="margin: 20px 0; ">
                <el-table-column label="序号" width="80" type="index"></el-table-column>
                <el-table-column label="属性值"></el-table-column>
                <el-table-column label="操作" width="200"></el-table-column>
            </el-table>
            <el-button type="primary">保存</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive } from 'vue';
import { getAttr } from '@/API/product/attr/index.ts'
// 引入ts类型
import type { IAttrRes, IAttr } from '@/API/product/attr/type.ts'
// 引入type仓库
//@ts-ignore
import useTypeStore from '@/store/modules/type.ts';
let typeStore = useTypeStore();


let Attrarr = ref<IAttr[]>([])
let scene = ref<number>(0)    // 0 代表展示属性列表  1 代表添加属性
// 收集添加属性的数据
let addAttrData = reactive<IAttr>({
    attrName: '',   // 属性名称
    attrValueList: [],  // 属性值列表
    categoryId: '', // 三级分类id
    categoryLevel: 3,   // 分类级别
    createTime: null,
    updateTime: null
})

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

// 添加属性按钮的回调
const addAttr = () => {
    scene.value = 1
}
// 点击修改按钮的回调
const Edit = () => {
    scene.value = 1
}

// 取消按钮的回调
const cancel = () => {
    scene.value = 0
}


</script>

<style scoped lang="scss">
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>