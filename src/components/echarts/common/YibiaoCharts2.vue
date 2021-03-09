<template>
  <div class="echarts-box" :id="chartID"></div>
</template>

<script>
  import echarts from 'echarts'

  let id = 0;
  const COLORS = ['#4D94FF', '#A49DFA', '#FC809F', '#FFD98C', '#8AE6C7', '#E19564', '#E44C7F', '#CECE7E', '#CECE7E', '#B7C8EA', '#95E9ED', '#91C2F2', '#B380B6', '#EDA8AD', '#738AD4']
  export default {
    props: {
      myData: {
        default: () => {
        }
      },
      colorList: {default: COLORS},
    },
    data() {
      id++
      return {
        chartID: `yibiao2-${id}`,
        myChart: null
      }
    },
    mounted() {
      this.getChart();
      this.initEcharts(this.myData);
    },
    watch: {
      myData(myData) {
        this.initEcharts(myData)
      },
    },
    methods: {
      getChart() {
        this.myChart = this.$echarts.init(document.getElementById(this.chartID));
        window.addEventListener('resize',()=>{
                this.myChart.resize();
            })
      },
      initEcharts(myData) {
        if (!myData) {
          return
        }
        let _option = this.defaultOption(myData);
        this.myChart.setOption(_option);
      },
      defaultOption(myData) {
        const { value } = myData || {}
        var color = new echarts.graphic.LinearGradient(
          0, 0, 1, 0,
          [{
            offset: 0,
            color: "rgba(3, 110, 255, .5)",
          },
            {
              offset: 1,
              color: "rgba(3, 110, 255, 1)",
            }
          ]
        );
        const option = {
          series: [
            {
              type: 'gauge',
              startAngle: 180,
              endAngle: 0,
              min: 0,
              max: 100,
              radius: '70%',
              title: {
                show: false
              },
              detail: {
                // width: '80%',
                offsetCenter: ['0', '-60%'],
                formatter: function (value) {
                  return '{value|' + value + '}';
                },
                rich: {
                  value: {
                    fontSize: 28,
                    fontWeight: 'bolder',
                    color: '#4992FF'
                  },
                }
              },
              axisLine: {
                show: false,
              },
              axisTick: {
                show: true,
                distance: -30,
                // length: 10,
                lineStyle: {
                  color: '#4992FF'
                }
              },
              // splitNumber: 5,
              splitLine: {
                length: 16,
                // show: false,
                distance: -30,
                lineStyle: {
                  // color: 'red',
                  color: '#4992FF',
                  // width: 1,
                }
              },
              axisLabel: {
                show: false
              },
              pointer: {
                width: 10,
                length: '70%'
              },
              itemStyle: {
                color: color,
                shadowColor: 'rgba(0,138,255,0.45)',
                shadowBlur: 10,
                shadowOffsetX: 2,
                shadowOffsetY: 2
              },
              markPoint: {
                data: [{
                  x: "50%",
                  y: "50%",
                  symbol: 'circle',
                  symbolSize: 8,
                  itemStyle: {
                    color: "#fff"
                  },
                }]
              },
              data: [{
                value: value,
              },]
            },
            {
              type: 'gauge',
              radius: '80%',
              startAngle: 180,
              endAngle: 0,
              min: 0,
              max: 100,
              title: {
                show: false
              },
              detail: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  width: 10,
                  color: [
                    [1,new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0.1,
                        color: "#4D94FF"
                      },
                      {
                        offset: 0.6,
                        color: "#A49DFA"
                      },
                      {
                        offset: 1,
                        color: "#FC809F"
                      }
                    ])]
                  ],
                }
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: false
              },
              pointer: {
                show: false,
              },
              itemStyle: {
                normal: {
                  color: '#54F200',
                }
              },
            },
            // {
            //   type: 'gauge',
            //   // splitNumber: 10, //刻度数量
            //   min: 0,
            //   max: 100,
            //   startAngle: 180,
            //   endAngle: 0,
            //   radius: '80%', //图表尺寸
            //   // center:['50%','50%'],
            //   axisLine: {
            //     show: true,
            //     lineStyle: {
            //       width: 0,
            //       shadowBlur: 0,
            //       color: [[0.05,'#cf3'],
            //         [0.10,'#9f3'],
            //         [0.15,'#6f3'],
            //         [0.20,'#3f3'],
            //         [0.25,'#3f6'],
            //         [0.30,'#3f9'],
            //         [0.35,'#3fc'],
            //         [0.40,'#3ff'],
            //         [0.45,'#3cf'],
            //         [0.50,'#39f'],
            //         [0.55,'#36f'],
            //         [0.60,'#33f'],
            //         [0.65,'#63f'],
            //         [0.70,'#93f'],
            //         [0.75,'#c3f'],
            //         [0.80,'#f3f'],
            //         [0.85,'#f3c'],
            //         [0.90,'#f39'],
            //         [0.95,'#f36'],
            //         [1,'#fff']]
            //     }
            //   },
            //   axisTick: {
            //     show: true,
            //     lineStyle: {
            //       color: 'auto',
            //       width: 2
            //     },
            //     length: 20,
            //     splitNumber: 5
            //   },
            //   splitLine: {
            //     show: true,
            //     length: 22,
            //     lineStyle: {
            //       color: 'auto',
            //     }
            //   },
            //   axisLabel: {
            //     show: false
            //   },
            //   pointer: { //仪表盘指针
            //     show: 0,
            //     length: '70%',
            //     width: 2
            //   },
            //   detail: {
            //     borderColor: '#fff',
            //     shadowColor: '#fff', //默认透明
            //     shadowBlur: 2,
            //     offsetCenter: [0, '0%'], // x, y，单位px
            //     textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            //       color: '#fff',
            //       fontSize: 30,
            //     },
            //     formatter: '{value}%'
            //   },
            //   // data: [{
            //   //   name: "",
            //   //   value:50
            //   // }]
            // }
          ]

        }
        return option;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .echarts-box {
    width: 100%;
    height: 100%;
  }
</style>

