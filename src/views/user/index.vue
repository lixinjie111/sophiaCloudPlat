<template>
    <div class="busEt">
        <a-modal
            title="编辑基本资料"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
            ok-text="确定" cancel-text="取消"
            >
           <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="uName" >
                    <el-input v-model="ruleForm.uName" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="用户类型" prop="type" disabled>
                    <el-radio-group v-model="ruleForm.type" disabled>
                    <el-radio label="0" name="0">企业</el-radio>
                    <el-radio label="1" name="1">个人</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="联系人" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <!-- <el-form-item label="手机号码" prop="tel">
                    <el-input v-model="ruleForm.tel"></el-input>
                </el-form-item> -->
            </el-form>    
        </a-modal>
          <a-page-header
            style="borderBottom: 1px solid rgb(235, 237, 240)"
            title="基本资料"
         >
           <template slot="extra">
                <a-icon type="form" style="font-size: 24px;cursor:pointer" @click="showModal"/>
            </template>
        </a-page-header>
        <div class="content">
            <a-row>
                <a-col :span="6">
                   <div class="avtaor">
                          <!-- :headers="headers" -->
                          <!-- :data="uploadData" -->
                       <img :src="avatUrl" alt="" @click="goLink(userInfomation.icon)">
                      <a-upload
                            name="file"
                            :headers="headers"
                            :multiple="false"
                            :action="toUrl"
                            :showUploadList="false"
                            @change="handleChange"
                        >
                            <span class="uptate">修改头像</span>
                        </a-upload>
                       
                   </div>
                   <p>{{userInfomation.username}}</p>
                </a-col>
                <a-col :span="6">
                    <div class="msg">
                       <p>登录账号：{{userInfomation.name}}</p>
                        <p>联系人：{{userInfomation.username}}</p>
                        <p>邮箱：{{userInfomation.email}}</p>
                   </div>
                </a-col>
                <a-col :span="6">
                     <div class="msg">
                        <p>账号ID：{{userInfomation.userId}}</p>
                        <p>联系电话：{{userInfomation.mobile}}</p>
                        <p>企业认证：{{userInfomation.emergencyContactPhone}}</p>
                   </div>
                </a-col>
                <a-col :span="6">
                    <div class="msg">
                       <p>注册时间 ：{{userInfomation.createTime}}</p>
                   </div>
                </a-col>
            </a-row>
	    </div>
	</div>
</template>

<script>
import {HTTPURL} from '@/api/requestUrl';
import { updateInfo} from '@/api/user';
export default {
    data() {
        return {
            headers: {
                'accessToken': localStorage.getItem('yk-token')?localStorage.getItem('yk-token'):'',
            },
            toUrl:HTTPURL+'/ucenter/upload',
            // uploadData: {
            //     'fileType': "image",
            // },
            userInfomation:{},
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
            ruleForm: {
                uName: '',
                type: '0',
                name: '',
                //tel: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                // tel: [
                //     { required: true, message: '请输入手机号', trigger: 'blur' },
                // ],
            },
            avatUrl:'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
            
        }
    },
    created() {
        this.initInfo();
    },
    methods: {
        goLink(item){
            window.open(item);
        },
        imgLoad(){
            this.$message.success(`修改成功1`);
        },
        initInfo(val){
            this.userInfomation=JSON.parse(localStorage.getItem('yk-userInfo'));
            this.ruleForm.uName=this.userInfomation.name;
            this.avatUrl = this.userInfomation.icon;
            this.$forceUpdate();
            if(val==1){
                 this.$message.success(`修改成功`);
            }
        },
        handleChange(info) {
            // if (info.file.status !== 'uploading') {
            //     console.log(info.file, info.fileList);
            // }
            if (info.file.status === 'done') {
                if(info.file.response.code==200000){
                    this.userInfomation.icon=info.file.response.data;
                    this.handleOk1();
                }else{
                    this.$message.error(`上传失败`);
                }
            } else if (info.file.status === 'error') {
                this.$message.error(`上传失败`);
            }
        },
        onChange(checked,ev) {
            checked.isCheck = !checked.isCheck;
        },
        showModal() {
            this.visible = true;
        },
        handleOk(e) {
             this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                     this.confirmLoading = true;
                    let _param ={
                        //"mobile":  this.ruleForm.tel,
                        "username": this.ruleForm.name
                    };
                    updateInfo(_param).then(res => {
                        if(res.code == 200000) {
                            this.$store.dispatch('getUserInfo');
                            setTimeout(()=>{
                                this.initInfo();
                                this.visible = false;
                                this.confirmLoading = false;
                                this.$message.success(`修改成功`);
                            },1000)
                        }else {
                            
                        }
                    }).catch(err => {

                    })
                } else {
                    
                    return false;
                }
            });
        },
        handleOk1(e) {
            let _param ={
                "icon": this.userInfomation.icon,
            };
            updateInfo(_param).then(res => {
                if(res.code == 200000) {
                    this.$store.dispatch('getUserInfo');
                    setTimeout(()=>{
                        this.initInfo(1);
                    },1000)
                }else {
                    
                }
            }).catch(err => {

            })
        },
        handleCancel(e) {
            this.visible = false;
        },
    }
}
</script>
<style lang="scss" scoped>
	.busEt{
        color:rgba(103,105,112,1);
        .content{
            padding:0 24px;
            .avtaor{
                width: 100px;
                height: 100px;
                border-radius: 50%;
                overflow: hidden;
                margin: 8px auto;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                border:1px solid #ccc;
                img{
                    cursor: pointer;
                }
                .uptate{
                    position: absolute;
                    width: 70px;
                    left:0;
                    right: 0;
                    margin: auto;
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #FFFFFF;
                    padding:3px 8px;
                    bottom: 10px;
                    background: rgba(0,0,0,0.5);
                    cursor: pointer;
                }
            }
            .msg{
                text-align: left;
                width: 300px;
                margin: 8px auto;
                p{
                    padding:5px 0;
                }
            }
        }
           .ant-col{
                padding: 16px 0;
                margin: 0 auto;
                text-align: center;
                // display: flex;
                // justify-content: center;
                // flex-direction: column;
            }	
    }
 			
			
</style>