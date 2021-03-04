<template>
  <div class="Verified_container">
    <div class="verified_til_container">实名认证</div>
    <div class="verified_con_container" v-if="changeTab == 1">
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
    <div class="verified_step_container" v-else-if="changeTab == 2">
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
          <div class="label_til">
            <img :src="starIcon" alt="" srcset="" class="starIcon" />
            <span>{{labelInfoObj.laebl1}}</span>
          </div>
          <div class="comp_name">
            <el-input v-model="comName" v-if="ifShowCheck == 1" placeholder="请输入企业名称"></el-input>
            <el-input v-model="zuzhiName" v-if="ifShowCheck == 2" placeholder="请输入组织名称"></el-input>
          </div>
          <div class="label_info_txt">{{labelInfoObj.info1}}</div>
          <div class="label_til">
            <img :src="starIcon" alt="" srcset="" class="starIcon" />
            <span>{{labelInfoObj.laebl2}}</span>
          </div>
          <div class="comp_name">
            <el-input
              v-model="comYinyeNum"
              placeholder="请输入营业执照注册号"
              v-if="ifShowCheck == 1"
            ></el-input>
            <el-input v-model="zuzhiNum" v-if="ifShowCheck == 2" placeholder="请输入组织机构代码"></el-input>
          </div>
          <div class="label_info_txt">
            {{labelInfoObj.info2}}
          </div>
          <div class="label_til">
            <img :src="starIcon" alt="" srcset="" class="starIcon" />
            <span>{{labelInfoObj.laebl3}}</span>
          </div>
          <div class="upload_container">
            <div class="upload_con">
              <el-upload
                action=""
                style="width: 100%; height: 100%"
                drag
                multiple
                v-if="ifShowCheck == 1"
                list-type="picture-card"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-upload
                action=""
                style="width: 100%; height: 100%"
                drag
                multiple
                v-if="ifShowCheck == 2"
                list-type="picture-card"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
            <div class="upload_txt">可拖拽照片到左侧区域上传</div>
          </div>
          <div class="submit_btn_container">
            <div class="submit_btn">提交审核</div>
          </div>
        </div>
        <div class="main_info_rig">
            <div class="watch_info_container">
                <div class="info_icon_container">
                    <img :src="info" class="info_icon">
                </div>
                <div class="info_con_container">
                    <div class="info_txt1 info_til">{{labelInfoObj.uploadInfo}}</div>
                    <div class="info_txt1">清晰的图片可以让您更快通过审核；</div>
                    <div class="info_txt1">推荐上传扫描文件，拍照请尽量降低反光；</div>
                    <div class="info_txt1">请确保营业执照图片所有信息清晰可见，内容真实有效，无任何修改；</div>
                    <div class="info_txt1">文件大小不超过8M，格式支持 .jpg .jpeg .bmp .png .pdf</div>
                </div>
            </div>
            <div class="pict_txt_container">
                <div class="old_pict_txt">
                    <div class="old_txt">老版营业执照示例图</div>
                    <div class="old_pic"></div>
                </div>
                <div class="new_pict_txt">
                    <div class="old_txt">新版营业执照示例图</div>
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
export default {
  data() {
    return {
      info: require("../../assets/images/verify/info.png"),
      humanPng: require("../../assets/images/verify/human.png"),
      changeTab: 2,
      stepNum: 1,
      starIcon: require("../../assets/images/verify/starIcon.png"),
      helpIcon: require("../../assets/images/verify/help.png"),
      typeChecked: true,
      ifShowCheck: 1,
      comName: "",
      comYinyeNum:"",
      zuzhiName:"",
      zuzhiNum:"",
      dialogImageUrl: "",
      dialogVisible: false,
      labelInfoObj:{
          laebl1:'企业名称',
          info1:'请务必与营业执照上的名称保持一致',
          laebl2:'营业执照注册号',
          info2:'请务必与营业执照上的注册号或统一社会信用代码号一致',
          laebl3:'营业执照扫描件',
          uploadInfo:'上传营业执照注意事项'
      },
      labelInfoObj1:{
          laebl1:'企业名称',
          info1:'请务必与营业执照上的名称保持一致',
          laebl2:'营业执照注册号',
          info2:'请务必与营业执照上的注册号或统一社会信用代码号一致',
          laebl3:'营业执照扫描件',
          uploadInfo:'上传营业执照注意事项'
      },
      labelInfoObj2:{
          laebl1:'组织名称',
          info1:'请务必与组织机构代码证上的名称保持一致',
          laebl2:'组织机构代码',
          info2:'请务必与组织机构代码证上的编号一致',
          laebl3:'组织机构代码证扫描件',
          uploadInfo:'上传组织机构代码证扫描件注意事项'
      }
    };
  },
  created() {},
  methods: {
    changeTabFn(arg) {
      this.changeTab = arg;
    },
    clickTabType(arg) {
      this.ifShowCheck = arg;
      if(arg == 1){
          this.labelInfoObj = this.labelInfoObj1;
      }
      else{
          this.labelInfoObj = this.labelInfoObj2;
      }
    }
  },
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
        }
      }
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
            div {
              /deep/ .el-upload--picture-card {
                width: 100% !important;
                height: 100% !important;
                /deep/ .el-upload-dragger {
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
              }
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
            color: #FFFFFF;
          }
        }
      }
      .main_info_rig{
          display: flex;
          flex-direction: column;
          align-items: center;
          .watch_info_container{
            width: 100%;
            background: #FFFBE6;
            border-radius: 2px;
            border: 1px solid #FFE58F;
            padding: 16px 26px;
            box-sizing: border-box;
            display: flex;
            align-items: flex-start;
            .info_icon_container{
                width: 24px;
                height: 24px;
                margin-right: 16px;
                .info_icon{
                    display: block;
                    width: 100%;
                }
            }
            .info_con_container{
                flex: 1;
                .info_txt1{
                    width: 100%;
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(0, 0, 0, 0.65);
                    margin-bottom: 8px;
                }
                .info_til{
                    font-size: 16px;
                    font-weight: 500;
                    color: rgba(0, 0, 0, 0.85);
                }
            }
          }
          .pict_txt_container{
            width: 70%;
            margin-top: 35px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .old_pict_txt,.new_pict_txt{
                width: 40%;
                display: flex;
                flex-direction: column;
                align-items: center;
                .old_txt{
                    margin-bottom: 8px;
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(0, 0, 0, 0.65);
                }
                .old_pic{
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