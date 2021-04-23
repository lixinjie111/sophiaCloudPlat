<template>
  <div class="monRep_container">
    <div class="mon_rep_title">监控报表</div>
    <div class="mon_app_content_container">
      <div class="content_item">
        <div class="label">选择应用：</div>
        <div class="input_container">

          <el-select v-model="appNameVal" @change="handleAppListChange" style="height:100%;width:100%;" placeholder="请选择">
            <el-option
              v-for="item in appNameList"
              :key="item.id"
              :label="item.appName"
              :value="item.appId">
            </el-option>
          </el-select>

        </div>
      </div>
      <div class="content_item">
        <div class="label">选择API：</div>
        <div class="input_container">
          <el-select style="width:100%;height:100%;" @change="handleApIListChange" v-model="apiVal" placeholder="请选择">
            <el-option
              v-for="(item) in apiList"
              :key="item.id"
              :value="item.serviceId"
              :label="item.serviceName"
            >{{item.serviceName}}</el-option>
          </el-select>
        </div>
      </div>
      <div class="content_item">
        <div class="label">统计项：</div>
        <div class="input_container">
          <el-radio-group v-model="monItem">
            <el-radio label="COUNT">调用量</el-radio>
            <el-radio label="QPS" style="margin-left:20px;">QPS</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="content_item">
        <div class="label">监控项：</div>
        <div class="input_container">
          <el-checkbox-group v-model="checkList">
            <el-checkbox :label="1">调用成功</el-checkbox>
            <el-checkbox :label="2">调用失败</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="content_item">
        <div class="label">时间段：</div>
        <div class="input_container">
          <el-date-picker
            v-model="rangeTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="height:100%;width:100%;"
            value-format="yyyy-MM-dd"
            @change="changeDataRange"
          ></el-date-picker>
        </div>
      </div>
      <div class="content_item">
        <div class="label"></div>
        <div class="input_container searchBtn">
          <a-button type="primary" style="width:100%;height:100%;" @click="searchMoiData">查询</a-button>
        </div>
      </div>
    </div>
    <div class="diaoyon_inter_container">
      <div class="radio_container">
        <el-radio-group v-model="timeRadioVal">
          <el-radio :label="1">按日</el-radio>
          <el-radio :label="2">按时</el-radio>
        </el-radio-group>
      </div>
      <div class="line_echarts_container" id="timeEchartsId"></div>
    </div>
  </div>
</template>

