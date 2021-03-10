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
      max: { default: 10 },
      titleText: { default: 92 },
    },
    data() {
      id++
      return {
        chartID: `leida2-${id}`,
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
        const max = this.max;
        const option = {
          color: this.colorList,
          // backgroundColor: 'rgba(255, 255, 255, 0.6)',
          title: {
            show: false
          },
          tooltip: {
            how: true,
            trigger: "item",
            confine: true,
            formatter: (v)=>{
              return v.dimensionNames.map((e, i)=>{
                return `<div>${name[i]}: ${value[i]}</div>`
              }).join('')
            }
          },
          "legend": {
            "show": true,
            "icon": "circle",
            "left": "35%",
            "top": "90%",
            "orient": "horizontal",
            "textStyle": {
              "fontSize": 14,
              "color": "#636E95"
            },
          },
          "radar": {
            "center": ["50%", "50%"],
            "radius": "60%",
            "startAngle": 180,
            "splitNumber": 4,
            "shape": "polygon",
            "splitArea": {
              "areaStyle": {
                "color": ["transparent"]
              }
            },
            name: {
              textStyle: {
                "color": "#636E95",
                fontSize: 12,
              },
              formatter: function (text, indicator) {
                const value = indicator.value
                return text + '\n' + value;
              }
            },
            "axisLabel": {
              "show": false,
              "fontSize": 18,
              "color": "#636E95"
            },
            "axisLine": {
              "show": true,
              "lineStyle": {
                "color": "#636E95",
                opacity: 0.5
              },
            },
            "splitLine": {
              "show": true,
              "lineStyle": {
                "color": "#636E95",
                opacity: 0.5
              }
            },
            indicator: (function (){
              // name.map((e, i)=>({ name: e, max, value: value[i] }))
              var res = [];
              for (let i = 0; i < name.length; i++) {
                res.push({text: name[i], max, value: value[i] });
              }
              return res;
            })(),
          },
          series: [
            {
              "name": "数据",
              "type": "radar",
              "symbol": "circle",
              "symbolSize": 4,
              "areaStyle": {
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
              itemStyle: {
                borderWidth: 3,
                // color: '#fff'
              },
              "lineStyle": {
                "normal": {
                  "width": 1,
                  opacity: 0.5,
                }
              },
              "data": [value]
            }
          ],
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

