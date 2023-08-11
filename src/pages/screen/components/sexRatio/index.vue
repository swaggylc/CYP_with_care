<template>
    <div class="sex">
        <div class="title">
            <p>男女比例</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="content">
            <div class="man">
                <img src="../../images/man.png" alt="">
            </div>
            <div class="woman">
                <img src="../../images/woman.png" alt="">
            </div>
        </div>
        <div class="line">
            <p>男性58%</p>
            <p>女性42%</p>
        </div>
        <div class="charts" ref="chartsTwo"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
let chartsTwo = ref()

onMounted(() => {
    let myChart = echarts.init(chartsTwo.value)
    myChart.setOption({
        tooltip: {
            show: true
        },
        xAxis: {
            show: false,
            min: 0,
            max: 100,
        },
        yAxis: {
            show: false,
            type: 'category',
        },
        series: [
            {
                type: 'bar',
                data: [58],
                barWidth: 20,
                z: 99,
                itemStyle: {
                    color: '#294D99',
                    borderRadius: 10,
                },
            },
            {
                type: 'bar',
                data: [100],
                barWidth: 20,
                barGap: '-100%',       // 两个柱子重叠
                itemStyle: {
                    color: '#ff8576',
                    borderRadius: 10,
                },
            }
        ],
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
.sex {
    height: 100%;
    width: 100%;
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
        display: flex;
        justify-content: center;

        .man {
            height: 100px;
            width: 100px;
            background: url(../../images/man-bg.png) no-repeat;
            background-size: 100% 100%;
            margin-right: 20px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .woman {
            height: 100px;
            width: 100px;
            background: url(../../images/woman-bg.png) no-repeat;
            background-size: 100% 100%;
            margin-left: 20px;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .line {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
        color: white;
    }

    .charts {
        height: 100px;
        width: 100%;
    }
}
</style>