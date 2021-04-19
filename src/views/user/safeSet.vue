<template>
    <div class="busEt">
        <safeAlert @closeDialog1="closeDialog1" @closeDialog2="closeDialog2" v-if="isAlert" :path="path" :useTel="userInfomation.mobile"></safeAlert>  
        <div class="coverBg" v-show="coverBg">
            <div class="safeCheck">
                <div class="safeHeader"><span>登录保护设置</span><img src="../../assets/images/login/close.png" class="close" @click="closeDialog"></div>
                <div class="safeContent">
                     <div class="safeTip">开启登录保护后，可以对登录者身份进行二次验证，以保证你的账户安全。</div>
                     <el-form :model="ruleForm"  label-width="0">
                            <el-form-item  prop="isOpen">
                                <el-radio-group v-model="ruleForm.isOpen">
                                    <el-radio label="不开启"></el-radio>
                                    <el-radio label="开启"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <template v-if="ruleForm.isOpen=='开启'">
                                <el-form-item >
                                    <el-checkbox v-model="checkedTel" disabled>手机短信验证</el-checkbox>
                                    <span  class="lv">已设置</span>
                                </el-form-item>
                                <el-form-item >
                                    <el-checkbox v-model="checkedMFA" disabled>虚拟MFA验证</el-checkbox>
                                    <span class="lan">未设置</span>
                                </el-form-item>
                                <el-form-item >
                                    <a-alert
                                        message="虚拟MFA和硬件MFA较短信验证安全级别高，建议择一开启。"
                                        banner 
                                        type="warning"
                                    />
                                </el-form-item>
                            </template>
                    </el-form>
                    <div class="submit" @click="makSure">
                        <span style="margin-right:5px">确定</span>
                    </div>
                </div>   
            </div>
        </div>
          <a-page-header
            style="borderBottom: 1px solid rgb(235, 237, 240)"
            title="安全设置"
         >
        </a-page-header>
        <div class="content">
            <div class="list header">
                <div class="left">
                    <div class="title">账号安全等级</div>
                    <div class="desc">安全级别：
                        <span style="color:#f5222d" v-if="level<2">低</span>
                        <span style="color:#52c41a" v-else-if="level>3">高</span>
                        <span style="color:#FAAD14" v-else>中</span>
                    </div>
                </div>
                <div class="rt">
                    <a-progress :showInfo="false" :percent="30" status="exception" v-if="level<2"/>
                    <a-progress :showInfo="false" :percent="80" status="success" v-else-if="level>3"/>
                    <a-progress :showInfo="false" :percent="50" stroke-color="#FAAD14" v-else/>
                </div>
            </div>
            <div class="list">
                <div class="left">
                    <div class="title">登录密码</div>
                    <div class="desc">安全性高的密码可以使帐号更安全。建议您定期更换密码，设置一个包含字母，符号或数字中至少两项且长度超过6位的密码。</div>
                </div>
                <div class="rt">
                    <div class="isSet" v-if="isloginSet">
                        <a-icon type="check-circle"  :style="{ fontSize: '16px', color: '#51C41B' }"/>
                        <span style="color:#51C41B;margin-left:10px ">已设置</span>    
                        <a-divider type="vertical" />
                        <span style="color: #0376FD; "  @click="modify(0)" class="btn">修改</span>    
                    </div>
                    <div class="isSet" v-else>
                       <a-icon type="info-circle"  :style="{ fontSize: '16px', color: '#FAAD14' }"/>
                       <span style="color:#FAAD14;margin-left:10px ">未设置</span>   
                       <a-divider type="vertical" />
                       <span style="color: #0376FD; " class="btn">设置</span>  
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="left">
                    <div class="title">手机绑定</div>
                    <div class="desc" v-if="istelSet">您已绑定了手机<span style="color:#51C41B; ">{{tel}}</span>[您的手机号可以直接用于登陆、找回密码等]</div>
                    <!-- <div class="desc"  v-else>密保手机能够完成登录时的二次校验，提升账户安全等级，同时可以用来找回密码和接收相关安全提醒信息。</div> -->
                </div>
                <div class="rt">
                    <div class="isSet" v-if="istelSet">
                        <a-icon type="check-circle"  :style="{ fontSize: '16px', color: '#51C41B' }"/>
                        <span style="color:#51C41B;margin-left:10px " >已设置</span>    
                        <a-divider type="vertical" />
                        <span style="color: #0376FD; " class="btn" @click="modifyTel">修改</span>    
                    </div>
                    <!-- <div class="isSet" v-else>
                       <a-icon type="info-circle"  :style="{ fontSize: '16px', color: '#FAAD14' }"/>
                       <span style="color:#FAAD14;margin-left:10px ">未设置</span>   
                       <a-divider type="vertical" />
                       <span style="color: #0376FD; " class="btn" @click="modifyTel(0)">设置</span>  
                    </div> -->
                </div>
            </div>
            <div class="list">
                <div class="left">
                    <div class="title">邮箱绑定</div>
                    <div class="desc" v-if="ismailSet">您已经绑定了邮箱<span style="color:#51C41B; ">{{new_email}}</span>[您的邮箱可用于接收Sophia云平台发送给您的各种通知]</div>
                    <div class="desc" v-else>绑定邮箱能够提升账户安全等级，同时可用于接收Sophia云平台发送给您的各种通知，如实例创建成功提醒、实例到期提醒等。</div>
                </div>
                <div class="rt">
                    <div class="isSet" v-if="ismailSet">
                        <a-icon type="check-circle"  :style="{ fontSize: '16px', color: '#51C41B' }"/>
                        <span style="color:#51C41B;margin-left:10px ">已设置</span>    
                        <a-divider type="vertical" />
                        <span style="color: #0376FD; " class="btn" @click="modifyEmail(1)">修改</span>    
                    </div>
                    <div class="isSet" v-else>
                       <a-icon type="info-circle"  :style="{ fontSize: '16px', color: '#FAAD14' }"/>
                       <span style="color:#FAAD14;margin-left:10px ">未设置</span>   
                       <a-divider type="vertical" />
                       <span style="color: #0376FD; " class="btn" @click="modifyEmail(0)">设置</span>  
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="left">
                    <div class="title">登录保护</div>
                    <div class="desc" v-if="isProSet"><span style="color:#51C41B; ">手机短信验证</span>登录保护已开启，登录时将进行身份验证，以保护账户安全。</div>
                    <div class="desc" v-else>开启登录保护，登录时将进行身份验证，以保护账户安全。</div>
                </div>
                <div class="rt">
                    <div class="isSet" v-if="isProSet">
                        <a-icon type="check-circle"  :style="{ fontSize: '16px', color: '#51C41B' }"/>
                        <span style="color:#51C41B;margin-left:10px ">已设置</span>    
                        <a-divider type="vertical" />
                        <span style="color: #0376FD; " class="btn"  @click="proCk">修改</span>    
                    </div>
                    <div class="isSet" v-else>
                       <a-icon type="info-circle"  :style="{ fontSize: '16px', color: '#FAAD14' }"/>
                       <span style="color:#FAAD14;margin-left:10px ">未设置</span>   
                       <a-divider type="vertical" />
                       <span style="color: #0376FD; " class="btn" @click="proCk">设置</span>  
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="left">
                    <div class="title">虚拟MFA</div>
                    <div class="desc">虚拟MFA可用于开启登录保护，对登录身份进行二次验证，从而保护你的账户安全。</div>
                </div>
                <div class="rt">
                    <div class="isSet" v-if="isSet">
                        <a-icon type="check-circle"  :style="{ fontSize: '16px', color: '#51C41B' }"/>
                        <span style="color:#51C41B;margin-left:10px ">已设置</span>    
                        <a-divider type="vertical" />
                        <span style="color: #0376FD; " class="btn">修改</span>    
                    </div>
                    <div class="isSet" v-else>
                       <a-icon type="info-circle"  :style="{ fontSize: '16px', color: '#FAAD14' }"/>
                       <span style="color:#FAAD14;margin-left:10px ">未设置</span>   
                       <a-divider type="vertical" />
                       <span style="color: #0376FD; " class="btn">设置</span>  
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="left">
                    <div class="title">账号注销</div>
                    <div class="desc">如果您不再使用此账号，可以将其注销。账号成功注销后，其下所有服务、数据及隐私信息将会被删除并将无法恢复。</div>
                </div>
                <div class="rt">
                       <span style="color: #0376FD; " class="btn" @click="gozhuxiao">注销账号</span>  
                </div>
            </div>
	    </div>
	</div>
