<template>
  <div class="custom_run">
      <div class="scene_box">
        <p class="title">运营策略: 商品推荐</p>
        <ul>
            <li>
                <a-checkbox>商品多样性</a-checkbox>
                <span>一次推荐请求返回的结果里面，相邻的<a-input></a-input>个商品，作者不重复</span>
            </li>
            <li>
                <a-checkbox>根据店铺进行打散</a-checkbox>
                <span>一次推荐请求返回的结果里面，相邻的<a-input></a-input>个商品，<a-input></a-input>级频道不重复</span>                
            </li>
            <li>
                <a-checkbox>根据商品类型进行混排</a-checkbox>
                <span>一次推荐请求返回的结果里面：物品类型为    
                    <a-select default-value="lucy">
                    <a-select-option value="jack">
                        Jack
                    </a-select-option>
                    <a-select-option value="lucy">
                        Lucy
                    </a-select-option>
                    <a-select-option value="disabled">
                        Disabled
                    </a-select-option>
                    <a-select-option value="Yiminghe">
                        yiminghe
                    </a-select-option>
                    </a-select>的物品占比为
                    <a-input></a-input></span>                
            </li>
        </ul>
      </div>
      <div class="scene_box">
        <p class="title">必推行为:有必推商品</p>
        <div class="best_goods">
          <div class="best_goods_title">
            <p>筛选必推物品：</p>
            <a-button type="primary" @click="toWillPush">必推物品池</a-button>
          </div>
          <AddBestGoods :list="recommendParams" :propertiesList="mustPushPropertiesList"></AddBestGoods>
        </div>
      </div>
  </div>
</template>
<script>
  import AddBestGoods from "../AddBestGoods";
export default {
  name: "CustomSort",
  components:{AddBestGoods},
  props: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.custom_run {
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
}
</style>