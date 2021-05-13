<template>
  <div class="set_feature_container">
    <div class="scene_box">
      <p class="title"><span>*</span>推荐算法使用特征：</p>
      <a-checkbox @click="onChange1" :checked="featureExtractFlag">使用抽取特征</a-checkbox>
      <a-checkbox @click="onChange2" :checked="tableFeatureFlag">使用原表特征</a-checkbox>
    </div>
    <a-card title="用户特征抽取" size="small">
      <addFeature :list="userFeaturesData" :type="type" :dataTypeList="userFeaturesList" :scopeList="userScopeList"></addFeature>
    </a-card>
    <a-card title="物料特征抽取" size="small" style="margin-top: 20px;position: relative">
      <a-select class="card_select c-mr-20" placeholder="选择物料数据类型" v-model="itemType" @change="itemTypeChange" style="width:140px"
                :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
        <a-select-option :value="item.id" v-for="(item,index) in itemTypeList" :key="index">{{item.dataTypeDesc}}
        </a-select-option>
      </a-select>
      <addFeature :list="itemFeaturesData" :type="type" :dataTypeList="itemFeaturesList" :scopeList="behaviorScopeList" ref="itemFeatures"></addFeature>
    </a-card>
    <a-card title="行为特征抽取" size="small" style="margin-top: 20px;">
      <addFeature :list="behaviorFeaturesData" :type="type" :dataTypeList="behaviorFeaturesList" :scopeList="itemScopeList"></addFeature>
    </a-card>
    <div class="btns">
      <a-button type="primary" class="c-mr-20" @click="save">{{type == 'edit' ? '完成' : '配置规则'}}</a-button>
      <a-button @click="cancel">取消</a-button>
    </div>
  </div>
</template>

<script>
  import addFeature from "./addFeature"
  import {getSceneFeatures, saveSceneFeatures, getFeaturesDataType, getFeaturesDataTables} from "@/api/recommendation/index";

  export default {
    name: "SetFeature",
    components: {addFeature},
    props: {
      type: {
        type: String,
        default: ''
      },
      dataInfo: {
        type: Object,
        default: () => []
      }
    },
    data() {
      return {
        featureExtractFlag: this.dataInfo.featureExtractFlag || 0,
        tableFeatureFlag: this.dataInfo.tableFeatureFlag || 0,
        userFeaturesList: [],
        itemFeaturesList: [],
        behaviorFeaturesList: [],
        userScopeList: [],
        behaviorScopeList: [],
        itemScopeList: [],
        userFeaturesData: this.dataInfo.userFeatures || [],
        itemFeaturesData: this.dataInfo.itemFeatures || [],
        behaviorFeaturesData: this.dataInfo.behaviorFeatures || [],
        itemType: this.dataInfo.dataType || 1,
        itemTypeList: []
      }
    },
    created() {
      // 获取特征名称
      this.getSceneFeatures(0);
      this.getSceneFeatures(1);
      this.getSceneFeatures(2);
      // 获取物料特征类型
      this.getFeaturesDataType(1);
      // 获取抽取范围
      this.getScopeList(0);
      this.getScopeList(1);
      this.getScopeList(2);
    },
    methods: {
      getFeaturesDataType(type) {
        let params = {
          parentDataType: type //0：用户数据 1：物料数据 2：行为数据 3:黑名单
        };
        getFeaturesDataType(params).then(res => {
          if (res.code == 200000) {
            this.itemTypeList = res.data;
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
      },
      getSceneFeatures(type) {
        let params = {
          dataType: type // 0：用户数据 1：商品数据 2：行为数据 3：商业服务数据 4：店铺数据 5：资讯数据 6：活动数据 7：黑名单
        };
        getSceneFeatures(params).then(res => {
          if (res.code == 200000) {
            if (type == 0) {
              this.userFeaturesList = res.data;
            } else if (type == 2) {
              this.behaviorFeaturesList = res.data;
            } else {
              this.itemFeaturesList = res.data;
            }
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
      },
      getScopeList(type) {
        let params = {
          applicationId: this.$route.query.appId,
          dataType: type,
          sceneId: this.$route.query.sceneId,
        };
        getFeaturesDataTables(params).then(res => {
          if (res.code == 200000) {
            if (type == 0) {
              this.userScopeList = res.data;
            } else if (type == 2) {
              this.behaviorScopeList  = res.data;
            } else {
              this.itemScopeList  = res.data;
            }
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
      },
      onChange1(e) {
        e.target.checked ? this.featureExtractFlag = 1 : this.featureExtractFlag = 0;
      },
      onChange2(e) {
        e.target.checked ? this.tableFeatureFlag = 1 : this.tableFeatureFlag = 0;
      },
      itemTypeChange(value) {
        // 切换特征名称
        this.getSceneFeatures(value);
        this.$refs.itemFeatures.resetSceneFeatures();
      },
      // 新建、编辑
      save() {
        let params = {
          applicationId: this.$route.query.appId,
          sceneId: this.$route.query.sceneId,
          dataType: this.itemType,
          featureExtractFlag: this.featureExtractFlag,
          tableFeatureFlag: this.tableFeatureFlag,
          behaviorFeatures: this.behaviorFeaturesData,
          itemFeatures: this.itemFeaturesData,
          userFeatures: this.userFeaturesData
        };
        saveSceneFeatures(params).then(res => {
          if (res.code == 200000) {
            if(this.type == 'edit'){
              this.$message.success("编辑成功！");
            }else {
              this.$message.success("添加成功！");
              this.$router.push({
                path: '/recommendation/scene/rule?appId='+ this.$route.query.appId + '&sceneId=' + this.$route.query.sceneId
              });
            }
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
      },
      cancel() {
        this.$router.push({
          path: '/recommendation/scene/list'
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .set_feature_container {
    .scene_box {
      margin-bottom: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;

      .title {
        width: 140px;

        > span {
          margin-right: 5px;
          color: red;
        }
      }

      /deep/ .ant-checkbox-group {
        /deep/ .ant-checkbox-group-item {
          margin-bottom: 10px;
          display: block;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    .btns {
      margin-top: 20px;
      text-align: center;
    }

    .card_select {
      position: absolute;
      top: 2px;
      left: 110px;
    }
  }
</style>
