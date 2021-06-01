<template>
<div  class="payContainer">
    <div class="gailan">
        <a-page-header
            style="border-bottom: 1px solid rgb(235, 237, 240)"
            title="概览"
        />
        <div class="gailan_container">
          <div class="paystep">
             <a-steps :current="currentIndex">
                <a-step title="选择接口"></a-step>
                <a-step title="确认订单" />
                <a-step title="开通成功"/>
              </a-steps>
          </div>
          <template v-if="currentIndex==0">
              <div class="payForm">
                <div class="payItem">
                  <div class="payLeft">
                      接口选择
                  </div>
                  <div class="payRt">
                      <div class="payDesc">支持调用方式：REST API</div>
                      <div class="payCk">
                        <el-checkbox-group 
                            v-model="checkedList"
                            @change="changeCheck"
                            >
                            <el-checkbox v-for="item in checkList" :label="item.serviceId" :key="item.id" style="margin-bottom:20px">{{item.serviceName}}</el-checkbox>
                          </el-checkbox-group>
                        </div>
                  </div>
                </div>
                <div class="payItem">
                  <div class="payLeft">
                      价目表
                  </div>
                  <div class="payRt">
                      <div class="payDesc">开通付费后，默认使用按量后付费形式进行阶梯计费
                        <el-tooltip class="item" effect="dark" placement="right">
                            <i class="el-icon-question"></i>
                            <div slot="content">计费详情可参考<span style="color:#1890FF">产品定价文档</span></div>
                          </el-tooltip>
                      </div>
                      <div class="payCk">
                        <template v-for="item in tableList">  
                          <table class="selfTable">
                            <tr>
                              <th id="lineTd">
                                 <div class="first-col">
                                    <div class="first-col-top">月调用量(n)</div>
                                    <div class="first-col-bottom">API</div>
                                  </div>
                              </th>
                              <th v-for="subItem in item" :key="subItem.id">{{subItem.monthTransferStart}} &lt; n <span v-if="subItem.monthTransferEnd"> ≤ {{subItem.monthTransferEnd}} </span></th>
                            </tr>
                            <tr>
                              <td>
                                {{item[0].serviceName}}
                              </td>
                              <td v-for="subItem in item" :key="subItem.id">
                                 <span v-if="subItem.feeRulerType==1">{{subItem.numPrice}}/次</span>
                                 <span v-else>{{subItem.timePrice}}/小时</span>
                              </td>
                            </tr>
                          </table>
                          </template>  
                      </div>
                      <div class="payMark">
                        注：“w”表示万次，"调用量"指使用按量后付费形式产生的计费调用量
                      </div>
                  </div>
                </div>
              
              </div>
              <div class="confirmBtn">
                <el-button type="primary" @click="toOpen">确认开通</el-button>
              </div>
              <div class="payMark1">
                温馨提示：1. 为确保业务正常进行，请保证您的账户余额充足，可点击进行 充值2. 开通成功后，如需停止付费，可点击 “停用” 自助关停。
              </div>
          </template>  
          <template v-if="currentIndex==1"> 
            <div class="detailTitle">订单详情</div>
            <vxe-table
                  border
                  show-header-overflow
                  show-overflow
                  highlight-hover-row
                  :data="checkArr">
                  <vxe-table-column field="serviceName" title="API名称"></vxe-table-column>
                  <vxe-table-column  title="付费方式" field="">
                    <template #default="{ row }">
                      后付费
                    </template>
                  </vxe-table-column>
                  <vxe-table-column field="" title="数量">
                    <template #default="{ row }">
                      1
                    </template> 
                  </vxe-table-column>
                  <vxe-table-column field="" title="配置">
                    <template #default="{ row }">
                      --
                    </template> 
                  </vxe-table-column>
                  <vxe-table-column field="" title="时长">
                    <template #default="{ row }">
                      --
                    </template> 
                  </vxe-table-column>
                  <vxe-table-column field="" title="单价">
                    <template #default="{ row }">
                     <span style="color:#1890FF">见产品定价文档</span>
                    </template> 
                  </vxe-table-column>
                  <vxe-table-column field="" title="计费方式">
                    <template #default="{ row }">
                      <span v-if="row.feeRulerType==1">按次计费</span>
                      <span v-else>按时计费</span>
                    </template> 
                  </vxe-table-column>
              </vxe-table>
              <div class="payMark2">
                *后付费服务将根据使用情况从账户余额中扣除，请保证有足够的金额。
              </div>
              <div class="confirmBtn1">
                  <el-button type="primary" @click="order">去开通</el-button>
                  <el-button @click="goBack">返回修改</el-button>
              </div>
          </template> 
          <template v-if="currentIndex==2"> 
            <div class="openStatus">
              <div class="text1">
                <i class="el-icon-circle-check"></i> 开通成功
              </div>
              <div class="text2">
                您购买的服务将在1～5分钟内开通，请耐心等待。
              </div>
              <div class="text3">
                <el-button type="primary" size="small" style="margin-right:10px" @click="goLink1">控制台</el-button>
                <el-link type="primary">
                   <span v-if="this.orderList.length==1"  @click="goLink">查看订单明细</span>
                   <span v-else  @click="goLink2">查看订单列表</span>
                </el-link>
              </div>
            </div> 
          </template>  
        </div>
    </div>
