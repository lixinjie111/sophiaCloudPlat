<template>
  <div class="container">
    <div class="echarts-box" :id="chartID"></div>
<!--    <img id="img" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg" alt="">-->
  </div>
</template>

<script>
  let id = 0;
  const COLORS = ['#4D94FF', '#A49DFA', '#FC809F', '#FFD98C', '#8AE6C7', '#E19564', '#E44C7F', '#CECE7E', '#CECE7E', '#B7C8EA', '#95E9ED', '#91C2F2', '#B380B6', '#EDA8AD', '#738AD4']
  export default {
    props: {
      myData: {
        default: () => {
        }
      },
      colorList: {default: COLORS},
      max: {default: 100},
    },
    data() {
      id++
      return {
        chartID: `match-echarts-${id}`,
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
      defaultOption() {
        function contains(arrays, obj) {
          var i = arrays.length;
          while (i--) {
            if (arrays[i] === obj) {
              return i;
            }
          }
          return false;
        }
        const {name, value} = this.myData || {name: [], value: []};
        const color = this.colorList;
        const max = this.max;
        const option = {
          color: color,
          title: {show: false},
          tooltip: {
            textStyle: {
              fontSize: 14
            },
            formatter: function () {
              var html = '';
              for (var i = 0; i < value.length; i++) {
                html += name[i] + ' : ' + value[i] + '<br>'
              }
              return html
            }
          },
          radar: {
            radius: '58%',
            center: ['50%', '50%'],
            triggerEvent: true,
            name: {
              textStyle: {
                fontSize: '14',
                borderRadius: 3,
                // padding: [3, 5],
                align: 'center',
                rich: {
                  a: {
                    fontSize: '14',
                    align: 'center',
                    padding: [6, 0, 0, 0]
                  },
                  b: {
                    fontSize: '14',
                    align: 'center',
                    padding: [-60, 0, 0, 0]
                  }
                },
              },

              formatter: function (params) {
                var i = contains(name, params);
                var percent = (value[i] / 100 * 100);
                if (i === 0) {
                  return ' {b|' + params + '  ' + percent + '%}'
                }
                return '{a|' + percent + '%}\n' + params
              },
            },
            nameGap: '60',
            indicator: name.map(e => ({max, name: e})),
            splitArea: {
              areaStyle: {
                color: 'transparent'
              }
            },
            axisLine: { //指向外圈文本的分隔线样式
              lineStyle: {
                color: '#cccccc',
                width: 1,
              }
            },
            splitLine: {
              lineStyle: {
                width: 1,
                color: '#cccccc',
                shadowBlur: 0,
                shadowColor: color[2]
              }
            },
            splitNumber: 4,
          },
          series: [{
            name: '',
            type: 'radar',
            areaStyle: {
              // normal: {
              //   color: {
              //     image: document.getElementById('img'),
              //     repeat: 'repeat'
              //   },
              // },
              normal: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 1,
                  colorStops: [{
                    offset: 0, color: '#B2CEFF' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#2373FF' // 100% 处的颜色
                  }],
                  global: false
                },
              opacity: 1,
              }
            },
            symbolSize: 0,
            lineStyle: {
              show: false,
              // normal: {
              //   color: color[0],
              //   width: 0,
              //   opacity: 1,
              // }
            },
            data: [value],
          }]
        }
        return option;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .container{

  }
  .container, .echarts-box {
    width: 100%;
    height: 100%;
  }
  #img{
    position: absolute;
    z-index: -1;
  }
</style>

