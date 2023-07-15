<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form">
                    <div class="login_text">
                        <h1>HELLO</h1>
                        <h2>欢迎来到xx运营平台</h2>
                    </div>
                    <el-form-item>
                        <el-input v-model="formData.username" placeholder="请输入用户名" :prefix-icon="User"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="formData.password" type="password" placeholder="请输入密码" :prefix-icon="Lock"
                            show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width: 100%;">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
// 收集表单数据
import { reactive } from 'vue';
const formData = reactive({
    username: 'admin',
    password: '111111'
});

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