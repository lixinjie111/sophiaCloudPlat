<template>
  <div class="invoiceInfoMan_con">
    <div class="invoice_info">
      发票信息有效 &nbsp;<span @click="editInvoiceInfo">修改发票信息</span>
    </div>
    <div class="invoice_con">
      <div class="person" v-if="IssuType === 'personal'">
        <el-form
          :model="personalRuleForm"
          label-width="140px"
          class="personalRuleForm"
        >
          <el-form-item label="发票抬头：">
            <el-input
              v-model="personalRuleForm.personalInvoiveTitle"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="开具类型：">
            <el-input
              v-model="personalRuleForm.personalInvokjType"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="发票类型：">
            <el-input
              v-model="personalRuleForm.personalInvoiceType"
              disabled
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="company" v-if="IssuType === 'company'">
        <el-form
          :model="qiyeInvInfo"
          label-width="140px"
          class="personalRuleForm"
        >
          <el-form-item label="发票抬头：">
            <el-input v-model="qiyeInvInfo.invoiveTitle" disabled></el-input>
          </el-form-item>
          <el-form-item label="开具类型：">
            <el-input v-model="qiyeInvInfo.invoivekjType" disabled></el-input>
          </el-form-item>
          <el-form-item label="发票类型：">
            <el-input v-model="qiyeInvInfo.invoiveType" disabled></el-input>
          </el-form-item>
          <el-form-item label="纳税人识别号：">
            <el-input v-model="qiyeInvInfo.TaIdeNum" disabled></el-input>
          </el-form-item>
          <el-form-item label="开户银行名称：">
            <el-input v-model="qiyeInvInfo.khBankName" disabled></el-input>
          </el-form-item>
          <el-form-item label="开户账号：">
            <el-input v-model="qiyeInvInfo.khBankNumber" disabled></el-input>
          </el-form-item>
          <el-form-item label="注册场所地址：">
            <el-input v-model="qiyeInvInfo.regAdderss" disabled></el-input>
          </el-form-item>
          <el-form-item label="注册固定电话：">
            <el-input v-model="qiyeInvInfo.regFixtelnum" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { queryInvoiceBase } from "../../api/invoiceMan/index";
export default {
  name: "invoInfoShow",
  data() {
    return {
      personalRuleForm: {
        personalInvoiveTitle: "个人",
        personalInvokjType: "个人",
        personalInvoiceType: "增值税普通发票",
      },
      qiyeInvInfo: {
        invoiveTitle: "上海元知晟睿科技研究有限公司北京分公司",
        invoivekjType: "企业",
        invoiveType: "企业增值税普通发票",
        TaIdeNum: "上海元知晟睿科技研究有限公司北京分公司",
        khBankName: "91110101MA01QT236E",
        khBankNumber: "",
        regAdderss: "",
        regFixtelnum: "",
      },
      IssuType: "company",
      InvoiceData: {},
    };
  },
  mounted() {
    this.getInvoiceMsg();
  },
  methods: {
    editInvoiceInfo() {
      var operData = {
        opt:false,
        invoData:this.InvoiceData,
        hasD:true
      };
      this.$emit("showEditPanel", operData);
    },
    getInvoiceMsg() {
      var parms = {
        invoiceDetailId: "",
      };
      queryInvoiceBase(parms)
        .then((res) => {
          if (res.code == 200000) {
            var InvoiceMsgObj = res.data || {};
            this.InvoiceData = InvoiceMsgObj;
            if (InvoiceMsgObj.issueType == 1) {
              this.IssuType = "company";
              var typeTxt = "";
              if (InvoiceMsgObj.invoiceType == 0) {
                typeTxt = "增值税普通发票";
              } else if (InvoiceMsgObj.invoiceType == 1) {
                typeTxt = "增值税专用发票";
              } else if (InvoiceMsgObj.invoiceType == 2) {
                typeTxt = "组织（非企业）增值税普通发票";
              } else {
                typeTxt = "";
              }
              this.qiyeInvInfo = {
                invoiveTitle: InvoiceMsgObj.title,
                invoivekjType: "企业",
                invoiveType: typeTxt,
                TaIdeNum: InvoiceMsgObj.taxpayerNumber,
                khBankName: InvoiceMsgObj.bankName,
                khBankNumber: InvoiceMsgObj.bankNumber,
                regAdderss: InvoiceMsgObj.companyAddress,
                regFixtelnum: InvoiceMsgObj.companyPhone,
                invoiceDetailId:InvoiceMsgObj.invoiceDetailId
              };
            } else {
              this.IssuType = "personal";
              var typeTxt = "";
              if (InvoiceMsgObj.invoiceType == 0) {
                typeTxt = "增值税普通发票";
              } else if (InvoiceMsgObj.invoiceType == 1) {
                typeTxt = "增值税专用发票";
              } else if (InvoiceMsgObj.invoiceType == 2) {
                typeTxt = "组织（非企业）增值税普通发票";
              } else {
                typeTxt = "";
              }
              this.personalRuleForm = {
                personalInvoiveTitle: InvoiceMsgObj.title,
                personalInvokjType: "个人",
                personalInvoiceType: typeTxt,
                invoiceDetailId:InvoiceMsgObj.invoiceDetailId
              };
            }
          } else {
            this.$message.error(res.message || "请求发票列表数据失败！");
          }
        })
        .catch((err) => {
          this.$message.error("请求发票基本信息数据失败！");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.invoiceInfoMan_con {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .invoice_info {
    width: 100%;
    height: 32px;
    background-color: rgba(255, 251, 230, 0.6);
    padding-left: 40px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
    line-height: 24px;
    span {
      color: #0376fd;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .invoice_con {
    width: 70%;
    min-height: 470px;
    margin-top: 23px;
    .person,
    .company {
      width: 35%;
      /deep/
        .personalRuleForm
        .el-form-item
        .el-form-item__content
        .el-input
        .el-input__inner {
        border: none;
        background-color: inherit;
        color: #121c33;
      }
      /deep/ .personalRuleForm .el-form-item .el-form-item__label {
        color: #121c33;
      }
      /deep/ .personalRuleForm .el-form-item .el-form-item__content {
        display: flex;
        align-items: center;
      }
    }
    .company {
      width: 100%;
    }
  }
}
</style>