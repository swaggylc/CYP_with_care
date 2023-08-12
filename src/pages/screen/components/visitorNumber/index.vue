<template>
    <div class="numbers">
        <div class="title">
            <p>年度游客量对比</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="content" ref="numbers"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
let numbers = ref()

onMounted(() => {
    let numbersChart = echarts.init(numbers.value)
    numbersChart.setOption({
        grid: {
            top: "30",
            bottom: "20"//也可设置left和right设置距离来控制图表的大小
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
                label: {
                    show: true
                }
            }
        },
        legend: {
            data: ["游客人数", "营收额"],
            top: "0%",
            textStyle: {
                color: "#ffffff"
            }
        },
        xAxis: {
            data: [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
            ],
            axisLine: {
                show: true, //隐藏X轴轴线
                lineStyle: {
                    color: '#01FCE3'
                }
            },
            axisTick: {
                show: true //隐藏X轴刻度
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: "#ebf8ac" //X轴文字颜色
                }
            },

        },
        yAxis: [
            {
                type: "value",
                name: "万元",
                nameTextStyle: {
                    color: "#ebf8ac"
                },
                position: "right",
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    // formatter: "{value}", //右侧Y轴文字显示
                    textStyle: {
                        color: "#ebf8ac"
                    }
                }
            }, {
                type: "value",
                name: "万人",
                nameTextStyle: {
                    color: "#ebf8ac"
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: true
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#FFFFFF'
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "#ebf8ac"
                    }
                },
            },
            {
                type: "value",
                gridIndex: 0,
                min: 50,
                max: 100,
                splitNumber: 8,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
                    }
                }
            }
        ],
        series: [{
            name: "游客人数",
            type: "line",
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: true, //平滑曲线显示
            showAllSymbol: true, //显示所有图形。
            symbol: "circle", //标记的图形为实心圆
            symbolSize: 10, //标记的大小
            itemStyle: {
                //折线拐点标志的样式
                color: "#058cff"
            },
            lineStyle: {
                color: "#058cff"
            },
            areaStyle: {
                color: "rgba(5,140,255, 0.2)"
            },
            data: [450, 400, 520, 390, 330, 350, 380, 570, 750, 590, 880, 630]
        },
        {
            name: "营收额",
            type: "bar",
            barWidth: 15,
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: "#00FFE3"
                    },
                    {
                        offset: 1,
                        color: "#4693EC"
                    }
                    ])
                }
            },
            data: [420, 380, 480, 350, 290, 280, 340, 520, 680, 540, 840, 570]
        }
        ]
    })
})
</script>

<style scoped lang="scss">
.numbers {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;

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
        height: 200px;
    }
}
</style>