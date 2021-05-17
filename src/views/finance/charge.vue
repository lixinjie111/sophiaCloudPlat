<template>
  <div class="charge">
    <a-page-header
        style="border-bottom: 1px solid rgb(235, 237, 240)"
        title="充值"
    />
    <div class="charge_container">
        <a-alert  type="warning">
            <p slot="message" style="line-height:25px;font-size:10px">
                温馨提示：<br/>
                <span style="color: red">1.若您有欠费账单，充值后将优先抵扣欠费账单。<br/>
                 2.若您后付费产品已欠费并停止服务，请充值大于欠款的金额，以重启服务。<br/></span>
               3.充值后请及时支付未支付订单，以免影响正常服务。
            </p>
        </a-alert>
        <div class="payItem">
            <div class="payLf">
                可用余额：       
            </div>
            <div class="payRight">
                <div class="price">
                    ¥ 0.00
                </div>
            </div>
        </div>
        <div class="payItem">
            <div class="payLf">
                充值金额： 
            </div>
            <div class="payRight">
                 ¥   <el-tooltip class="item" effect="dark" content="单次充值金额不能超过￥100,000,000;  充值金额必须是大于0的整数或者两位以内的小数！" placement="top">
                            <el-input v-model="input"  style="width:150px;margin-left:5px" ></el-input>
                    </el-tooltip> 
                    <span class="price" style="margin-left:15px" >
                        充值记录
                    </span>  
               
            </div>
        </div>
        <div class="payItem">
            <div class="payLf">
                充值方式： 
            </div>
            <div class="payRight">
            </div>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="支付宝" name="first">支付宝</el-tab-pane>
            <el-tab-pane label="微信" name="second">微信</el-tab-pane>
            <el-tab-pane label="个人网银" name="third">个人网银</el-tab-pane>
            <el-tab-pane label="企业网银" name="fourth">企业网银</el-tab-pane>
        </el-tabs>
        <div class="payItem">
           <a-checkbox v-model="checked">我已了解：充值的款项只可用于Sophia云平台消费，如需提现，需要您完成实名认证，且Sophia云平台只支持原路退回至付款账号。</a-checkbox>
        </div>
        <div class="payItem">
            <el-button type="primary">充值</el-button>
        </div>
        
       
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        input:'',
        activeName: 'second',
    };
  },
  created() {
  },
  components:{
  },
  methods: {
      edit(){
          this.visible=true;
      },
  },
};
</script>
<style lang="scss" scoped>
.charge_container{
    padding:10px 25px;
    .payItem{
        display: flex;
        margin-top: 30px;
        align-items: center;
        .payLf{
            width: 70px;
            margin-right: 16px;
        }
        .payRight{
            flex: 1;
            .price{
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #0376FD;
            }
        }
    }
}

</style>