<template>
    <div class="busEt">
          <a-page-header
            style="borderBottom: 1px solid rgb(235, 237, 240)"
            title="修改登录密码"
         >
        </a-page-header>
        <div class="content">
            <div class="title">新密码至少6位，字母、数字和标点符号至少包含2种</div>
            <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
                <el-form-item  prop="oldPass">
                    <el-input type="password" prefix-icon="el-icon-lock" v-model="ruleForm.oldPass"  placeholder="请输入旧密码"></el-input>
                </el-form-item>
                <el-form-item  prop="pass">
                    <el-input type="password" prefix-icon="el-icon-lock" v-model="ruleForm.pass" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item  prop="checkPass">
                    <el-input type="password" prefix-icon="el-icon-lock" v-model="ruleForm.checkPass" placeholder="请再次输入新密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <a-button type="primary" block  @click="submitForm('ruleForm')" size="large">
                        确认修改
                    </a-button>
                </el-form-item>
            </el-form>
	    </div>
	</div>
</template>

<script>
import {HTTPURL} from '@/api/requestUrl';
import { updateInfo} from '@/api/user';
console.log(HTTPURL)
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
            }
        };
         var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        return {
            ruleForm: {
                oldPass:'',
                pass: '',
                checkPass: '',
            },
             rules: {
                oldPass: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            }
        }
    },
    created() {
        //this.initInfo();
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
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
        }
    }
 			
			
</style>