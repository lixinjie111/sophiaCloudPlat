<template>
    <div class="main">
			<div class="left">
				<div class="logo">
					<img src="../../assets/images/login/logo.png" alt="">
				</div>
				<div class="title">
					Artificial intelligence
				</div>
				<div class="desc">
				© 2020 元知智能研究院 版权所有 | 京ICP备19041462号-3
				</div>
			</div>
			<div class="right">
                <div class="link">
                    <span v-if="findPwd" @click="findPwd=false">登录 &nbsp;&nbsp;   |   &nbsp;&nbsp;</span><span onclick="javascript:window.open('https://www.yzsophia.com/#/index')" >首页</span> &nbsp;&nbsp;   |   &nbsp;&nbsp; <span onclick="javascript:window.open('https://www.yzsophia.com/#/experienceColl?oneId=5&twoRouteId=5.1&routeId=5.1.1')">功能体验</span>
                </div>
                <div class="login_content" v-if="!findPwd">
                    <div class="login_title">欢迎注册Sophia云账号</div>
                    <div class="email">
                        <img src="../../assets/images/login/user.png" class="user_img" style="width: 16px;height: 16px;"><input type="text" v-model="username" placeholder="请设置用户名" id="account" @focus="inputEvent">
                    </div>
                    <div class="password">
                        <div class="tip" v-show="tipShow">用户名或密码有误，请重新输入或找回密码</div>
                        <img src="../../assets/images/login/pws.png" class="pws_img" style="width: 16px;height: 16px;"><input type="password"  v-model="password" placeholder="请设置您的密码" id="password" @keyup.enter.native="handleLogin" @focus="inputEvent">
                    </div>

                    <div class="password">
                        <div class="tip" v-show="tipShow">用户名或密码有误，请重新输入或找回密码</div>
                        <img src="../../assets/images/login/pws.png" class="pws_img" style="width: 16px;height: 16px;"><input type="password"  v-model="password" placeholder="请再次输入密码" id="password" @keyup.enter.native="handleLogin" @focus="inputEvent">
                    </div>
                    <div class="email">
                        <div  class="user_img" style="width: 16px;">
                            <img src="../../assets/images/login/phone.png" >
                        </div>    
                        <span class="tipMsg">+86</span><input type="text" v-model="tel" placeholder="请输入您的手机号" >
                    </div>
                    <div class="checkSendMa">
                        <div class="tipMsg" v-show="idVertify">{{idVertifyMsg}}</div>
                        <input type="text"  v-model="idVertifyMa" placeholder="请输入验证码" class="checkInput"> 
                        <input type="text" class="sendMsg"  id="sendMsg" readonly  @click="sendMeg" v-model="sendMessage">
                    </div>
                    <div class="readBox">
                        <a-checkbox :checked="isRead" @change="onChangeCheck">
                                <span class="readDoc">我已阅读并同意<span class="readtext">《Sophia云平台用户协议》</span>和<span class="readtext">《隐私政策声明》</span></span>
                        </a-checkbox>
                    </div>
                    <div class="submit" @click="handleLogin">
                        <span style="margin-right:5px">立即注册</span>
                        <img src="../../assets/images/login/Shape.png" style="width: 16px;">
                    </div>
                    <div class="forgetPwd" @click="goToLogin">已有账号？<span>登录</span></div>
                </div>
			</div>
		</div>
</template>

