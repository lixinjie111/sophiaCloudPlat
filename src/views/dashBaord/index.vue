<template>
    <div class="dash">
        <div class="tip">
            <div class="tipTitle">
                Hi，欢迎使用应用 Sophia 智能服务平台
            </div>
            <div class="tipDesc">
                轻松创建、部署和管理你的应用，提升研发效率，降低业务成本。
            </div>
        </div>
        <div class="boxContent">
            <a-row :gutter="[20,20]">
                <a-col :span="12">
                    <div class="box cash">
                        <div class="title">现金余额</div>
                        <div class="jine">￥ {{accountSummary.totalAmount || 0}}</div>
                        <div class="kaipiao">可开票金额 <span> ￥ {{accountSummary.invoiceAmount || 0}}</span> </div>
                        <el-button size="mini" round type="primary" class="charge">充值</el-button>
                    </div>
                </a-col>
                <a-col :span="12">
                     <a-row :gutter="[20,20]">
                        <a-col :span="12">
                            <div class="box xufei">
                                <div class="xufeiBox"><span>{{accountSummary.notPayOrders || 0}}</span> &nbsp; 个待续费</div>  <span class="look">查看</span>
                            </div>
                        </a-col>
                        <a-col :span="12">
                            <div class="box xufei">
                                <div class="xufeiBox"><span>{{accountSummary.renewServices || 0}}</span> &nbsp;  个待支付订单</div>  <span class="look">查看</span>
                            </div>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
            <a-row :gutter="[20,0]">
                <a-col :span="12">
                    <div class="box1">
                        <div class="titleNav">
                            <div class="title">消费趋势</div>
                            <div class="titleRt">
                                <a-radio-group v-model="time" @change="onChange3" type="button" button-style="solid">
                                    <a-radio-button value="1">
                                    月
                                    </a-radio-button>
                                    <a-radio-button value="2">
                                    半年
                                    </a-radio-button>
                                    <a-radio-button value="3">
                                    年
                                    </a-radio-button>
                                </a-radio-group>
                            </div>
                        </div>
                        <div class="boxEts">
                            <cLine id="box58" :colorList="$lxjData.colorList" :myData="ConsumeTrendData"></cLine>
                        </div>
                    </div>
                </a-col>
                <a-col :span="12">
                    <div class="box1">
                          <div class="titleNav">
                            <div class="title">消费分布</div>
                            <div class="titleRt">
                                <!-- <a-range-picker @change="onChange" /> -->
                                 <el-date-picker
                                    v-model="rangeTime1"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    style="height:100%;width:100%"
                                    value-format="yyyy-MM-dd"
                                    @change="change2"
                                    ></el-date-picker>
                            </div>
                        </div>
                        <div class="boxEts">
                             <PieEcharts :colorList="$fjData.colorList" :myData="distributionData"></PieEcharts>
                        </div>
                    </div>
                </a-col>
            </a-row>
        </div>
        <div class="select_area_container">
            <div class="select_container">
                <el-select v-model="selectModel" style="width:150px">
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
        <div class="resBox">
            <a-row :gutter="[20,20]" type="flex">
                <a-col flex="200px">
                    <div class="box yingyong">
                        <div class="top">应用数</div>
                        <div class="mid"><span>{{appNum}}</span> 个</div>
                        <div class="bm"></div>
                    </div>
                </a-col>
                <a-col  flex="1">
                     <a-row :gutter="[20,20]">
                        <a-col :span="12">
                            <div class="box api">
                                <div class="yingyong">
                                    <div class="top">API调用</div>
                                    <div class="mid midLeft"><span>{{stisticsInfo.apiCount}}</span> 次</div>
                                    <!-- <div class="bm">周环比<a-icon type="caret-up" :style="{ fontSize: '16px', color: '#FF4D4F' }" /><span :style="{ color: '#FF4D4F' }">6.47%</span>，月环比<a-icon type="caret-down"  :style="{ fontSize: '16px', color: '#52C41A' }"/><span :style="{ color: '#52C41A' }">6.47%</span></div> -->
                                </div>
                                <div class="boxEts">
                                   <cLine id="box57" :colorList="$lxjData.colorList" :myData="appInfo"></cLine>
                                </div>
                            </div>
                        </a-col>
                        <a-col :span="12">
                            <div class="box api">
                                <div class="yingyong">
                                    <div class="top">SDK调用</div>
                                    <div class="mid midLeft"><span>{{stisticsInfo.sdkCount}}</span> 次</div>
                                    <!-- <div class="bm">周环比<a-icon type="caret-up" :style="{ fontSize: '16px', color: '#FF4D4F' }" /><span :style="{ color: '#FF4D4F' }">6.47%</span>，月环比<a-icon type="caret-down"  :style="{ fontSize: '16px', color: '#52C41A' }"/><span :style="{ color: '#52C41A' }">6.47%</span></div> -->
                                </div>
                                <div class="boxEts">
                                   <cLine id="box56" :colorList="$lxjData.colorList" :myData="sdkInfo"></cLine>
                                </div>
                            </div>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
            <a-row :gutter="[20,20]"  v-if="showList">
                <a-col :span="6" v-for="(value,index) in vistedInfo" :key="index">
                    <div class="box1" v-if="index!='abc'">
                        <div class="top" >{{value.moudle_name}}</div>
                        <div class="lv">使用率</div>
                        <div class="per">{{value.summary?value.summary.usedPercent:'0%'}}</div>
                        <div class="bm">
                            总量 <span :style="{ color: '#52C41A' }">{{value.summary?value.summary.totalNum:'0'}}</span>
                            <span class="half">剩余</span> <span :style="{ color: '#FF4D4F' }">{{value.summary?value.summary.remainNum:'0'}}</span>
                        </div>
                        <div class="boxEts">
                            <barEcharts id="box1" :colorList="$lxjData.colorList" :myData="value.echartData"></barEcharts>
                        </div>
                    </div>
                </a-col>
            </a-row>
        </div>
        <div class="barTitle">
            能力调用趋势
        </div>
        <div class="boxContent neng" v-if="showList">
            <a-row :gutter="[20,20]">
                <a-col :span="12" v-for="(value,index) in vistedInfo" :key="index">
                    <div class="box2"  v-if="index!='abc'">
                        <div class="top">{{value.moudle_name}}</div>
                        <div class="sel">
                            <div class="selectItem">
                                <el-select v-model="value.appId" placeholder=""  style="width:80px" size="small" @change="select1(value,$event,index)">
                                    <el-option label="全部" value="" ></el-option>
                                    <el-option :label="item1.appName" :value="item1.appId" v-for="item1 in value.applist" :key="item1.appName"></el-option>
                                </el-select>
                            </div>
                             <div class="selectItem">
                                <el-select v-model="value.serviceId" placeholder=""  style="width:80px" size="small" @change="select2(value,$event,index)">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option :label="item1.serviceName" :value="item1.serviceId" v-for="item1 in value.servicelist" :key="item1.serviceId"></el-option>
                                </el-select>
                            </div>
                            <div class="selectItem">
                                <el-radio-group v-model="value.radio1" @change="onChange(value,index)" size="small">
                                    <el-radio-button :label="subItem.value" v-for="subItem in value.radioList" :key="subItem.value">
                                       {{subItem.lable}}
                                    </el-radio-button>
                                </el-radio-group>
                            </div>
                            <div class="selectItem">
                                <el-radio-group v-model="value.radio2" @change="onChange1(value,index)" size="small">
                                    <el-radio-button :label="subItem.value" v-for="subItem in value.radioList2" :key="subItem.value">
                                        {{subItem.lable}}
                                    </el-radio-button>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="boxEts">
                            <cLine :id="'box5'+index" :colorList="$lxjData.colorList" :myData="value.echartData" :myTotaldata="vistedInfo"></cLine>
                        </div>
                    </div>
                </a-col>
            </a-row>
        </div>
	</div>
