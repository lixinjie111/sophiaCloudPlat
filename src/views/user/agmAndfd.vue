<template>
  <div class="agmAndfd_container">
    <div class="agmAndfd_til">注销账号</div>
    <div class="agmAndfd_con">
      <div class="step_con_container">
        <el-steps
          :active="stepNum"
          finish-status="success"
          style="width: 76%"
          :space="350"
        >
          <el-step title="协议与反馈"></el-step>
          <el-step title="账号信息检查与注销"></el-step>
          <el-step title="注销成功"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="agmAndfd_con1" v-if="stepItem == 1">
      <!--协议与反馈部分-->
      <div class="agmAndfd_til1">注销前请您仔细阅读以下重要信息！</div>
      <div class="agmAndfd_til2">账号注销重要信息</div>
      <div class="agmAndfd_til3">
        <span style="font-weight: 550">提交账号注销申请为不可逆操作。</span
        ><span
          >为保证您的账号、财产安全，并保障正常的社会公共秩序，在您提交Sophia云账号注销请求前，请先确认如下信息：</span
        >
      </div>
      <div class="agmAndfd_til4">
        1、提交账号注销请求的为您本人，或获得账号持有者本人合法授权的代理人/代表人。后一种情形下，代理人/代表人需将本提示及注销过程中的所有文件，告知账号持有者本人并确保本人已理解并同意前述文件的全部内容。<br />
        2、您申请注销的账号处于稳定且安全的状态（例如：未发生过被盗、被封等风险，在最近三个月内没有进行修改密码、换绑手机等敏感信息变更的操作等）<br />
        3、您是通过常用的安全设备向我方提交账号注销申请；<br />
        4、您的账号下不存在尚未履行完毕的合同，亦不存在任何未结清的费用、未缴纳的税款，或其他依照法律法规的要求应当履行而尚未履行的义务；<br />
        5、您的账号与其他第三方网络应用（例如：网站、APP）的绑定关系或对外授权已经解除，或者您能确信不解除该等绑定关系或不撤回该等对外授权不会对您本人或任何第三方造成任何不利影响；<br />
        6、您在Sophia云账号下的所有数据均已迁出及妥善备份，或您完全放弃保留、找回该等数据的权利；<br />
        7、您提交账号注销申请，并非为了躲避正在或即将发生的纠纷诉讼，或规避主管部门的监管，或绕开法律法规的相关规定等不良意图。
      </div>
      <div class="agmAndfd_til5">再次提示：</div>
      <div class="agmAndfd_til6">提交账号注销申请为不可逆操作。</div>
      <div class="agmAndfd_til7">
        账号注销后，您将无法再次登录Sophia云服务平台，无法访问Sophia服务管理后台或进行其他依赖于账号权限进行的操作。<br />
        您在该账号下的个人信息、交易记录、业务数据、历史信息等均将无法找回。<br />
        如果您希望保持与此账号相关联的任何云服务，仅希望终止部分产品/资源，请不要继续后续操作。
      </div>
      <div class="agmAndfd_til8">确定注销</div>
      <div class="agmAndfd_til7">
        您正在尝试注销自己的Sophia云帐号。<span style="color: #ff4d4f"
          >请确保账号下无有效业务，在账号注销期间不要进行任何操作，以免注销失败</span
        >
      </div>
      <div class="agmAndfd_til7">
        注销后，您将无法再使用任何Sophia云服务，并且您的帐号和数据也将会丢失。
      </div>
      <div class="agmAndfd_til7">
        <el-checkbox v-model="isRed"></el-checkbox>&nbsp;
        已了解《Sophia云账号注销协议》，提交申请后，我的账号{{myCount}}将被注销，包含的内容、数据和服务都不可再恢复。
      </div>
      <div class="agmAndfd_til9">
        <div class="btn1" @click="cancelZhuxiao">取消注销</div>
        <div class="btn2" :class="{'activeBtn':isRed}" @click="subZhuxiao">确定注销</div>
      </div>
    </div>
    <div class="agmAndfd_con2" v-if="stepItem == 2">
      <!--安全设置-注销账号-账号信息检查与注销部分-->
      <div class="agmAndfd_con2_item1">
        <div class="info_info_con">
          <img :src="infoIcon" class="info_info" />
        </div>
        <div class="info_txt_con">
          <div class="info_txt1">请注意</div>
          <div class="info_txt2">
            账号删除将会检测账号所有的云产品和服务，当您确认并启动注销流程之后，所有设计到的云产品和服务数据将被清理，请注意这个流程是不可逆的。
          </div>
        </div>
        <div class="info_close_icon">
          <img :src="closeIcon" class="info_close" />
        </div>
      </div>
      <div class="agmAndfd_con2_item2">
        系统正在执行账号注销检查，请耐心等待
      </div>
      <div class="agmAndfd_con2_item3">
        <div class="agmAndfd_con2_item3_item" @click="quxiaoZhuxiao">
          取消注销（<span>{{ timerNum }}</span
          >s）
        </div>
      </div>
    </div>
    <div class="agmAndfd_con2" v-if="stepItem == 3">
      <div class="chengG_con">
        <div class="chengG_con1">注销已完成，<span class="downCount">{{downCount}}</span>s后将自动返回登陆页</div>
        <div class="chengG_con2" @click="goLogin">立即返回</div>
      </div>
    </div>
    <div class="info_pop" v-show="ifShowPop">
      <div class="info_pop_con">
        <div class="pop_til">
          <div class="pop_til_txt">注销账号</div>
          <div class="pop_close_con" @click="closePop">
            <img :src="closeIcon" alt="" srcset="" class="closeIcon" />
          </div>
        </div>
        <div class="pop_con">
          <div class="pop_con_icon">
            <img :src="infoIcon" alt="" srcset="" class="infoIcon" />
          </div>
          <div class="pop_con_txt">
            确认后，系统将执行注销前检查，通过后自动进入账号注销进程，您无法自行终止。在此期间，请不要使用此账号进行任何操作，以免造成注销失败。
          </div>
        </div>
        <div class="pop_btn_con">
          <div class="pop_btn_con1">
            <div class="btn_con1" @click="cancel">取 消</div>
            <div class="btn_con2" @click="submit">确 定</div>
          </div>
        </div>
      </div>
    </div>
    <vPop v-if="ifShowAuthpop" @closePop='closevPop'></vPop>
  </div>
