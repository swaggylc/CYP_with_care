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
                        <el-button type="primary" size="mini" icon="Edit" @click="Edit(row)"></el-button>
                        <el-popconfirm :title="`确定删除${row.attrName}属性吗?`" width="200" @confirm="DeleteAttr(row)">
                            <template #reference>
                                <el-button type="danger" size="mini" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>>
            </el-table>
        </el-card>
    </div>
    <div v-show="scene == 1">
        <el-card style="margin: 20px 0;">
            <el-form inline>
                <el-form-item label="属性名称">
                    <el-input placeholder="请输入属性名称" v-model="addAttrData.attrName"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" icon="Plus" :disabled="addAttrData.attrName == ''"
                @click="addAttrValue">添加属性值</el-button>
            <el-button type="primary">取消</el-button>
            <el-table border style="margin: 20px 0;" :data="addAttrData.attrValueList">
                <el-table-column label="序号" width="80" type="index"></el-table-column>
                <el-table-column label="属性值">
                    <!-- row即为当前push进来的属性值对象 -->
                    <template #default="{ row, $index }">
                        <el-input v-if="!row.flag" @blur="lossFocus(row, $index)" placeholder="请输入属性值"
                            v-model="row.valueName" :ref="(element: any) => inputArr[$index] = element"></el-input>
                        <div v-else style="width: 100%;" @click="getFocus(row, $index)">{{ row.valueName }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template #default="{ row, $index }">
                        <el-button type="danger" icon="Delete"
                            @click="($index: number) => addAttrData.attrValueList.splice($index, 1)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
        </el-card>
    </div>
    <!-- 空数据展示 -->
    <div v-show="typeStore.ThreeId == ''">
        <el-empty description="暂无数据"></el-empty>
    </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue';
import { getAttr, postAttr, deleteAttr } from '@/API/product/attr/index.ts'
// 引入ts类型
import type { IAttrRes, IAttr, IAttrValue } from '@/API/product/attr/type.ts'
// 引入type仓库
//@ts-ignore
import useTypeStore from '@/store/modules/type.ts';
import { ElMessage } from 'element-plus';
let typeStore = useTypeStore();

let inputArr = ref<any[]>([])     //存放input实例
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
    if (res.code === 200) {
        Attrarr.value = res.data
    }
}

// 添加属性按钮的回调
const addAttr = () => {
    scene.value = 1
    // 收集三级分类的id
    addAttrData.categoryId = typeStore.ThreeId
    // 清空属性值列表
    // 清空属性名称
    Object.assign(addAttrData, {
        attrName: '',   // 属性名称
        attrValueList: [],  // 属性值列表
        categoryId: '', // 三级分类id
        categoryLevel: 3,   // 分类级别
        createTime: null,
        updateTime: null
    })
    // 修改后会添加id属性，在下一次添加属性时，需要删除id属性
    if (addAttrData.id) {
        delete addAttrData.id
    }
}

// 点击修改按钮的回调
const Edit = (row: IAttr) => {
    // 切换场景
    scene.value = 1
    // console.log(row);
    // 将row中的数据深拷贝一份，再合并
    let obj = JSON.parse(JSON.stringify(row))

    // 合并对象，回显数据，在此之前需要深拷贝，否则会修改原数据
    Object.assign(addAttrData, obj)
    // 默认让第一个input获取焦点
    nextTick(() => {
        inputArr.value[0].focus()
    })





}

// 取消按钮的回调
const cancel = () => {
    scene.value = 0
}

// 点击添加属性值按钮的回调
const addAttrValue = () => {
    addAttrData.attrValueList.push({
        valueName: '',
        createTime: null,
        updateTime: null,
        flag: false
    })
    // 让最后一个input获取焦点
    nextTick(() => {
        inputArr.value[inputArr.value.length - 1].focus()
    })
}

// 点击保存按钮的回调
const save = async () => {
    // 判断属性名称是否为空，及属性值是否为空
    if (addAttrData.attrName.trim() == '' || addAttrData.attrValueList.length == 0) {
        ElMessage.error(addAttrData.attrName.trim() == '' ? '属性名称不能为空' : '属性值不能为空')
        return
    }

    // 收集参数，发送请求
    let res: any = await postAttr(addAttrData)
    console.log(res);

    if (res.code === 200) {
        scene.value = 0
        ElMessage.success(addAttrData.id ? '修改成功' : '添加成功')
        // 重新获取属性数据
        getAttrRes()
    } else {
        ElMessage.error(addAttrData.id ? '修改失败' : '添加失败')
    }
}

// 输入框失去焦点的回调
const lossFocus = (row: IAttrValue, index: number) => {
    if (row.valueName.trim() == '') {
        // 删除当前对象
        addAttrData.attrValueList.splice(index, 1)
        ElMessage.error('属性值不能为空')
        return
    }
    // 判断当前属性值是否已经存在
    let flag = addAttrData.attrValueList.filter(item => item.valueName === row.valueName)
    if (flag.length > 1) {
        ElMessage.error('属性值已经存在')
        // 删除当前对象
        addAttrData.attrValueList.splice(index, 1)
        return
    }

    row.flag = true
}

// div获取焦点的回调
const getFocus = (row: IAttrValue, index: number) => {
    // 修改flag的值,让input显示
    row.flag = false

    // 让当前input获取焦点,需要等待dom渲染完成
    nextTick(() => {
        inputArr.value[index].focus()
    })
}

// 点击删除按钮弹出气泡框后确认的回调
const DeleteAttr = async (row: IAttr) => {
    let res: any = await deleteAttr(row.id as number)
    if (res.code === 200) {
        ElMessage.success('删除成功')
        // 重新获取属性数据
        getAttrRes()
    } else {
        ElMessage.error('删除失败')
    }
}

// 路由组件销毁前的回调
onBeforeUnmount(() => {
    // 重置仓库中的数据
    typeStore.$reset()
})












</script>

<style scoped lang="scss">
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>