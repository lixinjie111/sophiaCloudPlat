<template>
  <div class="authPop_container">
    <div class="authPop_content_container">
      <div class="auth_pop_title_container">
        <div class="auth_pop_title">应用授权</div>
        <div class="auth_pop_close_icon" @click="closePop">
          <a-icon type="close" :style="{ fontSize: '17px'}" />
        </div>
      </div>
      <div class="auth_pop_content">
        <div class="auth_content">
          <div class="label_title_container">
            <div class="label">应用名称</div>
            <div class="label">APP ID</div>
            <div class="label">应用包名</div>
            <div class="label">应用平台</div>
            <div class="label">分配授权</div>
          </div>
          <div class="input_container">
            <div class="input_cls">
              <a-select default-value="lucy" style="width:100%" @change="handleChange">
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="disabled" disabled>Disabled</a-select-option>
                <a-select-option value="Yiminghe">yiminghe</a-select-option>
              </a-select>
            </div>
            <div class="input_cls">
              <a-input placeholder="请输入APP ID" />
            </div>
            <div class="input_cls">
              <a-input placeholder="请输入应用包名" />
            </div>
            <div class="input_cls">
              <a-input placeholder="请输入应用平台" />
            </div>
            <div class="input_cls auth_num">
              <div class="top_input">
                <div class="input_cls1"> <a-input /></div>
                <div class="input_text">个</div>
              </div>
              <div class="bottom_desc">剩余可分配数量：10000</div>
            </div>
          </div>
        </div>
        <div class="auth_btn_container">
          <div class="btn_container">
            <div class="btn1" @click="authApp">授权应用</div>
            <div class="btn2" @click="cancel">取消</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closePop() {
      this.$emit("closeMe", false);
    },
    cancel() {
      this.closePop();
    },
    authApp() {
      this.closePop();
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.authPop_container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(50, 50, 50, 0.6);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  .authPop_content_container {
    width: 591px;
    height: 491px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    .auth_pop_title_container {
      width: 100%;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 27px;
      box-sizing: border-box;
      border-bottom: 1px solid #cfcdcd;
      .auth_pop_title {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #676970;
        line-height: 20px;
      }
    }
    .auth_pop_content {
      width: 100%;
      flex: 1;
      padding: 36px 50px 44px 50px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .auth_content {
        flex: 1;
        display: flex;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        .label_title_container {
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .label {
            width: 100%;
            height: 32px;
            text-align: left;
            display: flex;
            align-items: center;
            margin-bottom: 20px;
          }
        }
        .input_container {
          width: 360px;
          height: 100%;
          .input_cls {
            width: 100%;
            height: 32px;
            margin-bottom: 20px;
          }
          .auth_num {
            width: 160px;
            min-height: 32px;
            .top_input {
              width: 100%;
              height: 32px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .input_cls1 {
                height: 100%;
                width: 109px;
                margin-right: 39px;
              }
              .input_text {
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #676970;
                line-height: 17px;
              }
            }
            .bottom_desc {
              margin-top: 7px;
              font-size: 10px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #c7c7c8;
              line-height: 14px;
            }
          }
        }
      }
      .auth_btn_container {
        margin-top: 71px;
        width: 100%;
        height: 26px;
        display: flex;
        justify-content: center;
        .btn_container {
          height: 100%;
          width: 243px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .btn1,
          .btn2 {
            height: 100%;
            width: 95px;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover {
              cursor: pointer;
            }
          }
          .btn1 {
            background: #0376fd;
            border-radius: 2px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
          }
          .btn2 {
            background: #e7f3fb;
            border-radius: 2px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #0376fd;
          }
        }
      }
    }
  }
}
</style>
