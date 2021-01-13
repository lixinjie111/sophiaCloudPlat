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
      <div class="fangwen_detail_container" v-show="ifShowDetail">
        <a-table :columns="qscolumns" :data-source="qsdata">
          <a slot="servName" slot-scope="text" href="javascript:;">{{text}}</a>
          <span slot="usePer" slot-scope="usePer">
            <a-progress :percent="usePer" size="small" status="active" />
          </span>
          <span slot="tsyPer" slot-scope="tsyPer">
            <a-icon type="home" />&nbsp;&nbsp;
            <span :style="tsyPer>24 ? 'color:red' :'color:green' ">{{tsyPer}}%</span>
          </span>
          <a slot="openBuy" slot-scope="text" href="javascript:;">{{text}}</a>
          <a slot="buyNum" slot-scope="text" href="javascript:;">{{text}}</a>
        </a-table>
      </div>
      <div class="expan_btn_container">
        <div class="btn_container1" @click="expanfangwen"></div>
      </div>
    </div>
    <div class="nengli_area_container">
      <div class="nengli_title_container">
        <div class="nl_title">能力服务列表</div>
        <div class="search_container">
          
        <a-input-search placeholder="按API名称进行搜索" size="large" @search="onSearch">
          <a-button slot="enterButton">
            <a-icon type="search" />
          </a-button>
        </a-input-search>

          <!-- <a-input-search placeholder="按API名称进行搜索" enter-button /> -->
        </div>
      </div>
      <div class="table_container">
        <a-table :columns="nlcolumns" :data-source="nldata">
          <a slot="apiname" class="ant-dropdown-link" slot-scope="text">{{ text }}</a>
          <a slot="openBuy" class="ant-dropdown-link" slot-scope="text">{{ text }}</a>
          <a slot="Purchases" class="ant-dropdown-link" slot-scope="text">{{ text }}</a>
        </a-table>
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
      nlcolumns: [
        {
          title: "API名称",
          dataIndex: "apiname",
          key: "apiname",
          scopedSlots: { customRender: "apiname" }
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
          key: "buyTime",
          dataIndex: "buyTime"
        },
        {
          title: "到期时间",
          key: "matuTime",
          dataIndex: "matuTime"
        },
        {
          title: "开通付费",
          key: "openBuy",
          dataIndex: "openBuy",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "apiname" }
        },
        {
          title: "购买次数包",
          key: "Purchases",
          dataIndex: "Purchases",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "apiname" }
        }
      ],
      nldata: [
        {
          key: "1",
          apiname: "语音识别-普通话",
          xfStatus: "待开通付费",
          dyxianzhi: "200万次赠送",
          qps: 2,
          buyTime: "2019-12-23 14:07",
          matuTime: "2019-12-23 14:07",
          openBuy: "购买",
          Purchases: "购买"
        },
        {
          key: "2",
          apiname: "语音识别-英语",
          xfStatus: "按量付费",
          dyxianzhi: "--",
          qps: 5,
          buyTime: "2019-12-23 14:07",
          matuTime: "2019-12-23 14:07",
          openBuy: "购买",
          Purchases: "购买"
        },
        {
          key: "3",
          apiname: "语音识别-粤语",
          xfStatus: "按次付费",
          dyxianzhi: "1000万次",
          qps: 12,
          buyTime: "2019-12-23 14:07",
          matuTime: "2019-12-23 14:07",
          openBuy: "购买",
          Purchases: "购买"
        }
      ],
      qscolumns: [
        {
          title: "服务名称",
          dataIndex: "servName",
          key: "servName",
          scopedSlots: { customRender: "servName" }
        },
        {
          title: "访问量",
          dataIndex: "fwNum",
          key: "fwNum"
        },
        {
          title: "剩余用量",
          dataIndex: "syNum",
          key: "syNum"
        },
        {
          title: "同上月相比",
          key: "tsyPer",
          dataIndex: "tsyPer",
          scopedSlots: { customRender: "tsyPer" }
        },
        {
          title: "使用率占比",
          key: "usePer",
          dataIndex: "usePer",
          scopedSlots: { customRender: "usePer" }
        },
        {
          title: "开通付费",
          key: "openBuy",
          dataIndex: "openBuy",
          scopedSlots: { customRender: "openBuy" }
        },
        {
          title: "购买次数包",
          key: "buyNum",
          dataIndex: "buyNum",
          scopedSlots: { customRender: "buyNum" }
        }
      ],
      qsdata: [
        {
          key: "1",
          servName: "语音识别-普通话",
          fwNum: "6,567千次",
          syNum: "6,567千次",
          tsyPer: 50,
          usePer: 45,
          openBuy: "购买",
          buyNum: "购买"
        },
        {
          key: "2",
          servName: "语音识别-英语",
          fwNum: "567小时",
          syNum: "6,567千次",
          tsyPer: 30,
          usePer: 70,
          openBuy: "购买",
          buyNum: "购买"
        },
        {
          key: "3",
          servName: "语音识别-粤语",
          fwNum: "567小时",
          syNum: "6,567千次",
          tsyPer: 24,
          usePer: 50,
          openBuy: "购买",
          buyNum: "购买"
        }
      ],
      ifShowDetail: false
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
      setTimeout(() => {
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
            right: "10%",
            bottom: "10%"
          },
          legend: {
            data: ["蒸发量", "平均温度"],
            left: 10
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
              ],
              itemStyle: {
                normal: {
                  color: "#5B8FF9"
                }
              }
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
              ],
              itemStyle: {
                normal: {
                  color: "#5B8FF9"
                }
              }
            }
          ]
        };
        myChart.setOption(option);
      }, 200);
    },
    expanfangwen() {
      this.ifShowDetail = !this.ifShowDetail;
      var expanDom = document.getElementsByClassName("expan_btn_container")[0];
      if (this.ifShowDetail) {
        expanDom.style = "margin-top: 73px;";
      } else {
        expanDom.style = "margin-top: 15px;";
      }
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
    min-height: 316px;
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
    .fangwen_detail_container {
      width: 100%;
      height: 200px;
      margin-top: 15px;
      /deep/ .ant-table-wrapper {
        /deep/ .ant-spin-nested-loading {
          /deep/ .ant-pagination {
            display: flex;
            justify-content: center;
            float: inherit;
          }
        }
      }
    }
    .expan_btn_container {
      width: 100%;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 15px;
      .btn_container1 {
        width: 19px;
        height: 19px;
        background-color: #6495fa;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .nengli_area_container {
    width: 100%;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    .nengli_title_container {
      width: 100%;
      height: 57px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .nl_title {
        font-size: 15px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #676970;
        line-height: 21px;
      }
      .search_container {
        width: 288px;
        height: 32px;
      }
    }
    .table_container {
      width: 100%;
      flex: 1;
      /deep/ .ant-table-wrapper {
        /deep/ .ant-spin-nested-loading {
          /deep/ .ant-pagination {
            display: flex;
            justify-content: center;
            float: inherit;
          }
        }
      }
    }
  }
}
</style>