</div>
</template>

<script>
import {
  serviceModelList,
  getPostpaidFeeRule,
} from "../../api/openMy/index";
import {
 createOrder
} from "../../api/bugBag/index";
export default {
  data() {
    return {
      serviceId:'',
      serviceModel:'',
      currentIndex:0,
      tableList:[],
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' }
      ],
      checkedList: [],
      checkList: [],
      checkArr:[],
      orderList:[],
    };
  },
  created() {
    this.serviceId=this.$route.query.serviceId;
    this.serviceModel=this.$route.query.serviceModel;
    this.checkedList[0]=this.serviceId;
    this.initData();
  },
  watch:{
    checkedList(newVal,oldVal){
      if(newVal.length>oldVal.length){
        //增加
         this.initTable(newVal[newVal.length-1]);
      }else{
        let _name=oldVal.filter(x => {
            if(!newVal.includes(x)){
              return x;
            }
          }
        )
        this.tableList.forEach((item,index)=>{
          if(item[0].serviceId==_name[_name.length-1]){
            this.tableList.splice(index, 1);
          }
        })
      }
    },
  },
  mounted() {
  },
  methods: {
      goLink1(){
       this.$router.push({
        path:'/overview',
         query:{
          activekey:['yingyong1'],
          openkey:['myYingyong']
        }
      })
    },
    goLink(){
       this.$router.push({
        path:'/orderInfoLaterPaid',
        query:{
          id:this.orderList[0],
          activekey:['caiwu5'],
          openkey:['caiwu5']
        }
      })
    },
    goLink2(){
       this.$router.push({
        path:'/orderMan',
        query:{
          activekey:['caiwu5'],
          openkey:['caiwu5']
        }
      })
    },
      toOpen(){
        let _arr=[];
        this.checkList.forEach(item=>{
          this.checkedList.forEach(subItem=>{
            if(item.serviceId==subItem){
              _arr.push(item);
            }
          })
        })
        this.tableList.forEach((item,index)=>{
            _arr.forEach(subItem=>{
            if(item[0].serviceId==subItem.serviceId){
              subItem['feeRulerType']=item[0].feeRulerType;
            }
          })
        })
        this.checkArr=_arr;
        this.currentIndex++;
      },
     changeCheck(e){

     },
     initTable(id){
        var fwqsParm = new FormData();
        fwqsParm.append("serviceId",id);
        getPostpaidFeeRule(fwqsParm).then(res => {
          if (res.code == 200000) {
            let _name='';
            this.checkList.forEach(item=>{
              if(item.serviceId==id){
                _name = item.serviceName;
              }
            })
            let _table=res.data;
            _table.forEach(item=>{
              item['serviceName']=_name;
            })
            this.tableList.push(_table)
          } else {
            console.log(this.checkedList)
             this.checkedList.forEach((item,index)=>{
              if(item==id){
                this.checkedList.splice(index,1);
              }
            })
             console.log(this.checkedList)
            this.$message.error(res.message || "请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
        });
     },
     order(){
      let _serviceList=[];
      this.checkArr.forEach(item=>{
        _serviceList.push(
          {
            serviceId:item.serviceId,
          }
        )
      })
     let _param={
      "orderAssort": 1,
      "orderSource": 1,
      "orderType": 1,
      "serviceList": _serviceList
     };
      createOrder(_param).then(res => {
          if (res.code == 200000) {
               this.orderList=res.data;
               this.currentIndex++;
              // this.getOrderInfo();
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
        });

    },
     goBack(){
      this.currentIndex--;
    },
     initData(){
       let _param={
         serviceModel:this.serviceModel
       }
        serviceModelList(_param).then(res => {
          if (res.code == 200000) {
            for(var i in res.data){
              this.checkList=res.data[i];
            }
             this.initTable(this.serviceId);
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
        });
     },
  }
};
</script>
<style lang="scss" >
  .first-col {
          position: relative;
          height: 20px;
          width: 100%;
        }
        .first-col:before {
          content: "";
          position: absolute;
          left: 0;
          top: 10px;
          width: 100%;
          height: 1px;
          transform: rotate(20deg);
          background-color: #e8eaec;
        }
        .first-col .first-col-top {
          position: absolute;
          right: 0;
          top: -15px;
        }
        .first-col .first-col-bottom {
          position: absolute;
          left: 4px;
          bottom: -10px;
        }
</style>
<style lang="scss" scoped>
.selfTable{
  width: 100%;
  margin-bottom: 10px;
  #lineTd{
    width: 160px;
  }
  th{
    background: #fafafa;
    height: 54px;
    border-bottom: 1px solid #e8e8e8;
  }
  td{
    height: 54px;
    border-bottom: 1px solid #e8e8e8;
  }
}
.payContainer{
     background: #f0f2f5; 
    .gailan{
        background: #fff;
        margin-bottom: 20px;
        .gailan_container{
            padding:20px;
            .paystep{
              width: 80%;
              margin: 0 auto;
            }
            .openStatus{
              margin-top: 80px;
              text-align: center;
              .text1{
                font-size: 18px;
                color:#000;
                margin-bottom: 50px;
                i{
                  color:#52C41A;
                  font-size: 20px;
                }
              }
              .text2{
                margin-bottom: 50px;
              }
            }
            .detailTitle{
              border-left:2px solid #0376FD;
              padding-left: 5px;
              margin-bottom: 30px;
            }
            .payForm{
              margin-top:40px;
              .payItem{
                display: flex;
                margin-bottom: 30px;
                .payLeft{
                  width: 56px;
                  margin-right: 18px;
                }
                .payRt{
                  flex: 1;
                  .payDesc{
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #909399;
                    margin-bottom: 23px;
                  }
                  .payMark{
                    margin-top: 30px;
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #909399;
                  }
                }
              }
            }
            .confirmBtn{
              display: flex;
              justify-content: flex-end;
              padding-right: 50px;
            }
            .confirmBtn1{
              margin-top: 100px;
              display: flex;
              justify-content: flex-end;
              padding-right: 50px;
            }
            .payMark1{
              padding-right: 50px;
              margin-top: 20px;
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #909399;
              text-align: right;
            }
            .payMark2{
              margin-top: 20px;
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #909399;
            }
        }
    }
}
</style>
