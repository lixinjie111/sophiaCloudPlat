<template>
  <div class="InvoiceReq_con">
      <div class="til_con">发票索取</div>
      <div class="invo_get_con">
          <div class="invo_get_con1">
            <a-steps :current="current" @change="onChange">
                <a-step title="选择发票"/>
                <a-step title="确认信息和地址"/>
                <a-step title="申请完成"/>
            </a-steps>
          </div>
          <div class="invo_get_con2">
              <i class="el-icon-warning"></i>
              <span>您的发票模板信息还不完善，请先在发票信息管理里填写相关信息后，再申请发票！</span>
              <span class="setting_now">立即设置发票抬头</span>
          </div>
          <div class="invo_get_con3">
              <p>后付费月结算单的可开票金额为当月实际结算金额，本月产生的后付费业务月结算单在下个月二号以后才可以索取发票。</p>
              <p>发票基于订单、月结算单开具（单个订单、月结算单不可拆分开票）。</p>
              <p>一张发票只能有一个税率，当开具的发票税率有多个时，系统会自动生成多张发票。</p>
              <p>单张电子发票金额不能超过10万，单张纸质发票金额不能超过100万。若您申请的开票金额超过限额，将在审核通过后拆分为多笔不超限额的发票记录，经拆分的发票金额总和将等于您的申请开票金额。</p>
              <p>自2017.07.01起，申请普通发票需填写税号信息，否则将无法应税使用，请及时维护您的税号信息。</p>
              <p>从2017年8月25日起，申请纸质增值税普通发票，如金额未满200元，快递费用到付需自行承担。</p>
          </div>
          <div class="invo_get_con4">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="可开票消费" name="first">可开票消费</el-tab-pane>
                <el-tab-pane label="暂不可开票消费" name="second">暂不可开票消费</el-tab-pane>
            </el-tabs>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "InvoiceReq",
  data() {
      return{
          current: 0,
          activeName: 'first'
      }
  },
  methods: {
    onChange(current) {
      console.log('onChange:', current);
      this.current = current;
    },
    handleClick(tab, event) {
        console.log(tab, event);
    }
  },
};
</script>
<style lang="scss" scoped>
.InvoiceReq_con{
    width: 100%;
    height: 100%;
    background-color: #fff;
    .til_con{
        width: 100%;
        height: 53px;
        border-bottom: 1px solid #CFCDCD;
        display: flex;
        align-items: center;
        padding-left: 27px;
        box-sizing: border-box;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #676970;
    }
    .invo_get_con{
        width: 100%;
        padding:0 27px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        .invo_get_con1{
            width: 600px;
            margin-top: 30px;
        }
        .invo_get_con2{
            width: 100%;
            height: 40px;
            margin-top: 32px;
            background: #FFFBE6;
            border-radius: 2px;
            border: 1px solid #FFE58F;
            padding: 9px 17px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.65);
            /deep/ .el-icon-warning:before{
                color: #FAAD14;
                font-size: 20px;
                margin-right: 8px;
            }
            .setting_now{
                color: #0376FD;
                &:hover{
                    cursor: pointer;
                }
            }
        }
        .invo_get_con3{
            width: 100%;
            height: 174px;
            margin-top: 20px;
            background: #FFFBE6;
            opacity: 0.6;
            padding: 15px 39px;
            box-sizing: border-box;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.65);
            line-height: 24px;
        }
        .invo_get_con4{
            width: 100%;
            margin-top: 32px;

        }
    }
}
</style>