</template>

<script>
import {HTTPURL} from '@/api/requestUrl';
import safeAlert from './safeAlert';
import { updateInfo} from '@/api/user';
import { securityInfo,disableProtect,enableProtect} from '@/api/safeSet';
console.log(HTTPURL)
export default {
    data() {
        return {
            path:"",
            ruleForm:{
                isOpen:"不开启"
            },
            checkedTel:false,
            checkedMFA:false,
            coverBg:false,
            isSet:false,
            isloginSet:true,
            istelSet:true,
            ismailSet:false,
            isProSet:false,
            level:0,
            isAlert:false,
            safeInfo:{},
            userInfomation:{},

            tel:'',
            new_email:''
            
        }
    },
    components:{
        safeAlert
    },
    created() {
        this.initInfo();
        this.initInfo1();
    },
    methods: {
        initInfo1(){
            this.userInfomation=JSON.parse(localStorage.getItem('yk-userInfo'));
            this.tel = this.userInfomation.mobile.substr(0,3)+"****"+this.userInfomation.mobile.substr(7);
            var str =  this.userInfomation.email.split('@'),
    　　　　　　_s = '';
    　　　　if (str[0].length > 3) {
    　　　　　　for (var i = 0; i < str[0].length - 3; i++) {
    　　　　　　　　_s += '*';
    　　　　　　}
    　　　　}
    　　　　this.new_email = str[0].substr(0, 3) + _s + '@' + str[1];
        },
        initInfo(){
            securityInfo().then(res=>{
                if(res.code==200000){
                    this.level=res.data.securityLevel;
                    this.isloginSet=res.data.passwordIsSet;
                    this.istelSet=res.data.mobileIsSet;
                    this.isSet=res.data.mfaIsSet;
                    this.ismailSet=res.data.emailIsSet;
                    this.isProSet=res.data.loginProtect;
                    if(res.data.loginProtect){
                        this.ruleForm.isOpen="开启"
                        this.checkedTel=true;
                    }else{
                        this.ruleForm.isOpen="不开启" 
                        this.checkedTel=false;
                    }
                    
                }
            })
        },
        closeDialog1(){
            this.isAlert=false;
        },
        closeDialog2(){
            this.isAlert=false;
            this.coverBg=true;
        },
        proCk(){
            this.path=1;
            this.isAlert=true;
            //this.coverBg=true;
        },
        makSure(){
            var formData = new FormData(); 
            formData.append('protectType','MOBILE');
            let config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }; 
            if(this.ruleForm.isOpen=="开启"){
                enableProtect(formData,config).then(res => {
                    if(res.code == 200000) {
                        this.$message.success(`修改成功`);
                        this.coverBg=false;
                        this.$store.dispatch('getUserInfo');
                         setTimeout(()=>{
                                this.initInfo();
                                this.initInfo1();
                         },300)
                       
                    }else {

                    }
                }).catch(err => {

                })
            }else{
                disableProtect().then(res => {
                    if(res.code == 200000) {
                        this.$message.success(`修改成功`);
                        this.coverBg=false;
                        this.$store.dispatch('getUserInfo');
                         setTimeout(()=>{
                               this.initInfo();
                                this.initInfo1();
                         },300)
                       
                    }else {

                    }
                }).catch(err => {

                })

            }
            
            
        },
        closeDialog(){
            this.coverBg=false;
        },
        modify(val){
            this.path="/modifyPwd";
            this.isAlert=true;
        },
        modifyTel(item){ 
            this.path="/modifyTel";
            this.isAlert=true;
        },
        modifyEmail(item){ 
            this.path="/safeEmail?val="+item;
            this.isAlert=true;
        },
        gozhuxiao(){
            this.$router.push({
                path:'/agmAndfd'
            });
        }
    }
}
</script>
<style lang="scss" scoped>
	.busEt{
        color:rgba(103,105,112,1);
        .coverBg{
            position: fixed;
            left:0;
            top:0;
            right:0;
            bottom:0;
            background: rgba(18,28,51,.8);
            z-index: 999999;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .safeCheck{
            background: #fff;
            z-index: 10;
            width: 500px;
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
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #3D4966;
                    line-height: 22px;
                    margin-bottom: 10px;
                }
                .lv{
                    margin-left: 20px;
                    color:#51C41B
                }
                .lan{
                    margin-left: 20px;
                    color:#0376FD;
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
        .content{
            padding:0 24px;
            .list{
                &.header{
                    border:none
                }
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 20px 0;
                border-bottom:1px solid #E4E7ED;
                padding-right: 20px;
                .rt{
                    width: 150px;
                     display: flex;
                     align-items: center;
                     margin-left: 20px;
                     justify-content: flex-end;
                     .btn{
                         cursor: pointer;
                     }
                }
                .left{
                    flex:1;
                    .title{
                        font-size: 14px;
                        font-family: PingFangSC-Semibold, PingFang SC;
                        font-weight: 600;
                        color: #303133;
                        line-height: 22px;
                    }
                    .desc{
                        margin-top: 8px;
                        color: #909399;
                        font-size: 14px;
                        font-family: PingFangSC-Semibold, PingFang SC;
                    }
                }
                
            }
        }
    }
 			
			
</style>