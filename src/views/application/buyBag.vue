<template>
<div  class="payContainer">
    <div class="gailan">
        <a-page-header
            style="border-bottom: 1px solid rgb(235, 237, 240)"
            title="购买资源包"
        />
        <div class="gailan_container">
          <div class="paystep">
              <a-steps :current="currentIndex">
                <a-step title="选择资源包"></a-step>
                <a-step title="确认订单" />
                <a-step title="在线支付"/>
                <a-step title="支付成功"/>
              </a-steps>
          </div>
          <template v-if="currentIndex==0">
              <div class="payForm">
                <div class="payLeft">
                    <div class="payTitle">{{serviceName}}</div>
                    <div class="payDesc">
                     温馨提示：资源包有剩余时优先使用资源包抵扣
                    </div>
                    <div class="payTitle">资源包规格</div>
                    <div class="payDesc">
                     温馨提示：各API的具体抵扣次数规则详见产品定价文档。购买资源越多，享受更多折扣优惠
                    </div>
                     <vxe-table
                        border
                        show-header-overflow
                        show-overflow
                        highlight-hover-row
                        :data="tableData0">
                        <vxe-table-column field="numStandard" title="规格(万次)"></vxe-table-column>
                        <vxe-table-column field="validPeriod" title="购买时长(月)"></vxe-table-column>
                        <vxe-table-column field="packagePrice" title="单价(元)"></vxe-table-column>
                        <vxe-table-column field="num" title="数量">
                          <template #default="{ row }">
                            <vxe-input v-model="row.num" placeholder="数值类型" type="number" min="0" max="50"></vxe-input>
                          </template>
                        </vxe-table-column>
                    </vxe-table>
                </div>
                <div class="payRt">
                  <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                      <span>当前配置</span>
                      <el-button style="float: right; padding: 3px 0" type="text">清除</el-button>
                    </div>
                    <div class="payItem">
                      <div class="payLf">
                          资源包类型：
                      </div>
                      <div class="payRight">
                          {{serviceName}}
                      </div>
                    </div>
                    <div class="payItem">
                      <div class="payLf">
                          资源包配置：
                      </div>
                      <div class="payRight"  >
                        <div v-for="item in tableData0" :key="item.id">
                          <p  v-if="item.num!=0" >{{item.numStandard}}万次 * {{item.num}}个</p>
                        </div>
                      </div>
                    </div>
                    <div class="payItem">
                      <div class="payLf">
                          购买时长：       
                      </div>
                      <div class="payRight">
                        1年
                      </div>
                    </div>
                    <div class="payItem">
                      <div class="payLf">
                          价格：       
                      </div>
                      <div class="payRight">
                        <div class="price">¥ {{format(sumPrice)}}</div>
                      </div>
                    </div>
                    <div class="confirmBtn">
                      <el-button type="primary" style="width:80%" @click="next0">确认开通</el-button>
                    </div>
                    <div class="payDesc1">
                      资源包购买成功后即刻生效，资源包使用后剩余流量不支持退订
                    </div>
                  </el-card>
                </div>
              </div>
          </template>  
          <template v-if="currentIndex==1"> 
            <div class="detailTitle">订单详情</div>
            <vxe-table
                  border
                  show-header-overflow
                  show-overflow
                  highlight-hover-row
                  :data="tableData1">
                  <vxe-table-column field="pagName" title="资源包类型"></vxe-table-column>
                  <vxe-table-column field="" title="付费方式">
                     <template>
                       预付费
                    </template>
                  </vxe-table-column>
                  <vxe-table-column field="num" title="数量"></vxe-table-column>
                  <vxe-table-column field="numStandard" title="配置(万次)"></vxe-table-column>
                  <vxe-table-column field="validPeriod" title="时长(月)"></vxe-table-column>
                  <vxe-table-column field="packagePrice" title="单价(个)"></vxe-table-column>
                  <vxe-table-column field="" title="计费方式">
                    <template #default="{ row }">
                      <span v-if="row.packageType==1">次数包</span>
                      <span v-else>时长包</span>
                    </template>
                  </vxe-table-column>
              </vxe-table>
              <div class="payBox">
                  <div class="payTotal">
                      应付款： <span>¥ {{format(sumPrice)}} </span>
                  </div>
                  <div class="confirmBtn1">
                      <el-button type="primary" @click="goPay">去支付</el-button>
                      <el-button @click="goBack">返回修改</el-button>
                  </div>
                  <div class="payCheck">
                    <a-checkbox v-model="checked">我已我已阅读并同意</a-checkbox><span> Sophia云平台线上订购协议</span>
                  </div>
              </div>
          </template> 
          <template v-if="currentIndex==2"> 
            <div class="navTitle">
               <div class="detailTitle">待支付订单</div>
               <div class="detailTotal">待支付总金额：<span>¥ {{format(tableData2[0].orderAmount)}} </span></div>
            </div>
             <vxe-table
                  border
                  show-header-overflow
                  show-overflow
                  highlight-hover-row
                  :data="tableData2">
                  <vxe-table-column field="orderSn" title="订单号"></vxe-table-column>
                  <vxe-table-column field="" title="产品名称">
                    <template #default="{ row }">
                      {{row.serviceModelName}}-{{row.serviceName}}
                    </template>
                  </vxe-table-column>
                  <vxe-table-column field="" title="配置">
                      <template #default="{ row }">
                        <span style="color: #0376FD;cursor:pointer" @click="lookSet(row)">详情</span>
                      </template>
                  </vxe-table-column>
                  <vxe-table-column field="orderPackageTime" title="时长(月)"></vxe-table-column>
                  <vxe-table-column field="orderAmount" title="总额">
                    <template #default="{ row }">
                        <span>¥ {{format(row.orderAmount)}}</span>
                      </template>
                  </vxe-table-column>
              </vxe-table>
              <div class="detailTitle" style="margin-top:30px">选择支付方式</div>
              <div class="payType">
                 <p><el-radio v-model="radio" label="1">账户余额（当前账户余额 ¥ {{format(account.amount)}}）</el-radio></p>
                 <div class="payMust">
                      需支付： <span class="payPrice">¥ {{format(tableData2[0].orderAmount)}} </span> <span  class="payTip" v-if="account.amount<tableData2[0].orderAmount">当前帐户余额不足，请<span>充值</span>或选择其他方式支付</span>
                  </div>
                   <div class="payDesc1">
                     温馨提示：如果您有正在使用中的后付费产品，请保证有足够余额。
                    </div>
              </div>
              <div class="payType">
                <p><el-radio v-model="radio" label="2">其他方式支付</el-radio></p>
                <div class="payMust">
                  <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="支付宝" name="first">支付宝</el-tab-pane>
                    <el-tab-pane label="微信" name="second">微信</el-tab-pane>
                    <el-tab-pane label="个人网银" name="third">个人网银</el-tab-pane>
                    <el-tab-pane label="企业网银" name="fourth">企业网银</el-tab-pane>
                  </el-tabs>
                  <div class="payBox payBox1">
                      <div class="payTotal">
                          应付金额： <span>¥ {{format(tableData2[0].orderAmount)}}</span>
                      </div>
                      <div class="confirmBtn1">
                          <el-button type="primary" @click="realPay">支付</el-button>
                      </div>
                  </div>
                </div>
              </div>
          </template>  
          <template v-if="currentIndex==3"> 
            <div class="openStatus">
              <div class="text1">
                <i class="el-icon-circle-check"></i> 支付成功
              </div>
              <div class="text2">
                您购买的服务将在1～5分钟内开通，请耐心等待。
              </div>
              <div class="text3">
                <el-button type="primary" size="small" style="margin-right:10px" @click="goLink1">控制台</el-button><el-link type="primary" @click="goLink">查看订单明细</el-link>
              </div>
            </div> 
          </template>  
        </div>
    </div>
   <a-modal v-model="visible" title="提醒" @ok="handleOk" cancelText="取消" centered okText="购买">
      <p>资源包使用完毕会自动切换为按量后付费模式以保证您的正常使用</p>
    </a-modal>
   <a-modal v-model="visible1" title="您还有未支付的订单" @ok="handleOk1" cancelText="取消" centered okText="查看已有订单">
      <p>该服务存在未支付的订单，请完成支付或取消已有订单后再进行购买。</p>
    </a-modal>
   <a-modal v-model="visible2" title="付款完成前请不要关掉页面" @ok="handleOk2" cancelText="提交工单" centered okText="完成付款">
      <p>请在新页面完成付款，如付款遇到问题请选择提交工单或致电：4008-123-456（转1）</p>
    </a-modal>
   <a-modal v-model="visible3" title="当前配置" :footer="null" v-if="tableData2.length>0">
        <div class="payItem">
          <div class="payLf">
              资源包类型：
          </div>
          <div class="payRight">
             {{serviceName}}
          </div>
        </div>
        <div class="payItem">
          <div class="payLf">
              资源包配置：
          </div>
          <div class="payRight">
            <div v-for="item in tableData2[0].orderAllocations" :key="item.packageAllocation">
              <p  v-if="item.num!=0" >{{format1(item.packageAllocation)}}次 * {{item.orderNum}}个</p>
            </div>
          </div>
        </div>
        <div class="payItem">
          <div class="payLf">
              购买时长：       
          </div>
          <div class="payRight">
            {{tableData2[0].orderPackageTime}}个月
          </div>
        </div>
        <div class="payItem">
          <div class="payLf">
              价格：       
          </div>
          <div class="payRight">
            <div class="price">¥ {{format(tableData2[0].orderAmount)}}</div>
          </div>
        </div>
    </a-modal>
