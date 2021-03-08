<template>
  <div class="echarts-box" :id="id"></div>
</template>

<script>
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
      console.log(this.id);
      console.log(this.myData);
      let myChart = this.$echarts.init(document.getElementById(this.id));
      var echartJson = {
        series: [
          {
            edgeLabel: {
              normal: {

              },
            },
            edgeSymbol: "circle",
            force: {
              repulsion: 160,
              edgeLength: 10,
              friction:0.2
            },
            layout: "force",
            roam: true,
            itemStyle: {
              normal: {
                color: "#6495ED",
              },
            },
            label: {
              normal: {
                show: true,
                align:'center',
                verticalAlign:'center',
                position: ['50%', '120%']
              }
            },
            symbol: "circle",
            symbolSize: 50,
            type: "graph",
          },
        ],
        tooltip: {
            show:true,
            formatter(params) {
                var result = "<div style='color:black;'>" + params.name + "</div>";
                result += `<span style="display:block;margin-right:5px;margin-bottom:2px;border-radius:10px;color:black;'">${params.data.til1} ：${params.data.tilVal1}</span>`;
                result += `<span style="display:block;margin-right:5px;margin-bottom:2px;border-radius:10px;color:black;'">${params.data.til2} ：${params.data.tilVal2}</span>`;
                result += `<span style="display:block;margin-right:5px;margin-bottom:2px;border-radius:10px;color:black;'">${params.data.til3} ：${params.data.tilVal3}</span>`;
                result += `<span style="display:block;margin-right:5px;margin-bottom:2px;border-radius:10px;color:black;'">${params.data.til4} ：${params.data.tilVal4}</span>`;
                result += `<span style="display:block;margin-right:5px;margin-bottom:2px;border-radius:10px;color:black;'">${params.data.til5} ：${params.data.tilVal5}</span>`;
                result += `<span style="display:block;margin-right:5px;margin-bottom:2px;border-radius:10px;color:black;'">${params.data.til6} ：${params.data.tilVal6}</span>`;
                result += `<span style="display:block;margin-right:5px;margin-bottom:2px;border-radius:10px;color:black;'">${params.data.til7} ：${params.data.tilVal7}</span>`;
                return result;
            },
            backgroundColor: 'white',
            borderWidth:1,
            padding:10,
            borderColor:'black'
        },
      };
      loadEcharts(echartJson);
      function loadEcharts(echartJson) {
        var option = echartJson;
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
      }

      var map = this.myData;
      pubdata(map);
      function getImgData(imgSrc) {
        var fun = function (resolve) {
          const canvas = document.createElement("canvas");
          const contex = canvas.getContext("2d");
          const img = new Image();
          img.crossOrigin = "";
          img.onload = function () {
            var center = {
              x: img.width / 2,
              y: img.height / 2.5,
            };
            var diameter = img.width;
            canvas.width = diameter;
            canvas.height = diameter;
            contex.clearRect(0, 0, diameter, diameter);
            contex.save();
            contex.beginPath();
            var radius = (img.width) / 2;
            contex.arc(radius, radius, radius, 0, 2 * Math.PI);
            contex.clip();
            contex.drawImage(
              img,
              center.x - radius,
              center.y - radius,
              diameter,
              diameter,
              0,
              0,
              diameter,
              diameter
            );
            contex.restore();
            resolve(canvas.toDataURL("image/png", 1));
          };
          img.src = imgSrc;
        };
        var promise = new Promise(fun);
        return promise;
      }
      function pubdata(json) {
        var optionData = json;
        var picList = [];
        for (var i = 0; i < optionData.length; i++) {
          let p = getImgData(optionData[i].symbol);
          picList.push(p);
        }
        Promise.all(picList).then(function (images) {
          for (var i = 0; i < images.length; i++) {
            var img = "image://" + images[i];
            optionData[i].symbol = img;
          }
          myChart.setOption({
            series: [
              {
                data: optionData,
              },
            ],
          });
          myChart.on('click',function(parm){
              console.log(parm)
          });
        });
      }

      window.addEventListener("resize", () => {
        myChart.resize();
      });
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

