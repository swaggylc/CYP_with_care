<template>
    <div class="age">
        <div class="title">
            <p>年龄比例</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="content" ref="bar"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
let bar = ref()

onMounted(() => {
    let barChart = echarts.init(bar.value)
    barChart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
            {
                name: 'Area Mode',
                type: 'pie',
                radius: [20, 100],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 5
                },
                data: [
                    { value: 30, name: '0-10' },
                    { value: 28, name: '10-18' },
                    { value: 26, name: '18-26' },
                    { value: 24, name: '26-35' },
                    { value: 22, name: '35-42' },
                    { value: 20, name: '42-55' },
                    { value: 18, name: '55-65' },
                    { value: 16, name: '65以上' }
                ]
            }
        ]
    })
})

</script>

<style scoped lang="scss">
.age {
    height: 100%;
    width: 100%;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    margin-bottom: 20px;

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
        height: 210px;
        width: 100%;
    }
}
</style>