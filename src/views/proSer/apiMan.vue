<template>
  <div class="apiMan_container">
    <div class="select_area_container">
      <div class="select_container">
        <a-select default-value style="width:100%" @change="chengeSerSelect">
          <a-select-option
            v-for="(item) in serListArr"
            :value="item.serviceId"
            :key="item.id"
          >{{item.serviceName}}</a-select-option>
        </a-select>
      </div>
      <div class="time_container">
        <el-date-picker
          v-model="rangeTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="height:100%"
          @change="changeDataRange"
        ></el-date-picker>
      </div>
      <div class="select_container close_week">
        <a-select default-value="cl7" style="width:100%" @change="choiceRange">
          <a-select-option value="cl7">最近7天</a-select-option>
          <a-select-option value="by">本月</a-select-option>
          <a-select-option value="sgy">上个月</a-select-option>
          <a-select-option value="sgjd">上个季度</a-select-option>
        </a-select>
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
        <div class="btn_container1" @click="expanfangwen">
          <a-icon
            type="down-circle"
            :style="{ fontSize: '16px', color: '#6495fa' }"
            v-show="!ifShowDetail"
          ></a-icon>
          <a-icon
            type="up-circle"
            :style="{ fontSize: '16px', color: '#6495fa' }"
            v-show="ifShowDetail"
          ></a-icon>
        </div>
      </div>
    </div>
    <div class="nengli_area_container">
      <div class="nengli_title_container">
        <div class="nl_title">能力服务列表</div>
        <div class="search_container">
          <a-input-search
            placeholder="按API名称进行搜索"
            size="large"
            v-model="searchName"
            @search="onSearch"
          >
            <a-button slot="enterButton">
              <a-icon type="search" />
            </a-button>
          </a-input-search>
        </div>
      </div>
      <div class="table_container">
        <a-table :columns="nlcolumns" :data-source="nldata" @change="changePage">
          <a slot="serviceName" class="ant-dropdown-link" slot-scope="text">{{ text }}</a>
          <a slot="openBuy" class="ant-dropdown-link" slot-scope="text">{{ text }}</a>
          <a slot="Purchases" class="ant-dropdown-link" slot-scope="text">{{ text }}</a>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import locale from "x-intelligent-ui/es/date-picker/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import {
  apiVisitTrend,
  apiVisitTrendInfo,
  serviceList
} from "../../api/proSer/index";
export default {
  name: "apiMan",
  data() {
    return {
      locale,
      moment,
      nlcolumns: [
        {
          title: "API名称",
          dataIndex: "serviceName",
          key: "serviceName",
          scopedSlots: { customRender: "serviceName" }
        },
        {
          title: "消费状态",
          dataIndex: "paySta",
          key: "paySta"
        },
        {
          title: "调用量限制",
          dataIndex: "freeNum",
          key: "freeNum"
        },
        {
          title: "QPS",
          key: "basicQps",
          dataIndex: "basicQps"
        },
        {
          title: "购买时间",
          key: "paySuccessTime",
          dataIndex: "paySuccessTime"
        },
        {
          title: "到期时间",
          key: "effectiveTime",
          dataIndex: "effectiveTime"
        },
        {
          title: "开通付费",
          key: "openBuy",
          dataIndex: "openBuy",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "openBuy" }
        },
        {
          title: "购买次数包",
          key: "Purchases",
          dataIndex: "Purchases",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "Purchases" }
        }
      ],
      searchName: "",
      nldata: [],
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
      ifShowDetail: false,
      serListArr: [],
      rangeTime:[new Date().getTime() - 3600*1000*24*7,new Date()],
      serViceId:'',
      beginDate:'',
      endDate:''
    };
  },
  mounted() {
    this.getPageData();
  },
  methods: {
    getPageData() {
      this.getServiceList({ current: 1, pageSize: 10, serviceName: "" });
      this.getSelectList({ current: 1, pageSize: "", serviceName: "" });
      this.getApiVisitTrend();
      this.initBarEcharts();
    },
    chengeSerSelect(e){
      this.serViceId = e;
    },
    choiceRange(e) {
      if(e == 'cl7'){
        this.rangeTime = [new Date().getTime() - 3600*1000*24*7,new Date()];
      }
      else if(e == 'by'){
        
      }
      else if(e == 'sgy'){}
      else if(e == 'sgjd'){}
    },
    changeDataRange(e){
      var dateList = e || [];
      this.beginDate = dateList[0];
      this.endDate = dateList[1];
    },
    changePage(pagination, filters, sorter) {
      pagination.serviceName = "";
      this.getServiceList(pagination);
    },
    onSearch() {
      var searchText = this.searchName || "";
      this.getServiceList({
        current: 1,
        pageSize: 10,
        serviceName: searchText
      });
    },
    getSelectList(pagination) {
      var serListParm = new FormData();
      serListParm.append("serviceName", pagination.serviceName);
      serListParm.append("pageIndex", pagination.current);
      serListParm.append("pageSize", pagination.pageSize);
      serviceList(serListParm)
        .then(res => {
          if (res.code == 200000) {
            var serListdata = res.data.list || [];
            serListdata.unshift({
              serviceId: "",
              serviceName: "全部"
            });
            this.serListArr = serListdata;
          } else {
            this.$message.error("请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
    },
    getApiVisitTrend() {
      var fwqsParm = new FormData();
      fwqsParm.append("serviceId",this.serViceId);
      fwqsParm.append("beginDate", ''); //this.beginDate
      fwqsParm.append("endDate",'' ); //this.endDate
      apiVisitTrend(fwqsParm)
        .then(res => {
          console.log(res,'趋势')
          if (res.code == 200000) {
            var serListdata = res.data || [];
            this.initBarEcharts(serListdata);
          } else {
            this.$message.error("请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
    },
    getServiceList(pagination) {
      var serListParm = new FormData();
      serListParm.append("serviceName", pagination.serviceName);
      serListParm.append("pageIndex", pagination.current);
      serListParm.append("pageSize", pagination.pageSize);
      serviceList(serListParm)
        .then(res => {
          if (res.code == 200000) {
            var serListdata = res.data.list || [];
            serListdata.forEach(item => {
              item.key = `itemKey${item.id}`;
              item.Purchases = "购买";
              if (item.freeType == 1) {
                item.paySta = "每日免费限额";
              } else if (item.freeType == 2) {
                item.paySta = "一次性免费限额";
              } else if (item.freeType == 3) {
                item.paySta = "无限制";
              }

              if (item.payStatus == 1) {
                item.openBuy = "";
              } else {
                item.openBuy = "购买";
              }
            });
            this.nldata = serListdata;
          } else {
            this.$message.error("请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
    },
    initBarEcharts(ecData = []) {
      setTimeout(() => {
        var xData = [];
        var yData1 = [];
        var yData2 = [];
        ecData.forEach(item=>{
          xData.push(item.nowTime);
          yData1.push(item.thisSuccessNum);
          yData2.push(item.numMonthRatio);
        });
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
            data: ["API", "同比上涨"],
            left: 10
          },
          xAxis: [
            {
              type: "category",
              data:xData,
              axisPointer: {
                type: "shadow"
              }
            }
          ],
          yAxis: [
            {
              type: "value"
            },
            {
              type: "value",
              axisLabel: {
                formatter: "{value}%"
              }
            }
          ],
          series: [
            {
              name: "API",
              type: "bar",
              data:yData1,
              itemStyle: {
                normal: {
                  color: "#5B8FF9"
                }
              }
            },
            {
              name: "同比上涨",
              type: "line",
              yAxisIndex: 1,
              data:yData2,
              itemStyle: {
                normal: {
                  color: "#61D7A7"
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
  padding: 24px;
  box-sizing: border-box;
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
    .close_week {
      width: 100px;
      margin-right: 48%;
    }
    .time_container {
      width: 394px;
      height: 32px;
      margin-right: 20px;
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
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
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
