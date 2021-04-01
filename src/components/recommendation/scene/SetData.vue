<template>
  <div class="set_data_container">
    <a-card title="用户数据" size="small">
      <div class="card_item c-mb-10">
        <p class="title">历史数据：</p>
        <AddData :list="userHistoryData" :dataTypeList="dataTypeList[0].subDataTypes" :sourcesList="historySourcesList"></AddData>
      </div>
      <div class="card_item">
        <p class="title">新增数据：</p>
        <AddData :list="userNewData" :dataTypeList="dataTypeList[0].subDataTypes" :sourcesList="addSourcesList"></AddData>
      </div>
    </a-card>
    <a-card title="物品数据" size="small" style="margin-top: 20px;">
      <div class="card_item c-mb-10">
        <p class="title">历史数据：</p>
        <AddData :list="itemHistoryData" :dataTypeList="dataTypeList[1].subDataTypes" :sourcesList="historySourcesList"></AddData>
      </div>
      <div class="card_item">
        <p class="title">新增数据：</p>
        <AddData :list="itemNewData" :dataTypeList="dataTypeList[1].subDataTypes" :sourcesList="addSourcesList"></AddData>
      </div>
    </a-card>
    <a-card title="行为数据" size="small" style="margin-top: 20px;">
      <div class="card_item c-mb-10">
        <p class="title">历史数据：</p>
        <AddData :list="behaviorHistoryData" :dataTypeList="dataTypeList[2].subDataTypes" :sourcesList="historySourcesList"></AddData>
      </div>
      <div class="card_item">
        <p class="title">新增数据：</p>
        <AddData :list="behaviorNewData" :dataTypeList="dataTypeList[2].subDataTypes" :sourcesList="addSourcesList"></AddData>
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
        dataTypeList: [],
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
            this.dataTypeList = res.data;
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

        // 去空，数据源表为必填
        for(let key in params){
          Array.isArray(params[key]) && params[key].filter((s,index) => {
            for(let key1 in s){
              if(s['sourceTableId'].length == 0){
                params[key].splice(index,1);
              }
            }
          });
        }

        saveSceneConfigData(params).then(res => {
          if (res.code == 200000) {
            this.$message.success("添加成功！");
            this.$router.push({
              path: '/recommendation/scene/rule'
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

