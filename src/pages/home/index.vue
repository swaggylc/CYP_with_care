<template>
    <el-card>
        <div class="box">
            <img :src="userStore.avatar" alt="">
            <div class="welcome">
                <h3>{{ time + '!' + userStore.username }}</h3>
                <p>ECUT运营平台欢迎您!</p>
            </div>
        </div>
    </el-card>
    <SvgIcon name="welcome" width="600px" height="400px" class="svg" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getNowTime } from '@/utils/time';





// 获取用户小仓库
import useUserStore from '@/store/modules/user';
let userStore = useUserStore();
let time = ref<string>()


onMounted(() => {
    // 通知用户小仓库，发送请求，获取用户信息
    userStore.GetUserInfo();
    time.value = getNowTime()
});







</script>

<style scoped lang="scss">
.box {
    display: flex;
    width: 100%;

    img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-right: 20px;
    }

    .welcome {
        display: flex;
        flex-direction: column;
        justify-content: center;

        h3 {
            font-size: 20px;
            font-weight: 600;
            margin: 20px 0;
            letter-spacing: 1px;
        }

        p {
            font-size: 20px;
            font-weight: 400;
            margin: 20px 0;
            color: #999;
            font-style: italic;
            letter-spacing: 1px;
        }
    }
}

.svg {
    // 居中
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>