<template>
    <div class="busEt">
          <a-page-header
            style="borderBottom: 1px solid rgb(235, 237, 240)"
            title="更换密保手机"
         >
        </a-page-header>
        <div class="content">
            <div class="title">密保手机能够完成登录时的二次校验，提升账户安全等级，同时可以用来找回密码和接收相关安全提醒信息,请勿随意泄露</div>
            <el-form :model="ruleForm1"  :rules="rules" ref="ruleForm1" label-width="0" class="demo-ruleForm">
                <el-form-item  prop="tel">
                    <el-input  prefix-icon="el-icon-mobile-phone" v-model="ruleForm1.useTel"  placeholder="请输入你的手机号">
                         <template #prepend>+86</template>
                    </el-input>
                </el-form-item>
                <el-form-item >
                        <el-row :gutter="20">
                                <el-col :span="14">
                                    <el-input  prefix-icon="el-icon-key" v-model="ruleForm1.checkTelMa"  placeholder="请输入验证码">
                                    </el-input>
                                </el-col>
                                <el-col :span="10">
                                    <input  id="sendMsg"   @click="sendMeg('sendMsg')" v-model="sendMessage" readonly > 
                                </el-col>
                            </el-row>
                        </el-form-item>
                <el-form-item>
                    <a-button type="primary" block  @click="submitForm('ruleForm1')" size="large" style="margin-top:80px">
                        确定
                    </a-button>
                </el-form-item>
            </el-form>
	    </div>
	</div>
</template>

<script>
import { changeMobile } from "@/api/safeSet";
import {sendMessage} from '@/api/login';
export default {
    data() {
        return {
            ruleForm1: {
                useTel:'',
                checkTelMa:'',
            },
            countdown : 60,
            checkTelMa:'',
            sendMessage: '发送验证码',
            rules1: {
                useTel: [
                    { required: true, message: '请输入手机号', trigger: 'blur' }
                ],
                checkTelMa: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
            },
            userInfomation:{},
            timer:null
        }
    },
    created() {
        this.userInfomation=JSON.parse(localStorage.getItem('yk-userInfo'));
    },
    methods: {
        getUUID() {
            return 'xxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        },
        sendMeg(id){
            if(!this.ruleForm1.useTel){
                this.$message.error('请填写手机号');
                return;
            }
            this.settime();
            let _param ={
                phone:this.ruleForm1.useTel,
                type:1,
            };
            sendMessage(_param).then(res => {
                if(res.code == 200000) {
                    
                }else {
                    this.$message.error(res.message);
                }
            }).catch(err => {

            })
        },
        settime(id) {
            var sendMsg=document.getElementById('sendMsg');
            console.log(sendMsg)
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
            this.coverBg=false;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                var formData = new FormData(); 
                formData.append('uuid',this.getUUID());
                formData.append('newPhone',this.ruleForm1.useTel); 
                formData.append('oldPhone',this.userInfomation.mobile); 
                formData.append('verifyCode',this.ruleForm1.checkTelMa); 
                let config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }; 
                changeMobile(formData,config).then(res => {
                    if(res.code == 200000) {
                        this.$message.success(`修改成功`);
                        this.$store.dispatch('getUserInfo');
                        setTimeout(()=>{
                            this.$router.push({
                                path:'/safeSet'
                            })
                        },1000)
                    }else {
                        this.$message.error(res.message);
                    }
                }).catch(err => {
                    console.log(err)
                })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
    }
}
</script>
<style lang="scss" scoped>
	.busEt{
        color:rgba(103,105,112,1);
        .content{
            padding:0 24px;
            .demo-ruleForm{
                width: 300px;
                margin: auto;
            }
            .title{
                margin-top: 20px;
                margin-bottom: 50px;
                font-size: 14px;
                font-family: PingFangSC-Semibold, PingFang SC;
                color: #909399;
                line-height: 22px;
            }
             /deep/ #sendMsg{
                text-align: center;
                cursor: pointer;
                    height: 40px;
                    width: 100%;
                    background: #FFFFFF;
                border-radius: 2px;
                border: 1px solid #B8BECC;
            }
        }
    }
 			
			
</style>