<script>
import { mapActions } from 'vuex';
import { getVerificationCode,verifyPhone,sendMessage,verifyPhoneNodeCode,resetPasswords} from '@/api/login';
export default {
    data() {
        return {
            isRead:false,
            verifyCodeMsg:'',
            idVertifyMsg:'',
            tip1:0,
            tip2:0,
            tip3:0,
            sureTip:false,
            toolTip:false,
            resetPwd:'',
            surePwd:'',
            idVertify:false,
            idVertifyMa:'',
            getTel:'',
            stepIndex:1,
            useTel:'136******78',
            coverBg:false,
            findPwd:false,
            checkMaShow:false,
            checkTelMaShow:false,
            tipShow:false,
            username: '',
            password: '',
            tel:'',
            checkMa:'',
            checkTelMa:'',
            loading: false,
            sendMessage: '发送验证码',
            countdown : 60,
            uuid:'',
            imgUrl:'',
            findName:'',
            timer:null,
        }
    },
    created() {

    },
    methods: {
        onChangeCheck(e){
            this.isRead = e.target.checked;
        },
        resetMa(){
            this.uuid=this.getUUID();
            let _param ={
                uuid:this.uuid,
            };
            getVerificationCode(_param).then(res => {
                 this.imgUrl=window.URL.createObjectURL(res);
            }).catch(err => {

            })
        },
        getUUID() {
            return 'xxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        },
        sendMeg(){
             this.settime();
            let _param ={
                phone:this.tel,
                type:1,
            };
            sendMessage(_param).then(res => {
                if(res.code == 200000) {
                    this.idVertify=false;
                }else {
                    this.idVertify=true;
                    this.idVertifyMsg=res.message;
                }
            }).catch(err => {

            })
        },
        settime() {
            var sendMsg=document.getElementById('sendMsg');
            if(sendMsg){
                 if (this.countdown == 0) {
                    sendMsg.removeAttribute("disabled");
                    this.sendMessage="发送验证码";
                    this.countdown = 60;
                    return;
                } else {
                    sendMsg.setAttribute("disabled", true);
                    this.sendMessage="重新发送(" + this.countdown + ")";
                    this.countdown--;
                }
                this.timer=setTimeout(()=> {
                    this.settime(); 
                },1000)
            }
        },
        handleNext2(){
            if(this.surePwd==this.resetPwd){
                 this.sureTip=false;
                if(this.tip1==2&&this.tip2==2&&this.tip3==2){
                    let _param ={
                        phone:this.tel,
                        noteCode:this.idVertifyMa,
                        password:this.resetPwd,
                    };
                    resetPasswords(_param).then(res => {
                        if(res.code == 200000) {
                             this.findPwd=false;
                            this.stepIndex=1;
                            this.$message.success('重置成功');
                        }else {
                            this.$message.success('重置失败');
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                    
                }else{
                    this.toolTip=true;
                }
            }else{
                this.sureTip=true;
            }
            
        },
        sureInput(){

        },
        inputCk(){
            this.toolTip=true;
            var patrn3 =/(\s)/;
            if(patrn3.test(this.resetPwd)){
                 this.tip2=1;
            }else{
                 this.tip2=2;
            }
            //this.stepIndex=1;
            var patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im; 
            let reTest=false;
            if (patrn.test(this.resetPwd)) {// 如果包含特殊字符返回false
                reTest=true;
                //console.log('特殊字符，过')
            }else{
                 //console.log('特殊字符，不过')
                reTest=false;
                //this.tip2=false;
            }
            let reTest1=false;
            var patrn1 =  /\d/;
            if (patrn1.test(this.resetPwd)) {
                reTest1=true;
                //console.log('特殊数字，过')
            }else{
                reTest1=false;
                //console.log('特殊数字，不过')
            }
            let reTest2=false;
            var patrn2 =  /[a-zA-Z]/;
            if (patrn2.test(this.resetPwd)) {// 如果包含特殊字符返回false
                reTest2=true;
                //console.log('包含zimu，过');
            }else{
                 reTest2=false;
                 //console.log('包含zimu，不过');
            }
            let reTest3=false;
            if(this.resetPwd.length>=6&&this.resetPwd.length<=20){
                if(this.resetPwd==this.findName){
                    reTest3=false;
                    this.tip1=1;
                }else{
                     reTest3=true;
                    this.tip1=2;
                    //return false;
                }
            }else{
                reTest3=false;
                this.tip1=1;
                //return false;
            }
            if(reTest&&reTest1||reTest&&reTest2||reTest1&&reTest2){
                this.tip3=2;
            }else{
                this.tip3=1;
                //return false;
            } 
           
        },
        handleNext(){
            let _param ={
                uuid:this.uuid,
                phone:this.tel,
                verifyCode:this.checkMa,
            };
            verifyPhone(_param).then(res => {
                if(res.code == 200000) {
                   this.stepIndex=2;
                    this.checkMaShow=false;
                    var tel = this.tel;
                    tel = "" + tel;
                    var ary = tel.split("");
                    ary.splice(3,4,"****");
                    this.getTel=ary.join("");
                }else {
                    this.checkMaShow=true;
                    this.verifyCodeMsg=res.message;
                }
            }).catch(err => {
                console.log(err)
            })
        },
        handleNext1(){
            let _param ={
                phone:this.tel,
                noteCode:this.idVertifyMa,
            };
            verifyPhoneNodeCode(_param).then(res => {
                if(res.code == 200000) {
                    var sendMsg=document.getElementById('sendMsg');
                    sendMsg.removeAttribute("disabled");
                    this.findName=res.data;
                    this.idVertify=false;
                    this.stepIndex=3;
                    clearTimeout(this.timer);
                }else {
                    this.idVertify=true;
                    this.idVertifyMsg=res.message;
                }
            }).catch(err => {
                console.log(err)
            })
        },
        goToLogin(){
           this.$router.push({path:'/login'})
        },
        closeDialog(){
            this.coverBg=false;
        },
        makSure(){
            this.closeDialog();
        },
        inputEvent(){
            this.tipShow=false;
        },
        ...mapActions(['goLogin']),
        handleLogin() {
            this.loading = true;
            let _param ={
                userPhone:this.username,
                password:this.password
            };
            this.loginFunc(_param);
        },
        loginFunc(params) {
            this.goLogin(params).then(res => {
                if(res.code == 200000) {
                    localStorage.setItem("yk-token",res.data);
                    this.$router.push({ path: '/' });
                }else {
                    this.tipShow=true;
                    this.loading = false;
                }
            }).catch(err => {
                this.tipShow=true;
                this.loading = false;
                this.loading = false;
            })
        },
    }
}
</script>
<style >
.overlayTip{
    max-width: 300px;
}
</style>
<style lang="scss" scoped>
     
    .msgTip{
        font-size: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 22px;
        display: flex;
        align-items: center;
        img{
            margin-right: 5px;
        }
    }
    .main{
        display: flex;
        height: 100%;
        width: 100%;
        .coverBg{
            position: absolute;
            left:0;
            top:0;
            right:0;
            bottom:0;
            background: rgba(18,28,51,.8);
            z-index: 10;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .safeCheck{
            background: #fff;
            z-index: 10;
            width: 427px;
            .safeHeader{
                height: 56px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding:0 20px;
                border-bottom:1px solid rgba(0, 0, 0, 0.09);
                span{
                    font-size: 16px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #121C33;
                }
                .close{
                    width: 9px;
                    cursor: pointer;
                }
            }
            .safeContent{
                padding:30px;
                padding-top:20px;
                .safeTip{
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #3D4966;
                    line-height: 22px;
                }
                .safeTitle{
                    margin-top: 25px;
                    margin-bottom: 10px;
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #121C33;
                }
                .useTel{
                    border: 1px solid #B8BECC;
                    border-radius: 2px;
                    box-sizing: border-box;
                    padding-left: 12px;
                    outline:none;
                    width: 100%;
                    height: 42px;
                    margin-bottom: 10px;
                    padding-left: 12px;
                    box-sizing: border-box;
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #121C33;
                    display: flex;
                    align-items: center;
                }
                .checkMa{
                    background: #FFFFFF;
                    width: 100%;
                    height: 42px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: relative;
                    .tipMsg{
                        position: absolute;
                        bottom:-20px;
                        font-size: 10px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #D60039;
                        line-height: 14px;
                    }
                    input{
                        border: 1px solid #B8BECC;
                        border-radius: 2px;
                        box-sizing: border-box;
                        height: 100%;
                        flex:1;
                        padding-left: 12px;
                        margin-right: 8px;
                        height: 100%;
                        outline:none;
                    }
                    .sendMsg{
                        width: 150px;
                        height: 42px;
                        background: #FFFFFF;
                        border-radius: 2px;
                        border: 1px solid #B8BECC;
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #121C33;
                        line-height: 42px; 
                        text-align: center;
                        cursor: pointer;
                    }
                    
                }
                .submit{
                    margin-top: 35px;
                    width: 100%;
                    height: 40px;
                    background: #005ACD;
                    border-radius: 3px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-size: 18px;
                    color: #FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }
            }
        }
        .left{
            width:40%;
            height: 100%;
            background: url(../../assets/images/login/loginBg.png) no-repeat center center;
            background-size: 100% auto;
            position: relative;
            .logo{
                position: absolute;
                top:34px;
                left:30px;
                width: 148px;
            }
            .title{
                position: absolute;
                bottom:57px;
                left:30px;
                font-size: 16px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #FFFFFF;
            }
            .desc{
                position: absolute;
                bottom:30px;
                left:30px;
                font-size: 12px;
                color: rgba(255,255,255,0.8);
            }
        }
        .right{
            width: 60%;
            height: 100%;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            
            .findPanel{
                padding:77px 51px;
                width: 426px;
                background: #FFFFFF;
                box-shadow: 0px 9px 30px 0px #B8BECC;
                border-radius: 4px;
                .title{
                    font-size: 22px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #121C33;
                    text-align: center;
                }
                .sendTip{
                    margin-top: 94px;
                    font-size: 14px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #121C33;
                    line-height: 20px;   
                }
                .surePwd{
                    background: #FFFFFF;
                    border: 1px solid #B8BECC;
                    border-radius: 2px;
                    width: 100%;
                    height: 42px;
                    margin-bottom: 15px;
                    padding-left: 20px;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    position: relative;
                    input{
                        flex:1;
                        border: none !important;
                        height: 100%;
                        outline:none;
                        margin-left: 15px;
                    }
                    .sureTip{
                        font-size: 10px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #D60039;
                        line-height: 14px;
                        position: absolute;
                        bottom:-20px;
                        left:0;  
                    }
                }
                .resetPwd{
                    margin-top: 69px;
                    background: #FFFFFF;
                    border: 1px solid #B8BECC;
                    border-radius: 2px;
                    width: 100%;
                    height: 42px;
                    margin-bottom: 15px;
                    padding-left: 20px;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    position: relative;
                    
                    input{
                        flex:1;
                        border: none !important;
                        height: 100%;
                        outline:none;
                        margin-left: 15px;
                    }
                    .tip{
                        font-size: 10px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #D60039;
                        line-height: 14px;
                        position: absolute;
                        bottom:-20px;
                        left:0;  
                    }
                }

                .checkSendMa{
                    background: #FFFFFF;
                    width: 100%;
                    height: 42px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: relative;
                    .tipMsg{
                        position: absolute;
                        bottom:-20px;
                        font-size: 10px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #D60039;
                        line-height: 14px;
                    }
                    input{
                        border: 1px solid #B8BECC;
                        border-radius: 2px;
                        box-sizing: border-box;
                        height: 100%;
                        flex:1;
                        padding-left: 12px;
                        height: 100%;
                        outline:none;
                    }
                    .sendMsg{
                        outline:none;
                        width: 150px;
                        height: 42px;
                         flex:auto;
                        background: #FFFFFF;
                        border-radius: 2px;
                        border: 1px solid #B8BECC;
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #121C33;
                        line-height: 42px; 
                        text-align: center;
                        cursor: pointer;
                    }
                    
                }
                .email{
                    background: #FFFFFF;
                    border: 1px solid #B8BECC;
                    border-radius: 2px;
                    width: 100%;
                    height: 42px;
                    margin-bottom: 15px;
                    margin-top: 69px;
                    padding-left: 20px;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    .tipMsg{
                        margin-left: 13px;
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #7A8499;
                    }
                    input{
                        flex:1;
                        border: none !important;
                        height: 100%;
                        outline:none;
                        margin-left: 15px;
                    }
                }
                .checkMa{
                    background: #FFFFFF;
                    width: 100%;
                    height: 42px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: relative;
                    .tipMsg{
                        position: absolute;
                        bottom:-20px;
                        font-size: 10px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #D60039;
                        line-height: 14px;
                    }
                    input{
                        border: 1px solid #B8BECC;
                        border-radius: 2px;
                        box-sizing: border-box;
                        height: 100%;
                        flex:1;
                        padding-left: 12px;
                        margin-right: 8px;
                        height: 100%;
                        outline:none;
                    }
                }
                .submit{
                    margin-top: 84px;
                    width: 100%;
                    height: 40px;
                    background: #005ACD;
                    border-radius: 3px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-size: 18px;
                    color: #FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }
            }
            .link{
                font-family: 'PingFangSC-Regular';
                position: absolute;
                top:30px;
                right:30px;
                font-size: 14px;
                color: #3D4966;
                cursor: pointer;
                font-size: 14px;
                font-weight: 400;
                color: #3D4966;
            }
            .login_content{
                width:324px;
                .login_title{
                    text-align: center;
                    margin-bottom: 60px;
                    font-size: 22px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #121C33;
                }
                .email{
                    background: #FFFFFF;
                    border: 1px solid #B8BECC;
                    border-radius: 2px;
                    width: 324px;
                    height: 42px;
                    margin-bottom: 15px;
                    padding-left: 20px;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    input{
                        flex:1;
                        border: none !important;
                        height: 100%;
                        outline:none;
                        margin-left: 15px;
                    }
                }
                .password{
                    background: #FFFFFF;
                    border: 1px solid #B8BECC;
                    border-radius: 2px;
                    width: 324px;
                    height: 42px;
                    margin-bottom: 15px;
                    padding-left: 20px;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    position: relative;
                    input{
                        flex:1;
                        border: none !important;
                        height: 100%;
                        outline:none;
                        margin-left: 15px;
                    }
                    .tip{
                        font-size: 10px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #D60039;
                        line-height: 14px;
                        position: absolute;
                        bottom:-20px;
                        left:0;  
                    }
                }
                .checkSendMa{
                    background: #FFFFFF;
                    width: 324px;
                    height: 42px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: relative;
                    .tipMsg{
                        position: absolute;
                        bottom:-20px;
                        font-size: 10px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #D60039;
                        line-height: 14px;
                    }
                    input{
                        border: 1px solid #B8BECC;
                        border-radius: 2px;
                        box-sizing: border-box;
                        height: 100%;
                        // flex:1;
                        padding-left: 12px;
                        height: 100%;
                        outline:none;
                    }
                    .checkInput{
                         width: calc(100% - 158px);
                    }
                    .sendMsg{
                        outline:none;
                        width: 150px;
                        height: 42px;
                        margin-left: 8px;
                        background: #FFFFFF;
                        border-radius: 2px;
                        padding-left: 0;
                        border: 1px solid #B8BECC;
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #121C33;
                        line-height: 42px; 
                        text-align: center;
                        cursor: pointer;
                    }
                    
                }
                .readBox{
                    margin-top: 35px;
                  
                    .readDoc{
                          font-size: 10px;
                            font-family: PingFangSC-Regular, PingFang SC;
                            font-weight: 400;
                            color: #7A8499;
                            .readtext{
                                color: #0376FD;
                            }
                    }
                    
                }
                .submit{
                    margin-top: 45px;
                    width: 100%;
                    height: 40px;
                    background: #005ACD;
                    border-radius: 3px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-size: 18px;
                    color: #FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }
                .forgetPwd{
                    margin-top: 35px;
                    text-align: center;
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #7A8499;
                    line-height: 20px;
                    span{
                        cursor: pointer;
                         color: #0376FD;
                    }
                    
                }
                .text_content{
                    margin-top: 65px;
                    .zixun_text,.help_text{
                        font-size: 12px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #B8BECC;
                        line-height: 22px;
                        text-align: center;
                        .option{
                            font-family: 'PingFangSC-Regular';
                            font-size: 12px;
                            color: #005ACD;
                            letter-spacing: 0;
                            text-align: center;
                            line-height: 22px;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
			
			
			
</style>