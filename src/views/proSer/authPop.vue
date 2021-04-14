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
            <div class="label">
              <span style="color:#FF504E;">*</span>&nbsp;SDK名称
            </div>
            <div class="label">
              <span style="color:#FF504E;">*</span>&nbsp;应用名称
            </div>
            <div class="label">
              <span style="color:#FF504E;"></span>&nbsp;&nbsp;APP ID
            </div>
            <div class="label">
              <span style="color:#FF504E;"></span>&nbsp;&nbsp;应用包名
            </div>
            <div class="label">
              <span style="color:#FF504E;"></span>&nbsp;&nbsp;应用平台
            </div>
            <div class="label">
              <span style="color:#FF504E;">*</span>&nbsp;分配授权
            </div>
          </div>
          <div class="input_container">
            <div class="input_cls">
              <a-select
                :disabled="ifdisSdkNam"
                style="width:100%"
                @change="handleSdkChange"
                v-model="sdkNameVal"
              >
                <a-select-option
                  v-for="(item) in sdkNameList"
                  :key="item.serviceId"
                  :value="item.serviceId"
                >{{item.serviceName}}</a-select-option>
              </a-select>
            </div>
            <div class="input_cls">
              <a-select
                style="width:100%"
                :disabled="ifDisAppNam"
                @change="handleAppListChange"
                v-model="appNameVal"
              >
                <a-select-option
                  v-for="(item) in appNameList"
                  :key="item.id"
                  :value="item.appId"
                >{{item.appName}}</a-select-option>
              </a-select>
            </div>
            <div class="input_cls">
              <a-input v-model="appId" :disabled="true" />
            </div>
            <div class="input_cls">
              <a-input v-model="appPackName" :disabled="true" />
            </div>
            <div class="input_cls">
              <a-input v-model="apPlat" :disabled="true" />
            </div>
            <div class="input_cls auth_num">
              <div class="top_input">
                <div class="input_cls1">
                  <a-input v-model="sqNum" :disabled="ifDisSq" />
                </div>
                <div class="input_text">个</div>
              </div>
              <div class="bottom_desc">剩余可分配数量：{{shengyuNum}}</div>
            </div>
          </div>
        </div>
        <div class="auth_btn_container">
          <div class="btn_container" v-if="ifShowOptioBtn">
            <div class="btn1" @click="authApp">授权应用</div>
            <div class="btn2" @click="cancel">取消</div>
          </div>
          <a-button type="primary" v-else size="large" @click="closePopWin">确定</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAppList, getSdkNameList, sdkAuth } from "../../api/proSer/index";
export default {
  name: "authPop",
  data() {
    return {
      sdkNameList: [{}],
      appNameList: [{}],
      appId: "",
      appName: "",
      appPackName: "",
      apPlat: "",
      sqNum: 0,
      serviceId: "",
      sdkNameVal: "",
      appNameVal: "",
      ifdisSdkNam: false,
      ifDisAppNam: false,
      ifDisSq: false,
      ifShowOptioBtn: true,
      shengyuNum:0
    };
  },
  props: ["serviceModel", "sqDetail"],
  created() {
    this.$message.config({
      top: `450px`,
      duration: 2,
      maxCount: 3
    });
    this.getPageData();
  },
  methods: {
    closePop() {
      this.$emit("closeMe", false);
    },
    cancel() {
      this.closePop();
    },
    closePopWin() {
      this.closePop();
    },
    authApp() {
      if (!this.serviceId) {
        this.$message.error("SDK名称不能为空！");
        return;
      } else if (!this.appName) {
        this.$message.error("应用名称不能为空！");
        return;
      } else if (!this.sqNum) {
        this.$message.error("分配授权不能为空！");
        return;
      }
      var authParms = {
        appId: this.appId,
        appName: this.appName,
        serviceId: this.serviceId,
        serviceModel: this.serviceModel,
        assignAuthorizationCount: this.sqNum
      };
      sdkAuth(authParms)
        .then(res => {
          if (res.code == 200000) {
            this.$message.success("授权成功！");
            this.closePop();
          } else {
             this.$message.error(res.message || "请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
    },
    handleSdkChange(value) {
      this.serviceId = value;
      var sokInfoList = this.sdkNameList || [];
      for(var i=0;i<sokInfoList.length;i++){
        if(sokInfoList[i].serviceId == value){
          this.shengyuNum = sokInfoList[i].surplus;
        }
      }
      console.log(`selected ${value}`,sokInfoList);
    },
    handleAppListChange(value) {
      var appNameDataList = this.appNameList || [];
      appNameDataList.forEach(item => {
        if (item.appId == value) {
          this.appId = value;
          this.appName = item.appName;
          if (item.packageAndroid) {
            this.appPackName = item.packageAndroid;
          } else if (item.packageIos) {
            this.appPackName = item.packageIos;
          } else {
            this.appPackName = "";
          }
          if (this.appPackName.toLowerCase().indexOf("android") != -1) {
            this.apPlat = "安卓";
          } else if (this.appPackName.toLowerCase().indexOf("ios") != -1) {
            this.apPlat = "IOS";
          } else {
            this.apPlat = "未知";
          }
        }
      });
    },
    getAppNameList() {
      var appListParm = {
        pageIndex: 1,
        pageSize: 100
      };
      getAppList(appListParm)
        .then(res => {
          if (res.code == 200000) {
            var appListData = res.data.list || [];
            this.appNameList = appListData;
          } else {
             this.$message.error(res.message || "请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
          console.log(err);
        });
    },
    getSdkNameList() {
      var sdkNameListParm = {
        serviceModel: this.serviceModel
      };
      getSdkNameList(sdkNameListParm)
        .then(res => {
          if (res.code == 200000) {
            this.sdkNameList = res.data || [];
          } else {
             this.$message.error(res.message || "请求失败！");
          }
        })
        .catch(err => {
          this.$message.error("请求失败！");
          console.log(err);
        });
    },
    getPageData() {
      var pageData = this.sqDetail;
      if (pageData.vType == "add") {
        this.getAppNameList();
        this.getSdkNameList();
        this.ifdisSdkNam = false;
        this.ifDisAppNam = false;
        this.ifDisSq = false;
        this.ifShowOptioBtn = true;
      } else if (pageData.vType == "view") {
        this.sdkNameVal = pageData.serviceName;
        this.appNameVal = pageData.appName;
        this.appId = pageData.appId;
        this.appPackName = pageData.serviceName;
        this.apPlat = pageData.applicationPlatform;
        this.sqNum = pageData.assignAuthorizationCount;
        this.ifdisSdkNam = true;
        this.ifDisAppNam = true;
        this.ifDisSq = true;
        this.ifShowOptioBtn = false;
      }
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
    min-height: 491px;
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
        height: 32px;
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
