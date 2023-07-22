<template>
  <el-form label-width="70px">
    <el-form-item label="sku名称">
      <el-input placeholder="请输入sku名称"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input placeholder="请输入价格(元)" type="number"></el-input>
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input placeholder="请输入重量(克)" type="number"></el-input>
    </el-form-item>
    <el-form-item label="sku描述">
      <el-input placeholder="请输入sku描述" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form inline class="inform">
        <el-form-item label="手机一级">
          <el-select>
            <el-option label="一级"></el-option>
            <el-option label="二级"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机一级">
          <el-select>
            <el-option label="一级"></el-option>
            <el-option label="二级"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机一级">
          <el-select>
            <el-option label="一级"></el-option>
            <el-option label="二级"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机一级">
          <el-select>
            <el-option label="一级"></el-option>
            <el-option label="二级"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机一级">
          <el-select>
            <el-option label="一级"></el-option>
            <el-option label="二级"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机一级">
          <el-select>
            <el-option label="一级"></el-option>
            <el-option label="二级"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-select>
        <el-option label="一级"></el-option>
        <el-option label="二级"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border>
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="照片">
          <template #default="{ row }">
            <img src="" alt="" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="名称" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" size="default">设为默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">提交</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
let $emit = defineEmits(['backToZero'])

// 点击取消按钮的回调
const cancel = () => {
  $emit('backToZero', {
    flag: 0,
    params: '',
  })
}
</script>

<style scoped lang="scss">
.inform {
  .el-form-item {
    margin-bottom: 15px;
  }
}
</style>
