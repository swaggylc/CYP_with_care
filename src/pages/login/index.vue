<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="formData" :rules="rules" ref="loginForm">
                    <div class="login_text">
                        <h1>HELLO</h1>
                        <h2>欢迎来到xx运营平台</h2>
                    </div>
                    <el-form-item prop="username">
                        <el-input v-model="formData.username" placeholder="请输入用户名" :prefix-icon="User"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="formData.password" type="password" placeholder="请输入密码" :prefix-icon="Lock"
                            show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width: 100%;" @click="loginSubmit">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';

// 引入ts类型
import { LoginParamsType } from '@/API/user/type.ts';
import { useRouter, useRoute } from 'vue-router';
const $router = useRouter();
const $route = useRoute();
import { ElMessage } from 'element-plus';
import { ElNotification } from 'element-plus';
// 引入用户仓库
import useUserStore from '@/store/modules/user.ts';
// 获取用户仓库实例
const userStore = useUserStore();
// 获取当前时间
import { getNowTime } from '@/utils/time.ts';

// 收集表单数据
import { reactive, ref, onMounted } from 'vue';
const formData: LoginParamsType = reactive({
    username: 'admin',
    password: '111111'
});
// 获取表单元素
let loginForm = ref()


onMounted(() => {
    console.log($route);

})

// 点击登录按钮的回调
const loginSubmit = async () => {
    // 表单验证
    await loginForm.value.validate()
    // 使用Pinia发送请求的主要优势之一是能够将请求的结果保存在Pinia的状态中，
    // 并自动更新相关组件。这样，当请求返回数据时，与该数据相关的组件将自动更新，而无需手动处理和同步数据。
    // 通知仓库发送登陆请求
    try {
        // 登陆成功
        await userStore.userLogin(formData)
        // 跳转
        if ($route.query.redirect) {
            $router.push({
                path: $route.query.redirect as string
            })
            // 通知用户小仓库，发送请求，获取用户信息
            userStore.GetUserInfo();
        } else {
            $router.push({
                path: '/'
            })
        }
        ElNotification({
            title: 'HI,' + getNowTime(),
            message: '欢迎回来',
            type: 'success'
        })
    } catch (error) {
        // 登陆失败
        ElMessage({
            message: (error as Error).message,
            type: 'error'
        })
    }
}
// 自定义用户名验证规则
const validatorUsername = (rule: any, value: any, next: any) => {
    if (value.length >= 5 && value.length <= 10) {
        next()
    } else {
        console.log(value);

        next(new Error('用户名必须是5-10位'))
    }
}
// 自定义密码验证规则
const validatorPassword = (rule: any, value: any, next: any) => {
    if (value.length >= 6 && value.length <= 10) {
        next()
    } else {
        next(new Error('密码必须是6-10位'))
    }
}
// 定义表单验证规则
const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'change' },
        { validator: validatorUsername, trigger: 'change' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'change' },
        { validator: validatorPassword, trigger: 'change' }

    ]
}



</script>

<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url(@/assets/images/background.jpg) no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        width: 600px;
        top: 30vh;
        background: url(@/assets/images/login_form.png) no-repeat;
        background-size: cover;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .el-form-item {
            width: 500px;
        }

        .login_text {
            width: 100%;

            h1 {
                font-size: 34px;
                color: #fff;
                margin: 20px 0;
            }

            h2 {
                font-size: 20px;
                color: #fff;
                margin: 20px 0;

            }
        }
    }
}
</style>