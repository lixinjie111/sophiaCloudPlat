<template>
  <div class="apiMan_container">
    <div class="select_area_container">
      <div class="select_container">
        <a-select default-value style="width:100%" @change="chengeSerSelect">
          <a-select-option
            v-for="(item) in serListArr"
            :value="item.serviceId"
            :key="item.id"
            :title='item.serviceName'
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
          value-format="yyyy-MM-dd"
          @change="changeDataRange"
          style="height:100%;"
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
      <div class="fangwen_detail_container" v-show="ifShowDetail">
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
              <span v-else></span>
            </span>
          </span>
          <template  slot="postpaidStatus"  slot-scope="text, record">
            <span  @click="openMoney(record)" style="cursor:pointer;color:#0376FD" v-if="text==2">开通</span>
            <span  v-if="text==0">--</span>
            <span  @click="cancleOrder(record)" style="cursor:pointer;color:#f00" v-if="text==1">停止付费</span>
          </template >
          <template  slot="prepaidStatus"  slot-scope="text, record">
            <span  v-if="text==0">--</span>
            <span  @click="openMoney1(record)" style="cursor:pointer;color:#0376FD" v-else>购买</span>
          </template >
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
        <a-table :columns="nlcolumns" :data-source="nldata" @change="changePage" :pagination="pagination">
          <a slot="serviceName" class="ant-dropdown-link" slot-scope="text"><span style="color:#0376FD" >{{ text }}</span></a>
          <template  slot="freeType"  slot-scope="text, record">
            <span  v-if="text==1">每日免费限额</span>
            <span  v-else-if="text==2">一次性免费限额</span>
            <span  v-else-if="text==3">无限制</span>
            <span  v-else>--</span>
          </template >
          <template  slot="postpaidStatus"  slot-scope="text, record">
            <span  @click="openMoney(record)" style="cursor:pointer;color:#0376FD" v-if="text==2">开通</span>
            <span  v-if="text==0">--</span>
            <span  @click="cancleOrder(record)" style="cursor:pointer;color:#f00" v-if="text==1">停止付费</span>
          </template >
          <template  slot="prepaidStatus"  slot-scope="text, record">
            <span  v-if="text==0">--</span>
            <span  @click="openMoney1(record)" style="cursor:pointer;color:#0376FD" v-else>购买</span>
          </template >
        </a-table>
      </div>
    </div>
     <create-app-modal v-if="showModal" @cancel="closeModal" @refreshList="refreshList"/>
     <a-modal v-model="visible" title="温馨提示" @ok="handleOk" cancelText="取消" centered okText="确定">
        <p>即将前往购买页面开通服务</p>
        <p>1、开通服务将会 <span style="color:#0376FD">产生服务调用费用</span>  </p>
        <p>2、如在服务试用期内，开通服务再停止后，将不再支持试用服务</p>
      </a-modal>
      <a-modal v-model="visible1" title="停止付费" @ok="handleOk1" cancelText="取消" centered okText="确定">
        <p>您确定要终止付费吗？终止付费后，您的资源将回归至免费状态，超过免费资源的调用将不再响应。后续如需使用付费资源，可再次开通付费。</p>
      </a-modal>
      <a-modal v-model="visible2" title="提醒" @ok="handleOk2" cancelText="取消" centered okText="确定">
        <p>您开通的录音文件识别、实时语音识别、一句话识别、语音合成免费试用版即将到期，请尽快购买以保证服务正常使用。</p>
      </a-modal>
    <!-- <div class="nengli_area_container">
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
        <a-table 
          :columns="nlcolumns" 
          :data-source="nldata" 
          @change="changePage"
          :pagination="pagination" 
          :loading="loading"
        >
          <a slot="serviceName" class="ant-dropdown-link" slot-scope="text">{{ text }}</a>
          <a slot="openBuy" class="ant-dropdown-link" slot-scope="text">{{ text }}</a>
          <a slot="Purchases" class="ant-dropdown-link" slot-scope="text">{{ text }}</a>
        </a-table>
      </div>
    </div> -->
  </div>
</template>

<script>
import locale from "x-intelligent-ui/es/date-picker/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
 import CreateAppModal from '@/components/application/list/components/CreateAppModal1.vue'