<script>
import { getAppList,getRepApiList,getMonitorData } from "../../api/proSer/index";
import moment from "moment";
export default {
  name: "monRep",
  data() {
    return {
      moment,
      checkList: [1],
      monItem:'COUNT',
      timeRadioVal:1,
      rangeTime: [moment(new Date(new Date().getTime() - 3600*1000*24*7)).format('YYYY-MM-DD'),moment(new Date()).format('YYYY-MM-DD')],
      appNameList: [{}],
      apiList:[{}],
      appNameVal:'',
      apiVal:""
    };
  },
  mounted() {
    // this.initLineEcharts();
  },
  created() {
    this.getPageData();
  },
  methods: {
    getPageData() {
      this.getAppNameList();
      this.getApiList({id:''});
    },
    searchMoiData(){
      var monList = this.checkList;
      var monItem;
      if(monList.length == 0){
        monItem = '';
      }
      else if(monList.length == 1){
        monItem = monList[0];
      }
      else if(monList.length == 2){
        monItem = 3;
      }
      var parms = {
        statisticsTerm :this.monItem,
        appId:this.appNameVal || '',
        serviceId:this.apiVal,
        statisticsType:this.timeRadioVal,
        requestStatus:monItem,
        startTime:this.rangeTime[0],
        endTime:this.rangeTime[1] 
      };
      getMonitorData(parms).then(res=>{
        if(res.code == 200000){
          var MonitorData = res.data || [];
          this.initLineEcharts(MonitorData);
        }
        else{
           this.$message.error(res.message || "请求失败！");
        }
      }).catch(err=>{
        this.$message.error("请求失败！");
      });
    },
    getApiList(parms){
      getRepApiList(parms).then(res=>{
        if(res.code == 200000){
          this.apiList = res.data.appServiceList || [];
        }
        else{
           this.$message.error(res.message || "请求失败！");
        }
      }).catch(err=>{
        this.$message.error("请求失败！");
      });
    },
    getAppNameList() {
      this.appNameList = [{}];
      var appListParm = {
        pageIndex: 1,
        pageSize: 100
      };
      getAppList(appListParm)
        .then(res => {
          if (res.code == 200000) {
            var appListData = res.data.list || [];
            appListData.unshift({
              id:'',
              appId:'',
              appKey:'',
              appName:'全部',
              appSecret:'',
              industry:''
            });
            this.appNameList = appListData;
          } else {
             this.$message.error(res.message || "请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
        });
    },
    changeDataRange(e) {
    },
    handleAppListChange(e){
      var appList = this.appNameList || [];
      var idVal;
      this.apiVal = '';
      appList.forEach(item=>{
        if(e == item.appId){
          idVal = item.id;
        }
      });
      this.getApiList({id:idVal})
    },
    handleApIListChange(e){
      this.apiVal = e;
    },
    initLineEcharts(MonitorData) {
      var successData = MonitorData['1'] || [];
      var failData = MonitorData['2'] || [];
      var xAxisData = [];
      var successList = [];
      var failList = [];
      successData.forEach(item=>{
        successList.push(item.cnt);
      });
      failData.forEach(item=>{
        failList.push(item.cnt);
      });
      if(successData.length > 0){
        successData.forEach(item=>{
          xAxisData.push(item.dateStr);
        })
      }
      else if(failData.length > 0){
        failData.forEach(item=>{
          xAxisData.push(item.dateStr);
        })
      }
      else{
        xAxisData = [];
      }

      var myChart = this.$echarts.init(
        document.getElementById("timeEchartsId")
      );
      var option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["调用成功", "调用失败"],
          bottom: "1%"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "13%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xAxisData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "调用成功",
            type: "line",
            data: successList,
            itemStyle: {
              normal: {
                color: "#08C971"
              }
            }
          },
          {
            name: "调用失败",
            type: "line",
            data: failList,
            itemStyle: {
              normal: {
                color: "#F64D15"
              }
            }
          }
        ]
      };

      myChart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.monRep_container {
  width: 100%;
  .mon_rep_title,
  .mon_app_content_container,
  .diaoyon_inter_container {
    width: 100%;
  }
  .mon_rep_title {
    padding-left: 27px;
    box-sizing: border-box;
    height: 48px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #676970;
    border-bottom: 2px solid #cfcdcd;
  }
  .mon_app_content_container {
    min-height: 302px;
    padding: 57px 83px;
    padding-bottom: 30px;
    box-sizing: border-box;
    border-bottom: 2px solid #cfcdcd;
    .content_item {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      .label {
        width: 73px;
        margin-right: 71px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #676970;
        line-height: 17px;
      }
      .input_container {
        width: 246px;
        /deep/ .ant-checkbox-group {
          /deep/.ant-checkbox-group-item {
            margin-right: 15px;
          }
        }
        /deep/ .el-date-editor{
          :nth-child(4){
            margin-left: 14px;
          }
        }
      }
      .searchBtn {
        width: 95px;
        height: 26px;
        margin-top: 30px;
      }
    }
  }
  .diaoyon_inter_container {
    min-height: 450px;
    padding: 8px 78px 26px 83px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    .radio_container {
      width: 100%;
      margin-bottom: 11px;
      display: flex;
      justify-content: flex-end;
    }
    .line_echarts_container {
      width: 957px;
      height: 375px;
    }
  }
}
</style>
