<template>
  <div class="invoice_con">
    <div class="first_area">
      <div class="til">财务总览</div>
    </div>
    <div class="sec_area">
        <div class="fp_money">
            <div class="fp_money_til">账户信息</div>
            <div class="fp_money_container">
                <div class="fp_money4">
                    <div class="fp_money_item">现金余额:</div>
                    <div class="fp_money_item1  price">¥ 0.00</div>
                    <div class="fp_money_item1"> 
                        <el-button type="primary" size="small" @click="charge">充值</el-button>
                        <el-button size="small">提现</el-button>
                  </div>
                </div>
                 <div class="fp_money4">
                    <div class="fp_money_item">启用余额预警： <el-switch v-model="value1"  @change="isOpen"></el-switch></div>
                    <div class="fp_money_item1">预警阈值：<span>¥ 0.00</span> &nbsp;&nbsp;  <span><i class="el-icon-edit" style="cursor:pointer" @click="edit"></i></span> </div>
                </div>
                 <div class="fp_money4">
                    <div class="fp_money_item">启用延停服务：<el-switch v-model="value2" @change="isOpen1"></el-switch></div>
                    <div class="fp_money_item1">延停额度：¥ 0.00</div>
                </div>
            </div>
        </div>
        <div class="fp_info">
            <div class="fp_money_til">待办提醒</div>
            <div class="fp_money_container1">
                <div class="fp_money1">
                    <div class="fp_title">待续费</div>
                    <div class="fp_price">0</div>
                </div>
                <div class="fp_money1">
                    <div class="fp_title">待支付</div>
                    <div class="fp_price">0</div>
                </div>
                <div class="fp_money1">
                    <div class="fp_title">待开票</div>
                    <div class="fp_price">0</div>
                </div>
                <div class="fp_money1">
                    <div class="fp_title">未结清还款</div>
                    <div class="fp_price">¥ 0.00</div>
                </div>
            </div>
        </div>
    </div>
    <div class="three_area">
        <div class="fp_money">
            <div class="fp_money_til">
                消费汇总 
               <el-tooltip class="item" effect="dark" content="本表仅体现独立结算的账单信息，当月消费后付费未体现， 需待下月2号之后。" placement="top">
                    <i class="el-icon-question"></i>
                </el-tooltip>
                <div class="more">更多></div>
            </div>
            <div class="fp_sub_til">本期消费合计 2021-02 <span class="fp_price">¥ 0.0</span> </div>
            <div class="fp_money_container">
                 <template>
                    <cLine id="box58" :colorList="$lxjData.colorList" :myData="$lxjData.box58Data"></cLine>
                </template>
                 <!-- <template>
                    暂无数据
                </template> -->
            </div>
        </div>
        <div class="fp_info">
            <div class="fp_money_til">产品消费统计
                <el-tooltip class="item" effect="dark" content="由于系统同步原因，本数据延迟一天更新。" placement="top">
                    <i class="el-icon-question"></i>
                </el-tooltip>
                <div class="more">更多></div>
            </div>
            <div class="fp_sub_til">
                 <el-date-picker
                v-model="value3"
                type="month"
                placeholder="选择月">
                </el-date-picker>
            </div>
            <div class="fp_money_container1">
                <template>
                    <PieEcharts :colorList="$fjData.colorList" :myData="$fjData.box01Data"></PieEcharts>
                </template>
                <!-- <template>
                    暂无数据
                </template> -->
            </div>
        </div>
    </div>
     <a-modal v-model="visible" title="预警设置" @ok="handleOk" cancelText="取消" centered okText="提交">
       <a-alert message="注意：当账户可用余额小于该值时，每天短信提醒一次（最多连续提醒5天）。" banner />
      <p style="margin-top:20px">可用余额预警阈值： ¥ <el-input v-model="input"  style="width:100px;" ></el-input></p>
    </a-modal>
     <a-modal v-model="visible1" title="提示" @ok="handleOk1" cancelText="取消" centered okText="确认">
      <p>余额预警关闭后，系统将不再作短信提醒。确定要关闭吗？</p>
    </a-modal>
     <safeAlert @closeDialog1="closeDialog1" @closeDialog2="closeDialog2" v-if="isAlert" :status="value2" :useTel="userInfomation.mobile"></safeAlert>  
  </div>
