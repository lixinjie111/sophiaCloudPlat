<template>
  <div class="set_feature_container">
    <div class="scene_box">
      <p class="title"><span>*</span>推荐算法使用特征：</p>
      <a-checkbox @click="onChange1" :checked="featureExtractFlag">使用抽取特征</a-checkbox>
      <a-checkbox @click="onChange2" :checked="tableFeatureFlag">使用原表特征</a-checkbox>
    </div>
    <a-card title="用户特征抽取" size="small">
      <addFeature :dataTypeList="userFeaturesList"></addFeature>
    </a-card>
    <a-card title="物料特征抽取" size="small" style="margin-top: 20px;position: relative">
      <a-select class="card-select c-mr-20" placeholder="选择物料数据类型" v-model="itemType" @change="itemTypeChange" style="width:140px"
                :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
        <a-select-option :value="item.value" v-for="(item,index) in itemTypeList" :key="index">{{item.name}}
        </a-select-option>
      </a-select>
      <addFeature :dataTypeList="itemFeaturesList"></addFeature>
    </a-card>
    <a-card title="行为特征抽取" size="small" style="margin-top: 20px;">
      <addFeature :dataTypeList="behaviorFeaturesList"></addFeature>
    </a-card>
    <div class="btns">
      <a-button type="primary" class="c-mr-20" @click="save">{{type == 'edit' ? '完成' : '下一步'}}</a-button>
      <a-button @click="cancel">取消</a-button>
    </div>
  </div>
</template>

<script>
  import addFeature from "./addFeature"
  import {getSceneFeatures} from "@/api/recommendation/index";

  export default {
    name: "SetFeature",
    components: {addFeature},
    data() {
      return {
        featureExtractFlag: false,
        tableFeatureFlag: false,
        userFeaturesList: [],
        itemFeaturesList: [],
        behaviorFeaturesList: [],
        itemType: '1',
        itemTypeList: [{
          value: '1',
          name: '商品数据'
        },{
          value: '3',
          name: '商业服务数据'
        },{
          value: '4',
          name: '店铺数据'
        },{
          value: '5',
          name: '资讯数据'
        },{
          value: '6',
          name: '活动数据'
        }]
      }
    },
    created() {
      // this.getSceneFeatures(0);
      // this.getSceneFeatures(1);
      // this.getSceneFeatures(2);
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
            } else if (type == 1) {
              this.itemFeaturesList = res.data;
            } else {
              this.behaviorFeaturesList = res.data;
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
        // this.getSceneFeatures(value)
      },
      save() {

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
