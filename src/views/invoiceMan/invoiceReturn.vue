<template>
  <div class="addShipAddress_con">
    <div class="white_con">
      <div class="header_con">
        <span>发票退票</span>
        <i class="el-icon-close" @click="closePopWin"></i>
      </div>
      <div class="content_con">
        <el-form
          :model="invoiceReturnResForm"
          :rules="invoiceReturnRules"
          ref="invoiceReturnResForm"
          label-width="100px"
          class="demo-invoiceReturnResForm"
        >
          <el-form-item label="退票原因：" prop="reson">
            <el-select
              v-model="invoiceReturnResForm.reson"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in returnResOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注：" prop="remarks">
            <el-input
              type="textarea"
              v-model="invoiceReturnResForm.remarks"
            ></el-input>
          </el-form-item>
          <el-form-item class="btn_con">
            <el-button @click="closePopWin">关闭</el-button>
            <el-button type="primary" @click="submitForm('invoiceReturnResForm')"
              >确定</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {operateInvoice} from "../../api/invoiceMan/index";
export default {
  name: "invoiceReturn",
  data() {
    return {
      invoiceReturnResForm: {
        reson: "",
        remarks: "",
      },
      invoiceReturnRules: {
        reson: [{ required: true, message: "退票原因", trigger: "change" }],
        remarks: [{ required: true, message: "请输入备注", trigger: "blur" }],
      },
      returnResOptions: [
        {
          value: "1",
          label: "发票信息错误",
        },
        {
          value: "2",
          label: "发票类型错误",
        },
        {
          value: "3",
          label: "退款",
        }
      ],
      aa: "",
    };
  },
  created() {

  },
  props: {
    invoiceInfo: {
      type: Object,
      default: {},
    },
  },
  methods: {
    closePopWin() {
      var operArg = {
          operParm:false,
          refreshParm:'noRefresh'
      };
      this.$emit("closePopWin", operArg);
    },
    submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
              var parms = this.invoiceReturnResForm;
              var invoiceInfo = this.invoiceInfo;
              var operParms = {
                  addressDetail:'',
                  contactPhone:'',
                  invoiceId:invoiceInfo.invoiceId || '',
                  invoiceStatus:7,
                  recipient:'',
                  refundType:parms.reson,
                  trackingNumber:'',
                  remark:parms.remarks
              };
              operateInvoice(operParms).then(res=>{
                  if(res.code == 200000){
                    var operArg = {
                        operParm:false,
                        refreshParm:'refresh'
                    };
                    this.$emit("closePopWin",operArg);
                  }
                  else{
                      this.$message.error('退票失败！')
                   }
              }).catch(err=>{
                   this.$message.error('退票失败！')
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    }
  },
};
</script>
<style>
.el-select-dropdown {
  z-index: 10000 !important;
}
</style>
<style lang="scss" scoped>
.addShipAddress_con {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(18, 28, 51, 0.6);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  .white_con {
    width: 26%;
    min-height: 190px;
    background: #ffffff;
    box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08),
      0px 9px 4px 0px rgba(0, 0, 0, 0.05),
      0px 12px 48px 16px rgba(0, 0, 0, 0.03);
    border-radius: 2px;
    .header_con {
      width: 100%;
      height: 56px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.09);
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
      }
      .el-icon-close {
        color: rgba(0, 0, 0, 0.35);
        &:hover {
          cursor: pointer;
        }
      }
    }
    .content_con {
      width: 100%;
      height: 180px;
      padding: 24px;
      box-sizing: border-box;
      .el-form {
        .el-form-item {
          margin-bottom: 10 !important;
        }
        .btn_con{
            float: right;
        }
      }
    }
  }
}
</style>