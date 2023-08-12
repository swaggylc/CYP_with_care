<template>
    <div class="type">
        <div class="title">
            <p>预约渠道数据统计</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="content" ref="type"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
let type = ref()

onMounted(() => {
    let typeChart = echarts.init(type.value)
    var val1data2 = [{
        value: 0.2,
        name: '智慧文娱平台',
    },
    {
        value: 0.3,
        name: '飞猪',
    },
    {
        value: 0.4,
        name: '携程',
    },
    {
        value: 0.3,
        name: '地方文旅公众号',
    },
    {
        value: 0.1,
        name: 'e栈攻略',
    },
    ]

    var arr = ['middleLost', 0.6, val1data2, '今日完成进度']
    typeChart.setOption({
        title: {
            top: '45%',
            left: 'center',
            text: arr[3],
            textStyle: {
                color: '#fff',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: 14
            },
            //@ts-ignore
            subtext: '(占所有数据的的' + (arr[1] * 10000 / 100).toFixed(2) + '%)',
            subtextStyle: {
                color: '#fff',
                fontSize: 10
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function (res: any) {
                if (res.componentSubType == 'liquidFill') {
                    return res.seriesName + ': ' + (res.value * 10000 / 100).toFixed(2) + '%';
                } else {
                    return '<span class="ii" style="background:' + res.color + ' "></span>' + res.name + ':<br/> ' + res.data.value;
                }
            }
        },
        series: [{
            type: 'liquidFill',
            itemStyle: {
                normal: {
                    opacity: 0.4,
                    shadowBlur: 0,
                    shadowColor: 'blue'
                }
            },
            name: arr[3],
            data: [{
                value: 0.6,
                itemStyle: {
                    normal: {
                        color: '#53d5ff',
                        opacity: 0.6
                    }
                }
            }],
            //  background: '#fff',
            color: ['#53d5ff'],
            center: ['50%', '50%'],
            /*  backgroundStyle: {
                  color: '#fff'
              },*/
            label: {
                normal: {
                    formatter: '',
                    textStyle: {
                        fontSize: 12
                    }
                }
            },
            outline: {
                itemStyle: {
                    borderColor: '#86c5ff',
                    borderWidth: 0
                },
                borderDistance: 0
            }
        },
        {
            type: 'pie',
            radius: ['63%', '75%'],
            color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4'],
            hoverAnimation: false, ////设置饼图默认的展开样式
            label: {
                show: true,
                normal: {
                    formatter: '{b}\n{d}%',
                    show: true,
                    color: '#fff',
                },
            },
            labelLine: {
                normal: {
                    show: false
                }
            },

            itemStyle: { // 此配置
                normal: {
                    borderWidth: 2,
                    borderColor: '#fff',
                },
                emphasis: {
                    borderWidth: 0,
                    shadowBlur: 2,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            data: arr[2]
        }
        ]
    })
})
</script>

<style scoped lang="scss">
.type {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
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
        height: 220px;
    }
}
</style>