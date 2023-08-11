<template>
    <div class="container">
        <!-- 展示内容区域 -->
        <div class="screen" ref="screen">
            <div class="top">
                <!-- 引入子组件 -->
                <Top />
            </div>
            <div class="bottom">
                <div class="left">
                    <!-- 引入子组件 -->
                    <VisitorNow class="visitorNow" />
                    <SexRatio class="sexRatio" />
                    <AgeRatio class="ageRatio" />
                </div>
                <div class="center">
                    <!-- 引入子组件 -->
                    <Map class="map" />
                    <MapBottom class="mapBottom" />
                </div>
                <div class="right">右侧</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 引入子组件
import Top from './components/top/index.vue'
import VisitorNow from './components/visitorNow/index.vue'
import SexRatio from './components/sexRatio/index.vue'
import AgeRatio from './components/ageRatio/index.vue'
import Map from './components/map/index.vue'
import MapBottom from './components/mapBottom/index.vue'
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
                display: flex;
                flex-direction: column;
                flex: 1;
                height: 1040px;

                .visitorNow {
                    flex: 1.2;
                }

                .sexRatio {
                    flex: 1;
                }

                .ageRatio {
                    flex: 1;
                }
            }

            .center {
                flex: 2;
                display: flex;
                flex-direction: column;
                height: 960px;
                margin-top: 50px;

                .map {
                    flex: 4;
                }

                .mapBottom {
                    flex: 1;
                }
            }

            .right {
                flex: 1;

            }
        }
    }
}
</style>