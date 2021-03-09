<template>
<div  class="gailanContainer">
    <div class="gailan">
        <a-page-header
            style="border-bottom: 1px solid rgb(235, 237, 240)"
            title="概览"
        />
        <div class="gailan_container">
             <div class="gailan_left">
                 <div class="title">应用</div>
                 <div class="gailan_box">
                     <div class="hasBuild">已建应用<span style="color:#0376FD">1</span>个</div>
                      <div style="margin-top:5px">
                          <a-button type="primary">
                            管理应用
                         </a-button>
                      </div>
                      <div style="margin-top:5px">
                           <a-button type="primary">
                                创建应用
                            </a-button>
                      </div>
                    
                    
                 </div>
             </div>
             <div class="gailan_rt">
                <div class="title">
                        <span>用量</span>
                        <span>
                            <el-date-picker
                                v-model="rangeTime"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                style="height:100%"
                                value-format="yyyy-MM-dd"
                                @change="changeDataRange"
                                size="small"
                                >
                            </el-date-picker>
                        </span>
                </div>
                <div class="tableContent">
                    <a-table :columns="nlcolumns0" :data-source="nldata" @change="changePage">
                        <a slot="serviceName" class="ant-dropdown-link" slot-scope="text">{{ text }}</a>
                        <a slot="openBuy" class="ant-dropdown-link" slot-scope="text">{{ text }}</a>
                        <a slot="Purchases" class="ant-dropdown-link" slot-scope="text">{{ text }}</a>
                    </a-table>
                </div>
             </div>
        </div>
    </div>
    <div class="select_area_container">
      <div class="select_container">
        <el-select default-value style="width:150px" @change="chengeSerSelect">
          <el-select-option
            v-for="(item) in serListArr"
            :value="item.serviceId"
            :key="item.id"
          >{{item.serviceName}}</el-select-option>
        </el-select>
      </div>
      <div class="time_container">
        <el-date-picker
          v-model="rangeTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="height:100%"
          value-format="yyyy-MM-dd"
          @change="changeDataRange"
        ></el-date-picker>
      </div>
      <div class="select_container close_week">
        <a-select v-model="selVal" style="width:100%" @change="choiceRange">
          <a-select-option value="cl7">最近7天</a-select-option>
          <a-select-option value="by">本月</a-select-option>
          <a-select-option value="sgy">上个月</a-select-option>
          <a-select-option value="sgjd">上个季度</a-select-option>
        </a-select>
      </div>
      <div class="btn_container">
        <a-button @click="resetFn">重置</a-button>
        <a-button type="primary" @click="searchFn" style="margin-left:20px;">查询</a-button>
      </div>
    </div>
    <div class="fangwen_area_container">
      <div class="title_container">访问趋势</div>
      <div class="bar_container" id="barID"></div>
      <div class="title_container">访问趋势详情</div>
      <div class="fangwen_detail_container">
        <a-table :columns="qscolumns" :data-source="qsdata" @change="changeQsTablePag">
          <a slot="serviceName" slot-scope="text" href="">{{text}}</a>
          <span slot="successUsageRate" slot-scope="successUsageRate">
            <a-progress :percent="successUsageRate" size="small" status="active" />
          </span>
          <span slot="numMonthRatio" slot-scope="numMonthRatio">
            <!-- <a-icon type="home" />&nbsp;&nbsp; -->
            <span :style="numMonthRatio < 0 ? 'color:red' :'color:green' ">
              {{numMonthRatio}}
              <span v-if="numMonthRatio>0">%</span>
              <span v-else>/</span>
            </span>
          </span>
          <a slot="openBuyF" slot-scope="text" href="">{{text}}</a>
          <a slot="buyNum" slot-scope="text" href="">{{text}}</a>
        </a-table>
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
      nlcolumns0: [
        {
          title: "API",
          dataIndex: "serviceName",
          key: "serviceName",
          scopedSlots: { customRender: "serviceName" }
        },
        {
          title: "调用量",
          dataIndex: "freeNum",
          key: "freeNum"
        },
        {
          title: "调用失败",
          key: "basicQps",
          dataIndex: "basicQps"
        },
        {
          title: "失败率",
          key: "paySuccessTime",
          dataIndex: "paySuccessTime"
        },
        {
          title: "详细统计",
          key: "openBuy",
          dataIndex: "openBuy",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "openBuy" }
        },
      ],
      nlcolumns: [
        {
          title: "API",
          dataIndex: "serviceName",
          key: "serviceName",
          scopedSlots: { customRender: "serviceName" }
        },
        {
          title: "调用量",
          dataIndex: "freeNum",
          key: "freeNum"
        },
        {
          title: "调用失败",
          key: "basicQps",
          dataIndex: "basicQps"
        },
        {
          title: "失败率",
          key: "paySuccessTime",
          dataIndex: "paySuccessTime"
        },
        {
          title: "详细统计",
          key: "openBuy",
          dataIndex: "openBuy",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "openBuy" }
        },
      ],
      searchName: "",
      nldata: [],
      qscolumns: [
        {
          title: "服务名称",
          dataIndex: "serviceName",
          key: "serviceName",
          scopedSlots: { customRender: "serviceName" }
        },
        {
          title: "访问量",
          dataIndex: "totalSuccessNum",
          key: "totalSuccessNum"
        },
        {
          title: "剩余用量",
          dataIndex: "remainCount",
          key: "remainCount"
        },
        {
          title: "同上月相比",
          key: "numMonthRatio",
          dataIndex: "numMonthRatio",
          scopedSlots: { customRender: "numMonthRatio" }
        },
        {
          title: "使用率占比",
          key: "successUsageRate",
          dataIndex: "successUsageRate",
          scopedSlots: { customRender: "successUsageRate" }
        },
        {
          title: "开通付费",
          key: "openBuyF",
          dataIndex: "openBuyF",
          scopedSlots: { customRender: "openBuyF" },
          slots: { title: "customTitle" }
        },
        {
          title: "购买次数包",
          key: "buyNum",
          dataIndex: "buyNum",
          scopedSlots: { customRender: "buyNum" }
        }
      ],
      qsdata: [],
      ifShowDetail: false,
      serListArr: [],
      rangeTime:[moment(new Date(new Date().getTime() - 3600*1000*24*7)).format('YYYY-MM-DD'),moment(new Date()).format('YYYY-MM-DD')],
      serViceId:'',
      beginDate:moment(new Date(new Date().getTime() - 3600*1000*24*7)).format('YYYY-MM-DD'),
      endDate:moment(new Date()).format('YYYY-MM-DD'),
      selVal:'cl7',
      routerData:''
    };
  },
  created() {
    this.routerData = 1;
  },
  watch: {
    $route: function(newVal, oldVal) {
      this.routerData = 1;
      this.getPageData();
    }
  },
  mounted() {
    this.getPageData();
  },
  methods: {
    getPageData() {
      this.getServiceList({ current: 1, pageSize: 10, serviceName: "" });
      this.getSelectList({ current: 1, pageSize: "", serviceName: "" });
      this.getApiVisitTrend();
      this.getApiVisitedInfo({beginDate:moment(new Date(new Date().getTime() - 3600*1000*24*7)).format('YYYY-MM-DD'), endDate:moment(new Date()).format('YYYY-MM-DD'), current: 1, pageSize: 10, serViceId: ""});
    },
    resetFn(){
      this.serViceId = '';
      this.rangeTime = [moment(new Date(new Date().getTime() - 3600*1000*24*7)).format('YYYY-MM-DD'),moment(new Date()).format('YYYY-MM-DD')];
      this.beginDate=moment(new Date(new Date().getTime() - 3600*1000*24*7)).format('YYYY-MM-DD');
      this.endDate=moment(new Date()).format('YYYY-MM-DD');
      this.selVal='cl7';
      this.getApiVisitTrend();
      this.getApiVisitedInfo({beginDate:moment(new Date(new Date().getTime() - 3600*1000*24*7)).format('YYYY-MM-DD'), endDate:moment(new Date()).format('YYYY-MM-DD'), current: 1, pageSize: 10, serViceId: ""});
    },
    searchFn(){
      this.getApiVisitTrend();
      this.getApiVisitedInfo({beginDate:this.beginDate,endDate:this.endDate,current:1,pageSize:10,serViceId:this.serViceId});
    },
    chengeSerSelect(e){
      this.serViceId = e;
    },
    choiceRange(e) {
      if(e == 'cl7'){
        this.rangeTime = [moment(new Date(new Date().getTime() - 3600*1000*24*7)).format('YYYY-MM-DD'),moment(new Date()).format('YYYY-MM-DD')];
        this.beginDate = this.rangeTime[0];
        this.endDate = this.rangeTime[1];
      }
      else if(e == 'by'){
        const startDate = moment().month(moment().month()).startOf('month').valueOf();
        const endDate = moment().month(moment().month()).endOf('month').valueOf();
        this.rangeTime = [moment(startDate).format('YYYY-MM-DD'),moment(endDate).format('YYYY-MM-DD')];
        this.beginDate = this.rangeTime[0];
        this.endDate = this.rangeTime[1];
      }
      else if(e == 'sgy'){
        const startDate = moment().month(moment().month() - 1).startOf('month').valueOf();
        const endDate = moment().month(moment().month() - 1).endOf('month').valueOf();
        this.rangeTime = [moment(startDate).format('YYYY-MM-DD'),moment(endDate).format('YYYY-MM-DD')];
        this.beginDate = this.rangeTime[0];
        this.endDate = this.rangeTime[1];
      }
      else if(e == 'sgjd'){
        const startDate = moment().quarter(moment().quarter() - 1).startOf('quarter').valueOf();
        const endDate = moment().quarter(moment().quarter() - 1).endOf('quarter').valueOf();
        this.rangeTime = [moment(startDate).format('YYYY-MM-DD'),moment(endDate).format('YYYY-MM-DD')];
        this.beginDate = this.rangeTime[0];
        this.endDate = this.rangeTime[1];
      }
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
    changeQsTablePag(pagination, filters, sorter){
      pagination.serviceId = this.serViceId;
      pagination.beginDate = this.beginDate;
      pagination.endDate = this.endDate;
      this.getApiVisitedInfo(pagination);
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
      this.serListArr = [];
      var serListParm = new FormData();
      serListParm.append("serviceName", pagination.serviceName);
      serListParm.append("pageIndex", pagination.current);
      serListParm.append("pageSize", pagination.pageSize);
      serListParm.append("serviceModel",this.routerData); 
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
            this.$message.error(res.message || "请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
    },
    getApiVisitedInfo(pagination){
      this.qsdata = [];
      var fwqsInfoParm = new FormData();
      fwqsInfoParm.append("serviceId",pagination.serViceId);
      fwqsInfoParm.append("beginDate", pagination.beginDate); 
      fwqsInfoParm.append("endDate",pagination.endDate); 
      fwqsInfoParm.append("pageIndex",pagination.current);  
      fwqsInfoParm.append("pageSize",pagination.pageSize);
      fwqsInfoParm.append("serviceModel",this.routerData);   
      apiVisitTrendInfo(fwqsInfoParm)
        .then(res => {
          console.log(res,'趋势详情')
          if (res.code == 200000) {
            var serListdata = res.data.list || [];
            serListdata.forEach(item=>{
              item.key =`serviceId${item.serviceId}`;
              item.buyNum = "购买";
              if (item.payStatus == 1) {
                item.openBuyF = "";
              } else {
                item.openBuyF = "购买";
              }
            });
            this.qsdata = serListdata;
          } else {
            this.$message.error(res.message || "请求失败！");
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
      fwqsParm.append("beginDate", this.beginDate); 
      fwqsParm.append("endDate",this.endDate); 
      fwqsParm.append("serviceModel",this.routerData); 
      apiVisitTrend(fwqsParm)
        .then(res => {
          console.log(res,'趋势')
          if (res.code == 200000) {
            var serListdata = res.data || [];
            this.initBarEcharts(serListdata);
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
    },
    getServiceList(pagination) {
      this.nldata = [];
      var serListParm = new FormData();
      serListParm.append("serviceName", pagination.serviceName);
      serListParm.append("pageIndex", pagination.current);
      serListParm.append("pageSize", pagination.pageSize);
      serListParm.append("serviceModel",this.routerData); 
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
            this.$message.error(res.message || "请求失败！");
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
  }
};
</script>

<style lang="scss" scoped>
.gailanContainer{
     background: #f0f2f5; 
    .gailan{
        background: #fff;
        margin-bottom: 20px;
        .gailan_container{
            display: flex;
            padding:20px;
            .gailan_left{
                width: 250px;
                .title{
                     height: 30px;
                        font-size: 14px;
                        font-family: HelveticaNeue;
                        color: #54565B;
                        margin-bottom: 15px;
                        display: flex;
                            align-items: center;
                }
                .gailan_box{
                    height: 200px;
                    border-radius: 2px;
                    border: 1px solid #D9D9D9;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
            }
            .gailan_rt{
               margin-left: 20px;
               flex:1;
               display: flex;
               flex-direction: column;
               .title{
                   height: 30px;
                   display: flex;
                   justify-content: space-between;
                   align-items: center;
                   font-size: 14px;
                    font-family: HelveticaNeue;
                    color: #54565B;
                    margin-bottom: 15px;
               } 
               .tableContent{
                   height: 200px;
                   overflow: auto;
                   border: 1px solid #D9D9D9;
               }
            }
        }
    }
    .select_area_container {
        width: 100%;
        height: 80px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        position: relative;
         background: #fff;
         padding: 0 24px;
        .select_container {
          min-width: 120px;
          // height: 32px;
          margin-right: 20px;
        }
        .close_week {
        margin-left: 20px;
        }
        .time_container {
        //  height: 32px;
        }
        .btn_container {
        position: absolute;
        right: 24px;
        // height: 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        }
    }
    .fangwen_area_container {
        width: 100%;
        min-height: 316px;
        margin-bottom: 13px;
        background: #fff;
        padding:0 24px;
        margin-top: 20px;
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
          min-height: 200px;
          padding-bottom: 24px;
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
        padding: 0 24px;
        margin-top: 20px;
        background: #fff;
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
