<template>
  <div class="InvoiceReq_con">
    <div class="til_con">发票索取</div>
    <div class="invo_get_con">
      <div class="invo_get_con1">
        <a-steps :current="current" @change="onChange">
          <a-step title="选择发票" />
          <a-step title="确认信息和地址" />
          <a-step title="申请完成" />
        </a-steps>
      </div>
      <template v-if="current == 0">
        <div class="invo_get_con2" v-if="ifShowFpinfo">
          <i class="el-icon-warning"></i>
          <span
            >您的发票模板信息还不完善，请先在发票信息管理里填写相关信息后，再申请发票！</span
          >
          <span class="setting_now" @click="settingTitleNow"
            >立即设置发票抬头</span
          >
        </div>
        <div class="invo_get_con3">
          <p>
            后付费月结算单的可开票金额为当月实际结算金额，本月产生的后付费业务月结算单在下个月二号以后才可以索取发票。
          </p>
          <p>发票基于订单、月结算单开具（单个订单、月结算单不可拆分开票）。</p>
          <p>
            一张发票只能有一个税率，当开具的发票税率有多个时，系统会自动生成多张发票。
          </p>
          <p>
            单张电子发票金额不能超过10万，单张纸质发票金额不能超过100万。若您申请的开票金额超过限额，将在审核通过后拆分为多笔不超限额的发票记录，经拆分的发票金额总和将等于您的申请开票金额。
          </p>
          <p>
            自2017.07.01起，申请普通发票需填写税号信息，否则将无法应税使用，请及时维护您的税号信息。
          </p>
          <p>
            从2017年8月25日起，申请纸质增值税普通发票，如金额未满200元，快递费用到付需自行承担。
          </p>
        </div>
        <div class="invo_get_con4">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="可开票消费" name="first">
              <div class="input_con">
                <span class="inp_label">产品名称：</span>
                <div class="input_self">
                  <el-input
                    v-model="proName"
                    placeholder="产品名称模糊搜索"
                  ></el-input>
                </div>
                <span class="inp_label">起止时间：</span>
                <div class="input_self timeRange_con">
                  <el-date-picker
                    v-model="timeRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </div>
                <span class="inp_label">金额范围：</span>
                <div class="input_self">
                  <el-input
                    v-model="moneyRange"
                    placeholder="请选择金额范围"
                    @focus="choiceMoneyRange"
                  ></el-input>
                </div>
                <span class="inp_label">订单编号：</span>
                <div class="input_self">
                  <el-input
                    v-model="orderNum"
                    placeholder="请输入订单编号"
                  ></el-input>
                </div>
                <el-button class="my_el_btn">重 置</el-button>
                <el-button class="my_el_btn" type="primary">查 询</el-button>
              </div>
              <div class="check_con">
                <el-checkbox
                  v-model="allChecked"
                  style="margin-right: 8px"
                ></el-checkbox>
                <span>全选(支持跨分页)：有</span>
                <span class="active_num">{{ invoiceNum }}</span>
                <span>个订单可申请发票，可开票总额：</span>
                <span class="active_num">￥ 0.00</span>
              </div>
              <div class="table_con">
                <vxe-table
                  :align="allAlign"
                  :data="tableData"
                  show-header-overflow
                  show-overflow
                  highlight-hover-row
                >
                  <vxe-table-column
                    type="checkbox"
                    width="60"
                  ></vxe-table-column>
                  <vxe-table-column
                    field="orderNum"
                    title="订单编号"
                  ></vxe-table-column>
                  <vxe-table-column
                    field="moneyType"
                    title="资金类型"
                  ></vxe-table-column>
                  <vxe-table-column
                    field="orderType"
                    title="订单类型"
                  ></vxe-table-column>
                  <vxe-table-column
                    field="proName"
                    title="产品名称"
                  ></vxe-table-column>
                  <vxe-table-column
                    field="orderMoney"
                    title="订单实付金额"
                  ></vxe-table-column>
                  <vxe-table-column
                    field="kpMoney"
                    title="可开票金额"
                  ></vxe-table-column>
                  <vxe-table-column
                    field="oriorderNum"
                    title="原始订单编号"
                  ></vxe-table-column>
                  <vxe-table-column
                    field="orderPayTime"
                    title="订单支付时间"
                  ></vxe-table-column>
                  <template v-slot:empty>
                    <i class="el-icon-warning-outline"></i>
                    <span>暂无可开票订单/账单</span>
                  </template>
                </vxe-table>
                <div class="tab_bom_con">
                  <div class="tab_bom_lef">
                    <el-checkbox v-model="setingChecked"></el-checkbox>
                    <el-button type="info" plain>下一步</el-button>
                    <div v-if="ifShowFpinfo">
                      <span class="set_info"
                        >您尚未设置有效的开票信息，无法开具发票</span
                      >
                      <span class="set_txt">立即设置发票抬头</span>
                    </div>
                  </div>
                  <div class="tab_bom_rig">
                    <vxe-pager
                      border
                      size="medium"
                      :loading="loading2"
                      :current-page="tablePage2.currentPage"
                      :page-size="tablePage2.pageSize"
                      :total="tablePage2.totalResult"
                      :layouts="[
                        'PrevPage',
                        'JumpNumber',
                        'NextPage',
                        'FullJump',
                        'Sizes',
                        'Total',
                      ]"
                      @page-change="handlePageChange2"
                    >
                    </vxe-pager>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="暂不可开票消费" name="second"
              >暂不可开票消费</el-tab-pane
            >
          </el-tabs>
        </div>
      </template>
      <template v-if="current == 1">
        <div class="invo_get_con2">
          <span
            >您选取了3条单据开具发票（若选中多条订单，订单金额将合并开具在一张票据中），开票金额合计：</span
          >
          <span class="setting_now">￥ 216.64</span>
        </div>
        <div class="invo_get_item">
          <span class="setting_now0">发票抬头：</span>
          <span class="setting_now1"
            >上海元知晟睿科技研究有限公司北京分公司</span
          >
        </div>
        <div class="invo_get_item">
          <span class="setting_now0">开具类型：</span>
          <span class="setting_now1">企业</span>
        </div>
        <div class="invo_get_con2">
          <i class="el-icon-warning"></i>
          <span
            >发票类型为‘增值税专用发票’只可以开具纸质发票，如需修改可前往</span
          >
          <span class="setting_now">发票信息管理</span>进行修改
        </div>
        <div class="invo_get_item">
          <span class="setting_now0">纳税人识别号：</span>
          <span class="setting_now1"
            >上海元知晟睿科技研究有限公司北京分公司</span
          >
        </div>
        <div class="invo_get_item">
          <span class="setting_now0">开户银行名称：</span>
          <span class="setting_now1">91110101MA01QT236E</span>
        </div>
        <div class="invo_get_item">
          <span class="setting_now0">开户账号：</span>
          <span class="setting_now1">91110101MA01QT236E</span>
        </div>
        <div class="invo_get_item">
          <span class="setting_now0">注册场所地址：</span>
          <span class="setting_now1">91110101MA01QT236E</span>
        </div>
        <div class="invo_get_item">
          <span class="setting_now0">注册固定电话：</span>
          <span class="setting_now1">91110101MA01QT236E</span>
        </div>
        <div class="invo_get_item">
          <span class="setting_now0">发票性质：</span>
          <span class="setting_now1">91110101MA01QT236E</span>
        </div>
        <div class="invo_get_item">
          <span class="setting_now0">电子发票邮寄地址：</span>
          <span class="setting_now1"
            >660306@gdpr.com <span class="setting_now">更换地址</span></span
          >
        </div>
        <div class="invo_get_item">
          <span class="setting_now0">备注：</span>
          <span class="setting_now1"
            ><el-input
              type="textarea"
              v-model="memo"
              style="width: 600px"
              placeholder="该备注信息会展示在发票上，如有需要请录入，否则无需录入任何信息。"
            ></el-input>
            <br />建议不要超过25个汉字或50个（数字+字母），否则盖章的时候有可能压到。<span
              class="setting_now"
              >查看样例</span
            ></span
          >
        </div>
        <div class="table_con" style="width: 100%; margin-top: 20px">
          <vxe-table
            :align="allAlign"
            :data="tableData"
            show-header-overflow
            show-overflow
            highlight-hover-row
          >
            <vxe-table-column
              field="orderNum"
              title="发票名称"
            ></vxe-table-column>
            <vxe-table-column
              field="orderNum"
              title="开票内容"
            ></vxe-table-column>
            <vxe-table-column
              field="moneyType"
              title="规格型号"
            ></vxe-table-column>
            <vxe-table-column field="orderType" title="数量"></vxe-table-column>
            <vxe-table-column field="proName" title="单位"></vxe-table-column>
            <vxe-table-column
              field="orderMoney"
              title="总价"
            ></vxe-table-column>
            <vxe-table-column field="kpMoney" title="税率"></vxe-table-column>
            <template v-slot:empty>
              <i class="el-icon-warning-outline"></i>
              <span>暂无可开票订单/账单</span>
            </template>
          </vxe-table>
          <div class="tab_bom_con" style="margin-top: 20px">
            <el-button plain>上一步</el-button>
            <el-button type="primary">索要发票</el-button>
          </div>
        </div>
      </template>
    </div>
    <el-dialog title="金额范围" :visible.sync="dialogFormVisible" style="z-index:99999;">
      <el-form :model="rangeForm">
        <el-form-item>
          <el-input v-model="rangeForm.min" autocomplete="off"></el-input>
        </el-form-item>
        &nbsp;&nbsp;
        <div class="henxian">-</div>
        &nbsp;&nbsp;
        <el-form-item>
          <el-input v-model="rangeForm.max" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "InvoiceReq",
  data() {
    return {
      memo: "",
      current: 0,
      activeName: "first",
      proName: "",
      moneyRange: "",
      orderNum: "",
      timeRange: "",
      allChecked: false,
      setingChecked: false,
      allAlign: null, //对齐方式
      tableData: [
        // {
        //   orderNum: "预览",
        //   moneyType: "Develop",
        //   orderType: "Man",
        //   proName: 28,
        //   orderMoney: "vxe-table 从入门到放弃",
        //   kpMoney: "12.22",
        //   oriorderNum: "1257967623425",
        //   orderPayTime: "2020-04-23",
        // },
        // {
        //   orderNum: "Test2",
        //   moneyType: "Test",
        //   orderType: "Women",
        //   proName: 22,
        //   orderMoney: "Guangzhou",
        //   kpMoney: "12.22",
        //   oriorderNum: "1257967623425",
        //   orderPayTime: "2020-04-23",
        // },
        // {
        //   orderNum: "Test3",
        //   moneyType: "PM",
        //   orderType: "Man",
        //   proName: 32,
        //   orderMoney: "Shanghai",
        //   kpMoney: "12.22",
        //   oriorderNum: "1257967623425",
        //   orderPayTime: "2020-04-23",
        // },
        // {
        //   orderNum: "Test4",
        //   moneyType: "Designer",
        //   orderType: "Women ",
        //   proName: 24,
        //   orderMoney: "Shanghai",
        //   kpMoney: "12.22",
        //   oriorderNum: "1257967623425",
        //   orderPayTime: "2020-04-23",
        // },
      ],
      loading2: false,
      tablePage2: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      },
      ifShowFpinfo: false,
      invoiceNum: 0,
      dialogFormVisible:false,
      rangeForm:{
        min:'',
        max:''
      }
    };
  },
  created() {
    this.invoiceNum = this.tableData.length;
    var fpttObj = this.$route.query.fpttObj;
    console.log(fpttObj,'fpttObj');
    if (!fpttObj.title) {
      this.ifShowFpinfo = true;
    }
  },
  methods: {
    choiceMoneyRange(){
      this.dialogFormVisible = true;
    },
    settingTitleNow() {
      this.$router.push({
        path: "/invoiceMan",
        query: {
          setting: "now",
        },
      });
    },
    onChange(current) {
      this.current = current;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handlePageChange2({ currentPage, pageSize }) {
      this.tablePage2.currentPage = currentPage;
      this.tablePage2.pageSize = pageSize;
    },
  },
};
</script>
<style lang="scss" scoped>
.InvoiceReq_con {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .til_con {
    width: 100%;
    height: 53px;
    border-bottom: 1px solid #cfcdcd;
    display: flex;
    align-items: center;
    padding-left: 27px;
    box-sizing: border-box;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #676970;
  }
  .invo_get_con {
    width: 100%;
    padding: 27px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    .invo_get_con1 {
      width: 600px;
      margin-top: 6px;
    }
    .invo_get_con2 {
      width: 100%;
      height: 40px;
      margin-top: 32px;
      background: #fffbe6;
      border-radius: 2px;
      border: 1px solid #ffe58f;
      padding: 9px 17px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
      /deep/ .el-icon-warning:before {
        color: #faad14;
        font-size: 20px;
        margin-right: 8px;
      }
      .setting_now {
        color: #0376fd;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .invo_get_item {
      width: 100%;
      display: flex;
      margin-top: 20px;
      .setting_now0 {
        width: 150px;
        text-align: right;
        margin-right: 50px;
      }
      .setting_now1 {
        flex: 1;
        .setting_now {
          margin-left: 20px;
          color: #0376fd;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .invo_get_con3 {
      width: 100%;
      height: 174px;
      margin-top: 20px;
      background: #fffbe6;
      opacity: 0.6;
      padding: 15px 39px;
      box-sizing: border-box;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
    }
    .invo_get_con4 {
      width: 100%;
      margin-top: 32px;
      /deep/ .el-tabs {
        width: 100%;
      }
      /deep/ .el-tabs .el-tabs__content {
        width: 100%;
      }
      /deep/ .el-tabs .el-tabs__content .el-tab-pane {
        width: 100%;
        .input_con {
          width: 100%;
          display: flex;
          align-items: center;
          .inp_label {
            width: 116px;
            height: 22px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #000000;
            line-height: 22px;
          }
          .input_self {
            width: 260px;
            height: 32px;
            margin-right: 20px;
            /deep/ .el-input {
              width: 100%;
              height: 100%;
              /deep/ .el-input__inner {
                width: 100%;
                height: 100%;
              }
            }
            /deep/ .el-date-editor--daterange {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              /deep/ .el-icon-date {
                height: auto;
              }
              /deep/ .el-range-separator {
                height: auto;
                width: auto;
              }
            }
          }
          .timeRange_con {
            width: 320px;
          }
          .my_el_btn {
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .check_con {
          width: 100%;
          display: flex;
          align-items: center;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.65);
          line-height: 22px;
          margin-top: 20px;
          .active_num {
            color: #0376fd;
          }
        }
        .table_con {
          width: 100%;
          margin-top: 10px;
          .tab_bom_con {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 25px;
            .tab_bom_lef,
            .tab_bom_rig {
              width: 50%;
              height: 100%;
              .set_info {
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #faad14;
                margin-right: 8px;
              }
              .set_txt {
                color: #0376fd;
              }
              .el-checkbox {
                margin-right: 10px;
              }
              .is-plain {
                width: 76px;
                height: 32px;
                margin-right: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }
            .tab_bom_lef {
              display: flex;
              align-items: center;
            }
            .tab_bom_rig {
              background-color: magenta;
            }
          }
        }
      }
    }
  }
  /deep/ .el-dialog{
    width: 28% !important;
    margin-top: 18% !important;
  }
  /deep/ .el-dialog .el-dialog__body .el-form{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /deep/ .el-dialog .el-dialog__body .el-form .henxian{
    height: 40px;
  }
}
</style>