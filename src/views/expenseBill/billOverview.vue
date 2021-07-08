<template>
  <div class="billOverview_con">
      <div class="msg_info_con" v-if="ifShowMsg">
          <i class="el-icon-warning"></i>  
          <span>当月数据中包含未结算的后付费数据，查询数据仅供参考，不作为对账依据。当月最终账单将在次月初生成</span>
          <a-icon type="close" @click="closeMsg"/>
      </div>
      <div class="overview_con">
          <div class="first">
              <div class="first_top">
                  <div class="title">消费总览</div>
                  <div class="date_con">
                    <span class="label">账期：</span>
                    <el-date-picker
                        v-model="billDate"
                        type="month"
                        align="right"
                        style="height:100%;"
                    >
                    </el-date-picker>
                  </div>
              </div>
              <div class="first_bottom"></div>
          </div>
          <div class="second"></div>
          <div class="third"></div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        ifShowMsg:true,
        billDate:new Date()
    };
  },
  created() {},
  computed: {},
  methods: {
    closeMsg(){
        this.ifShowMsg = false;
    }
  },
};
</script>
<style>
</style>
<style lang="scss" scoped>
.billOverview_con{
    width: 100%;
    height: 100%;
    .msg_info_con{
        width: 100%;
        height: 40px;
        background: #FFFBE6;
        border-radius: 2px;
        border: 1px solid #FFE58F;
        display: flex;
        align-items: center;
        padding: 12px 16px;
        box-sizing: border-box;
        position: relative;
        .el-icon-warning{
            font-size: 18px;
            color: #FAAD14;
            margin-right: 8px;
        }
        .anticon-close{
            position: absolute;
            right: 10px;
            color: #666666;
            font-size: 14px;
        }
    }
    .overview_con{
        width: 100%;
        margin-top: 20px;
        .first{
            width: 100%;
            .first_top{
                width: 100%;
                display: flex;
                justify-content: space-between;
                .title{
                    font-size: 16px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: rgba(0, 0, 0, 0.85);
                    line-height: 24px;
                }
                .date_con{
                    display: flex;
                    align-items: center;
                    height: 32px;
                    .label{
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #000000;
                        line-height: 20px;
                    }
                    .el-date-editor{
                        margin-right: 60px;
                        width: 140px;
                        /deep/ .el-input__inner{
                            height: 100%;
                            margin-left: 7px;
                        }
                        /deep/ .el-input__prefix{
                            height: 100%;
                            .el-input__icon{
                                height: 100%;
                                display: flex !important;
                                align-items: center !important;
                                padding-left: 9px !important;
                                margin-right: 9px;
                            }
                        }
                        /deep/ .el-input__suffix{
                            height: 100%;
                            .el-input__suffix-inner{
                                height: 100%;
                                display: flex !important;
                                align-items: center !important;
                                .el-input__icon{
                                    height: auto;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>