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
          :model="addressFormData"
          :rules="addressFormRules"
          ref="shipAddressRuleForm"
        >
          <el-form-item label="收件人姓名" prop="recsName">
            <el-input
              v-model="addressFormData.recsName"
              placeholder="请输入收件人姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="选择地区" prop="area">
            <el-cascader
              class="widthSmall"
              style="width: 100%"
              :options="addressOptions"
              v-model="addressFormData.area"
              @change="changeOptions"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="detailAddress">
            <el-input
              v-model="addressFormData.detailAddress"
              placeholder="请输入详细地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="contacNumber">
            <el-input
              v-model="addressFormData.contacNumber"
              placeholder="请输入联系电话"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮政编码" prop="PostCode">
            <el-input
              v-model="addressFormData.PostCode"
              placeholder="请输入邮政编码"
            ></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-checkbox
              label="设置为默认地址"
              v-model="addressFormData.settingAddress"
            ></el-checkbox>
          </el-form-item>
          <el-form-item class="btn_container">
            <el-button @click="closePopWin">取消</el-button>
            <el-button
              type="primary"
              @click="addAddresSubmitForm('shipAddressRuleForm')"
              >确定</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";
import {addPostAddress,updatePostAddress} from "../../api/invoiceMan/index";
export default {
  name: "addShipAddress",
  data() {
    var PostCodevalida = (rule, value, callback) => {
      var ifValb = /^\d{6}$/gi.test(value);
      if (value === "") {
        callback(new Error("邮政编码不能为空!"));
      } else if (!ifValb) {
        callback(new Error("邮政编码必须为6位数字!"));
      } else {
        callback();
      }
    };
    var telNumValida = (rule, value, callback) => {
      var mobile = /^1[0-9]{10}$/,
        phone = /^0\d{2,3}-?\d{7,8}$/;
      var ifValb = mobile.test(value) || phone.test(value);
      if (value === "") {
        callback(new Error("请填写联系电话!"));
      } else if (!ifValb) {
        callback(new Error("请填写正确的联系电话!"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: "top",
      addressFormData: {
        recsName: "",
        area: "",
        detailAddress: "",
        contacNumber: "",
        PostCode: "",
        settingAddress: false,
      },
      addressFormRules: {
        recsName: [
          { required: true, message: "请输入收件人姓名", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "收件人姓名长度为2至50个字符",
            trigger: "blur",
          },
        ],
        area: [{ required: true, message: "请选择", trigger: "change" }],
        detailAddress: [
          { required: true, message: "请填写详细地址", trigger: "blur" },
        ],
        contacNumber: [
          { required: true, message: "请填写联系电话", trigger: "blur",validator: telNumValida },
        ],
        PostCode: [
          { required: true, trigger: "blur", validator: PostCodevalida },
        ],
      },
      title: "",
      addressOptions: [],
    };
  },
  props: ["operParms"],
  created() {
    var propsData = this.operParms;
    var propsFormData = propsData.arg;
    this.title = propsData.title;
    if(propsData.operType == "edit"){
      this.addressFormData = {
        recsName:propsFormData.recsName,
        area:[propsFormData.province,propsFormData.city,propsFormData.district],
        detailAddress:propsFormData.address,
        contacNumber:propsFormData.telNum,
        PostCode:propsFormData.postCode,
        settingAddress:propsFormData.isDefaultFlag == 1 ? true : false
      }
    }
    this.getProvinceData();
  },
  methods: {
    closePopWin() {
      var operObj = {
        bl:false,
        op:'noref'
      };
      this.$emit("closePopWin", operObj);
    },
    getProvinceData() {
      this.addressOptions = regionData;
    },
    addAddresSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var operData = this.operParms;
          var inputData = this.addressFormData;
          console.log(inputData,'inputDatainputDatainputData')
          if(operData.operType == 'add'){
            var parms = {
              addressDetail: inputData.detailAddress,
              city:(inputData.area)[1],
              contactPhone:inputData.contacNumber,
              district:(inputData.area)[2],
              isDefaultFlag:inputData.settingAddress ? 1 : 0,
              postalCode:inputData.PostCode,
              province:(inputData.area)[0],
              recipient:inputData.recsName
            };
            addPostAddress(parms).then(res=>{
              if (res.code == 200000) {
                var operObj = {
                  bl:false,
                  op:'ref'
                };
                this.$emit("closePopWin",operObj);
              } else {
                this.$message.error(res.message || "添加地址失败！");
              }
            }).catch((err) => {
              this.$message.error("添加地址失败！");
            });
          }
          else if(operData.operType == 'edit'){
            var parms = {
              addressDetail: inputData.detailAddress,
              addressId:operData.arg.addressId,
              city:(inputData.area)[1],
              contactPhone:inputData.contacNumber,
              district:(inputData.area)[2],
              isDefaultFlag:inputData.settingAddress ? 1 : 0,
              postalCode:inputData.PostCode,
              province:(inputData.area)[0],
              recipient:inputData.recsName
            };
            updatePostAddress(parms).then(res=>{
              if (res.code == 200000) {
                var operObj = {
                  bl:false,
                  op:'ref'
                };
                this.$emit("closePopWin",operObj);
              } else {
                this.$message.error(res.message || "添加地址失败！");
              }
            }).catch((err) => {
              this.$message.error("添加地址失败！");
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
<style>
.el-cascader__dropdown {
  z-index: 99999 !important;
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
    height: 720px;
    background: #ffffff;
    overflow: hidden;
    overflow-y: auto;
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
      padding: 24px;
      padding-bottom: 30px;
      box-sizing: border-box;
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