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
        <div class="charts" ref="chartsOne"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'
let people = ref('66514人')
let chartsOne = ref()
onMounted(() => {
    // 获取echarts实例
    let myChartLiquidfill = echarts.init(chartsOne.value)
    // 指定图表的配置项和数据
    myChartLiquidfill.setOption({
        tooltip: {
            show: true
        },
        title: {

        },
        // x轴
        xAxis: {

        },
        // y轴
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
        },
        // 系列
        series: [{
            type: 'liquidFill',
            data: [0.62, 0.4, 0.2],
            radius: '80%',
            center: ['50%', '50%'],
            outline: {
                show: true,
                borderDistance: 8,
                itemStyle: {
                    color: 'none',
                    borderColor: '#294D99',
                    borderWidth: 8,
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 0, 0, 0.25)'
                }
            },

        }],
        // 组件布局
        grid: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    })
})


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

    .charts {
        width: 100%;
        height: 222px;
    }
}
</style>