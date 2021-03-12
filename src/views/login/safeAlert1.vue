<template>
    <div class="coverBg">
        <div class="safeCheck">
            <div class="safeHeader"><span>安全验证</span><img src="../../assets/images/login/close.png" class="close" @click="closeDialog"></div>
            <div class="safeContent">
                <div class="safeTip">您的账号可能存在安全风险，为了确保为您本人操作，请先进行安全验证</div>
                <div class="safeTitle">验证方式</div>
                <input type="text" v-model="tel" placeholder="" readonly class="useTel">
                <div class="checkMa">
                    <div class="tipMsg" v-show="idVertify">{{idVertifyMsg}}</div>
                    <input type="text"  v-model="checkTelMa" placeholder="请输入六位验证码" > 
                    <input type="text" class="sendMsg"  id="sendMsg" readonly  @click="sendMeg" v-model="sendMessage">
                </div>
                <div class="submit" @click="makSure">
                    <span style="margin-right:5px">确定</span>
                </div>
                </div>   
        </div>
    </div>
</template>

<script>
import { sendMessage,mobileProtect} from '@/api/login';
export default {
    props:['useTel'],
    data() {
        return {
            sendMessage: '发送验证码',
            idVertify:false,
            idVertifyMsg:'验证码错误，请重新输入',
            countdown : 60,
            timer:null,
            tel:"",
        }
    },
    created() {
        this.tel = this.useTel.substr(0,3)+"****"+this.useTel.substr(7);
        console.log(this.tel)
    },
    methods: {
        sendMeg(){
            let _param ={
                phone:this.useTel,
                type:1,
            };
            sendMessage(_param).then(res => {
                if(res.code == 200000) {
                    this.settime();
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
        closeDialog(){
            this.$emit('closeDialog1');
        },
        makSure(){
            if(this.checkTelMa){
               let _param ={
                    phone:this.useTel,
                    noteCode:this.checkTelMa,
                };
                mobileProtect(_param).then(res => {
                    if(res.code == 200000) {

                    }else {
                    
                    }
                }).catch(err => {

                })
            }else{
                this.idVertify=true;
                this.idVertifyMsg="请填写验证码";
            }
        },
        inputEvent(){
            this.tipShow=false;
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
        .coverBg{
            position: absolute;
            left:0;
            top:0;
            right:0;
            bottom:0;
            background: rgba(18,28,51,.8);
            z-index: 99999;
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
                    margin-top: 46px;
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
			
			
			
</style>