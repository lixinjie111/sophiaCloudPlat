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
      max: { default: 88 },
      titleText: { default: 92 },
    },
    data() {
      id++
      return {
        chartID: `leida-${id}`,
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
        const color = this.colorList;
        const max = this.max;
        const title = this.titleText;
        const option = {
          color: this.colorList,
          title: [{
            text: title,
            x: 'center',
            y: 'center',
            textStyle: {
              color: "#fff",
              fontSize: 39
            },
            zlevel: 24
          }],
          tooltip: {
            how: true,
            trigger: "item",
            confine: true
          },
          "legend": {
            "show": true,
            "icon": "circle",
            "left": "35%",
            "top": "90%",
            "orient": "horizontal",
            "textStyle": {
              "fontSize": 14,
              "color": "#000"
            },
          },
          "radar": {
            "center": ["50%", "50%"],
            "radius": "60%",
            "startAngle": 180,
            "splitNumber": 4,
            "shape": "circle",
            "splitArea": {
              "areaStyle": {
                "color": ["transparent"]
              }
            },
            name: {
              textStyle: {
                color: 'rgb(51,51,51)',
                fontSize: 12,
              },
            },
            "axisLabel": {
              "show": false,
              "fontSize": 18,
              "color": "#000",
            },
            "axisLine": {
              "show": true,
              "lineStyle": {
                "color": "#e3e3e3" //
              },
            },
            "splitLine": {
              "show": true,
              "lineStyle": {
                "color": "#e3e3e3" //
              }
            },
            indicator: name.map((e)=>({ name: e, max })),
          },
          series: value.map((it, i)=>({
            "name": "数据",
            "type": "radar",
            "symbol": "circle",
            "symbolSize": 4,
            "areaStyle": {
              "normal": {
                "color": color[i],
                opacity: 0.5,
              }
            },
            itemStyle: {
              color: color[i],
              borderColor: color[i],
              borderWidth: 1,
            },
            "lineStyle": {
              "normal": {
                "color": color[i],
                "width": 1,
                opacity: 0.5,
              }
            },
            "data": [it]
          })),
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

