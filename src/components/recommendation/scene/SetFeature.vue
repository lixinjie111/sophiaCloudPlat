<template>
  <div class="set_feature_container">
    <div class="scene_box">
      <p class="title"><span>*</span>推荐算法使用特征：</p>
      <a-checkbox @click="onChange1" :checked="buyFlag">使用抽取特征</a-checkbox>
      <a-checkbox @click="onChange2" :checked="hasPushFlag">使用原表特征</a-checkbox>
    </div>
    <a-card title="用户特征抽取" size="small">

    </a-card>
    <a-card title="物料特征抽取" size="small" style="margin-top: 20px;">

    </a-card>
    <a-card title="行为特征抽取" size="small" style="margin-top: 20px;">

    </a-card>
  </div>
</template>

<script>
  export default {
    name: "SetFeature",
    data(){
      return {
        buyFlag: false,
        hasPushFlag: false
      }
    },
    methods: {
      onChange1(){

      },
      onChange2(){

      },
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
  }
</style>