import {
  apiVisitTrend,
  apiVisitTrendInfo,
  serviceList
} from "../../api/proSer/index";
export default {
  name: "apiMan",
  components:{CreateAppModal},
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
          dataIndex: "freeType",
          key: "freeType",
          slots: { title: "freeType" },
          scopedSlots: { customRender: "freeType" }
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
          key: "postpaidStatus",
          dataIndex: "postpaidStatus",
          slots: { title: "postpaidStatus" },
          scopedSlots: { customRender: "postpaidStatus" }
        },
        {
          title: "购买次数包",
          key: "prepaidStatus",
          dataIndex: "prepaidStatus",
          slots: { title: "prepaidStatus" },
          scopedSlots: { customRender: "prepaidStatus" }
        }
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
          dataIndex: "nowRemainNum",
          key: "nowRemainNum"
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
          key: "postpaidStatus",
          dataIndex: "postpaidStatus",
          slots: { title: "postpaidStatus" },
          scopedSlots: { customRender: "postpaidStatus" }
        },
        {
          title: "购买次数包",
          key: "prepaidStatus",
          dataIndex: "prepaidStatus",
          slots: { title: "prepaidStatus" },
          scopedSlots: { customRender: "prepaidStatus" }
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
      routerData:'',
      pagination:{
        current: 1, 
        pageSize: 10,
        total: 0,
      },
       showModal:false,
      loading:false,
      visible:false,
      visible1:false,
      visible2:false,
    };
  },
  created() {
    this.routerData = this.$route.query.serviceModel;
  },
  watch: {
    $route: function(newVal, oldVal) {
      this.routerData = this.$route.query.serviceModel;
      this.pagination.current=1;
      this.searchName='';
      this.getPageData();
    }
  },
  mounted() {
    this.getPageData();
  },
  methods: {
     cancleOrder(item){
      this.visible1 = true;
      this.cancleRecord=item;
    },
    openMoney1(item){
      this.$router.push({
        path:'/buyBag',
        query:{
          serviceId:item.serviceId,
          serviceName:item.serviceModelName+'—'+item.serviceName,
        },
      })
    },
    handleOk2(e) {
      this.visible2 = false;
    },
    handleOk1(e) {
      this.visible1 = false;
      var fwqsParm = new FormData();
      fwqsParm.append("serviceId",this.cancleRecord.serviceId,);
      terminatePostpaid(fwqsParm)
        .then(res => {
          if (res.code == 200000) {
            this.getServiceList();
            this.$message.success("success");
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
    },
    handleOk(e) {
      this.visible = false;
      this.$router.push({
        path:'/openMy',
        query:{
          serviceId:this.currentRecord.serviceId,
          serviceModel:this.currentRecord.serviceModel,
        },
      })
    },
    openMoney(item){
      this.visible = true;
      this.currentRecord=item;
    },
    getPageData() {
      this.getServiceList();
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
      this.pagination={...pagination}
      this.getServiceList();
    },
    changeQsTablePag(pagination, filters, sorter){
      pagination.serviceId = this.serViceId;
      pagination.beginDate = this.beginDate;
      pagination.endDate = this.endDate;
      this.getApiVisitedInfo(pagination);
    },
     closeModal(){
      this.showModal=false;
    },
    refreshList(){
      this.$router.push({
        path:'/application/list'
      })
    },
    onSearch() {
       this.pagination={
        current: 1, 
        pageSize: 10,
        total: 0,
      };
      this.getServiceList();
    },
    getSelectList(pagination) {
      this.serListArr = [];
      var serListParm = new URLSearchParams();
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
      var fwqsParm = new URLSearchParams();
      fwqsParm.append("serviceId",this.serViceId);
      fwqsParm.append("beginDate", this.beginDate); 
      fwqsParm.append("endDate",this.endDate); 
      fwqsParm.append("serviceModel",this.routerData);
      apiVisitTrend(fwqsParm)
        .then(res => {
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
    // getServiceList(pagination) {
    //   this.loading = true;
    //   this.nldata = [];
    //   var serListParm = new FormData();
    //   serListParm.append("serviceName", pagination.serviceName);
    //   serListParm.append("pageIndex", pagination.current);
    //   serListParm.append("pageSize", pagination.pageSize);
    //   serListParm.append("serviceModel",this.routerData); 
    //   serviceList(serListParm)
    //     .then(res => {
    //       if (res.code == 200000) {
    //         var serListdata = res.data.list || [];
    //         serListdata.forEach(item => {
    //           item.key = `itemKey${item.id}`;
    //           item.Purchases = "购买";
    //           if (item.freeType == 1) {
    //             item.paySta = "每日免费限额";
    //           } else if (item.freeType == 2) {
    //             item.paySta = "一次性免费限额";
    //           } else if (item.freeType == 3) {
    //             item.paySta = "无限制";
    //           }

    //           if (item.payStatus == 1) {
    //             item.openBuy = "";
    //           } else {
    //             item.openBuy = "购买";
    //           }
    //         });
    //         const pagination = { ...this.pagination };
    //         pagination.total = res.data.total;
    //         this.loading = false;
    //         this.pagination = pagination;
    //         this.nldata = serListdata;
    //       } else {
    //         this.$message.error(res.message || "请求失败！");
    //       }
    //     })
    //     .catch(err => {
    //       this.$message.error("请求失败！");
    //       console.log(err, "err");
    //     });
    // },
    getServiceList() {
      this.nldata = [];
      var serListParm = new URLSearchParams();
      serListParm.append("serviceName", this.searchName);
      serListParm.append("pageIndex", this.pagination.current);
      serListParm.append("pageSize", this.pagination.pageSize);
      serListParm.append("serviceModel",this.routerData);
      serviceList(serListParm)
        .then(res => {
          if (res.code == 200000) {
            var serListdata = res.data.list || [];
            serListdata.forEach(item => {
              item.key = `itemKey${item.id}`;
            });
            this.nldata = serListdata;
            this.pagination.total = res.data.total;
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
          xData.push(item.statisticsDate);
          yData1.push(item.serviceSuccessNum);
          yData2.push(item.numDayRatio);
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
              },
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: '#FFF'
                  }
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
              },
              label:{
                  show:true,
                  color:'rgba(0, 0, 0, 0.65)'
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
    position: relative;
    .select_container {
      min-width: 120px;
      height: 32px;
      margin-right: 20px;
    }
    .close_week {
      margin-left: 20px;
    }
    .time_container {
      height: 32px;
      /deep/ .el-date-editor .el-range-separator{
        line-height: 26px;
      }
      /deep/ .el-date-editor .el-input__icon{
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .btn_container {
      position: absolute;
      right: 0;
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
      min-height: 200px;
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
