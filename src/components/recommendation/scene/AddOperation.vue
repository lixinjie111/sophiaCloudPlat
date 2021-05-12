<template>
  <div class="add_operation_box">
    <div class="add_item">
      <a-checkbox @click="onChange1" :checked="operationObject.varietyFlag">商品多样性</a-checkbox>
      一次推荐请求返回的结果里面，相邻的
      <a-input v-model="operationObject.varietyNum" style="width: 60px;"/>
      个商品，作者不重复
    </div>
    <div class="add_item">
      <a-checkbox @click="onChange2" :checked="operationObject.scatterFlag">根据店铺进行打散</a-checkbox>
      一次推荐请求返回的结果里面，相邻的
      <a-input v-model="operationObject.scatterNum" style="width: 60px;"/>
      个商品，
      <a-input v-model="operationObject.scatterChannelNum" style="width: 60px;"/>
      级频道不重复
    </div>
    <div class="add_item">
      <a-checkbox @click="onChange3" :checked="operationObject.shufflingFlag">根据商品类型进行混排</a-checkbox>
      一次推荐请求返回的结果里面：
      <AddMix :itemList="itemList" :list="operationObject.shufflings" ref="mixChild"></AddMix>
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
        itemList: []
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
      onChange1(e) {
        if(e.target.checked){
          this.operationObject.varietyFlag = 1;
        }else {
          this.operationObject.varietyFlag = 0;
          this.operationObject.varietyNum = '';
        }
      },
      onChange2(e) {
        if(e.target.checked){
          this.operationObject.scatterFlag = 1;
        }else {
          this.operationObject.scatterFlag = 0;
          this.operationObject.scatterNum = '';
          this.operationObject.scatterChannelNum = '';
        }
      },
      onChange3(e) {
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