</template>

<script>
import vPop from "./authentPop";
import {truncAccount} from '@/api/safeSet';
export default {
  name: "agmAndfd",
  data() {
    return {
      stepItem: 1,
      stepNum: 1,
      isRed: false,
      closeIcon: require("../../assets/images/verify/close.png"),
      infoIcon: require("../../assets/images/verify/error2.png"),
      ifShowPop: false,
      timerNum:15,
      timer: null,
      timer1: null,
      myCount:'',
      ifShowAuthpop:false,
      downCount:10
    };
  },
  components:{
    vPop
  },
  created() {
    this.getUserInfo();
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    goLogin(){
      this.$router.push({
        path:'/login'
      });
    },
    downCountter(){
      this.timer1 = setInterval(() => {
        if (this.downCount > 0) {
          this.downCount--;
        }
        else{
          this.goLogin();
          clearInterval(this.timer1);
        }
      }, 1000);
    },
    quxiaoZhuxiao(){
      clearInterval(this.timer);
      this.stepItem = 1;
      this.stepNum = 1;
    },
    setTimer(parms) {
      this.timer = setInterval(() => {
        if (this.timerNum > 0) {
          this.timerNum--;
        }
        else{
            clearInterval(this.timer);
            truncAccount(parms).then(res=>{
              if(res.code == 200000){
                this.$message.success("注销成功！");
                this.stepItem = 3;
                this.stepNum = 3;
                this.downCountter();
              }
              else{
                this.$message.success("注销失败！");
              }
            }).catch(err=>{

            });
        }
      }, 1000);
    },
    cancelZhuxiao(){
      this.$router.go(-1);
    },
    closevPop(arg){
      if(arg.operBtn == 'close'){
        this.ifShowAuthpop = arg.ifShow;
      }
      else if(arg.operBtn == 'submit'){
        this.ifShowAuthpop = arg.ifShow;
        this.stepItem = 2;
        this.stepNum = 2;
        this.setTimer(arg.subData);
      }
    },
    subZhuxiao() {
      if(!this.isRed){
        return;
      }
      this.ifShowPop = true;
    },
    submit() {
      //此处调用接口
      this.ifShowPop = false;
      this.ifShowAuthpop = true;
    },
    cancel() {
      this.ifShowPop = false;
    },
    closePop() {
      this.cancel();
    },
    getUserInfo(){
      var userIfon = localStorage.getItem('yk-userInfo');
      var userIfonObj = JSON.parse(userIfon);
      this.myCount = userIfonObj['email'];
    }
  },
};
</script>
<style lang="scss" scoped>
.agmAndfd_container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .agmAndfd_til {
    width: 100%;
    height: 52px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #676970;
    display: flex;
    align-items: center;
    padding-left: 27px;
    box-sizing: border-box;
    border-bottom: 1px solid #cfcdcd;
  }
  .agmAndfd_con {
    width: 100%;
    .step_con_container {
      width: 85%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 38px;
      /deep/ .el-steps {
        display: flex;
        align-items: center;
        justify-content: center;
        /deep/ .is-success {
          color: #1890ff;
          border-color: #1890ff;
        }
      }
    }
  }
  .agmAndfd_con1 {
    width: 85%;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    line-height: 24px;
    margin-top: 30px;
    padding-bottom: 60px;
    box-sizing: border-box;
    .agmAndfd_til1 {
      width: 100%;
    }
    .agmAndfd_til2 {
      margin-top: 20px;
      margin-bottom: 30px;
      font-size: 17px;
    }
    .agmAndfd_til3,
    .agmAndfd_til4,
    .agmAndfd_til5,
    .agmAndfd_til6,
    .agmAndfd_til7 {
      font-size: 14px;
    }
    .agmAndfd_til8 {
      font-size: 16px;
    }
    .agmAndfd_til6 {
      font-weight: 550;
    }
    .agmAndfd_til4,
    .agmAndfd_til8 {
      margin-bottom: 30px;
    }
    .agmAndfd_til9 {
      margin-top: 40px;
      display: flex;
      align-items: center;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #121c33;
      .btn1,
      .btn2 {
        padding: 8px 32px;
        box-sizing: border-box;
        background: #f7f7f7;
        border-radius: 2px;
        border: 1px solid #dddddd;
        margin-right: 16px;
        &:hover {
          cursor: pointer;
        }
      }
      .btn2{
        background: #F7F7F7;
        border-radius: 2px;
        border: 1px solid #DDDDDD;
        font-size: 16px;
        color: #DDDDDD;
      }
      .activeBtn{
        background: #0376fd;
        border: 1px solid #0376fd;
        color: white;
      }
    }
  }
  .agmAndfd_con2 {
    width: 85%;
    margin-top: 50px;
    .agmAndfd_con2_item1 {
      width: 100%;
      padding: 16px;
      box-sizing: border-box;
      background: #fffbe6;
      border-radius: 2px;
      border: 1px solid #ffe58f;
      display: flex;
      align-items: flex-start;
      .info_info_con {
        width: 18px;
        margin-right: 17px;
        .info_info {
          display: block;
          width: 100%;
        }
      }
      .info_txt_con {
        flex: 1;
        .info_txt1 {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.85);
          margin-bottom: 5px;
        }
        .info_txt2 {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.65);
        }
      }
      .info_close_icon {
        width: 16px;
        .info_close {
          display: block;
          width: 100%;
        }
      }
    }
    .agmAndfd_con2_item2 {
      margin-top: 35px;
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #121c33;
    }
    .agmAndfd_con2_item3 {
      width: 100%;
      margin-top: 180px;
      .agmAndfd_con2_item3_item {
        width: 144px;
        height: 40px;
        background: #f7f7f7;
        border-radius: 2px;
        border: 1px solid #dddddd;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #121c33;
        line-height: 40px;
        padding-left: 12px;
        box-sizing: border-box;
      }
    }
    .chengG_con{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .chengG_con1{
        margin-top: 180px;
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #121C33;
        .downCount{
          color: #0376FD;
        }
      }
      .chengG_con2{
        width: 135px;
        height: 40px;
        margin-top: 180px;
        background: #F7F7F7;
        border-radius: 2px;
        border: 1px solid #DDDDDD;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #121C33;
        &:hover{
          cursor: pointer;
        }
      }
    }
  }
  .info_pop {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(18, 28, 51, 0.6);
    z-index: 1111111;
    display: flex;
    align-items: center;
    justify-content: center;
    .info_pop_con {
      width: 580px;
      min-height: 220px;
      background: #ffffff;
      box-shadow: 0px 12px 48px 16px rgba(0, 0, 0, 0.03),
        0px 9px 28px 0px rgba(0, 0, 0, 0.05),
        0px 6px 16px -8px rgba(0, 0, 0, 0.08);
      border-radius: 2px;
      .pop_til {
        width: 100%;
        padding: 16px 24px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        .pop_til_txt {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.85);
        }
        .pop_close_con {
          width: 16px;
          &:hover {
            cursor: pointer;
          }
          .closeIcon {
            display: block;
            width: 100%;
          }
        }
      }
      .pop_con {
        width: 100%;
        padding: 30px 29px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        .pop_con_icon {
          width: 61px;
          height: 32px;
          margin-right: 22px;
          .infoIcon {
            display: block;
            width: 100%;
          }
        }
        .pop_con_txt {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.65);
        }
      }
      .pop_btn_con {
        width: 100%;
        padding: 9px 16px;
        box-sizing: border-box;
        position: relative;
        .pop_btn_con1 {
          position: absolute;
          right: 16px;
          display: flex;
          align-items: center;
          .btn_con1 {
            padding: 5px 16px;
            box-sizing: border-box;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.65);
            border-radius: 2px;
            border: 1px solid rgba(0, 0, 0, 0.15);
            margin-right: 8px;
            &:hover {
              cursor: pointer;
            }
          }
          .btn_con2 {
            padding: 5px 16px;
            box-sizing: border-box;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
            background: #1890ff;
            border-radius: 2px;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>