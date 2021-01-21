<template>
  <div class="set_rules_container">
    <a-card title="推荐规则" size="small">
      <div class="scene_box">
        <p class="title">过滤物品：</p>
        <AddGoods :list="goodsList"></AddGoods>
      </div>
      <div class="scene_box">
        <p class="title">过滤行为：</p>
        <a-checkbox-group v-model="actionValue" :options="actionOptions" @change="actionChange"></a-checkbox-group>
      </div>
      <div class="scene_box">
        <p class="title">必推行为：</p>
        <a-radio-group v-model="bestValue" :options="bestOptions" @change="bestChange" />
      </div>
      <div class="scene_box" v-if="bestValue == '2'">
        <p class="title"></p>
        <div class="best_goods">
          <div class="best_goods_title">
            <p>筛选必推物品：</p>
            <a-button type="primary">必推物品池</a-button>
          </div>
          <AddBestGoods :list="bestGoodsList"></AddBestGoods>
        </div>
      </div>
    </a-card>
    <div class="btns">
      <a-button type="primary" class="c-mr-20" @click="test">测试</a-button>
      <a-button type="primary" class="c-mr-20" @click="finish">完成</a-button>
      <a-button @click="cancel">取消</a-button>
    </div>
  </div>
</template>

<script>
  import AddGoods from "./AddGoods";
  import AddBestGoods from "./AddBestGoods";

  export default {
    name: "scene",
    components: {AddGoods, AddBestGoods},
    data() {
      return {
        goodsList: [],
        actionValue: '',
        actionOptions: [
          {label: '有购买行为的物品', value: '1'},
          {label: '用户过去3天内有过曝光行为的物品', value: '2'},
          {label: '用户投诉的物品', value: '3'}
        ],
        bestValue: '',
        bestOptions: [
          {label: '无必推商品', value: '1'},
          {label: '有必推商品', value: '2'}
        ],
        bestGoodsList: []
      }
    },
    methods: {
      actionChange(checkedValues) {
        console.log('checked = ', checkedValues);
        console.log('value = ', this.value);
      },
      bestChange(e) {
        console.log('radio3 checked', e.target.value);
      },
      test() {

      },
      finish() {

      },
      cancel() {

      }
    }
  }
</script>

<style scoped lang="scss">
  .set_rules_container {
    .scene_box {
      margin-bottom: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;

      .title {
        width: 100px;
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

      .best_goods {
        width: 575px;

        .best_goods_title {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }

    .btns {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
