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
                v-for="item in options"
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
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      aa: "",
    };
  },
  created() {
    console.log(this.invoiceInfo, "this.invoiceInfo");
  },
  props: {
    invoiceInfo: {
      type: Object,
      default: {},
    },
  },
  methods: {
    closePopWin() {
      this.$emit("closePopWin", false);
    },
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