<template>
  <div class="apiMan_container">
    <div class="select_area_container">
      <div class="select_container">
        <a-select default-value="lucy" style="width:100%">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled" disabled>
            <!--禁止选中-->
            Disabled
          </a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
      </div>
      <div class="time_container">
        <a-range-picker
          style="width:100%"
          separator="-"
          :locale="locale"
          @openChange="handleOpenChange"
        />
      </div>
      <div class="btn_container">
        <a-button>重置</a-button>
        <a-button type="primary">查询</a-button>
      </div>
    </div>
    <div class="fangwen_area_container">
      <div class="title_container">访问趋势</div>
      <div class="bar_container" id="barID"></div>
      <div class="expan_btn_container">
        <div class="btn_container1"></div>
      </div>
    </div>
    <div class="nengli_area_container">
      <div class="nengli_title_container">能力服务列表</div>
      <div class="table_container">
        <a-table :columns="columns" :data-source="data"></a-table>
      </div>
    </div>
  </div>
</template>

<script>
import locale from "x-intelligent-ui/es/date-picker/locale/zh_CN";
export default {
  name: "apiMan",
  data() {
    return {
      locale,
      columns: [
        {
          title: "API名称",
          dataIndex: "apiname",
          key: "apiname"
        },
        {
          title: "消费状态",
          dataIndex: "xfStatus",
          key: "xfStatus"
        },
        {
          title: "调用量限制",
          dataIndex: "dyxianzhi",
          key: "dyxianzhi"
        },
        {
          title: "QPS",
          key: "qps",
          dataIndex: "qps"
        },
        {
          title: "购买时间",
          key: "action",
          dataIndex: "action"
        },
        {
          title: "到期时间",
          key: "action",
          dataIndex: "action"
        },
        {
          title: "开通付费",
          key: "action",
          dataIndex: "action"
        },
        {
          title: "购买次数包",
          key: "action",
          dataIndex: "action"
        }
      ],
      data: [
        {
          key: "1",
          apiname: "语音识别-普通话",
          xfStatus: '待开通付费',
          dyxianzhi: "200万次赠送",
          tags: ["nice", "developer"]
        },
        {
          key: "2",
          apiname: "语音识别-英语",
          xfStatus: '按量付费',
          dyxianzhi: "--",
          tags: ["loser"]
        },
        {
          key: "3",
          apiname: "语音识别-粤语",
          xfStatus: '按次付费',
          dyxianzhi: "1000万次",
          tags: ["cool", "teacher"]
        }
      ]
    };
  },
  mounted() {
    this.initBarEcharts();
  },
  methods: {
    handleOpenChange() {
      setTimeout(() => {
        if (document.getElementsByClassName("ant-calendar-range-middle")[0]) {
          document.getElementsByClassName(
            "ant-calendar-range-middle"
          )[0].innerText = "-";
        }
      }, 300);
    },
    initBarEcharts() {
      var myChart = this.$echarts.init(document.getElementById("barID"));
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "10%"
        },
        legend: {
          data: ["蒸发量", "平均温度"]
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ],
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "水量",
            axisLabel: {
              formatter: "{value} ml"
            }
          },
          {
            type: "value",
            name: "温度",
            axisLabel: {
              formatter: "{value} °C"
            }
          }
        ],
        series: [
          {
            name: "蒸发量",
            type: "bar",
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ]
          },
          {
            name: "平均温度",
            type: "line",
            yAxisIndex: 1,
            data: [
              2.0,
              2.2,
              3.3,
              4.5,
              6.3,
              10.2,
              20.3,
              23.4,
              23.0,
              16.5,
              12.0,
              6.2
            ]
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.apiMan_container {
  width: 100%;
  height: 100%;
  .select_area_container {
    width: 100%;
    height: 80px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    .select_container {
      width: 199px;
      height: 32px;
      margin-right: 20px;
    }
    .time_container {
      width: 394px;
      height: 32px;
      margin-right: 360px;
    }
    .btn_container {
      width: 136px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .fangwen_area_container {
    width: 100%;
    height: 316px;
    margin-bottom: 13px;
    .title_container {
      width: 100%;
      height: 60px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 24px;
      display: flex;
      align-items: center;
    }
    .bar_container {
      width: 100%;
      height: 230px;
    }
    .expan_btn_container {
      width: 100%;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      .btn_container1 {
        width: 19px;
        height: 19px;
        background-color: #6495fa;
      }
    }
  }
  .nengli_area_container {
    width: 100%;
    height: 620px;
    display: flex;
    flex-direction: column;
    .nengli_title_container {
      width: 100%;
      height: 57px;
      display: flex;
      align-items: center;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #676970;
      line-height: 21px;
    }
    .table_container {
      width: 100%;
      flex: 1;
    }
  }
}
</style>
