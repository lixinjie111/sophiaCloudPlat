<template>
  <div class="set_data_container">
    <div class="c-mb-10 upload-btn">
      <a-button type="primary" @click="toUpload" v-if="type != 'edit'">
        上传数据
      </a-button>
    </div>
    <a-card title="用户数据" size="small">
      <div class="card_item c-mb-10">
        <p class="title">历史数据：</p>
        <AddData :list="userHistoryData" :type="type" :dataHistoryType="0" :dataTypeList="userTypeList" :sourcesList="historySourcesList"></AddData>
      </div>
      <div class="card_item">
        <p class="title">新增数据：</p>
        <AddData :list="userNewData" :type="type" :dataHistoryType="1" :dataTypeList="userTypeList" :sourcesList="addSourcesList"></AddData>
      </div>
    </a-card>
    <a-card title="物品数据" size="small" style="margin-top: 20px;">
      <div class="card_item c-mb-10">
        <p class="title">历史数据：</p>
        <AddData :list="itemHistoryData" :type="type" :dataHistoryType="0" :dataTypeList="itemTypeList" :sourcesList="historySourcesList"></AddData>
      </div>
      <div class="card_item">
        <p class="title">新增数据：</p>
        <AddData :list="itemNewData" :type="type" :dataHistoryType="1" :dataTypeList="itemTypeList" :sourcesList="addSourcesList"></AddData>
      </div>
    </a-card>
    <a-card title="行为数据" size="small" style="margin-top: 20px;">
      <div class="card_item c-mb-10">
        <p class="title">历史数据：</p>
        <AddData :list="behaviorHistoryData" :type="type" :dataHistoryType="0" :dataTypeList="behaviorTypeList" :sourcesList="historySourcesList"></AddData>
      </div>
      <div class="card_item">
        <p class="title">新增数据：</p>
        <AddData :list="behaviorNewData" :type="type" :dataHistoryType="1" :dataTypeList="behaviorTypeList" :sourcesList="addSourcesList"></AddData>
      </div>
    </a-card>
    <div class="btns">
      <a-button type="primary" class="c-mr-20" @click="save">{{type == 'edit' ? '完成' : '配置规则'}}</a-button>
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
      },
      dataInfo: {
        type: Object,
        default: () => []
      }
    },
    data() {
      return {
        userTypeList: [],
        itemTypeList: [],
        behaviorTypeList: [],
        historySourcesList: [],
        addSourcesList: [],
        userHistoryData: this.dataInfo.userHistoryData || [],
        userNewData: this.dataInfo.userNewData || [],
        itemHistoryData: this.dataInfo.itemHistoryData || [],
        itemNewData: this.dataInfo.itemNewData || [],
        behaviorHistoryData: this.dataInfo.behaviorHistoryData || [],
        behaviorNewData: this.dataInfo.behaviorNewData || [],
      }
    },
    created() {
      //获取数据类型列表
      this.getDataTypes();
      //获取数据源列表
      this.getSceneSources(0);
      this.getSceneSources(1);
    },
    methods: {
      toUpload() {
        this.$router.push({
          path: '/recommendation/data/list?show=1'
        });
      },
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
      // 新建、编辑
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

    .upload-btn {
      text-align: right;
    }
  }
</style>