</template>

<script>
import cLine from '@/components/echarts/common/line';
import barEcharts from '@/components/echarts/common/barEcharts';
import PieEcharts from '@/components/echarts/common/PieEcharts';
import moment from "moment";
import "moment/locale/zh-cn";
import {userServiceModels} from "../../api/gailan/index";
import {applist,userServiceList,userAccountSummary,userConsumeTrend,distribution,appCount,stisticsCallInfo,statisticsVistedInfo} from "../../api/dashbord/index";
export default {
    components:{cLine,barEcharts,PieEcharts},
    data() {
        return {
            showList:false,
            selectModel:'',
            serListArr: [],
            selVal:'cl7',
            rangeTime2:[moment(new Date(new Date().getTime() - 3600*1000*24*365*2)).format('YYYY-MM-DD'),moment(new Date()).format('YYYY-MM-DD')],
            rangeTime1:[moment(new Date(new Date().getTime() - 3600*1000*24*182)).format('YYYY-MM-DD'),moment(new Date()).format('YYYY-MM-DD')],
            rangeTime:[moment(new Date(new Date().getTime() - 3600*1000*24*7)).format('YYYY-MM-DD'),moment(new Date()).format('YYYY-MM-DD')],
            formInline: {
                region: '0'
            },
            time:'2',
            value1: '',
            value2: '',
            currentRadio: 'COUNT',
            radio2: '',
            accountSummary:{
               invoiceAmount:null, 
               notPayOrders:null, 
               renewServices:null, 
               totalAmount:null, 
            },
            appNum:0,
            stisticsInfo:{},
            vistedInfo:{},
            currentNo:0,
            ConsumeTrendData:{
                name:[],
                value:[]
            },
            distributionData:{
                name:[],
                value:[]
            },
            appInfo:{
                name:[],
                value:[]
            },
            sdkInfo:{
                name:[],
                value:[]
            },

        }
    },
    created() {
        this.getSelectList();
        this.getVistedInfo();
        this.getCash();
        this.getTrend();
        this.getDistribution();
        this.getappCount();
        this.getStistics();
       
    },
    methods: {
        change2(){
            this.getDistribution();
        },
        onChange3(){
            this.getTrend();
        },
        getVistedInfo(){
            let _param ={
                statisticsTerm:'COUNT',//统计数据项, COUNT:调用次数 QPS:QPS
                appId:'',//应用APPID
                serviceModel:this.selectModel,
                serviceId:'',//API服务SERVICEID
                statisticsType :'1',//统计时间类型, 1:天 2:小时 3:月
                requestStatus :'1',// 1:成功 2:失败 3:全部
                startTime :this.rangeTime[0],
                endTime :this.rangeTime[1],
                // startTime :'2000-01-08',
                // endTime :'2021-04-02',
            };
            statisticsVistedInfo(_param).then(res => {
                if(res.code == 200000) {
                    let length=Object.keys(res.data).length;
                    var index=0;
                   for(var i in res.data){
                       index++;
                       var str='str'+i;
                       this.vistedInfo[str]=[];
                       this.vistedInfo[str]={
                            'radio1':'COUNT',
                            'radioList':[{lable:'调用量',value:'COUNT'},{lable:'QPS',value:'QPS'}],
                            'radio2':'1',
                            'radioList2':[{lable:'7天',value:'0'},{lable:'30天',value:'1'}],
                            'moudle_name':res.data[i].list[0].moudle_name,
                            'service_model':res.data[i].list[0].service_model,
                            'summary':res.data[i].summary,
                            'applist':[],
                            'appId':'',
                            'servicelist':[],
                            'serviceId':'',
                            'echartData':{
                                'name': [],
                                'value':[]
                            }
                        }
                        this.getApplist(res.data[i].list[0].service_model,str,index,length);
                   }
                   for(var i in res.data){
                       var str='str'+i;
                        res.data[i].list.forEach(item=>{
                            this.vistedInfo[str].echartData['name'].push(item.dateStr);
                            this.vistedInfo[str].echartData['value'].push(item.cnt);
                        })
                   }
                  
                }else {
                    
                }
            }).catch(err => {
                
            })
        },
        select1(item,item2,index){
            this.getUerServiceList(item,item2);
            this.getVistedInfo1(item,index)
        },
        select2(item,item2,index){
            this.$forceUpdate();
            this.getVistedInfo1(item,index)
        },
        getApplist(service_model,str,index,length){
            let _param ={
                serviceModel:service_model,
                pageIndex:'1',
                pageSize:'30',
            };
            applist(_param).then(res => {
                if(res.code == 200000) {
                    this.vistedInfo[str].applist=res.data.list;
                    this.$set(this.vistedInfo[str],'applist',res.data.list) 
                   if(length==index){
                       setTimeout(()=>{
                           this.showList=true;
                           this.$forceUpdate();
                       },300)
                        
                   }
                   
                }else {
                    
                }
            })
        },
        getUerServiceList(val1,val2){
            let _param ={
                appId:val2,
                serviceModelId:val1.service_model,
            };
            userServiceList(_param).then(res => {
                if(res.code == 200000) {
                    //val1.servicelist=res.data;
                    var attrName = val1.moudle_name;
                    var vistList = this.vistedInfo || {};
                    for(var attr in vistList){
                        if(vistList[attr].moudle_name == attrName){
                            vistList[attr].servicelist = res.data;
                        }
                    }
                    this.$set(this,'vistedInfo',vistList);
                    this.$forceUpdate();
                    this.vistedInfo = vistList;
                }else {
                    
                }
            }).catch(err => {
                
            })
        },
        getStistics(){
            let _param ={
                serviceModel:this.selectModel,
                beginDate :this.rangeTime[0],
                endDate :this.rangeTime[1],
                // beginDate:'2000-01-08',
                // endDate:'2021-04-02',
            };
            this.appInfo={
                name:[],
                value:[]
            };
            this.sdkInfo={
                name:[],
                value:[]
            };
            stisticsCallInfo(_param).then(res => {
                if(res.code == 200000) {
                    this.stisticsInfo=res.data;
                    res.data.sdkList.forEach(item=>{
                         this.appInfo['name'].push(item.date_str)
                         this.appInfo['value'].push(item.total_call_num)
                    })
                    res.data.apiList.forEach(item=>{
                         this.sdkInfo['name'].push(item.date_str)
                         this.sdkInfo['value'].push(item.total_call_num)
                    })
                   
                }else {
                    
                }
            }).catch(err => {
                
            })
        },
        getappCount(){
            let _param ={
                // beginDate:'2000-01-08',
                // endDate:'2021-04-02',
            };
            appCount(_param).then(res => {
                if(res.code == 200000) {
                    this.appNum=res.data;
                }else {
                    
                }
            }).catch(err => {
                
            })
        },
        getDistribution(){
            let _param ={
                beginDate:this.rangeTime1[0],
                endDate:this.rangeTime1[1],
            };
            this.distributionData={
                name:[],
                value:[]
            };
            distribution(_param).then(res => {
                if(res.code == 200000) {
                    if(res.data.length>0){
                        res.data.forEach(item=>{
                            this.distributionData['name'].push(item.categoryName);
                            this.distributionData['value'].push(item.value);
                        })
                    }
                }else {
                    
                }
            }).catch(err => {
                
            })
        },
        getTrend(){
            let _param ={
                dateType:this.time
            };
            this.ConsumeTrendData={
                name:[],
                value:[]
            };
            userConsumeTrend(_param).then(res => {
                if(res.code == 200000) {
                    if(res.data.length>0){
                        res.data.forEach(item=>{
                            this.ConsumeTrendData['name'].push(item.dateStr);
                            this.ConsumeTrendData['value'].push(item.amount);
                        })
                    }
                }else {
                    
                }
            }).catch(err => {
                
            })
        },
        getCash(){
            // let _param ={
            //             phone:this.tel,
            //             noteCode:this.idVertifyMa,
            //             password:this.resetPwd,
            //         };
            userAccountSummary().then(res => {
                if(res.code == 200000) {
                    this.accountSummary=res.data;
                }else {
                    this.$message.success('重置失败');
                }
            }).catch(err => {
                console.log(err)
            })
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
        getVistedInfo1(val,str1){
            let _param ={
                statisticsTerm:val.radio1,//统计数据项, COUNT:调用次数 QPS:QPS
                appId:val.appId,//应用APPID
                serviceModel:val.service_model,
                serviceId:val.serviceId,//API服务SERVICEID
                statisticsType :val.radio2==0?'1':'3',//统计时间类型, 1:天 2:小时 3:月
                requestStatus :'1',// 1:成功 2:失败 3:全部
                startTime :this.rangeTime[0],
                endTime :this.rangeTime[1],
                // startTime :'2000-01-08',
                // endTime :'2021-04-02',
            };
            statisticsVistedInfo(_param).then(res => {
                if(res.code == 200000) {
                    this.currentNo++;
                   for(var i in res.data){
                        this.vistedInfo[str1].echartData.name=[];
                        this.vistedInfo[str1].echartData.value=[];
                          if(res.data[i].list){
                              res.data[i].list.forEach(item=>{
                                if(val.radio1=='QPS'){
                                    this.vistedInfo[str1].echartData.name.push(item.dateStr);
                                    this.vistedInfo[str1].echartData.value.push(item.qps);
                                }else{
                                    this.vistedInfo[str1].echartData.name.push(item.dateStr);
                                    this.vistedInfo[str1].echartData.value.push(item.cnt);
                                }
                             })
                          }
                   }
                   this.$set(this.vistedInfo,'abc',this.currentNo) 
                   this.$forceUpdate();
                }else {
                    
                }
            }).catch(err => {
                
            })
        },
        onChange(value,index){
            this.$forceUpdate();
            this.getVistedInfo1(value,index)
        },
        onChange1(value,index){
            this.$forceUpdate();
            this.getVistedInfo1(value,index)
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
         searchFn(){
            this.vistedInfo={};
            this.getVistedInfo();
            this.getStistics();
        },
        resetFn(){
            this.selectModel = '';
            this.rangeTime = [moment(new Date(new Date().getTime() - 3600*1000*24*7)).format('YYYY-MM-DD'),moment(new Date()).format('YYYY-MM-DD')];
            this.selVal='cl7';
            // this.getApiVisitTrend();
            // this.getApiVisitedInfo();
        },
    }
}
</script>
<style lang="scss" scoped>
	.dash{
         background: #f0f2f5; 
         height: 100%;
        .tip{
            padding:24px;
            background: #60ACFF;
            border-radius: 4px; 
           .tipTitle{
                font-size: 24px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 32px;
                margin-bottom: 8px;
           }
           .tipDesc{
                font-size: 14px;
                font-family: Helvetica;
                color: #FFFFFF;
                line-height: 22px;
           }
        }
        .barTitle{
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #54565B;
            line-height: 22px;
            margin: 10px 0;
        }
        .resBox{
            .box{
                 background: #fff;
                height: 155px;
                border-radius: 2px;
                border: 1px solid #D9D9D9;
                padding:20px;
                &.yingyong{
                    width: 186px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .top{
                        font-size: 14px;
                        font-family: HelveticaNeue;
                        color: #121C33;
                    }
                    .mid{
                        text-align: center;
                        span{
                            font-size: 20px;
                            font-family: HelveticaNeue;
                            color: #000;
                        }
                    }
                }
                &.api{
                    display: flex;
                    .boxEts{
                        flex: 1;
                    }
                    .yingyong{
                        width: 186px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        .top{
                            font-size: 14px;
                            font-family: HelveticaNeue;
                            color: #121C33;
                        }
                        .mid{
                            span{
                                font-size: 20px;
                                font-family: HelveticaNeue;
                                color: #000;
                            }
                        }
                        .bm{
                            font-size: 12px;
                            font-family: PingFangSC-Medium, PingFang SC;
                            font-weight: 500;
                            color: #54565B;
                            display: flex;
                            align-items: center;
                        }
                    }
                }
                
            }
            .box1{
                padding:20px;
                background: #fff;
                // height: 290px;
                border-radius: 2px;
                border: 1px solid #D9D9D9;
                .top{
                    font-size: 14px;
                    font-family: HelveticaNeue;
                    color: #121C33;
                    font-weight: bold;
                }
                .lv{
                    margin-top: 20px;
                    font-size: 12px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #54565B;
                }
                .per{
                    font-size: 30px;
                    font-family: HelveticaNeue;
                    color: rgba(0, 0, 0, 0.85);
                    line-height: 38px; 
                }
                .bm{
                    margin-top: 8px;
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #54565B;
                    line-height: 20px; 
                    .half{
                        margin-left: 10px;
                    }
                }
                .boxEts{
                    margin-top: 8px;
                    height: 112px;
                }
            }
        }
        .boxContent{
            background: #fff;
            padding:20px;
            margin: 20px 0;
            &.neng{
                margin-top: 10px;
            }
            .box{
                height: 120px;
                border-radius: 2px;
                border: 1px solid #D9D9D9;
                &.cash{
                    padding: 10px 30px;
                    position: relative;
                    .charge{
                        position: absolute;
                        right: 30px;
                        top:10px;
                    }
                    .title{
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #606266;
                        line-height: 17px;
                    }
                    .jine{
                        margin-top: 8px;
                        font-size: 20px;
                        font-family: HelveticaNeue;
                        color: #121C33;
                        line-height: 38px;
                    }
                    .kaipiao{
                        margin-top: 20px;
                         font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #606266;
                        line-height: 17px;
                        span{
                            color: #121C33;
                        }
                    }
                }
                &.xufei{
                    padding: 10px 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #606266;
                    line-height: 17px;
                    .look{
                           cursor: pointer; 
                        }
                    .xufeiBox{
                         display: flex;
                          align-items: center;
                        span{
                            font-size: 24px;
                            color:#121C33;
                        }
                        
                    }
                }
            }
            .box1{
                height: 291px;
                border-radius: 2px;
                border: 1px solid #D9D9D9;
                padding:20px;
                display: flex;
                flex-direction: column;
                .titleNav{
                    display: flex;
                   justify-content: space-between;
                   align-items: center;
                   .title{
                        font-size: 18px;
                        font-family: HelveticaNeue;
                        color: #121C33;
                   }
                   .titleRt{
                       width: 250px;
                   }
                }
                .boxEts{
                    flex:1;
                }
            }
            .box2{
                border-radius: 2px;
                border: 1px solid #D9D9D9;
                padding:20px;
                .top{
                    font-size: 18px;
                    font-family: HelveticaNeue;
                    color: #121C33;
                }
                .sel{
                    margin-top: 10px;
                    display: flex;
                    .selectItem{
                        margin-right: 5px;
                    }
                }
                .boxEts{
                    margin-top: 10px;
                   height: 150px; 
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
        // .searchBox{
        //     background: #fff;
        //     margin: 20px 0;
        //      padding-top:22px;
        //      padding-left:22px;
        //      padding-right:22px;
        //     .demo-form-inline{
        //         .el-form-item:last-child{
        //             float: right;
        //         }
        //     }
        // }
    }		
</style>