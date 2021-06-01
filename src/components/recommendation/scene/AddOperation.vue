<template>
  <div class="add_operation_box">
    <div class="add_item">
      <a-checkbox @click="varietyChange" :checked="operationObject.varietyFlag">{{descList[recommendObjectType].varietyName}}</a-checkbox>
      {{descList[recommendObjectType].varietyDesc1}}
      <a-input v-model="operationObject.varietyNum" style="width: 60px;"/>
      {{descList[recommendObjectType].varietyDesc2}}
    </div>
    <div class="add_item">
      <a-checkbox @click="scatterChange" :checked="operationObject.scatterFlag">{{descList[recommendObjectType].scatterName}}</a-checkbox>
      {{descList[recommendObjectType].scatterDesc1}}
      <a-input v-model="operationObject.scatterNum" style="width: 60px;"/>
      {{descList[recommendObjectType].scatterDesc2}}
      <a-input v-model="operationObject.scatterChannelNum" style="width: 60px;"/>
      {{descList[recommendObjectType].scatterDesc3}}
    </div>
    <div class="add_item">
      <a-checkbox @click="shufflingChange" :checked="operationObject.shufflingFlag">{{descList[recommendObjectType].shufflingName}}</a-checkbox>
      {{descList[recommendObjectType].shufflingDesc}}
      <AddMix :itemList="itemList" :list="operationObject.shufflings" :title="descList[recommendObjectType].shufflingTitle" ref="mixChild"></AddMix>
    </div>
  </div>
</template>

<script>
  import AddMix from "./AddMix";
  import {getItemTypes} from "@/api/recommendation/index";

  export default {
    name: "AddOperation",
    components: {AddMix},
    props: {
      operationObject: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        itemList: [],
        descList: [
          {
            varietyName: '商品多样性',
            varietyDesc1: '一次推荐请求返回的结果里面，相邻的',
            varietyDesc2: '个商品，品牌不重复',
            scatterName: '根据店铺进行打散',
            scatterDesc1: '一次推荐请求返回的结果里面，相邻的',
            scatterDesc2: '个商品，',
            scatterDesc3: '个店铺不重复',
            shufflingName: '根据商品类型进行混排',
            shufflingDesc: '一次推荐请求返回的结果里面：',
            shufflingTitle: '物品'
          }
        ]
      }
    },
    computed: {
      // 推荐种类 0：推荐商品 1：推荐用户 2：推荐咨询 3:推荐活动
      recommendObjectType() {
        return JSON.parse(localStorage.getItem('sceneInfo')).recommendObjectType
      }
    },
    created() {
      this.getItemTypes();
    },
    methods: {
      getItemTypes() {
        let params = {
          dataType: this.recommendObjectType
        };
        getItemTypes(params).then(res => {
          if (res.code == 200000) {
            this.itemList = res.data;
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
      },
      varietyChange(e) {
        if(e.target.checked){
          this.operationObject.varietyFlag = 1;
        }else {
          this.operationObject.varietyFlag = 0;
          this.operationObject.varietyNum = '';
        }
      },
      scatterChange(e) {
        if(e.target.checked){
          this.operationObject.scatterFlag = 1;
        }else {
          this.operationObject.scatterFlag = 0;
          this.operationObject.scatterNum = '';
          this.operationObject.scatterChannelNum = '';
        }
      },
      shufflingChange(e) {
        if(e.target.checked){
          this.operationObject.shufflingFlag = 1;
        }else {
          this.operationObject.shufflingFlag = 0;
          this.operationObject.shufflings = [];
          this.$refs.mixChild.resetList();
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .add_operation_box {
    .add_item {
      margin-bottom: 10px;
    }
  }
</style>
