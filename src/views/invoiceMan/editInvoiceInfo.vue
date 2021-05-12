<template>
  <div class="invoiceInfoMan_con">
    <div class="invoice_info">您的发票信息未完善，请先完善</div>
    <div class="invoice_con">
      <el-form
        :model="IssuingTypeRuleForm"
        label-width="140px"
        :rules="IssuingTypeRules"
        class="demo-ruleForm"
      >
        <el-form-item label="开具类型：" prop="IssuingType">
          <el-radio-group
            v-model="IssuingTypeRuleForm.IssuingType"
            @change="changeIssuType"
          >
            <el-radio label="0">个人</el-radio>
            <el-radio label="1">企业</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="person" v-if="IssuType === 'personal'">
        <el-form
          :model="personalRuleForm"
          ref="personalRuleForm"
          label-width="140px"
          class="personalRuleForm"
        >
          <el-form-item label="发票抬头：" prop="personalInvoiveTitle">
            <el-input
              v-model="personalRuleForm.personalInvoiveTitle"
              placeholder="个人"
            ></el-input>
          </el-form-item>
          <el-form-item label="发票类型：" prop="personalInvoiceType">
            <el-input
              v-model="personalRuleForm.personalInvoiceType"
              placeholder="增值税普通发票"
            ></el-input>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                增值税普通发票开给小规模纳税人或者开票资料不齐全的购买人，购买人取得后不<br />可以进行项税额抵扣。若您还有疑问，建议联系贵司财务确认后在提交开票需求。
              </div>
              <a-icon type="question-circle" />
            </el-tooltip>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="personSubmitForm('personalRuleForm')"
              >保存发票信息</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="company" v-if="IssuType === 'company'">
        <el-form
          :model="invoiveTitleRulePutongForm"
          :rules="invoiveTitlePutongRules"
          label-width="140px"
          class="demo-ruleForm"
          v-if="invoiceTypeRuleForm.invoiceType == '0'"
        >
          <el-form-item label="发票抬头：" prop="invoiveZzputongTitle">
            <el-input
              v-model="invoiveTitleRulePutongForm.invoiveZzputongTitle"
              placeholder="请输入发票抬头"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-form
          :model="invoiveTitleRuleZhuanyongForm"
          :rules="invoiveTitleZhuanyongRules"
          label-width="140px"
          class="demo-ruleForm"
          v-else-if="invoiceTypeRuleForm.invoiceType == '1'"
        >
          <el-form-item label="发票抬头：" prop="invoiveZhuanyongTitle">
            <el-input
              v-model="invoiveTitleRuleZhuanyongForm.invoiveZhuanyongTitle"
              placeholder="请输入发票抬头"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-form
          :model="invoiveTitleRulezuzhiForm"
          :rules="invoiveTitlezuzhiRules"
          label-width="140px"
          class="demo-ruleForm"
          v-else
        >
          <el-form-item label="发票抬头：" prop="invoivezuzhiTitle">
            <el-input
              v-model="invoiveTitleRulezuzhiForm.invoivezuzhiTitle"
              placeholder="请输入发票抬头"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-form
          :model="invoiceTypeRuleForm"
          :rules="invoiceTypeRules"
          label-width="140px"
          class="demo-ruleForm"
        >
          <el-form-item label="发票类型：" prop="invoiceType">
            <el-radio-group v-model="invoiceTypeRuleForm.invoiceType">
              <el-radio label="0">
                增值税普通发票
                <el-tooltip class="item" effect="dark" placement="top">
                  <div slot="content">
                    增值税普通发票开给小规模纳税人或者开票资料不齐全的购买人，购买人取得后不<br />可以进行项税额抵扣。若您还有疑问，建议联系贵司财务确认后在提交开票需求。
                  </div>
                  <a-icon type="question-circle" /> </el-tooltip
              ></el-radio>
              <el-radio label="1">
                增值税专用发票
                <el-tooltip class="item" effect="dark" placement="top">
                  <div slot="content">
                    增值税专用发票开给一般纳税人，申请时需要提供公司名称、税号、地址电话、开<br />户行名称及账号，一般纳税人批复，购买人取得后可以进行进项税额抵扣。增值税<br />专用发票只能开具纸质发票。若您还有疑问，建议联系贵司财务确认后在提交开票<br />需求。
                  </div>
                  <a-icon type="question-circle" />
                </el-tooltip>
              </el-radio>
              <el-radio label="2">
                组织（非企业）增值税普通发票
                <el-tooltip class="item" effect="dark" placement="top">
                  <div slot="content">
                    其他组织（如政府、公共事业、非盈利机构等），无税号
                  </div>
                  <a-icon type="question-circle" />
                </el-tooltip>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>

        <el-form
          :model="zzputongConRuleForm"
          :rules="zzputongConRules"
          label-width="140px"
          class="demo-ruleForm"
          v-if="invoiceTypeRuleForm.invoiceType =='0'"
        >
          <el-form-item label="纳税人识别号：" prop="zzputongTaIdeNu">
            <el-input
              v-model="zzputongConRuleForm.zzputongTaIdeNu"
              placeholder="请输入纳税人识别号"
            ></el-input>
            <p>
              请与贵公司财务人员核实后，仔细填写准确的三证合一后的社会统一信用代码或税务登记证号，否则将影响后续发票的正常使用
            </p>
          </el-form-item>
          <el-form-item label="开户银行名称：" prop="zzputongBankName">
            <el-input
              v-model="zzputongConRuleForm.zzputongBankName"
              placeholder="请输入开户银行名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="开户账号：">
            <el-input
              v-model="zzputongConRuleForm.zzputongBankNumber"
              placeholder="请输入开户账号"
            ></el-input>
          </el-form-item>
          <el-form-item label="注册场所地址：">
            <el-input
              v-model="zzputongConRuleForm.zzputongRegAdderss"
              placeholder="请输入地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="注册固定电话：">
            <el-input
              v-model="zzputongConRuleForm.zzputongRegFixtel"
              placeholder="请输入电话"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="zzputongsubmitForm()"
              >保存发票信息</el-button
            >
          </el-form-item>
        </el-form>

        <el-form
          :model="zzzhuanyongConRuleForm"
          :rules="zzzhuanyongConRules"
          label-width="140px"
          class="demo-ruleForm"
          v-else-if="invoiceTypeRuleForm.invoiceType =='1'"
        >
          <el-form-item label="纳税人识别号：" prop="zzzhuanyongTaIdeNu">
            <el-input
              v-model="zzzhuanyongConRuleForm.zzzhuanyongTaIdeNu"
              placeholder="请输入纳税人识别号"
            ></el-input>
            <p>
              请与贵公司财务人员核实后，仔细填写准确的三证合一后的社会统一信用代码或税务登记证号，否则将影响后续发票的正常使用
            </p>
          </el-form-item>
          <el-form-item label="开户银行名称：" prop="zzzhuanyongBankName">
            <el-input
              v-model="zzzhuanyongConRuleForm.zzzhuanyongBankName"
              placeholder="请输入开户银行名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="开户账号：" prop="zzzhuanyongBankNumber">
            <el-input
              v-model="zzzhuanyongConRuleForm.zzzhuanyongBankNumber"
              placeholder="请输入开户账号"
            ></el-input>
          </el-form-item>
          <el-form-item label="注册场所地址：" prop="zzzhuanyongRegAdderss">
            <el-input
              v-model="zzzhuanyongConRuleForm.zzzhuanyongRegAdderss"
              placeholder="请输入地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="注册固定电话：" prop="zzzhuanyongRegFixtel">
            <el-input
              v-model="zzzhuanyongConRuleForm.zzzhuanyongRegFixtel"
              placeholder="请输入电话"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="zzzhuanyongsubmitForm()"
              >保存发票信息</el-button
            >
          </el-form-item>
        </el-form>

        <el-form
          :model="zuzhizzConRuleForm"
          :rules="zuzhizzConRules"
          label-width="140px"
          class="demo-ruleForm"
          v-else
        >
          <el-form-item label="纳税人识别号：" prop="zuzhizzTaIdeNu">
            <el-input
              v-model="zuzhizzConRuleForm.zuzhizzTaIdeNu"
              placeholder="请输入纳税人识别号"
            ></el-input>
            <p>
              请与贵公司财务人员核实后，仔细填写准确的三证合一后的社会统一信用代码或税务登记证号，否则将影响后续发票的正常使用
            </p>
          </el-form-item>
          <el-form-item label="开户银行名称：" prop="zuzhizzBankName">
            <el-input
              v-model="zuzhizzConRuleForm.zuzhizzBankName"
              placeholder="请输入开户银行名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="开户账号：" prop="zuzhizzBankNumber">
            <el-input
              v-model="zuzhizzConRuleForm.zuzhizzBankNumber"
              placeholder="请输入开户账号"
            ></el-input>
          </el-form-item>
          <el-form-item label="注册场所地址：" prop="zuzhizzRegAdderss">
            <el-input
              v-model="zuzhizzConRuleForm.zuzhizzRegAdderss"
              placeholder="请输入地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="注册固定电话：" prop="zuzhizzRegFixtel">
            <el-input
              v-model="zuzhizzConRuleForm.zuzhizzRegFixtel"
              placeholder="请输入电话"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="zuzhizzsubmitForm()"
              >保存发票信息</el-button
            >
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script>
import {editInvoiceBase} from "../../api/invoiceMan/index";
export default {
  name: "invoiceInfoMan",
  data() {
    var taIdeNuvalida = (rule, value, callback) => {
      var ifValb = /^((?![^A-z]+$)(?!\D+$)[A-z\d]{15}|(?![^A-z]+$)(?!\D+$)[A-z\d]{18}|(?![^A-z]+$)(?!\D+$)[A-z\d]{20})$/gi.test(
        value
      );
      if (value === "") {
        callback(new Error("非个人发票纳税人识别号不能为空!"));
      } else if (!ifValb) {
        callback(new Error("纳税人识别号由字母和数字组成，长度为15、18或20"));
      } else {
        callback();
      }
    };
    return {
      IssuingTypeRuleForm: {
        IssuingType: "1",
      },
      personalRuleForm: {
        personalInvoiveTitle: "个人",
        personalInvoiceType: "增值税普通发票",
      },
      invoiveTitleRulePutongForm: {
        invoiveZzputongTitle: "",
      },
      invoiveTitleRuleZhuanyongForm: {
        invoiveZhuanyongTitle: "",
      },
      invoiveTitleRulezuzhiForm: {
        invoivezuzhiTitle: "",
      },
      invoiceTypeRuleForm: {
        invoiceType: "0",
      },
      IssuingTypeRules: {
        IssuingType: [{ required: true }],
      },
      invoiveTitlePutongRules: {
        invoiveZzputongTitle: [
          { required: true, message: "请输入发票抬头", trigger: "blur" },
        ],
      },
      invoiveTitleZhuanyongRules: {
        invoiveZhuanyongTitle: [
          { required: true, message: "请输入发票抬头", trigger: "blur" },
        ],
      },
      invoiveTitlezuzhiRules: {
        invoivezuzhiTitle: [
          { required: true, message: "请输入发票抬头", trigger: "blur" },
        ],
      },
      invoiceTypeRules: {
        invoiceType: [
          { required: true, message: "选择发票类型", trigger: "blur" },
        ],
      },
      zzputongConRuleForm: {
        zzputongTaIdeNu: "",
        zzputongBankName: "",
        zzputongBankNumber: "",
        zzputongRegAdderss: "",
        zzputongRegFixtel: "",
      },
      zzzhuanyongConRuleForm:{
        zzzhuanyongTaIdeNu:'',
        zzzhuanyongBankName:'',
        zzzhuanyongBankNumber:'',
        zzzhuanyongRegAdderss:'',
        zzzhuanyongRegFixtel:''
      },
      zuzhizzConRuleForm:{
        zuzhizzTaIdeNu:'',
        zuzhizzBankName:'',
        zuzhizzBankNumber:'',
        zuzhizzRegAdderss:'',
        zuzhizzRegFixtel:''
      },
      zuzhizzConRules:{
        zuzhizzTaIdeNu: [
          {trigger: "blur", validator: taIdeNuvalida },
        ]
      },
      zzzhuanyongConRules:{
        zzzhuanyongTaIdeNu: [
          { required: true, trigger: "blur", validator: taIdeNuvalida },
        ],
        zzzhuanyongBankName:[
          {required: true, message: '请输入开户银行名称', trigger: 'blur'}
        ],
        zzzhuanyongBankNumber:[
          {required: true, message: '请输入开户账号', trigger: 'blur'}
        ],
        zzzhuanyongRegAdderss:[
          {required: true, message: '请输入地址', trigger: 'blur'}
        ],
        zzzhuanyongRegFixtel:[
          {required: true, message: '请输入电话', trigger: 'blur'}
        ]
      },
      zzputongConRules: {
        zzputongTaIdeNu: [
          { required: true, trigger: "blur", validator: taIdeNuvalida },
        ],
      },
      zzputongInfo:
        "增值税普通发票开给小规模纳税人或者开票资料不齐全的购买人，购买人取得后不\n可以进行项税额抵扣。若您还有疑问，建议联系贵司财务确认后在提交开票需求。",
      IssuType: "company",
    };
  },
  created() {
    console.log(this.invoiceDetailIdInfo,'invoiceDetailIdInfo')
  },
  props:['invoiceDetailIdInfo'],
  methods: {
    zzputongsubmitForm() {
      alert('ssssss')
      var parms={
        issueType:this.IssuingTypeRuleForm.IssuingType,
        title:this.invoiveTitleRulePutongForm.invoiveZzputongTitle,
        invoiceType:this.invoiceTypeRuleForm.invoiceType,
        taxpayerNumber:this.zzputongConRuleForm.zzputongTaIdeNu,
        bankName:this.zzputongConRuleForm.zzputongBankName,
        bankNumber:this.zzputongConRuleForm.zzputongBankNumber,
        companyAddress:this.zzputongConRuleForm.zzputongRegAdderss,
        companyPhone:this.zzputongConRuleForm.zzputongRegFixtel,
        invoiceDetailId:this.invoiceDetailIdInfo
      };
      editInvoiceBase(parms).then(res=>{
        console.log(res)
        if(res.code == 200000){

        }
        else{
          this.$message.error(res.message || "修改发票信息失败！");
        }
      }).catch(err=>{
         this.$message.error("修改发票信息失败！");
      });
    },
    zzzhuanyongsubmitForm(){
        alert('ssssss1')
      var parms={
        issueType:this.IssuingTypeRuleForm.IssuingType,
        title:this.invoiveTitleRuleZhuanyongForm.invoiveZhuanyongTitle,
        invoiceType:this.invoiceTypeRuleForm.invoiceType,
        taxpayerNumber:this.zzzhuanyongConRuleForm.zzzhuanyongTaIdeNu,
        bankName:this.zzzhuanyongConRuleForm.zzzhuanyongBankName,
        bankNumber:this.zzzhuanyongConRuleForm.zzzhuanyongBankNumber,
        companyAddress:this.zzzhuanyongConRuleForm.zzzhuanyongRegAdderss,
        companyPhone:this.zzzhuanyongConRuleForm.zzzhuanyongRegFixtel,
        invoiceDetailId:this.invoiceDetailIdInfo
      };
      editInvoiceBase(parms).then(res=>{
        console.log(res)
        if(res.code == 200000){

        }
        else{
          this.$message.error(res.message || "修改发票信息失败！");
        }
      }).catch(err=>{
         this.$message.error("修改发票信息失败！");
      });
    },
    zuzhizzsubmitForm(){
        alert('ssssss2')
      var parms={
        issueType:this.IssuingTypeRuleForm.IssuingType,
        title:this.invoiveTitleRulezuzhiForm.invoiveZzputongTitle,
        invoiceType:this.invoiceTypeRuleForm.invoiceType,
        taxpayerNumber:this.zuzhizzConRuleForm.zuzhizzTaIdeNu,
        bankName:this.zuzhizzConRuleForm.zuzhizzBankName,
        bankNumber:this.zuzhizzConRuleForm.zuzhizzBankNumber,
        companyAddress:this.zuzhizzConRuleForm.zuzhizzRegAdderss,
        companyPhone:this.zuzhizzConRuleForm.zuzhizzRegFixtel,
        invoiceDetailId:this.invoiceDetailIdInfo
      };
      editInvoiceBase(parms).then(res=>{
        console.log(res)
        if(res.code == 200000){

        }
        else{
          this.$message.error(res.message || "修改发票信息失败！");
        }
      }).catch(err=>{
         this.$message.error("修改发票信息失败！");
      });
    },
    personSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeIssuType(e) {
      this.IssuType = e;
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
  }
  .invoice_con {
    width: 70%;
    min-height: 470px;
    margin-top: 23px;
    /deep/ .el-form .el-form-item__content p {
      font-size: 10px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #121c33;
    }
    .person {
      width: 35%;
      /deep/
        .personalRuleForm
        .el-form-item
        .el-form-item__content
        .el-input
        .el-input__inner {
        border: none;
        background-color: inherit;
      }
      /deep/
        .personalRuleForm
        .el-form-item
        .el-form-item__content
        .el-input
        {
          width: 100px;
        }
      /deep/ .personalRuleForm .el-form-item .el-form-item__content {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>