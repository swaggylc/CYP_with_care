<template>
    <div class="mapbottom">
        <div class="title">
            <p>未来七天游客数量趋势图</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="content" ref="content"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
let content = ref()

onMounted(() => {
    let contentChart = echarts.init(content.value)
    contentChart.setOption({
        visualMap: [
            {
                show: true,
                type: 'continuous',
                seriesIndex: 0,
                min: 0,
                max: 400
            },
        ],
        grid: {
            top: 20,
            bottom: 25
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            data: ['2021-08-01', '2021-08-02', '2021-08-03', '2021-08-04', '2021-08-05', '2021-08-06', '2021-08-07'],
        }
        ,
        yAxis: {
            show: true,
            type: 'value',
            axisLabel: {
                formatter: '{value} 万',
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#999',
                    type: 'dashed'
                }
            },
            axisTick: {
                show: true,
                alignWithLabel: true,
                length: 0,
            },
            min: 0,
            max: 1000,
        }
        ,
        series: [
            {
                type: 'line',
                showSymbol: false,
                data: [350, 650, 500, 780, 860, 690, 550],
                smooth: true,
                lineStyle: {
                    color: '#6e7290',
                    width: 2
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#7b663f' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#36364f' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                }
            }
        ]
    })
})
</script>

<style scoped lang="scss">
.mapbottom {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    margin: 0 20px;

    .title {
        p {
            color: white;
            font-size: 18px;
            font-weight: 900;
        }

        img {
            margin: 10px 0;
        }
    }

    .content {
        width: 100%;
        height: 150px;
    }
}
</style>