</div>
</template>

<script>
import {
  getPrepaidFeePackage,createOrder,createPreOderVerify,getOrderInfo,userAccount,payBulk
} from "../../api/bugBag/index";
export default {
  data() {
    return {
      sumPrice:0,
      serviceName:'',
      serviceId:'',
      activeName: 'second',
      radio:'1',
      orderSn:'',
      checked:false,
      visible:false,
      visible1:false,
      visible2:false,
      visible3:false,
      currentIndex:0,
      tableData0:[],
      tableData1:[],
      tableData2:[],
      tableData3:[],
      orderList:[],
      account:{},
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' }
      ],
      checkedCities: ['短语音识别-英语', '北京'],
      cities: ['短语音识别-中文普通话', '短语音识别-英语', '短语音识别-英语', '短语音识别-英语'],
    };
  },
  watch:{
    'tableData0':{ // 监视选中的数据（单位）
      handler:function(newValue,oldValue){
        let sum=0;
        let _newArr=[];
        newValue.forEach(item=>{
          item['pagName']=this.serviceName;
          if(item.num!=0){
            sum+=item.num*item.packagePrice;
            _newArr.push(item)
          }
        })
        this.tableData1=_newArr;
        this.sumPrice=sum;
      },
      deep:true,
      },
  },
  created() {
    this.serviceId=this.$route.query.serviceId;
    this.serviceName=this.$route.query.serviceName;
    this.initInfo();
    this.userAccount();
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
        path:'/orderInfo',
        query:{
          id:this.tableData2[0].orderSn,
          activekey:['caiwu5'],
          openkey:['caiwu5']
        }
      })
    },
    realPay(){
      let _param=[this.tableData2[0].orderSn];
      payBulk(_param)
        .then(res => {
          if (res.code == 200000) {
              this.currentIndex++;
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
        });
    },
    userAccount(){
      userAccount().then(res => {
          if (res.code == 200000) {
               this.account=res.data;
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
        });
    },
    lookSet(val){
      this.visible3=true;
      this.tableData3=val.orderAllocations;
    },
    getOrderInfo(){
     var fwqsParm = new FormData();
      fwqsParm.append("orderSn",this.orderList[0]);
      this.tableData2=[];
      getOrderInfo(fwqsParm)
        .then(res => {
          if (res.code == 200000) {
              this.tableData2.push(res.data);
              // this.$message.success(res.message);
              this.currentIndex++;
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
        });

    },
    goPay(){
      if(!this.checked){
        this.$message.warning('请勾选Sophia云平台线上订购协议');
        return
      }
      var fwqsParm = new FormData();
      fwqsParm.append("serviceId",this.serviceId);
      createPreOderVerify(fwqsParm).then(res => {
          if (res.code == 200000) {
              if(res.data.verifyFlag){
                this.order();
              }else{
                this.orderSn=res.data.orderSn;
                this.visible1=true;
                return;
              }
          } else {
            return;
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
        });
    },
    order(){
      let _serviceList=[];
      this.tableData1.forEach(item=>{
        _serviceList.push(
          {
            serviceId:this.serviceId,
            prepaidPackageId:item.prepaidPackageId,
            packageQuantity:item.num,
          }
        )
      })
     let _param={
      "orderAssort": 2,
      "orderSource": 1,
      "orderType": 1,
      "serviceList": _serviceList
     };
      createOrder(_param).then(res => {
          if (res.code == 200000) {
              this.orderList=res.data;
              this.getOrderInfo();
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
    format (num) {
        return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    },
    format1 (num) {
        return (num.toFixed(0) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    },
    next0(){
      this.currentIndex=1;
    },
    initInfo(){
      var fwqsParm = new FormData();
      fwqsParm.append("serviceId",this.serviceId);
      getPrepaidFeePackage(fwqsParm)
        .then(res => {
          if (res.code == 200000) {
            let _result=res.data;
            _result.forEach(item=>{
              item['num']=0;
            })
            this.tableData0=_result;
            console.log(res)
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
        });
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    handleOk1(e) {
       this.$router.push({
        path:'/orderInfo?id='+this.orderSn,
        query:{
          activekey:['caiwu5'],
          openkey:['caiwu5']
        }
      })
      this.visible1 = false;
    },
    handleOk2(e) {
      console.log(e);
      this.visible2 = false;
    },
    handleOk3(e) {
      console.log(e);
      this.visible2 = false;
    },
   
  }
};
</script>

<style lang="scss" scoped>
.payItem{
                    display: flex;
                    margin-bottom: 18px;
                    .payLf{
                      width: 100px;
                      margin-right: 18px;
                    }
                    .payRight{
                      flex: 1;
                      p{
                        margin-bottom: 18px;
                      }
                      .price{
                        font-size: 18px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                        color: #0376FD;
                      }
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
              display: flex;
              .payLeft{
                flex:2;
                margin-right: 18px;
                .payTitle{
                  border-left:2px solid #0376FD;
                  padding-left: 5px;
                  margin-bottom: 30px;
                }
                .payDesc{
                  margin-top: 6px;
                  margin-bottom: 15px;
                  font-size: 12px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #909399;
                }
              }
              .payRt{
                flex:1;
              }
            }
            .confirmBtn{
              margin-top: 35px;
              display: flex;
              justify-content: center;
            }
            .payDesc1{
              margin-top: 10px;
              margin-bottom: 15px;
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #909399;
              text-align: center;
            }
            .payType{
              p{
                margin-bottom: 30px;
              }
              .payMust{
                padding-left: 25px;
                .payPrice{
                    font-size: 18px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #0376FD;
                    margin-right: 20px;
                }
                .payTip{
                  color:#FF4D4F;
                  span{
                    color:#0376FD;
                    cursor: pointer;
                  }
                }
              }
              .payDesc1{
                  padding-left: 25px;
                  margin-top: 17px;
                  margin-bottom: 17px;
                  font-size: 12px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #909399;
                  text-align: left;
                }
            }
            .navTitle{
              margin-top: 40px;
              display: flex;
              justify-content: space-between;
              span{
                 font-size: 18px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                        color: #0376FD;
              }
            }
            .payBox{
              width: 400px;
              margin-top: 100px;
              float: right;
              &.payBox1{
                margin-top: 20px;
                text-align: right;
                .confirmBtn1{
                  padding-right: 0px;
                }
              }
              .payTotal{
                margin-bottom: 30px;
                  span{
                    font-size: 24px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #0376FD;
                  }
              }
               .confirmBtn1{
                  padding-right: 50px;
                  margin-bottom: 30px;
                }
                .payCheck{
                  margin-bottom: 30px;
                  span{
                    color: #0376FD;
                  }
                }
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
