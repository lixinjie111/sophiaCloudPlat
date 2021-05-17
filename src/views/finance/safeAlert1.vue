<template>
    <div class="coverBg">
        <div class="safeCheck">
            <div class="safeHeader"><span v-if="status">开启延停服务</span><span v-else>关闭延停服务</span><img src="../../assets/images/login/close.png" class="close" @click="closeDialog"></div>
            <div class="safeContent">
                 <a-alert  type="warning" v-if="status">
                    <p slot="message" style="line-height:20px;font-size:10px">
                        延停权益是指Sophia云平台为了客户服务的持续性和稳定性，当客户使用的按量付费产品发生欠费后，给与一定额度/时长范围内继续使用云服务的权益。<br/>
                        根据出账后的可用额度判断是否在延停额度范围内： <br/> 
                        当欠费(可用额度<0)金额或时长，在延停权益范围内，按量付费的产品仍可正常使用；<br/>
                        当欠费(可用额度<0)金额或时长，超出延停权益范围，则按量付费的产品会进入停服处理流程。<br/>
                        <span style="color: red">延停的权益额度不是欠费总额的上限</span>，实际的欠费以您消费使用的云产品账单为准，详见 <span style="color: #0376FD;cursor:pointer">延停权益说明文档</span>。
                    </p>
                </a-alert>
                 <a-alert  type="warning"  v-else>
                    <p slot="message" style="line-height:20px;font-size:10px">
                      延停权益是指Sophia云平台为了客户服务的持续性和稳定性，当客户使用的按量付费产品发生欠费后，给与一定额度/时长范围内继续使用云服务的权益。根据出账后的可用额度判断是否在延停额度范围内。<br/>
                       关闭延停服务，发生欠费(可用额度<0)后，按量付费的产品会进入停服处理流程。实际的欠费以您消费使用的云产品账单为准，详见 <span style="color: #0376FD;cursor:pointer">延停权益说明文档</span>。
                    </p>
                </a-alert>
                <div class="safeTitle">验证方式</div>
                <input type="text" v-model="tel" placeholder="" readonly class="useTel">
                <div class="checkMa">
                    <div class="tipMsg" v-show="idVertify">{{idVertifyMsg}}</div>
                    <input type="text"  v-model="checkTelMa" placeholder="请输入六位验证码" > 
                    <input type="text" class="sendMsg"  id="sendMsg" readonly  @click="sendMeg" v-model="sendMessage">
                </div>
                <div class="alert_footer">
                    <div class="submit1">
                        <span style="margin-right:5px" @click="closeDialog">取消</span>
                    </div>
                    <div class="submit">
                        <span style="margin-right:5px" v-if="status"  @click="makSure">确定开启</span>
                        <span style="margin-right:5px" v-else  @click="makSure">确定关闭</span>
                    </div>
                </div>
            </div>   
        </div>
    </div>
</template>

<script>
import { sendMessage,mobileProtect} from '@/api/login';
export default {
    props:['useTel','status'],
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
    },
    methods: {
        sendMeg(){
            this.settime();
            let _param ={
                phone:this.useTel,
                type:1,
            };
            sendMessage(_param).then(res => {
                console.log(res)
                if(res.code == 200000) {
                    this.idVertify=false;
                }else {
                    this.idVertify=true;
                    this.idVertifyMsg=res.message;
                }
            }).catch(err => {
                 console.log(err)
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
                        if(this.path==1){
                            this.$emit('closeDialog2');
                        }else{
                            // this.$router.push({
                            //     path:this.path
                            // })
                        }
                    }else {
                        this.idVertify=true;
                        this.idVertifyMsg=res.message;
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
            width: 550px;
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
                        margin-right: 0;
                    }
                    
                }
                .alert_footer{
                    display: flex;
                    justify-content: flex-end;
                    .submit{
                        margin-top: 46px;
                         width: 93px;
                        height: 32px;
                        background: #005ACD;
                        border-radius: 3px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        color: #FFFFFF;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                    }
                    .submit1{
                        margin-top: 46px;
                        width: 93px;
                        height: 32px;
                        border: 1px solid #979797;
                        border-radius: 3px;
                        margin-right: 12px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        color: #121C33;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                    }
                }
                
            }
        }
			
			
			
</style>