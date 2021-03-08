<template>
  <div class="echarts-box" :id="chartID"></div>
</template>

<script>
let id = 0;
const COLORS = [
  "#4D94FF",
  "#A49DFA",
  "#FC809F",
  "#FFD98C",
  "#8AE6C7",
  "#E19564",
  "#E44C7F",
  "#CECE7E",
  "#CECE7E",
  "#B7C8EA",
  "#95E9ED",
  "#91C2F2",
  "#B380B6",
  "#EDA8AD",
  "#738AD4",
];
export default {
  // roseType 默认为 false，代表圆环图， radius:圆环南丁格尔图， area: 区域南丁格尔图
  props: {
    myData: { default: () => {} },
    colorList: { default: COLORS },
    roseType: { default: false },
  },
  data() {
    id++;
    return {
      chartID: `pie2-${id}`,
      myChart: null,
    };
  },
  mounted() {
    this.getChart();
    this.initEcharts(this.myData);
  },
  watch: {
    myData(myData) {
      this.initEcharts(myData);
    },
  },
  methods: {
    getChart() {
      this.myChart = this.$echarts.init(document.getElementById(this.chartID));
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    },
    initEcharts(myData) {
      if (!myData || !myData.name) {
        return;
      }
      let _option = this.defaultOption(myData);
      this.myChart.setOption(_option);
    },
    defaultOption(myData) {
      const { name, value } = myData || { name: [], value: [] };
      const option = {
        color:[ "#FC809F","#A49DFA","#4D94FF"],
        grid: {
          left: "center",
          // right: '4%',
          top: "0",
          bottom: "60",
          containLabel: true,
        },
        legend: {
          icon: "circle",
          type: "scroll",
          // orient: 'horizontal',
          orient: "vertical",
          right: "10%",
          top: "center",
          // bottom: -10,
          data: ['忠实顾客','摇摆顾客','潜在顾客',],
          padding: [20, 40],
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "忠实顾客",
            type: "pie",
            center: ['20%', '50%'],
            radius : ['50%', '40%'],
            label: {
              normal: {
                position: "inner",
              },
            },

            data: [
              {
                value: "967",
                name: "忠实顾客",
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                    normal: {
                      color: "#dc1439",
                    },
                  },
                },
              },
              {
                value: "2800",
                itemStyle: {
                  normal: {
                    color: "rgba(213,223,236,1)",
                  },
                },
              },
            ],
          },
          {
            name: "摇摆顾客",
            type: "pie",
            center: ['20%', '50%'],
            radius : ['60%', '70%'],
            data: [
              {
                value: "825",
                name: "摇摆顾客",
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                    normal: {
                      color: "#dc1439",
                    },
                  },
                },
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },
          {
            name: '潜在顾客',
            type: 'pie',
            center: ['20%', '50%'],
            radius : ['80%', '90%'],
            data:[
                // {value:1078, name:'潜在顾客'}
                {
                    value:'1078',
                    name:'潜在顾客',
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                            normal: {
                                color: "rgba(213,223,236,1)",
                            }
                        }
                    }
                },
                {
                    value:'800', 
                    itemStyle: {
                        normal: {
                            color: "rgba(213,223,236,1)",
                        }
                    }
                }
                
            ]
        },
        ],
      };
      return option;
    },
  },
};
</script>
<style lang="scss" scoped>
.echarts-box {
  width: 100%;
  height: 100%;
}
</style>
