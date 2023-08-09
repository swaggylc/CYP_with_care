<template>
    <div class="right">
        <el-button type="primary" :icon="Refresh" circle size="large" @click="refresh" />
        <el-button type="success" :icon="FullScreen" circle size="large" @click="fullScreen" />
        <el-popover placement="bottom" title="主题设置" :width="200" trigger="hover">
            <!-- 表单组件 -->
            <el-form>
                <el-form-item label="主题颜色">
                    <el-color-picker @change="changeColor" v-model="color" show-alpha :predefine="predefineColors" />
                </el-form-item>
                <el-form-item label="模式切换">
                    <el-switch @change="changeType" v-model="modelChange" active-icon="Moon" inactive-icon="Sunny"
                        inline-prompt />
                </el-form-item>
            </el-form>
            <template #reference>
                <el-button type="info" :icon="Setting" circle size="large" />
            </template>
        </el-popover>
        <img :src="userStore.avatar" alt="">
        <el-dropdown trigger="click">
            <span class="el-dropdown-link">
                {{ userStore.username }}
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 引入移除token的方法
import { Refresh, FullScreen, Setting } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router';
let $router = useRouter()
let $route = useRoute()
// 获取菜单仓库
// @ts-ignore
import useLayoutStore from '@/store/modules/menu.ts'
let useUserLayoutStore = useLayoutStore()
// 获取用户小仓库
// @ts-ignore
import useUserStore from '@/store/modules/user.ts'
let userStore = useUserStore()


// 模式切换的数据
let modelChange = ref<boolean>(false)



// 点击刷新的回调
const refresh = () => {
    useUserLayoutStore.isRefresh = !useUserLayoutStore.isRefresh
}
// 点击全屏按钮的回调
const fullScreen = () => {
    // DOM对象的一个属性，判断是否是全屏状态,若是全屏状态，返回一个ture,否则返回null
    let full = document.fullscreenElement
    if (!full) {
        // 全屏
        // 文档对象的一个方法，用于将当前的文档对象进入全屏状态
        document.documentElement.requestFullscreen()
    } else {
        // 退出全屏
        document.exitFullscreen()
    }
}
// 退出登陆的回调
const logout = async () => {
    // 清空token
    await userStore.logout()
    // 跳转到登陆页面
    $router.push({
        path: '/login',
        query: {
            redirect: $route.path
        }
    })
}

// 模式切换的回调
const changeType = () => {
    // 获取html根节点
    let html = document.documentElement
    // 判断模式切换的状态
    modelChange.value ? html.className = 'dark' : html.className = ''
}

// 取色器颜色更改的回调
const changeColor = () => {
    // 获取html根节点
    let html = document.documentElement
    // 设置html根节点的颜色
    html.style.setProperty('--el-color-primary', color.value)
}

// 取色器相应设置
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])
</script>
<script lang="ts">
export default {
    name: 'Right',
}
</script>
<style scoped lang="scss">
.right {
    display: flex;
    align-items: center;

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 0 20px;
    }

    .el-dropdown-link {
        margin-right: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
    }
}
</style>