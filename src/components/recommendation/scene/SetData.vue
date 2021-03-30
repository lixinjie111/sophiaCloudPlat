<template>
  <div class="set_data_container">
    <a-card title="用户数据" size="small">
      <div class="card_item c-mb-10">
        <p class="title">历史数据：</p>
        <AddData :list="userHistoryList" :dataTypeList="dataTypeList[0].subDataTypes" :sourcesList="historySourcesList"></AddData>
      </div>
      <div class="card_item">
        <p class="title">新增数据：</p>
        <AddData :list="userAddList" :dataTypeList="dataTypeList[0].subDataTypes" :sourcesList="addSourcesList"></AddData>
      </div>
    </a-card>
    <a-card title="物品数据" size="small" style="margin-top: 20px;">
      <div class="card_item c-mb-10">
        <p class="title">历史数据：</p>
        <AddData :list="goodsHistoryList" :dataTypeList="dataTypeList[1].subDataTypes" :sourcesList="historySourcesList"></AddData>
      </div>
      <div class="card_item">
        <p class="title">新增数据：</p>
        <AddData :list="goodsAddList" :dataTypeList="dataTypeList[1].subDataTypes" :sourcesList="addSourcesList"></AddData>
      </div>
    </a-card>
    <a-card title="行为数据" size="small" style="margin-top: 20px;">
      <div class="card_item c-mb-10">
        <p class="title">历史数据：</p>
        <AddData :list="actionHistoryList" :dataTypeList="dataTypeList[2].subDataTypes" :sourcesList="historySourcesList"></AddData>
      </div>
      <div class="card_item">
        <p class="title">新增数据：</p>
        <AddData :list="actionAddList" :dataTypeList="dataTypeList[2].subDataTypes" :sourcesList="addSourcesList"></AddData>
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
  import {getDataTypes, getSceneSources} from "@/api/recommendation/index";

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

        userHistoryList: [],
        userAddList: [],
        goodsHistoryList: [],
        goodsAddList: [],
        actionHistoryList: [],
        actionAddList: []
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
        this.$router.push({
          path: '/recommendation/scene/rule'
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

