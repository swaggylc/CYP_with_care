<template>
  <div>
    <h1>测试axios</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import request from './utils/request';

onMounted(() => {
  login()
});
// 定义登录的方法
const login = async () => {
  let res: any = await request({
    method: 'POST',
    url: '/user/login',
    data: {
      username: 'admin',
      password: '111111'
    }
  })
  console.log(res)
}
</script>

<style scoped></style>