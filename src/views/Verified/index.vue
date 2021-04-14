<template>
  <div class="Verified_container">
    <div class="verified_til_container">实名认证</div>
    <div class="verified_con_container" v-if="changeTab == 1">  <!--刚进入实名认证页面，还没有进行实名认证部分-->
      <div class="info_container">
        <div class="info_icon">
          <img :src="info" alt="" srcset="" class="info" />
        </div>
        <div class="info_txt">
          <div class="info_txt_til">您还未进行任何实名认证</div>
          <div class="info_txt_con">
            为了您的账号安全，我们建议您进行实名认证。
          </div>
        </div>
      </div>
      <div class="verifi_type_container">
        <div class="geren">
          <div class="geren_icon_container">
            <img :src="humanPng" alt="" srcset="" class="humanPng" />
          </div>
          <div class="geren_til_txt">个人认证</div>
          <div class="geren_til_info">适用于个人用户</div>
          <div class="wendang_container">
            相关文档：<span style="color: #0376fd">个人如何完成实名认证 ></span>
          </div>
        </div>
        <div class="qiye" @click="changeTabFn(2)">
          <div class="geren_icon_container">
            <img :src="humanPng" alt="" srcset="" class="humanPng" />
          </div>
          <div class="geren_til_txt">企业认证</div>
          <div class="geren_til_info">含企业、政府、事业单位、团体、组织</div>
          <div class="wendang_container">
            相关文档：<span style="color: #0376fd">企业如何完成实名认证 ></span>
          </div>
        </div>
      </div>
    </div>
    <div class="verified_con_container" v-else-if="changeTab == 3"> <!--企业实名认证失败部分页面-->
      <div class="info_container fail_info_container">
        <div class="info_icon">
          <img :src="error" alt="" srcset="" class="info" />
        </div>
        <div class="info_txt">
          <div class="info_txt_til">企业实名认证失败！</div>
          <div class="info_txt_con">
            您的企业认证审核不通过，请修改相关<span style="color:#0376FD;" class="qyrz_txt" @click="goEdit">企业认证</span>信息。
          </div>
        </div>
      </div>
      <div class="verifi_type_container">
        <div class="geren">
          <div class="geren_icon_container">
            <img :src="humanPng" alt="" srcset="" class="humanPng" />
          </div>
          <div class="geren_til_txt">个人认证</div>
          <div class="geren_til_info">适用于个人用户</div>
          <div class="wendang_container">
            相关文档：<span style="color: #0376fd">个人如何完成实名认证 ></span>
          </div>
        </div>
        <div class="qiye" @click="changeTabFn(2)">
          <div class="geren_icon_container">
            <img :src="humanPng" alt="" srcset="" class="humanPng" />
          </div>
          <div class="geren_til_txt">企业认证</div>
          <div class="geren_til_info">含企业、政府、事业单位、团体、组织</div>
          <div class="wendang_container">
            相关文档：<span style="color: #0376fd">企业如何完成实名认证 ></span>
          </div>
        </div>
      </div>
    </div>
    <div class="verified_con_container" v-else-if="changeTab == 4"> <!--企业实名认证成功部分页面-->
      <div class="info_container success_info_container">
        <div class="info_icon">
          <img :src="successIcon" alt="" srcset="" class="info" />
        </div>
        <div class="info_txt">
          <div class="info_txt_til">您已经成功完成企业实名认证！</div>
          <div class="info_txt_con">
            您已经完成企业实名认证，可以继续购买和使用Sophia云产品
          </div>
        </div>
      </div>
      <div class="verifi_type_container">
        <div class="geren">
          <div class="geren_icon_container">
            <img :src="humanPng" alt="" srcset="" class="humanPng" />
          </div>
          <div class="geren_til_txt">企业认证</div>
          <div class="geren_til_info">含企业、政府、事业单位、团体、组织</div>
          <div class="wendang_container">
            相关文档：<span style="color: #0376fd">企业如何完成实名认证 ></span>
          </div>
        </div>
        <div class="qiye qiyedata">
          <div class="qiyedata_item">
            <div class="qiye_label">企业名称：</div>
            <div>{{comInfObj.enterpriseName}}</div>
          </div>
          <div class="qiyedata_item">
            <div class="qiye_label">证件号码：</div>
            <div>{{comInfObj.businessLicenseNumber}}</div>
          </div>
          <div class="qiyedata_item">
            <div class="qiye_label">认证时间：</div>
            <div>{{comInfObj.createTime}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="verified_step_container" v-else-if="changeTab == 2"> <!--企业实名认证填写资料部分页面-->
      <div class="step_til_container">欢迎进行Sophia云平台企业认证</div>
      <div class="step_con_container">
        <el-steps
          :space="370"
          :active="stepNum"
          finish-status="success"
          style="width: 76%"
        >
          <el-step title="填写认证信息"></el-step>
          <el-step title="人工审核"></el-step>
          <el-step title="认证结果"></el-step>
        </el-steps>
      </div>
      <div class="main_info_container">
        <div class="main_info_lef">
          <div class="label_til">
            <img :src="starIcon" alt="" srcset="" class="starIcon" />
            <span>组织类型</span>
          </div>
          <div class="zuzhi_type_container">
            <div
              class="zuzhi_type_lef"
              :class="{ activeTab: ifShowCheck == 1 }"
              @click="clickTabType(1)"
            >
              <div class="type_icon_container">
                <img :src="humanPng" alt="" srcset="" class="type_icon" />
              </div>
              <div class="type_txt_container">
                <div class="type_txt_top">
                  企业<img :src="helpIcon" class="helpIcon" />
                </div>
                <div class="type_txt_bom">领取营业执照的企业</div>
              </div>
              <div class="checkBox_container" v-if="ifShowCheck == 1">
                <el-checkbox v-model="typeChecked" size="medium"></el-checkbox>
              </div>
            </div>
            <div
              class="zuzhi_type_rig"
              :class="{ activeTab: ifShowCheck == 2 }"
              @click="clickTabType(2)"
            >
              <div class="type_icon_container">
                <img :src="humanPng" alt="" srcset="" class="type_icon" />
              </div>
              <div class="type_txt_container">
                <div class="type_txt_top">
                  其他组织<img :src="helpIcon" class="helpIcon" />
                </div>
                <div class="type_txt_bom">机关、事业单位等</div>
              </div>
              <div class="checkBox_container" v-if="ifShowCheck == 2">
                <el-checkbox v-model="typeChecked" size="medium"></el-checkbox>
              </div>
            </div>
          </div>

          <div class="qiye_con_container" v-if="ifShowCheck == 1">
            <el-form
            :model="qiyeObj"
            :rules="qiyeRules"
            :disabled="ifDisabledQy"
            ref="ruleForm"
            >
              <el-form-item key="qiyeName" prop="qiyeName" :label="labelInfoObj.laebl1">
                  <el-input
                  v-model="qiyeObj.qiyeName"
                  placeholder="请输入企业名称"
                  ></el-input>
              </el-form-item>
              <div class="label_info_txt">{{ labelInfoObj.info1 }}</div>
              <el-form-item key="comYinyeNum" prop="comYinyeNum" :label="labelInfoObj.laebl2">
                  <el-input
                  v-model="qiyeObj.comYinyeNum"
                  placeholder="请输入营业执照注册号"
                  ></el-input>
              </el-form-item>
              <div class="label_info_txt">{{ labelInfoObj.info2 }}</div>
              <div class="label_til">
                  <img :src="starIcon" alt="" srcset="" class="starIcon" />
                  <span>{{ labelInfoObj.laebl3 }}</span>
              </div>
              <div class="upload_container">
                  <div class="upload_con">
                      <el-upload
                        class="avatar-uploader"
                        style="width:100%;height:100%;"
                        :action="toUrl"
                        drag
                        multiple
                        :show-file-list="false"
                        :headers="headers"
                        :on-success="qyhandleAvatarSuccess"
                        :before-upload="qybeforeAvatarUpload">
                        <img v-if="qyimageUrl" :src="qyimageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                  </div>
                  <div class="upload_txt">可拖拽照片到左侧区域上传</div>
              </div>
            </el-form>
            <div class="submit_btn_container">
                <div class="submit_btn" @click="qiyeDSubmit('ruleForm')">提交审核</div>
            </div>
          </div>
          <div class="zuzhi_con_container" v-else>
            <el-form
            :model="zuzhiObj"
            :rules="zuzhiRules"
            :disabled="ifDisabledzz"
            ref="zzruleForm"
            >
              <el-form-item key="zuzhiName" prop="zuzhiName" :label="labelInfoObj.laebl1">
                  <el-input
                  v-model="zuzhiObj.zuzhiName"
                  placeholder="请输入组织名称"
                  ></el-input>
              </el-form-item>
              <div class="label_info_txt">{{ labelInfoObj.info1 }}</div>
              <el-form-item key="zuzhiNum" prop="zuzhiNum" :label="labelInfoObj.laebl2">
                  <el-input
                  v-model="zuzhiObj.zuzhiNum"
                  placeholder="请输入组织机构代码"
                  ></el-input>
              </el-form-item>
              <div class="label_info_txt">{{ labelInfoObj.info2 }}</div>
              <div class="label_til">
                  <img :src="starIcon" alt="" srcset="" class="starIcon" />
                  <span>{{ labelInfoObj.laebl3 }}</span>
              </div>
              <div class="upload_container">
                  <div class="upload_con">
                    <el-upload
                          class="avatar-uploader"
                          style="width:100%;height:100%;"
                          :action="toUrl"
                          drag
                          multiple
                          :show-file-list="false"
                          :headers="headers"
                          :on-success="zzhandleAvatarSuccess"
                          :before-upload="zzbeforeAvatarUpload">
                          <img v-if="zzimageUrl" :src="zzimageUrl" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </div>
                  <div class="upload_txt">可拖拽照片到左侧区域上传</div>
              </div>
            </el-form>
            <div class="submit_btn_container">
                <div class="submit_btn" @click="zuzhiSubmit('zzruleForm')">提交审核</div>
            </div>
          </div>

        </div>
        <div class="main_info_rig">
          <div class="watch_info_container">
            <div class="info_icon_container">
              <img :src="info" class="info_icon" />
            </div>
            <div class="info_con_container">
              <div class="info_txt1 info_til">
                {{ labelInfoObj.uploadInfo }}
              </div>
              <div class="info_txt1">清晰的图片可以让您更快通过审核；</div>
              <div class="info_txt1">
                推荐上传扫描文件，拍照请尽量降低反光；
              </div>
              <div class="info_txt1">
                请确保营业执照图片所有信息清晰可见，内容真实有效，无任何修改；
              </div>
              <div class="info_txt1">
                文件大小不超过8M，格式支持 .jpg .jpeg .bmp .png .pdf
              </div>
            </div>
          </div>
          <div class="pict_txt_container">
            <div class="old_pict_txt">
              <div class="old_txt">{{ labelInfoObj.img1 }}</div>
              <div class="old_pic"></div>
            </div>
            <div class="new_pict_txt">
              <div class="old_txt">{{ labelInfoObj.img2 }}</div>
              <div class="old_pic"></div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import {HTTPURL} from '@/api/requestUrl';
import {comAuthentication,getAuthInfo} from '../../api/proSer/index';
export default {
  data() {
    return {
      info: require("../../assets/images/verify/info.png"),
      error: require("../../assets/images/verify/error.png"),
      successIcon:require("../../assets/images/verify/success.png"),
      humanPng: require("../../assets/images/verify/human.png"),
      changeTab: 1,
      stepNum: 1,
      starIcon: require("../../assets/images/verify/starIcon.png"),
      helpIcon: require("../../assets/images/verify/help.png"),
      typeChecked: true,
      ifShowCheck: 1,
      headers:{
        'accessToken': localStorage.getItem('yk-token')?localStorage.getItem('yk-token'):'',
      },
      toUrl:HTTPURL+'/ucenter/upload',
      qiyeObj: {
        qiyeName: "",
        comYinyeNum:''
      },
      zuzhiObj: {
        zuzhiName: "",
        zuzhiNum: "",
      },
      // zuzhiNumObj:{
      //   zuzhiNum: "",
      // },
      qiyeRules: {
        qiyeName: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
        ],
        comYinyeNum: [
          { required: true, message: "请输入营业执照注册号", trigger: "blur" },
        ]
      },
      zuzhiRules: {
        zuzhiName: [{ required: true, message: "请输入组织名称", trigger: "blur" }],
        zuzhiNum: [
          { required: true, message: "请输入组织机构代码", trigger: "blur" },
        ]
      },
      // zuzhiNumRules:{
      //   zuzhiNum: [
      //     { required: true, message: "请输入组织机构代码", trigger: "blur" },
      //   ]
      // },
      labelInfoObj: {
        laebl1: "企业名称",
        info1: "请务必与营业执照上的名称保持一致",
        laebl2: "营业执照注册号",
        info2: "请务必与营业执照上的注册号或统一社会信用代码号一致",
        laebl3: "营业执照扫描件",
        uploadInfo: "上传营业执照注意事项",
        img1: "老版营业执照示例图",
        img2: "新版营业执照示例图",
      },
      labelInfoObj1: {
        laebl1: "企业名称",
        info1: "请务必与营业执照上的名称保持一致",
        laebl2: "营业执照注册号",
        info2: "请务必与营业执照上的注册号或统一社会信用代码号一致",
        laebl3: "营业执照扫描件",
        uploadInfo: "上传营业执照注意事项",
        img1: "老版营业执照示例图",
        img2: "新版营业执照示例图",
      },
      labelInfoObj2: {
        laebl1: "组织名称",
        info1: "请务必与组织机构代码证上的名称保持一致",
        laebl2: "组织机构代码",
        info2: "请务必与组织机构代码证上的编号一致",
        laebl3: "组织机构代码证扫描件",
        uploadInfo: "上传组织机构代码证扫描件注意事项",
        img1: "其他组织证书示例图",
        img2: "其他组织证书示例图",
      },
      ifDisabledQy:false,
      ifDisabledzz:false,
      qyimageUrl: '',
      zzimageUrl:'',
      comInfObj:{}
    };
  },
  created() {
    this.getComInfo();
  },
  methods: {
      qyhandleAvatarSuccess(res, file) {
        // this.qyimageUrl = URL.createObjectURL(file.raw);
        if(file.response.code == 200000){
          this.qyimageUrl = file.response.data;
        }
      },
      zzhandleAvatarSuccess(res, file){
        if(file.response.code == 200000){
          this.zzimageUrl = file.response.data;
        }
      },
      qybeforeAvatarUpload(file) {
        console.log(file,'file')
        const isLt2M = file.size / 1024 / 1024 < 8;
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/bmp') {
          let imgType = file.type.split('/')[1];
          this.$message.error(`上传头像图片不能是 ${imgType} 格式!`);
          return false;
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 8MB!');
          return false;
        }
        return true;
      },
      zzbeforeAvatarUpload(file){
        console.log(file,'file')
        const isLt2M = file.size / 1024 / 1024 < 8;
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/bmp') {
          let imgType = file.type.split('/')[1];
          this.$message.error(`上传头像图片不能是 ${imgType} 格式!`);
          return false;
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 8MB!');
          return false;
        }
        return true;
      },
      getComInfo(){
        getAuthInfo().then(res=>{
          if(res.code == 200000){
            var authObj = res.data || {};
            if(authObj.authType == 1){ //企业类认证结果查询
              this.ifShowCheck = 1;
              this.$store.dispatch('setBusInfo');
              if(authObj.status == 0){ //审核中
              this.$message.info("审核中！");
                this.changeTab = 2;
                this.stepNum = 2;
                this.ifDisabledQy = true;
                this.qiyeObj.comYinyeNum = authObj.businessLicenseNumber;
                this.qiyeObj.qiyeName = authObj.enterpriseName;
                this.qyimageUrl = authObj.businessLicenseImage;
              }
              else if(authObj.status == 1){  //失败
                this.changeTab = 3;
              }
              else if(authObj.status == 2){  //成功
                this.changeTab = 4;
                this.comInfObj = authObj;
              }
              else if(authObj.status == 3){ //未提交
                this.changeTab == 1;
              }
            }
            else if(authObj.authType == 2){  //组织类认证结果查询
              this.ifShowCheck = 2;
              if(authObj.status == 0){ //审核中
                this.$message.info("审核中！");
                this.changeTab = 2;
                this.stepNum = 2;
                this.ifDisabledzz = true;
                this.zuzhiObj.zuzhiNum = authObj.businessLicenseNumber;
                this.zuzhiObj.zuzhiName = authObj.enterpriseName;
                this.zzimageUrl = authObj.businessLicenseImage;
              }
              else if(authObj.status == 1){  //失败
                this.changeTab = 3;
              }
              else if(authObj.status == 2){  //成功
                this.changeTab = 4;
                this.comInfObj = authObj;
              }
              else if(authObj.status == 3){ //未提交
                this.changeTab == 1;
              }
            }
          }
          else{
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err=>{
          this.$message.error("请求失败！");
        });
      },
      changeTabFn(arg) {
        this.changeTab = arg;
      },
      goEdit(){
        this.changeTab = 2;
      },
      clickTabType(arg) {
        this.ifShowCheck = arg;
        if (arg == 1) {
          this.labelInfoObj = this.labelInfoObj1;
        } else {
          this.labelInfoObj = this.labelInfoObj2;
        }
      },
      qiyeDSubmit(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
              var qiyeObj = this.qiyeObj;
              var parms = {
                  authType:1,
                  businessLicenseImage:this.qyimageUrl,
                  businessLicenseNumber:qiyeObj.comYinyeNum,
                  enterpriseName:qiyeObj.qiyeName
              };
              this.stepNum = 2;
              this.ifDisabledQy = true;
              comAuthentication(parms).then(res=>{
                if(res.code == 200000){
                  this.getComInfo();
                }
                else{
                  this.$message.error(res.message || "请求失败！");
                  this.getComInfo();
                }
              }).catch(err=>{
                console.log(err)
              });
            } else {
              console.log('error submit!!');
              return false;
            }
        });
      },
      zuzhiSubmit(formName){
        this.$refs[formName].validate((valid) => {
            if (valid) {
              var zuzhiObj = this.zuzhiObj;
              var parms = {
                  authType:2,
                  businessLicenseImage:this.zzimageUrl,
                  businessLicenseNumber:zuzhiObj.zuzhiNum,
                  enterpriseName:zuzhiObj.zuzhiName
              };
              this.stepNum = 2;
              this.ifDisabledzz = true;
              comAuthentication(parms).then(res=>{
                if(res.code == 200000){
                  this.getComInfo();
                }
                else{
                  this.$message.error(res.message || "请求失败！");
                  this.getComInfo();
                }
              }).catch(err=>{
                console.log(err)
              });
            } else {
              console.log('error submit!!');
              return false;
            }
        });
      }
  }
};
</script>
<style lang="scss" scoped>
.Verified_container {
  width: 100%;
  .verified_til_container {
    width: 100%;
    padding: 15px 27px;
    box-sizing: border-box;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #676970;
    border-bottom: 2px solid #cfcdcd;
  }
  .verified_con_container {
    width: 100%;
    padding: 60px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    .info_container {
      width: 70%;
      height: 82px;
      padding: 16px 26px;
      box-sizing: border-box;
      margin-top: 18px;
      margin-bottom: 30px;
      background: #fffbe6;
      border-radius: 2px;
      border: 1px solid #ffe58f;
      display: flex;
      .info_icon {
        width: 24px;
        height: 24px;
        margin-right: 16px;
        .info {
          display: block;
          width: 100%;
        }
      }
      .info_txt {
        flex-grow: 1;
        .info_txt_til {
          width: 100%;
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.85);
          margin-bottom: 4px;
        }
        .info_txt_con {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.65);
          .qyrz_txt:hover{
              cursor: pointer;
          }
        }
      }
    }
    .fail_info_container{
        background: #FFF1F0;
        border: 1px solid #FFA39E;
    }
    .success_info_container{
        background: #F6FFED;
        border: 1px solid #B7EB8F;
    }
    .verifi_type_container {
      width: 70%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .geren,
      .qiye {
        width: 49%;
        height: 460px;
        background: #f7f9fa;
        border-radius: 2px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &:hover {
          cursor: pointer;
        }
        .geren_icon_container {
          width: 200px;
          height: 185px;
          margin-bottom: 29px;
          .humanPng {
            display: block;
            width: 100%;
          }
        }
        .geren_til_txt {
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #0376fd;
          margin-bottom: 15px;
        }
        .geren_til_info {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.45);
          margin-bottom: 15px;
        }
        .wendang_container {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.45);
        }
      }
      .qiyedata{
        padding: 59px 15px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        background-color: white;
        .qiyedata_item{
          width: 100%;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #676970;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          .qiye_label{
            margin-right: 24px;
          }
        }
      }
    }
  }
  .verified_step_container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .step_til_container {
      margin-top: 39px;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #121c33;
      margin-bottom: 41px;
    }
    .step_con_container {
      width: 85%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      /deep/ .el-steps {
        display: flex;
        align-items: center;
        justify-content: center;
        /deep/ .is-success {
          color: #1890ff;
          border-color: #1890ff;
        }
      }
    }
    .main_info_container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 40px;
      box-sizing: border-box;
      .main_info_lef,
      .main_info_rig {
        width: 48%;
        padding: 20px;
        box-sizing: border-box;
        .label_til {
            width: 100%;
            display: flex;
            align-items: center;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #000000;
            margin-bottom: 8px;
            .starIcon {
                display: block;
                width: 6px;
                margin-right: 5px;
            }
        }
        .zuzhi_type_container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          .zuzhi_type_lef,
          .zuzhi_type_rig {
            width: 48%;
            min-height: 80px;
            border-radius: 2px;
            border: 1px solid rgba(0, 0, 0, 0.15);
            padding: 9px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            &:hover {
              cursor: pointer;
            }
            .type_icon_container {
              width: 41px;
              height: 41px;
              margin-right: 12px;
              margin-left: 13px;
              .type_icon {
                display: block;
                width: 100%;
              }
            }
            .type_txt_container {
              flex: 1;
              .type_txt_top {
                width: 100%;
                display: flex;
                align-items: baseline;
                .helpIcon {
                  width: 10px;
                  margin-left: 8px;
                }
              }
            }
            .checkBox_container {
              position: absolute;
              right: 10px;
              top: 10px;
              width: 20px;
              height: 20px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
          .activeTab {
            border: 1px solid #1890ff;
          }
        }
        .qiye_con_container,.zuzhi_con_container{
            width: 100%;
            .label_til {
                width: 100%;
                display: flex;
                align-items: center;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #000000;
                margin-bottom: 8px;
                .starIcon {
                    display: block;
                    width: 6px;
                    margin-right: 5px;
                }
            }
            .comp_name {
                width: 100%;
                margin-bottom: 4px;
            }
            .label_info_txt {
                width: 100%;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #a8a4a4;
                margin-bottom: 24px;
                margin-top: 20px;
            }
            .upload_container {
            width: 100%;
            display: flex;
            align-items: center;
            margin-bottom: 40px;
            .upload_con {
                width: 162px;
                height: 96px;
                margin-right: 25px;
                /deep/ .el-upload--text{
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                /deep/ .el-upload--text .el-upload-dragger{
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
            }
            .upload_txt {
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #a8a4a4;
            }
            }
            .submit_btn_container {
              width: 100%;
              .submit_btn {
                  width: 135px;
                  height: 40px;
                  background: #1890ff;
                  border-radius: 2px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 16px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #ffffff;
                  &:hover{
                    cursor: pointer;
                  }
              }
            }
        }
      }
      .main_info_rig {
        display: flex;
        flex-direction: column;
        align-items: center;
        .watch_info_container {
          width: 100%;
          background: #fffbe6;
          border-radius: 2px;
          border: 1px solid #ffe58f;
          padding: 16px 26px;
          box-sizing: border-box;
          display: flex;
          align-items: flex-start;
          .info_icon_container {
            width: 24px;
            height: 24px;
            margin-right: 16px;
            .info_icon {
              display: block;
              width: 100%;
            }
          }
          .info_con_container {
            flex: 1;
            .info_txt1 {
              width: 100%;
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(0, 0, 0, 0.65);
              margin-bottom: 8px;
            }
            .info_til {
              font-size: 16px;
              font-weight: 500;
              color: rgba(0, 0, 0, 0.85);
            }
          }
        }
        .pict_txt_container {
          width: 70%;
          margin-top: 35px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .old_pict_txt,
          .new_pict_txt {
            width: 40%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .old_txt {
              margin-bottom: 8px;
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(0, 0, 0, 0.65);
            }
            .old_pic {
              width: 100%;
              height: 200px;
              background-color: firebrick;
            }
          }
        }
      }
    }
  }
}
</style>