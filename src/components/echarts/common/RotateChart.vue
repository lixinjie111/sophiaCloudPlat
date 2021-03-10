<template>
  <div class="echarts-box" :id="chartID"></div>
</template>

<script>
  let id = 0;
  const COLORS = ['#4D94FF', '#A49DFA', '#FC809F', '#FFD98C', '#8AE6C7', '#E19564', '#E44C7F', '#CECE7E', '#CECE7E', '#B7C8EA', '#95E9ED', '#91C2F2', '#B380B6', '#EDA8AD', '#738AD4']
  export default {
    props: {
      myData: {default: () => {}},
      colorList: {default: COLORS},
    },
    data() {
      id++
      return {
        chartID: `rotate-${id}`,
        myChart: null,
        angle: 0,
        value: 72,
      }
    },
    mounted() {
      this.getChart();
      this.initEcharts();
      this.animation();
    },
    methods: {
      //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
      getCirlPoint(x0, y0, r, angle) {
        let x1 = x0 + r * Math.cos(angle * Math.PI / 180);
        let y1 = y0 + r * Math.sin(angle * Math.PI / 180);
        return {
          x: x1,
          y: y1
        }
      },
      animation() {
        this.timer = setInterval(() => {
          //用setInterval做动画感觉有问题
          this.draw()
        }, 100);
      },
      draw() {
        this.angle = this.angle + 3;
        this.myChart.setOption(this.getOption(), true)
        //
      },
      getChart() {
        this.myChart = this.$echarts.init(document.getElementById(this.chartID));
       window.addEventListener('resize',()=>{
                this.myChart.resize();
            })
      },
      initEcharts() {
        let _option = this.getOption();
        this.myChart.setOption(_option);

      },
      getOption() {
        const _this = this;
        const value = this.myData.value;
        const sum = (value[0] || 0) + (value[1] || 0);
        // const max = Math.max((value[0] || 0), (value[1] || 0));
        const num1 = value[0]
        const num2 = value[1]
        const textColor = '#2373FF'
        var option = {
          // backgroundColor: "#ffffff",
          color: this.colorList,
          title: {
            text: '{a|' + (num1 / sum * 100).toFixed() + '}{c|%}',
            x: 'center',
            y: 'center',
            textStyle: {
              rich: {
                a: {
                  fontSize: 32,
                  color: '#242F57'
                },

                c: {
                  fontSize: 32,
                  color: '#242F57'
                }
              }
            }
          },
          legend: {
            bottom: '5%',
            align: "auto",
            icon: 'circle',
            data: _this.myData.name,
            selectedMode: false
          },
          series: [
            {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function (params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                    startAngle: (0 + _this.angle) * Math.PI / 180,
                    endAngle: (90 + _this.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: textColor,
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            },
            {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function (params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                    startAngle: (180 + _this.angle) * Math.PI / 180,
                    endAngle: (270 + _this.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: textColor,
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            },
            {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function (params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
                    startAngle: (270 + -_this.angle) * Math.PI / 180,
                    endAngle: (40 + -_this.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: textColor,
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            },
            {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function (params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
                    startAngle: (90 + -_this.angle) * Math.PI / 180,
                    endAngle: (220 + -_this.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: textColor,
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            },
            {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function (params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65;
                let point = _this.getCirlPoint(x0, y0, r, (90 + -_this.angle))
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4
                  },
                  style: {
                    stroke: textColor,//粉
                    fill: textColor
                  },
                  silent: true
                };
              },
              data: [0]
            },
            {
              name: "ring5",  //绿点
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function (params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65;
                let point = _this.getCirlPoint(x0, y0, r, (270 + -_this.angle));
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4
                  },
                  style: {
                    stroke: textColor,      //绿
                    fill: textColor
                  },
                  silent: true
                };
              },
              data: [0]
            },
            {
              type: 'pie',
              radius: ['55%', '43%'],
              silent: true,
              clockwise: true,
              startAngle: 90,
              z: 0,
              zlevel: 0,
              label: {
                normal: {
                  show: false
                  //position: "center",
                }
              },
              data: [
                {
                  value: num1,
                  name: _this.myData.name[0],
                  itemStyle: {
                    normal: {
                      //color: '#73ACFF'
                      // { // 完成的圆环的颜色
                      //     colorStops: [{
                      //         offset: 0,
                      //         color: '#4FADFD' // 0% 处的颜色
                      //     }, {
                      //         offset: 1,
                      //         color: '#28E8FA' // 100% 处的颜色
                      //     }]
                      // },
                    }
                  }
                },
                {
                  value: num2,
                  name: _this.myData.name[1],
                  label: {
                    normal: {
                      show: false
                    }
                  },
                  itemStyle: {
                    normal: {
                      //color: "#FD866A"
                    }
                  }
                }
              ]
            },
            {
              type: "gauge",
              radius: "58%",
              center: ['50%', '50%'],
              startAngle: 0,
              endAngle: 359.9,
              splitNumber: 8,
              hoverAnimation: true,
              axisTick: {
                show: false
              },
              splitLine: {
                show: false,
                length: 60,
                lineStyle: {
                  width: 5,
                  color: "#061740"
                }
              },
              axisLabel: {
                show: false
              },
              pointer: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  opacity: 0
                }
              },
              detail: {
                show: false
              },
              data: [{
                value: 0,
                name: ""
              }]
            },

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

