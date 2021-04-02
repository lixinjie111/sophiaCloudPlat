<template>
  <div class="set_rules_container">
    <a-card title="推荐规则" size="small">
      <div class="scene_box">
        <p class="title">筛选物品：</p>
        <AddGoods :list="goodsList" :itemList="itemList" :itemPropertiesList="itemPropertiesList"></AddGoods>
      </div>
      <div class="scene_box">
        <p class="title">过滤行为：</p>
        <a-checkbox @click="onChange1">有购买行为的物品</a-checkbox>
        <a-checkbox @click="onChange2">用户过去3天内有过曝光行为的物品</a-checkbox>
        <a-checkbox @click="onChange3">用户投诉的物品</a-checkbox>
      </div>
      <div class="scene_box">
        <p class="title">必推行为：</p>
        <a-radio-group v-model="bestValue" :options="bestOptions" @change="bestChange" />
      </div>
      <div class="scene_box" v-if="bestValue == '1'">
        <p class="title"></p>
        <div class="best_goods">
          <div class="best_goods_title">
            <p>筛选必推物品：</p>
            <a-button type="primary">必推物品池</a-button>
          </div>
          <AddBestGoods :list="bestGoodsList" :propertiesList="mustPushPropertiesList"></AddBestGoods>
        </div>
      </div>
    </a-card>
    <div class="btns" v-if="type == 'edit'">
      <a-button type="primary" class="c-mr-20" @click="finish">完成</a-button>
      <a-button @click="cancel">取消</a-button>
    </div>
    <div class="btns" v-else>
      <a-button type="primary" class="c-mr-20" @click="test">测试</a-button>
      <a-button type="primary" class="c-mr-20" @click="finish">完成</a-button>
      <a-button @click="cancel">取消</a-button>
    </div>
  </div>
</template>

<script>
  import AddGoods from "./AddGoods";
  import AddBestGoods from "./AddBestGoods";
  import {getSceneItems, getSceneItemProperties, getSceneMustPushProperties, saveSceneConfigRule} from "@/api/recommendation/index";

  export default {
    name: "scene",
    components: {AddGoods, AddBestGoods},
    props: {
      type: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        itemList: [],
        itemPropertiesList: [],
        goodsList: [],
        buyFlag: 0,
        complainFlag: 0,
        hasPushFlag: 0,
        bestValue: '',
        bestOptions: [
          {label: '无必推商品', value: 0},
          {label: '有必推商品', value: 1}
        ],
        bestGoodsList: [],
        mustPushPropertiesList:[]
      }
    },
    created () {
      this.getSceneItems();
      this.getSceneItemProperties();
      this.getSceneMustPushProperties();
    },
    methods: {
      getSceneItems() {
        let params = {
          applicationId: this.$route.query.appId,
          sceneId: this.$route.query.sceneId,
          type: 0 // 0：一级品类 1:二级品类 2：品牌
        };
        getSceneItems(params).then(res => {
          if (res.code == 200000) {
            this.itemList = res.data.result;
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
      },
      getSceneItemProperties() {
        getSceneItemProperties({}).then(res => {
          if (res.code == 200000) {
            this.itemPropertiesList = res.data;
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
      },
      getSceneMustPushProperties() {
        getSceneMustPushProperties({}).then(res => {
          if (res.code == 200000) {
            this.mustPushPropertiesList = res.data;
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
      },
      onChange1(e){
        e.target.checked ? this.buyFlag = 1 : this.buyFlag = 0;
      },
      onChange2(e){
        e.target.checked ? this.hasPushFlag = 1 : this.hasPushFlag = 0;
      },
      onChange3(e){
        e.target.checked ? this.complainFlag = 1 : this.complainFlag = 0;
      },
      bestChange(e) {

      },
      test() {

      },
      finish() {
        let params = {
          filterItemParams: this.goodsList,
          applicationId: this.$route.query.appId,
          sceneId: this.$route.query.sceneId,
          buyFlag: this.buyFlag,
          complainFlag: this.complainFlag,
          hasPushFlag: this.hasPushFlag,
          mustRecommendFlag: this.bestValue,
          recommendParams:this.bestGoodsList
        };
        saveSceneConfigRule(params).then(res => {
          if (res.code == 200000) {
            this.$message.success("添加成功！");
            this.$router.push({
              path: '/recommendation/scene/list'
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
