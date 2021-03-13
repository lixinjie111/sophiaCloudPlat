<template>
    <div class="busEt">
          <a-page-header
            style="borderBottom: 1px solid rgb(235, 237, 240)"
            :title="title"
         >
        </a-page-header>
        <div class="content">
            <div class="title">绑定邮箱能够提升账户安全等级，同时可用于接收Sophia云平台发送给您的各种通知，如实例创建成功提醒、实例到期提醒等。</div>
            <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
                <el-form-item  prop="email">
                    <el-input  prefix-icon="el-icon-message" v-model="ruleForm.email"  placeholder="请输入你的邮箱">
                    </el-input>
                </el-form-item>
                <el-form-item >
                    <el-row :gutter="20">
                        <el-col :span="14">
                            <el-input  prefix-icon="el-icon-key" v-model="ruleForm.checkTelMa"  placeholder="请输入验证码">
                            </el-input>
                        </el-col>
                        <el-col :span="10">
                            <input  id="sendMsg"   @click="sendMeg" v-model="sendMessage" readonly > 
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <a-button type="primary" block  @click="submitForm('ruleForm')" size="large" style="margin-top:80px">
                        确定
                    </a-button>
                </el-form-item>
            </el-form>
	    </div>
	</div>
</template>
<script>
import {HTTPURL} from '@/api/requestUrl';
import { sendVerifyEmail,verifyEmailCode} from '@/api/safeSet';
export default {
    data() {
        return {
            title:'密保邮箱',
            ruleForm: {
                email:'',
                checkTelMa:'',
            },
            countdown : 60,
            sendMessage: '发送验证码',
            rules: {
                email: [
                    { required: true, message: '请输入你的邮箱', trigger: 'blur' }
                ],
                 checkTelMa: [
                    { required: true, message: '请输入手机号', trigger: 'blur' }
                ],
            },
            timer:null,
        }
    },
    created() {
        if(this.$route.query.val==0){
            this.title="密保邮箱"
        }else{
            this.title="更改密保邮箱"
        }
    },
    methods: {
        makSure(){
            this.closeDialog();
        },
        sendMeg(){
            var emailTemplate=this.$route.query.val==0?"BIND_EMAIL":"CHANGE_EMAIL";
            var formData = new FormData(); 
            formData.append('email',this.ruleForm.email);
            formData.append('emailTemplate',emailTemplate); 
            let config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }; 

            sendVerifyEmail(formData,config).then(res => {
                if(res.code == 200000) {
                    this.settime();
                }else {
                    this.$message.error(res.message);
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
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                var formData = new FormData(); 
                formData.append('email',this.ruleForm.email);
                formData.append('code',this.ruleForm.checkTelMa); 
                let config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }; 
                verifyEmailCode(formData,config).then(res => {
                    if(res.code == 200000) {
                        this.$message.success(`修改成功`);
                        this.$store.dispatch('getUserInfo');
                         setTimeout(()=>{
                              this.$router.push({
                                    path:'/safeSet'
                                })
                         },1000)
                       
                    }else {

                    }
                }).catch(err => {

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