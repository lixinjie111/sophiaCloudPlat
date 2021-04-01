<template>
  <div class="busEt">
    <a-page-header
      style="borderBottom: 1px solid rgb(235, 237, 240)"
      title="修改登录密码"
    >
    </a-page-header>
    <div class="content">
      <div class="title">新密码至少6位，字母、数字和特殊符号至少包含2种</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0"
        class="demo-ruleForm"
      >
        <el-form-item prop="oldPass">
          <el-input
            type="password"
            prefix-icon="el-icon-lock"
            v-model="ruleForm.oldPass"
            placeholder="请输入旧密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            type="password"
            prefix-icon="el-icon-lock"
            v-model="ruleForm.pass"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            type="password"
            prefix-icon="el-icon-lock"
            v-model="ruleForm.checkPass"
            placeholder="请再次输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <a-button
            type="primary"
            block
            @click="submitForm('ruleForm')"
            size="large"
          >
            确认修改
          </a-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { modifyPassword } from "@/api/safeSet";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
            var patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im; 
            let reTest=false;
            if (patrn.test(this.ruleForm.checkPass)) {// 如果包含特殊字符返回false
                reTest=true;
            }else{
                reTest=false;
            }
            let reTest1=false;
            var patrn1 =  /\d/;
            if (patrn1.test(this.ruleForm.checkPass)) {
                reTest1=true;
            }else{
                reTest1=false;
            }
            let reTest2=false;
            var patrn2 =  /[a-zA-Z]/;
            if (patrn2.test(this.ruleForm.checkPass)) {// 如果包含特殊字符返回false
                reTest2=true;
            }else{
                 reTest2=false;
            }
            if(this.ruleForm.checkPass.length>=6&&this.ruleForm.checkPass.length<=20){
                if(reTest&&reTest1||reTest&&reTest2||reTest1&&reTest2){
                //    this.$refs.ruleForm.validateField("checkPass");
                callback();
                }else{
                   callback(new Error("字母、数字和特殊符号至少包含2种"));
                } 
            }else{
                callback(new Error("长度在6位到20位之间"));
            }
        }
        
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldPass: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        oldPass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  created() {
    //this.initInfo();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            var formData = new FormData(); 
            formData.append('oldPassword',this.ruleForm.oldPass);
            formData.append('newPassword',this.ruleForm.pass); 
            formData.append('confirmPassword',this.ruleForm.checkPass); 
            let config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }; 
            modifyPassword(formData,config).then(res => {
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
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.busEt {
  color: rgba(103, 105, 112, 1);
  .content {
    padding: 0 24px;
    .demo-ruleForm {
      width: 300px;
      margin: auto;
    }
    .title {
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
