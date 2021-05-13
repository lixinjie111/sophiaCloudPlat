<template>
  <div class="addShipAddress_con">
    <div class="white_con">
      <div class="header_con">
        <span>{{title}}</span>
        <i class="el-icon-close" @click="closePopWin"></i>
      </div>
      <div class="content_con">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="addressFormData"
          :rules="addressFormRules"
        >
          <el-form-item label="收件人姓名" prop="recsName">
            <el-input
              v-model="addressFormData.recsName"
              placeholder="请输入收件人姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="选择地区" prop="area">
            <el-input
              v-model="addressFormData.area"
              placeholder="请选择"
            ></el-input>
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
        </el-form>
      </div>
      <div class="footer_con">
        <el-button @click="closePopWin">取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "addShipAddress",
  data() {
     var PostCodevalida = (rule, value, callback) => {
      var ifValb = /^\d{6}$/gi.test(
        value
      );
      if (value === "") {
        callback(new Error("邮政编码不能为空!"));
      } else if (!ifValb) {
        callback(new Error("邮政编码必须为6位数字!"));
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
        settingAddress:false
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
          { required: true, message: "请填写联系电话", trigger: "blur" },
        ],
        PostCode: [
          { required: true,trigger: "blur",validator: PostCodevalida },
        ],
      },
      title:''
    };
  },
  props:['operParms'],
  created() {
    var propsData = this.operParms;
    this.title = propsData.title;
  },
  methods: {
    closePopWin() {
      this.$emit("closePopWin", false);
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
      height: 636px;
      padding: 24px;
      box-sizing: border-box;
      .el-form {
        .el-form-item {
          margin-bottom: 10 !important;
        }
      }
    }
    .footer_con {
      width: 100%;
      height: 80px;
      border-top: 1px solid rgba(0, 0, 0, 0.09);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 24px;
      box-sizing: border-box;
    }
  }
}
</style>