<template>
  <div class="echarts-box" :id="chartID"></div>
</template>

<script>
  import echarts from 'echarts'

  let id = 0;
  var dataArr = 10;
  const COLORS = ['#4D94FF', '#A49DFA', '#FC809F', '#FFD98C', '#8AE6C7', '#E19564', '#E44C7F', '#CECE7E', '#CECE7E', '#B7C8EA', '#95E9ED', '#91C2F2', '#B380B6', '#EDA8AD', '#738AD4']
  export default {
    // roseType 默认为 false，代表圆环图， radius:圆环南丁格尔图， area: 区域南丁格尔图
    props: {
      myData: {
        default: () => {
        }
      },
      colorList: {default: COLORS},
      roseType: {default: false},
    },
    data() {
      id++
      return {
        chartID: `yibiao1-${id}`,
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
        if (!myData || !myData.name) {
          return
        }
        let _option = this.defaultOption(myData);
        this.myChart.setOption(_option);
      },
      defaultOption(myData) {
        const {name, value} = myData || {name: [], value: []};
        const color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
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
        ])
        const option ={
          backgroundColor: "#FFFFFF",
          title: {
            show: true,
            text: '敏感性 ' + value[0] +'%',
            x: '50%',
            y: '57%',
            z: 8,
            textAlign: 'center',
            textStyle: {
              color: '#f1f7fe',
              fontSize: 14,
              fontWeight: 'normal'
            }
          },
          series: [{
            name: "内部（环形）进度条",
            type: "gauge",
            radius: '60%',
            splitNumber: 10,
            axisLine: {
              lineStyle: {
                color: [[1, color]],
                width: 14
              }
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,

            },
            splitLine: {
              show: false,
            },
            pointer: {
              show: false,
            },
          },
            {
              name: '外部刻度',
              type: 'gauge',
              radius: '70%',
              min: 0, //最小刻度
              max: 100, //最大刻度
              splitNumber: 10, //刻度数量
              startAngle: 225,
              endAngle: -45,
              axisLine: {
                show: true,
                // 仪表盘刻度线
                lineStyle: {
                  width: 2,
                  color: [[1, color]],
                }
              },
              //仪表盘文字
              axisLabel: {
                show: true,
                color: [[1, color]],
                distance: 20,
                formatter: function (v) {
                  switch (v + '') {
                    case '0':
                      return '0';
                    case '10':
                      return '10';
                    case '20':
                      return '20';
                    case '30':
                      return '30';
                    case '40':
                      return '40';
                    case '50':
                      return '50';
                    case '60':
                      return '60';
                    case '70':
                      return '70';
                    case '80':
                      return '80';
                    case '90':
                      return '90';
                    case '100':
                      return '100';
                  }
                }
              }, //刻度标签。
              axisTick: {
                show: true,
                splitNumber: 7,
                lineStyle: {
                  color: [color], //用颜色渐变函数不起作用
                  width: 2,
                },
                length: -8
              }, //刻度样式
              splitLine: {
                show: true,
                length: -20,
                lineStyle: {
                  color: '#3398ff', //用颜色渐变函数不起作用
                }
              }, //分隔线样式
              detail: {
                show: false
              },
              pointer: {
                show: false
              }
            },
            /*内部*/
            {
              type: 'pie',
              radius: ['0', '40%'],
              center: ['50%', '50%'],
              z: 8,
              hoverAnimation: false,
              data: [{
                name: '检查进度',
                value: value[1],
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#3398ff'
                    }, {
                      offset: 1,
                      color: '#7db0fd'
                    }])
                  }

                },
                label: {
                  normal: {
                    formatter: function (params) {
                      return params.value + '%';
                    },
                    color: '#FFFFFF',
                    fontSize: 38,
                    fontWeight: "bold",
                    position: 'center',
                    show: true
                  }
                },
                labelLine: {
                  show: false
                }
              }],
            },
            /*外一层*/
            {
              type: "pie",
              radius: "45%",
              startAngle: 220,
              endAngle: -40,
              hoverAnimation: false,
              center: ["50%", "50%"],
              avoidLabelOverlap: false,
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              data: [{
                value: 1,
                itemStyle: {
                  normal: {
                    color: '#8DC4FD'
                  }
                }
              }],
            },
            //外二层圈
            {
              type: "pie",
              radius: "50%",
              center: ["50%", "50%"],
              avoidLabelOverlap: false,
              z: 0,
              hoverAnimation: false,
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              data: [{
                "value": 1,
                itemStyle: {
                  normal: {
                    color: '#e3edf8'
                  }
                }
              }]
            }
          ]
        };
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

