<template>
  <div class="agmAndfd_container">
    <div class="agmAndfd_til">注销账号</div>
    <div class="agmAndfd_con">
      <div class="step_con_container">
        <el-steps :active="stepNum" finish-status="success" style="width: 76%" :space="350">
          <el-step title="协议与反馈"></el-step>
          <el-step title="账号信息检查与注销"></el-step>
          <el-step title="注销成功"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="agmAndfd_con1">
        <div class="agmAndfd_til1">注销前请您仔细阅读以下重要信息！</div>
        <div class="agmAndfd_til2">账号注销重要信息</div>
        <div class="agmAndfd_til3"><span style="font-weight: 550;">提交账号注销申请为不可逆操作。</span><span>为保证您的账号、财产安全，并保障正常的社会公共秩序，在您提交Sophia云账号注销请求前，请先确认如下信息：</span></div>
        <div class="agmAndfd_til4">
            1、提交账号注销请求的为您本人，或获得账号持有者本人合法授权的代理人/代表人。后一种情形下，代理人/代表人需将本提示及注销过程中的所有文件，告知账号持有者本人并确保本人已理解并同意前述文件的全部内容。<br>
            2、您申请注销的账号处于稳定且安全的状态（例如：未发生过被盗、被封等风险，在最近三个月内没有进行修改密码、换绑手机等敏感信息变更的操作等）<br>
            3、您是通过常用的安全设备向我方提交账号注销申请；<br>
            4、您的账号下不存在尚未履行完毕的合同，亦不存在任何未结清的费用、未缴纳的税款，或其他依照法律法规的要求应当履行而尚未履行的义务；<br>
            5、您的账号与其他第三方网络应用（例如：网站、APP）的绑定关系或对外授权已经解除，或者您能确信不解除该等绑定关系或不撤回该等对外授权不会对您本人或任何第三方造成任何不利影响；<br>
            6、您在Sophia云账号下的所有数据均已迁出及妥善备份，或您完全放弃保留、找回该等数据的权利；<br>
            7、您提交账号注销申请，并非为了躲避正在或即将发生的纠纷诉讼，或规避主管部门的监管，或绕开法律法规的相关规定等不良意图。
        </div>
        <div class="agmAndfd_til5">再次提示：</div>
        <div class="agmAndfd_til6">提交账号注销申请为不可逆操作。</div>
        <div class="agmAndfd_til7">
            账号注销后，您将无法再次登录Sophia云服务平台，无法访问Sophia服务管理后台或进行其他依赖于账号权限进行的操作。<br> 
            您在该账号下的个人信息、交易记录、业务数据、历史信息等均将无法找回。<br> 
            如果您希望保持与此账号相关联的任何云服务，仅希望终止部分产品/资源，请不要继续后续操作。
        </div>
        <div class="agmAndfd_til8">
            确定注销
        </div>
        <div class="agmAndfd_til7">
            您正在尝试注销自己的Sophia云帐号。<span style="color:#FF4D4F;">请确保账号下无有效业务，在账号注销期间不要进行任何操作，以免注销失败</span>
        </div>
        <div class="agmAndfd_til7">
            注销后，您将无法再使用任何Sophia云服务，并且您的帐号和数据也将会丢失。
        </div>
        <div class="agmAndfd_til7">
            <el-checkbox v-model="isRed"></el-checkbox>&nbsp; 已了解《Sophia云账号注销协议》，提交申请后，我的账号110642****@qq.com将被注销，包含的内容、数据和服务都不可再恢复。
        </div>
        <div class="agmAndfd_til9">
            <div class="btn1">取消注销</div>
            <div class="btn2">确定注销</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "agmAndfd",
  data() {
    return {
      stepNum: 1,
      isRed:false
    };
  },
  created() {},
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
  .agmAndfd_con1{
    width: 85%;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    line-height: 24px;
    margin-top: 30px;
    padding-bottom: 60px;
    box-sizing: border-box;
    .agmAndfd_til1{
        width: 100%;
    }
    .agmAndfd_til2{
        margin-top: 20px;
        margin-bottom: 30px;
        font-size: 17px;
    }
    .agmAndfd_til3,.agmAndfd_til4,.agmAndfd_til5,.agmAndfd_til6,.agmAndfd_til7{
        font-size: 14px;
    }
    .agmAndfd_til8{
        font-size: 16px;
    }
    .agmAndfd_til6{
        font-weight: 550;
    }
    .agmAndfd_til4,.agmAndfd_til8{
        margin-bottom: 30px;
    }
    .agmAndfd_til9{
        margin-top: 40px;
        display: flex;
        align-items: center;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #121C33;
        .btn1,.btn2{
            padding: 8px 32px;
            box-sizing: border-box;
            background: #F7F7F7;
            border-radius: 2px;
            border: 1px solid #DDDDDD;
            margin-right: 16px;
        }
        .btn2{
            background: #0376FD;
            border: 1px solid #0376FD;
        }
    }
  }
}
</style>