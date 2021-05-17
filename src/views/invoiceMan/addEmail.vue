<template>
  <div class="addShipAddress_con">
    <div class="white_con">
      <div class="header_con">
        <span>{{ title }}</span>
        <i class="el-icon-close" @click="closePopWin"></i>
      </div>
      <div class="content_con">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="emailFormData"
          ref="addEmailSubmitForm"
          :rules="emailFormRules"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="emailFormData.email"
              placeholder="请输入邮箱地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-checkbox
              label="设置为默认邮箱"
              v-model="emailFormData.settingEmail"
            ></el-checkbox>
          </el-form-item>
          <el-form-item class="btn_container">
            <el-button @click="closePopWin">取消</el-button>
            <el-button
              type="primary"
              @click="addEmailSubmitForm('addEmailSubmitForm')"
              >确定</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { addEmail,updateEmail } from "../../api/invoiceMan/index";
export default {
  name: "addEmail",
  data() {
    var emailValida = (rule, value, callback) => {
      var ifValb = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/gi.test(
        value
      );
      if (value === "") {
        callback(new Error("邮箱地址不能为空!"));
      } else if (!ifValb) {
        callback(new Error("请填写正确的邮箱格式!"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: "top",
      emailFormData: {
        email: "",
        settingEmail: false,
      },
      emailFormRules: {
        email: [{ required: true, trigger: "blur", validator: emailValida }],
      },
      title: "",
    };
  },
  props: ["operParms"],
  created() {
    var propsData = this.operParms;
    var propsFormData = propsData.arg;
    this.title = propsData.title;
    if(propsData.operType == "edit"){
      this.emailFormData = {
        email:propsFormData.emial,
        settingEmail:propsFormData.isDefaultFlag == 1 ? true : false
      }
    }
  },
  methods: {
    closePopWin() {
      var operObj = {
        bl:false,
        op:'noref'
      };
      this.$emit("closePopWin", operObj);
    },
    addEmailSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var operData = this.operParms;
          var inputData = this.emailFormData;
          if (operData.operType == "add") {
            var parms = {
              email: inputData.email,
              isDefaultFlag: inputData.settingEmail ? 1 : 0,
            };
            addEmail(parms)
              .then((res) => {
                if (res.code == 200000) {
                  var operObj = {
                    bl: false,
                    op: "ref",
                  };
                  this.$emit("closePopWin", operObj);
                } else {
                  this.$message.error(res.message || "添加邮箱失败！");
                }
              })
              .catch((err) => {
                this.$message.error("添加邮箱失败！");
              });
          } else if (operData.operType == "edit") {
            var parms = {
              email: inputData.email,
              isDefaultFlag: inputData.settingEmail ? 1 : 0,
              mailId:operData.arg.mailId
            };
            updateEmail(parms)
              .then((res) => {
                if (res.code == 200000) {
                  var operObj = {
                    bl: false,
                    op: "ref",
                  };
                  this.$emit("closePopWin", operObj);
                } else {
                  this.$message.error(res.message || "修改邮箱失败！");
                }
              })
              .catch((err) => {
                this.$message.error("修改邮箱失败！");
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
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
    background: #ffffff;
    box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08),
      0px 9px 4px 0px rgba(0, 0, 0, 0.05),
      0px 12px 48px 16px rgba(0, 0, 0, 0.03);
    border-radius: 2px;
    display: flex;
    flex-direction: column;
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
      flex: 1;
      padding: 24px;
      .el-form {
        .el-form-item {
          margin-bottom: 10 !important;
        }
        /deep/ .btn_container .el-form-item__content {
          float: right;
        }
      }
    }
  }
}
</style>