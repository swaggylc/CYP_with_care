<template>
    <div class="ranking">
        <div class="title">
            <p>热门景区排行</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="content" ref="ranking"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
let ranking = ref()

onMounted(() => {
    let rankingChart = echarts.init(ranking.value)
    rankingChart.setOption({
        color: ['#efbb1a', '#d77169', '#c14f60', '#953f61', '#72355f',],
        grid: {
            bottom: 10
        },
        series: [
            {
                name: '漏斗图',
                type: 'funnel',
                x: '10%',
                y: 60,
                //x2: 80,
                y2: 60,
                width: '80%',
                // height: {totalHeight} - y - y2,
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending', // 'ascending', 'descending'
                gap: 10,
                data: [
                    { value: 18, name: '峨眉山' },
                    { value: 55, name: '九寨沟' },
                    { value: 35, name: '泰山' },
                    { value: 45, name: '武功山' },
                    { value: 65, name: '长城' }


                ].sort(function (a, b) { return a.value - b.value }),
                roseType: true,
                label: {
                    normal: {
                        formatter: function (params: any) {
                            return params.name + ' ' + params.value + '万';
                        },
                        position: 'center'
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 0,
                        shadowBlur: 30,
                        shadowOffsetX: 0,
                        shadowOffsetY: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }

            }

        ]
    })

})
</script>

<style scoped lang="scss">
.ranking {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    margin: 20px 0;

    .title {
        p {
            color: white;
            font-size: 18px;
            font-weight: 900;
        }

        img {
            margin: 20px 0;
        }
    }

    .content {
        width: 100%;
        height: 300px;
    }
}
</style>