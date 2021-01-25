<template>
  <div class="sdkApply_container">
    <div class="sdk_apply_title_container">SDK申请</div>
    <div class="sdk_apply_content_container">
      <div class="content_item content_item1">
        <div class="label_left">
          <span style="color:#FF504E;">*</span>&nbsp;SDK选择
        </div>
        <div class="input_right">
          <a-checkbox-group :options="sdkChioceList" @change="onChangeSdk" />
        </div>
      </div>
      <!-- <div class="content_item">
        <div class="label_left">
          <span style="color:#FF504E;">*</span>&nbsp;版本类型
        </div>
        <div class="input_right">
          <div class="input_container">
            <a-input placeholder="测试版" />
          </div>
        </div>
      </div>-->
      <div class="content_item">
        <div class="label_left">
          <span style="color:#FF504E;">*</span>&nbsp;授权配额
        </div>
        <div class="input_right">
          <div class="input_container">
            <a-input-number placeholder="10000次" v-model="sqNum" style="width:100%;" />
          </div>
        </div>
      </div>
      <div class="content_item">
        <div class="label_left">
          <span style="color:#FF504E;">*</span>&nbsp;有效期
        </div>
        <div class="input_right">
          <div class="input_container">
            <a-input-number v-model="effTime" placeholder="1个月" style="width:100%;" />
          </div>
        </div>
      </div>
      <div class="content_item content_item5">
        <div class="label_left">
          <span style="color:#FF504E;">*</span>&nbsp;应用场景描述
        </div>
        <div class="input_right">
          <div class="input_container">
            <a-textarea v-model="scenDesc" placeholder="请输入应用场景描述" style="width:100%;height:100%;" />
          </div>
        </div>
      </div>
      <div class="content_item">
        <div class="label_left"></div>
        <div class="input_right">
          <div class="input_container btn_container" style="margin-top:35px;">
            <div class="apply_btn" @click="submitApply">立即申请</div>
            <div class="cancel_btn" @click="cancel">取消</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSdkmodeList, sdkApply } from "../../api/proSer/index";
export default {
  name: "sdkApply",
  data() {
    return {
      sdkChioceList: [],
      hasChicedSdk: null,
      sqNum: null,
      scenDesc: null,
      effTime: null
    };
  },
  created() {
    this.getSdkType();
    this.$message.config({
      top: `450px`,
      duration: 2,
      maxCount: 3
    });
  },
  methods: {
    getSdkType() {
      var sdkTypeParm = {
        serviceModel: this.$route.query.serviceType
      };
      getSdkmodeList(sdkTypeParm)
        .then(res => {
          if (res.code == 200000) {
            var newSdkList = [];
            var sdkTypeData = res.data || [];
            sdkTypeData.forEach(item => {
              newSdkList.push({
                label: item.serviceName,
                value: item.serviceId
              });
            });
            this.sdkChioceList = newSdkList;
          } else {
            this.$message.error("请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
    },
    onChangeSdk(chicArg) {
      this.hasChicedSdk = chicArg;
    },
    cancel() {
      this.$router.go(-1);
    },
    submitApply() {
      if (!this.hasChicedSdk) {
        this.$message.error("SDK选择不能为空！");
        return;
      } else if (!this.sqNum) {
        this.$message.error("授权配额不能为空！");
        return;
      } else if (!this.effTime) {
        this.$message.error("有效期不能为空！");
        return;
      } else if (!this.scenDesc) {
        this.$message.error("应用场景描述不能为空！");
        return;
      } else if (this.effTime > 60) {
        this.$message.error("有效期不能超过60个月！");
        return;
      }
      var sdkApplyParm = {
        serviceList: this.hasChicedSdk,
        effectiveTime: this.effTime,
        authorizationCount: this.sqNum,
        applicationScenarioDescription: this.scenDesc,
        serviceModel: this.$route.query.serviceType
      };
      sdkApply(sdkApplyParm)
        .then(res => {
          if (res.code == 200000) {
            this.$message.success(res.data);
            this.$router.go(-1);
          } else {
            this.$message.error("请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
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
            &:hover {
              cursor: pointer;
            }
          }
          .cancel_btn {
            background: #e7f3fb;
            color: #0079ff;
            &:hover {
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
        /deep/ .ant-checkbox-group {
          /deep/ .ant-checkbox-group-item {
            margin-bottom: 8px;
          }
        }
        .input_container {
          width: 360px;
          height: 141px;
        }
      }
    }
  }
}
</style>
