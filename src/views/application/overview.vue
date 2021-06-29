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
                     <div class="hasBuild">已建应用 <span style="color:#0376FD">{{count}}</span> 个</div>
                      <div style="margin-top:5px">
                          <a-button type="primary" @click="goLink">
                            管理应用
                         </a-button>
                      </div>
                      <div style="margin-top:5px">
                           <a-button type="primary"  @click="goLink1">
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
                                v-model="rangeTime1"
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
                    <a-table :columns="nlcolumns0" :data-source="nldata0"  :pagination="false">
                        <a slot="openBuy" class="ant-dropdown-link" >详细</a>
                    </a-table>
                </div>
             </div>
        </div>
    </div>
    <div class="select_area_container">
      <div class="select_container">
        <el-select v-model="selectModel" style="width:150px" @change="chengeSerSelect">
         <el-option
            v-for="(item) in serListArr"
            :value="item.serviceId"
            :key="item.id"
           :label="item.serviceName"
          ></el-option>
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
        <a-table :columns="qscolumns" :data-source="qsdata" @change="changeQsTablePag" :pagination="pagination1">
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
</div>
</template>

<script>
 import CreateAppModal from '@/components/application/list/components/CreateAppModal1.vue'
import locale from "x-intelligent-ui/es/date-picker/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import {
  apiVisitTrend,
  apiVisitTrendInfo,
  serviceList
} from "../../api/proSer/index";
import {
  appCount,
  apiVisitDosage,
  terminatePostpaid,
  userServiceModels
} from "../../api/gailan/index";
export default {
  name: "apiMan",
  components:{CreateAppModal},
  data() {
    return {
      visible:false,
      visible1:false,
      visible2:false,
      showModal:false,
      count:0,
      selectModel:'',
      locale,
      moment,
      nlcolumns0: [
        {
          title: "API",
          dataIndex: 'service_name',
          key: "service_name",
          //scopedSlots: { customRender: "serviceName" }
        },
        {
          title: "调用量",
          key: "success_num",
          dataIndex: "success_num"
        },
        {
          title: "调用失败",
          key: "fail_num",
          dataIndex: "fail_num",
        },
        {
          title: "失败率",
          key: "fail_rate",
          dataIndex: "fail_rate",
        },
        {
          title: "详细统计",
          key: "openBuy",
          dataIndex: "openBuy",
          scopedSlots: { customRender: "openBuy" }
        },
      ],
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
      nldata0: [],
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
      rangeTime1:[moment(new Date()).format('YYYY-MM-DD'),moment(new Date()).format('YYYY-MM-DD')],
      rangeTime:[moment(new Date(new Date().getTime() - 3600*1000*24*7)).format('YYYY-MM-DD'),moment(new Date()).format('YYYY-MM-DD')],
      serViceId:'',
      beginDate:moment(new Date(new Date().getTime() - 3600*1000*24*7)).format('YYYY-MM-DD'),
      endDate:moment(new Date()).format('YYYY-MM-DD'),
      selVal:'cl7',
      pagination:{
        current: 1, 
        pageSize: 10,
        total: 0,
      },
      pagination1:{
        current: 1, 
        pageSize: 10,
        total: 0,
      },
      currentRecord:null,
      cancleRecord:null,
     
    };
  },
  created() {
    this.getCount();
    this.VisitDosage();
    this.getSelectList();
  },
  mounted() {
     this.getPageData();
  },
  methods: {
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
    refreshList(){
      this.$router.push({
        path:'/application/list'
      })
    },
    closeModal(){
      this.showModal=false;
    },
    goLink(){
      this.$router.push({
        path:'/application/list',
        query:{
          activekey:['yingyong2'],
          openkey:['myYingyong']
        }
      })
    },
    goLink1(){
      this.showModal=true;
    },
    getCount(){
        appCount().then(res => {
              if(res.code==200000){
                this.count=res.data;
              }
        }).catch(err => {

        })
    },
    VisitDosage(){
        apiVisitDosage(
        { 
          beginDate: this.rangeTime1[0], 
          endDate: this.rangeTime1[1], 
        }
        ).then(res => {
              if(res.code==200000){
                this.nldata0=res.data;
              }
        }).catch(err => {

        })
    },
    getPageData() {
      this.getServiceList();
      this.getApiVisitTrend();
      this.getApiVisitedInfo();
    },
    resetFn(){
      this.serViceId = '';
      this.selectModel = '';
      this.rangeTime = [moment(new Date(new Date().getTime() - 3600*1000*24*7)).format('YYYY-MM-DD'),moment(new Date()).format('YYYY-MM-DD')];
      this.beginDate=moment(new Date(new Date().getTime() - 3600*1000*24*7)).format('YYYY-MM-DD');
      this.endDate=moment(new Date()).format('YYYY-MM-DD');
      this.selVal='cl7';
      this.getApiVisitTrend();
      this.getApiVisitedInfo();
    },
    searchFn(){
      this.getApiVisitTrend();
      this.getApiVisitedInfo();
    },
    chengeSerSelect(e){
      // this.serViceId = e;
    },
    choiceRange(e) {
      if(e == 'cl7'){
        this.rangeTime = [moment(new Date(new Date().getTime() - 3600*1000*24*7)).format('YYYY-MM-DD'),moment(new Date()).format('YYYY-MM-DD')];
      }
      else if(e == 'by'){
        const startDate = moment().month(moment().month()).startOf('month').valueOf();
        const endDate = moment().month(moment().month()).endOf('month').valueOf();
        this.rangeTime = [moment(startDate).format('YYYY-MM-DD'),moment(endDate).format('YYYY-MM-DD')];
      }
      else if(e == 'sgy'){
        const startDate = moment().month(moment().month() - 1).startOf('month').valueOf();
        const endDate = moment().month(moment().month() - 1).endOf('month').valueOf();
        this.rangeTime = [moment(startDate).format('YYYY-MM-DD'),moment(endDate).format('YYYY-MM-DD')];
      }
      else if(e == 'sgjd'){
        const startDate = moment().quarter(moment().quarter() - 1).startOf('quarter').valueOf();
        const endDate = moment().quarter(moment().quarter() - 1).endOf('quarter').valueOf();
        this.rangeTime = [moment(startDate).format('YYYY-MM-DD'),moment(endDate).format('YYYY-MM-DD')];
      }
    },
    changeDataRange(e){
      // var dateList = e || [];
      // this.beginDate = dateList[0];
      // this.endDate = dateList[1];
    },
    changePage(pagination, filters, sorter) {
      this.pagination={...pagination}
      this.getServiceList();
    },
    changeQsTablePag(pagination, filters, sorter){
      this.pagination1={...pagination}
      this.getApiVisitedInfo();
    },
    onSearch() {
       this.pagination={
        current: 1, 
        pageSize: 10,
        total: 0,
      };
      this.getServiceList();
     
    },
    getSelectList() {
      userServiceModels()
        .then(res => {
          if (res.code == 200000) {
             var serListdata = [];
             serListdata.unshift({
              serviceId: '',
              serviceName: "全部"
            });
            for(var i in res.data){
              serListdata.push({
                serviceId:i,
                serviceName: res.data[i]
              })
            }
            // serListdata.unshift({
            //   serviceId: 0,
            //   serviceName: "全部"
            // });
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
    getApiVisitedInfo(){
      this.qsdata = [];
      let _param={
        serviceId:'',
        beginDate:this.rangeTime[0],
        endDate:this.rangeTime[1],
        pageIndex:this.pagination1.current,
        pageSize:this.pagination1.pageSize,
        serviceModel:this.selectModel,
      } 
      apiVisitTrendInfo(_param)
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
            this.pagination1.total = res.data.total;
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
      fwqsParm.append("serviceId",'');
      fwqsParm.append("beginDate",  this.rangeTime[0]); 
      fwqsParm.append("endDate", this.rangeTime[1]); 
      fwqsParm.append("serviceModel",this.selectModel); 
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
    getServiceList() {
      this.nldata = [];
      var serListParm = new URLSearchParams();
      serListParm.append("serviceName", this.searchName);
      serListParm.append("pageIndex", this.pagination.current);
      serListParm.append("pageSize", this.pagination.pageSize);
      serListParm.append("serviceModel",'');
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
<style>
/* .ant-modal-mask{
   z-index:999991 !important;
}
.ant-modal-wrap{
   z-index:999992 !important;
} */
</style>

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
