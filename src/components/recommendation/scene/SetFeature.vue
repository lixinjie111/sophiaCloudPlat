<template>
  <div class="set_feature_container">
    <div class="scene_box">
      <p class="title"><span>*</span>推荐算法使用特征：</p>
      <a-checkbox @click="onChange1" :checked="featureExtractFlag">使用抽取特征</a-checkbox>
      <a-checkbox @click="onChange2" :checked="tableFeatureFlag">使用原表特征</a-checkbox>
    </div>
    <a-card title="用户特征抽取" size="small">
      <addFeature :list="userFeaturesData" :type="type" :dataTypeList="userFeaturesList"></addFeature>
    </a-card>
    <a-card title="物料特征抽取" size="small" style="margin-top: 20px;position: relative">
      <a-select class="card-select c-mr-20" placeholder="选择物料数据类型" v-model="itemType" @change="itemTypeChange" style="width:140px"
                :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
        <a-select-option :value="item.value" v-for="(item,index) in itemTypeList" :key="index">{{item.name}}
        </a-select-option>
      </a-select>
      <addFeature :list="itemFeaturesData" :type="type" :dataTypeList="itemFeaturesList" ref="itemFeatures"></addFeature>
    </a-card>
    <a-card title="行为特征抽取" size="small" style="margin-top: 20px;">
      <addFeature :list="behaviorFeaturesData" :type="type" :dataTypeList="behaviorFeaturesList"></addFeature>
    </a-card>
    <div class="btns">
      <a-button type="primary" class="c-mr-20" @click="save">{{type == 'edit' ? '完成' : '下一步'}}</a-button>
      <a-button @click="cancel">取消</a-button>
    </div>
  </div>
</template>

<script>
  import addFeature from "./addFeature"
  import {getSceneFeatures, saveSceneConfigRule} from "@/api/recommendation/index";

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
        featureExtractFlag: this.dataInfo.featureExtractFlag || false,
        tableFeatureFlag: this.dataInfo.tableFeatureFlag || false,
        userFeaturesList: [],
        itemFeaturesList: [],
        behaviorFeaturesList: [],
        userFeaturesData: this.dataInfo.userFeatures || [],
        itemFeaturesData: this.dataInfo.itemFeatures || [],
        behaviorFeaturesData: this.dataInfo.behaviorFeatures || [],
        itemType: this.dataInfo.dataType || 1,
        itemTypeList: [{
          value: 1,
          name: '商品数据'
        },{
          value: 3,
          name: '商业服务数据'
        },{
          value: 4,
          name: '店铺数据'
        },{
          value: 5,
          name: '资讯数据'
        },{
          value: 6,
          name: '活动数据'
        }]
      }
    },
    created() {
      this.getSceneFeatures(0);
      this.getSceneFeatures(1);
      this.getSceneFeatures(2);
    },
    methods: {
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
        saveSceneConfigRule(params).then(res => {
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

    .card-select {
      position: absolute;
      top: 2px;
      left: 110px;
    }
  }
</style>
