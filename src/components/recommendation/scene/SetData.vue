<template>
  <div class="set_data_container">
    <a-card title="用户数据" size="small">
      <div class="card_item c-mb-10">
        <p class="title">历史数据：</p>
        <AddData :list="userHistoryData" :type="0" :dataTypeList="userTypeList" :sourcesList="historySourcesList"></AddData>
      </div>
      <div class="card_item">
        <p class="title">新增数据：</p>
        <AddData :list="userNewData" :type="1" :dataTypeList="userTypeList" :sourcesList="addSourcesList"></AddData>
      </div>
    </a-card>
    <a-card title="物品数据" size="small" style="margin-top: 20px;">
      <div class="card_item c-mb-10">
        <p class="title">历史数据：</p>
        <AddData :list="itemHistoryData" :type="0" :dataTypeList="itemTypeList" :sourcesList="historySourcesList"></AddData>
      </div>
      <div class="card_item">
        <p class="title">新增数据：</p>
        <AddData :list="itemNewData" :type="1" :dataTypeList="itemTypeList" :sourcesList="addSourcesList"></AddData>
      </div>
    </a-card>
    <a-card title="行为数据" size="small" style="margin-top: 20px;">
      <div class="card_item c-mb-10">
        <p class="title">历史数据：</p>
        <AddData :type="0" :list="behaviorHistoryData" :dataTypeList="behaviorTypeList"
                 :sourcesList="historySourcesList"></AddData>
      </div>
      <div class="card_item">
        <p class="title">新增数据：</p>
        <AddData :type="1" :list="behaviorNewData" :dataTypeList="behaviorTypeList" :sourcesList="addSourcesList"></AddData>
      </div>
    </a-card>
    <div class="btns" v-if="type == 'edit'">
      <a-button type="primary" class="c-mr-20" @click="finish">完成</a-button>
      <a-button @click="cancel">取消</a-button>
    </div>
    <div class="btns" v-else>
      <a-button type="primary" class="c-mr-20" @click="save">配置规则</a-button>
      <a-button @click="cancel">取消</a-button>
    </div>
  </div>
</template>

<script>
  import AddData from "./AddData"
  import {getDataTypes, getSceneSources, saveSceneConfigData} from "@/api/recommendation/index";

  export default {
    name: "setData",
    components: {AddData},
    props: {
      type: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        userTypeList: [],
        itemTypeList: [],
        behaviorTypeList: [],
        historySourcesList: [],
        addSourcesList: [],
        userHistoryData: [],
        userNewData: [],
        itemHistoryData: [],
        itemNewData: [],
        behaviorHistoryData: [],
        behaviorNewData: []
      }
    },
    created() {
      this.getDataTypes();
      this.getSceneSources(0);
      this.getSceneSources(1);
    },
    methods: {
      getDataTypes() {
        getDataTypes({}).then(res => {
          if (res.code == 200000) {
            this.userTypeList = res.data[0].subDataTypes;
            this.itemTypeList = res.data[1].subDataTypes;
            this.behaviorTypeList = res.data[2].subDataTypes;
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
      },
      getSceneSources(type) {
        let params = {
          dataHistoryType: type //0: 历史数据 1：新增数据
        };
        getSceneSources(params).then(res => {
          if (res.code == 200000) {
            if (type == 0) {
              this.historySourcesList = res.data;
            }
            if (type == 1) {
              this.addSourcesList = res.data;
            }
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
      },
      save() {
        let params = {
          applicationId: this.$route.query.appId,
          sceneId: this.$route.query.sceneId,
          userHistoryData: this.userHistoryData,
          userNewData: this.userNewData,
          itemHistoryData: this.itemHistoryData,
          itemNewData: this.itemNewData,
          behaviorHistoryData: this.behaviorHistoryData,
          behaviorNewData: this.behaviorNewData
        };

        saveSceneConfigData(params).then(res => {
          if (res.code == 200000) {
            this.$message.success("添加成功！");
            this.$router.push({
              path: '/recommendation/scene/rule?appId='+ this.$route.query.appId + '&sceneId=' + this.$route.query.sceneId
            });
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
  .set_data_container {
    .card_item {
      display: flex;
      justify-content: flex-start;
      justify-items: center;

      .title {
        width: 100px;
      }
    }

    .btns {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>

