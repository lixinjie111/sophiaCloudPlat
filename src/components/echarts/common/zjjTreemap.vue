<template>
  <div class="echarts-box" :id="id"></div>
</template>
<script>
import echarts from "../../echarts.min.js";
export default {
  props: {
    myData: {
      default: () => {
        return [];
      },
    },
    id: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      let _option = this.defaultOption();
      let myChart = echarts.init(document.getElementById(this.id));
      myChart.setOption(_option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    defaultOption() {
      var option = (option = {
        tooltip: {
          show: true,
          formatter(params) {
              var result = "<div style='color:black;'>" + params.treePathInfo[1].name + "</div>";
              result += `<span style="display:block;margin-right:5px;margin-bottom:2px;border-radius:10px;color:black;'">${params.treePathInfo[2].name} ：${params.treePathInfo[2].value}</span>`;
              return result;
          }
        },
        series: [
          {
            breadcrumb: { show: false },
            type: "treemap",
            nodeClick:false,
            roam:false,
            data: this.myData,
          },
        ],
      });
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

