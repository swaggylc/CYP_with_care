<template>
    <div class="visitor">
        <div class="top">
            <p class="title">实时游客统计</p>
            <p class="bg"></p>
            <p class="nums">可预约总量<span>99999</span>人</p>
        </div>
        <div class="numbers">
            <span v-for="(item, index) in people" :key="index">{{ item }}</span>
        </div>
        <div class="charts">
            charts
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let people = ref('36514人')



</script>

<style scoped lang="scss">
.visitor {
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 20px;

    .top {
        .title {
            color: white;
            font-size: 18px;
            font-weight: 900;
        }

        .bg {
            width: 68px;
            height: 7px;
            background: url(../../images/dataScreen-title.png) no-repeat;
            background-size: 100% 100%;
            margin-top: 20px;
        }

        .nums {
            float: right;
            margin-top: 10px;
            color: #fff;
            font-size: 14px;

            span {
                color: darkorange;
            }
        }
    }

    .numbers {
        margin-top: 30px;
        display: flex;
        padding: 10px;
        span {
            flex: 1;
            height: 60px;
            text-align: center;
            line-height: 60px;
            background: url(../../images/total.png) no-repeat;
            background-size: 100% 100%;
            color: #29fcff;
            margin: 0 10px;
            font-size: 20px;
        }
    }
    .charts{
        width: 100%;
        height: 222px;
        background-color: #29fcff;
    }
}
</style>