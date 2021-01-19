<template>
  <div class="sdkApply_container">
    <div class="sdk_apply_title_container">SDK申请</div>
    <div class="sdk_apply_content_container">
      <div class="content_item content_item1">
        <div class="label_left"><span style="color:#FF504E;">*</span>&nbsp;SDK选择</div>
        <div class="input_right">
          <a-checkbox>语音识别Android SDK</a-checkbox>
          <a-checkbox>语音识别iOS SDK</a-checkbox>
          <a-checkbox>在线语音合成Android SDK</a-checkbox>
          <a-checkbox>在线语音合成Android SDK</a-checkbox>
          <a-checkbox>语音识别Linux SDK</a-checkbox>
        </div>
      </div>
      <div class="content_item">
        <div class="label_left"><span style="color:#FF504E;">*</span>&nbsp;版本类型</div>
        <div class="input_right">
          <div class="input_container">
            <a-input placeholder="测试版" />
          </div>
        </div>
      </div>
      <div class="content_item">
        <div class="label_left"><span style="color:#FF504E;">*</span>&nbsp;授权配额</div>
        <div class="input_right">
          <div class="input_container">
            <a-input placeholder="10000次" />
          </div>
        </div>
      </div>
      <div class="content_item">
        <div class="label_left"><span style="color:#FF504E;">*</span>&nbsp;有效期</div>
        <div class="input_right">
          <div class="input_container">
            <a-input placeholder="1个月" />
          </div>
        </div>
      </div>
      <div class="content_item content_item5">
        <div class="label_left"><span style="color:#FF504E;">*</span>&nbsp;应用场景描述</div>
        <div class="input_right">
          <div class="input_container">
            <a-textarea placeholder="请输入应用场景描述" style="width:100%;height:100%;" />
          </div>
        </div>
      </div>
      <div class="content_item">
        <div class="label_left"></div>
        <div class="input_right">
          <div class="input_container btn_container" style="margin-top:35px;">
            <div class="apply_btn">立即申请</div>
            <div class="cancel_btn" @click="cancel">取消</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sdkApply",
  methods:{
    cancel(){
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.sdkApply_container {
  width: 100%;
  height: 100%;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .sdk_apply_title_container {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #676970;
    border-bottom: 2px solid #cfcdcd;
  }
  .sdk_apply_content_container {
    width: 100%;
    flex: 1;
    padding: 41px 54px;
    box-sizing: border-box;
    .content_item {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .label_left {
        width: 130px;
      }
      .input_right {
        flex: 1;
        .input_container {
          width: 360px;
          height: 32px;
        }
        .btn_container {
          display: flex;
          align-items: center;
          .apply_btn,
          .cancel_btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 95px;
            height: 26px;
            border-radius: 2px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            line-height: 20px;
          }
          .apply_btn {
            background: #0376fd;
            color: #ffffff;
            margin-right: 53px;
            &:hover{
              cursor: pointer;
            }
          }
          .cancel_btn {
            background: #e7f3fb;
            color: #0079ff;
            &:hover{
              cursor: pointer;
            }
          }
        }
      }
    }
    .content_item1,
    .content_item5 {
      align-items: flex-start;
      .label_left {
        width: 130px;
      }
      .input_right {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        .input_container {
          width: 360px;
          height: 141px;
        }
      }
    }
  }
}
</style>
