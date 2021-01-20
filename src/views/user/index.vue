<template>
    <div class="busEt">
        <a-modal
            title="添加预警通知联系人"
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
                <el-form-item label="手机号码" prop="tel">
                    <el-input v-model="ruleForm.tel"></el-input>
                </el-form-item>
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
                       <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="">
                   </div>
                   <p>jack</p>
                </a-col>
                <a-col :span="6">
                    <div class="msg">
                       <p>登录账号：test demo</p>
                        <p>联系人：jack</p>
                        <p>个人认证：--</p>
                   </div>
                </a-col>
                <a-col :span="6">
                     <div class="msg">
                        <p>账号ID：ewaffffff</p>
                        <p>联系电话：15322322121</p>
                        <p>企业认证：北京好生活网络科技有限公司</p>
                   </div>
                </a-col>
                <a-col :span="6">
                    <div class="msg">
                       <p>注册时间 ：2020-9-21 12:43:32</p>
                   </div>
                </a-col>
            </a-row>
	    </div>
	</div>
</template>

<script>
export default {
    data() {
        return {
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
            ruleForm: {
                uName: 'test demo',
                type: '1',
                name: '',
                tel: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                tel: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                ],
            }
            
        }
    },
    created() {
    },
    methods: {
       callback(key) {
            console.log(key);
       },
       onSearch(value) {
        console.log(value);
        },
        onChange(checked,ev) {
            checked.isCheck = !checked.isCheck;
            console.log(checked,ev);
        },
        showModal() {
            this.visible = true;
        },
        handleOk(e) {
            this.ModalText = 'The modal will be closed after two seconds';
            this.confirmLoading = true;
            setTimeout(() => {
                this.visible = false;
                this.confirmLoading = false;
            }, 2000);
        },
        handleCancel(e) {
            console.log('Clicked cancel button');
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