<template>
  <div class="authentPop_container">
    <div class="authentPop_con">
      <div class="authentPop_til">
        <div class="pop_til_txt">身份验证</div>
        <div class="close_icon_container">
          <img :src="closeIcon" alt="" srcset="" class="closeIcon"  @click="clsoePop1"/>
        </div>
      </div>
      <div class="authentPop_con_bom">
        <div class="auth_item1">
          <div class="error_icon_container">
            <img :src="errorIcon" alt="" srcset="" class="errorIcon" />
          </div>
          <div class="error_xt_container">
            注意：账号一旦注销后，无法找回，请您备份好账号下所有业务信息后谨慎操作！
          </div>
        </div>
        <div class="auth_item2">
          <div v-if="codeStatus == 1">请先获取验证码</div>
          <div v-else-if="codeStatus == 2">发送成功</div>
          <div v-else-if="codeStatus == 3">验证码错误</div>
        </div>
        <div class="auth_item3">验证方式</div>
        <div class="auth_item4">
          <el-input v-model="telNum" :disabled="ifTelDisabled"> </el-input>
        </div>
        <div class="auth_item5">
          <div class="input_con">
            <el-input placeholder="请输入验证码" v-model="yanzhenNum">
            </el-input>
          </div>
          <div class="input_txt" @click="sendYzCode" ref="sendBtn">{{fasongTxt}}</div>
        </div>
        <div class="auth_item6" @click="submitZhuxiao">确 定</div>
      </div>
    </div>
  </div>
</template>

<script>
import {sendMessage} from '@/api/login';
import {truncAccount} from '@/api/safeSet';
export default {
  name: "authentPop",
  data() {
    return {
      closeIcon: require("../../assets/images/verify/close.png"),
      errorIcon: require("../../assets/images/verify/error1.png"),
      telNum: "",
      ifTelDisabled: false,
      yanzhenNum: "",
      fasongTxt:'发送验证码',
      userIfon:null,
      countdown:60,
      codeStatus:1
    };
  },
  created(){
    this.userIfon =JSON.parse(localStorage.getItem('yk-userInfo'));
    this.telNum = this.userIfon.mobile.substr(0,3)+"****"+this.userIfon.mobile.substr(7);
  },
  methods:{
    clsoePop1(){
      var zhuxObj={
        ifShow:false,
        operBtn:'close'
      };
      this.$emit('closePop',zhuxObj)
    },
    settime(){
      var sendMsg=this.$refs['sendBtn'];
      if(sendMsg){
            if (this.countdown == 0) {
              sendMsg.removeAttribute("disabled");
              this.fasongTxt="发送验证码";
              this.countdown = 60;
              return;
          } else {
              sendMsg.setAttribute("disabled", true);
              this.fasongTxt="重新发送(" + this.countdown + ")";
              this.countdown--;
          }
          this.timer=setTimeout(()=> {
              this.settime(); 
          },1000)
      }
    },
    sendYzCode(){
      let _param ={
          phone:this.userIfon.mobile,
          type:1,
      };
      sendMessage(_param).then(res => {
          if(res.code == 200000) {
            this.codeStatus = 2;
            this.settime();
          }else {
            this.$message.error("验证码获取失败！");
          }
      }).catch(err => {

      })
    },
    submitZhuxiao(){
      var zhuxiaoObj = {
        phone:this.userIfon.mobile,
        noteCode:this.yanzhenNum
      };
      var zhuxObj={
        ifShow:false,
        operBtn:'submit',
        subData:zhuxiaoObj
      };
      this.$emit('closePop',zhuxObj)
    }
  }
};
</script>
<style lang="scss" scoped>
.authentPop_container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  background-color: rgba(18, 28, 51, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  .authentPop_con {
    min-width: 500px;
    min-height: 378px;
    background: #ffffff;
    box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08),
      0px 9px 4px 0px rgba(0, 0, 0, 0.05),
      0px 12px 48px 16px rgba(0, 0, 0, 0.03);
    border-radius: 2px;
    .authentPop_til {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 24px;
      box-sizing: border-box;
      border-bottom: 1px solid rgba(0, 0, 0, 0.09);
      .pop_til_txt {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
      }
      .close_icon_container {
        width: 16px;
        .closeIcon {
          display: block;
          width: 100%;
          &:hover{
            cursor: pointer;
          }
        }
      }
    }
    .authentPop_con_bom {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 40px;
      box-sizing: border-box;
      .auth_item1,
      .auth_item2,
      .auth_item3,
      .auth_item4,
      .auth_item5,
      .auth_item6 {
        width: 85%;
        &:hover{
          cursor: pointer;
        }
      }
      .auth_item1 {
        background: rgba(255, 77, 79, 0.2);
        border-radius: 2px;
        border: 1px solid #ff4d4f;
        padding: 9px 17px;
        box-sizing: border-box;
        display: flex;
        align-items: baseline;
        margin-top: 15px;
        .error_icon_container {
          width: 16px;
          margin-right: 10px;
          .errorIcon {
            display: block;
            width: 100%;
          }
        }
        .error_xt_container {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.65);
        }
      }
      .auth_item2 {
        display: flex;
        align-items: center;
        font-size: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ff4d4f;
        margin-top: 10px;
        :nth-child(2) {
          color: #7a8499;
          margin-left: 10px;
          margin-right: 10px;
        }
      }
      .auth_item3 {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #121c33;
        margin-top: 10px;
        margin-bottom: 15px;
      }
      .auth_item4 {
        margin-bottom: 15px;
        /deep/ .el-input .el-input__inner{
          background: #F8F8F8;
        }
      }
      .auth_item5 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .input_con {
          width: 63%;
        }
        .input_txt {
          width: 33%;
          padding: 7.9px 0;
          box-sizing: border-box;
          border-radius: 2px;
          border: 1px solid #d9d9d9;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .auth_item6 {
        padding: 8px 0;
        box-sizing: border-box;
        margin-top: 40px;
        background: #0376fd;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }
}
</style>