</template>

<script>
import cLine from '@/components/echarts/common/line';
import PieEcharts from '@/components/echarts/common/PieEcharts';
import safeAlert from './safeAlert1';
import {} from "../../api/invoiceMan/index";
export default {
  name: "invoiceMan",
  data() {
    return {
        visible:false,
        visible1:false,
        isAlert:false,
        value1:false,
        value2:false,
        value3:'',
        input:'0.00',
        isEdit:'true',
        userInfomation:{},
    };
  },
  created() {
      this.initInfo1();
  },
  components:{
      cLine,PieEcharts,safeAlert
  },
  methods: {
      closeDialog1(){
          this.isAlert=false;
          this.value2=false;
      },
      closeDialog2(){
          this.isAlert=false;
          this.value2=true;
      },
      isOpen1(e){
          this.isAlert=true;
          console.log(e)
      },
      initInfo1(){
            this.userInfomation=JSON.parse(localStorage.getItem('yk-userInfo'));
        },
      handleOk(){
           this.visible=false;
      },
      handleOk1(){
           this.visible1=false;
      },
      handleOk2(){
           this.visible2=false;
      },
      edit(){
          this.visible=true;
      },
  },
};
</script>
<style lang="scss" scoped>
.invoice_con {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .first_area {
    width: 100%;
    height: 80px;
    background: #ffffff;
    border-radius: 2px;
    margin-bottom: 16px;
    padding: 0 24px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .til {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
    }
  }
  .sec_area {
    width: 100%;
    height: 252px;
    background-color: #f5f5f5;
    border-radius: 2px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    .fp_money{
        width: 60%;
        height: 100%;
        background: #FFFFFF;
        padding: 18px 24px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .fp_money_til{
            width: 100%;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
           color: rgba(0, 0, 0, 0.85);
            margin-bottom: 18px;
        }
        .fp_money_container{
            width: 100%;
            flex:1;
            display: flex;
            justify-content: space-between;
            .fp_money4{
                flex:1;
                .fp_money_item{
                    margin-bottom: 30px;
                }
                .fp_money_item1{
                    margin-bottom: 30px;
                    margin-left: 40px;
                    &.price{
                        font-size: 24px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                        color: #0376FD;
                    }
                }
            }
        }
    }
    .fp_info{
        margin-left: 16px;
        flex:1;
        height: 100%;
        background: #FFFFFF;
        padding: 18px 24px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .fp_money_til{
            width: 100%;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            margin-bottom: 18px;
            color: rgba(0, 0, 0, 0.85);
        }
        .fp_money_container1{
            width: 100%;
            flex:1;
            display: flex;
            justify-content: space-between;
            flex-flow: wrap;
            .fp_money1{
                width:50%;
                text-align: center;
                margin-bottom: 27px;
                .fp_title{
                    margin-bottom: 11px;
                }
                .fp_price{
                    font-size: 18px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #0376FD;
                }
            }
        }
    }
  }
  .three_area {
    width: 100%;
    height: 507px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    border-radius: 2px;
   
   .fp_money{
        width: 60%;
        height: 100%;
        background: #FFFFFF;
        padding: 18px 24px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
         padding-bottom: 20px;
        .fp_money_til{
            width: 100%;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
           color: rgba(0, 0, 0, 0.85);
            margin-bottom: 18px;
            position: relative;
            .more{
                position: absolute;
                right: 0;
                top:0;
                cursor: pointer;
            }
        }
        .fp_sub_til{
            margin-top: 16px;
            .fp_price{
                color: #0376FD;
            }
        }
        .fp_money_container{
            width: 100%;
            flex:1;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .fp_info{
        margin-left: 16px;
        flex:1;
        height: 100%;
        background: #FFFFFF;
        padding: 18px 24px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
         padding-bottom: 20px;
        .fp_money_til{
            width: 100%;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            margin-bottom: 18px;
            color: rgba(0, 0, 0, 0.85);
             position: relative;
            .more{
                position: absolute;
                right: 0;
                top:0;
                 cursor: pointer;
            }
        }
        .fp_sub_til{
            margin-top: 16px;
        }
        .fp_money_container1{
            width: 100%;
            flex:1;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
  }
}
</style>