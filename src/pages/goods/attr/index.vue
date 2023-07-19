<template>
    <Type />
    <el-card style="margin: 20px 0;">
        <template #header>
            <div class="card-header">
                <span>Property management</span>
                <el-button class="button" type="primary" icon="Plus" :disabled="typeStore.ThreeId == ''">添加属性</el-button>
            </div>
        </template>
        <el-table stripe style="width: 100%" border>
            <el-table-column label="序号" width="80" type="index" align="center" />
            <el-table-column prop="name" label="属性名称" width="180" />
            <el-table-column prop="address" label="属性值名称" />
            <el-table-column prop="address" label="操作" width="200" />
        </el-table>
    </el-card>
</template>

<script setup lang="ts">
// 引入type仓库
//@ts-ignore
import useTypeStore from '@/store/modules/type.ts';
let typeStore = useTypeStore();
</script>

<style scoped lang="scss">
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>