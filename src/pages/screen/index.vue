<template>
    <div class="container">
        <!-- 展示内容区域 -->
        <div class="screen" ref="screen">
            <div class="top">
                <!-- 引入子组件 -->
                <Top />
            </div>
            <div class="bottom">
                <div class="left">左侧</div>
                <div class="center">中间</div>
                <div class="right">右侧</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 引入子组件
import Top from './components/top/index.vue'
// 获取展示区域的dom
let screen = ref()

onMounted(() => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
})

// 定义大屏缩放的比例
function getScale(w = 1920, h = 1080) {
    const ww = window.innerWidth / w
    const hh = window.innerHeight / h
    return ww > hh ? hh : ww
}

// 监听视口的变化
window.onresize = () => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
}



</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    background: url(./images/bg.png) no-repeat;
    background-size: cover;

    .screen {
        position: fixed;
        width: 1920px;
        height: 1080px;
        left: 50%;
        top: 50%;
        transform-origin: left top;

        .top {
            width: 100%;
            height: 40px;
        }

        .bottom {
            display: flex;

            .left {
                flex: 1;
            }

            .center {
                flex: 2;

            }

            .right {
                flex: 1;

            }
        }
    }
}</style>