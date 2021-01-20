<template>
  <div class="app_data_container">
    <a-card title="用户数据" size="small">
      <div class="card_item c-mb-10">
        <p class="title">历史数据：</p>
        <AddData :list="userHistoryList"></AddData>
      </div>
      <div class="card_item">
        <p class="title">新增数据：</p>
        <AddData :list="userAddList"></AddData>
      </div>
    </a-card>
    <a-card title="物品数据" size="small" style="margin-top: 20px;">
      <div class="card_item c-mb-10">
        <p class="title">历史数据：</p>
        <AddData :list="goodsHistoryList"></AddData>
      </div>
      <div class="card_item">
        <p class="title">新增数据：</p>
        <AddData :list="goodsAddList"></AddData>
      </div>
    </a-card>
    <a-card title="行为数据" size="small" style="margin-top: 20px;">
      <div class="card_item c-mb-10">
        <p class="title">历史数据：</p>
        <AddData :list="actionHistoryList"></AddData>
      </div>
      <div class="card_item">
        <p class="title">新增数据：</p>
        <AddData :list="actionAddList"></AddData>
      </div>
    </a-card>
    <div class="app_data_btn">
      <a-button type="primary" class="c-mr-20" @click="save">配置规则</a-button>
      <a-button @click="cancel">取消</a-button>
    </div>
  </div>
</template>

<script>
  import AddData from "@/components/recommendation/AddData"

  export default {
    name: "data",
    components: {AddData},
    data() {
      return {
        userHistoryList: [],
        userAddList: [],
        goodsHistoryList: [],
        goodsAddList: [],
        actionHistoryList: [],
        actionAddList: []
      }
    },
    methods: {
      save() {
        this.$router.push({
          path: '/recommendation/application/scene'
        });
      },
      cancel() {
        this.$router.push({
          path: '/recommendation/application/list'
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .app_data_container {
    padding: 20px;

    .card_item {
      display: flex;
      justify-content: flex-start;
      justify-items: center;

      .title {
        width: 100px;
      }
    }

    .app_data_btn {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
