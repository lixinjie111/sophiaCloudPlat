<template>
  <div class="add_box">
    <div class="add_title">
      <div class="index">序号</div>
      <div>1级品类</div>
      <div>2级品类</div>
      <div>品牌</div>
      <div>物品特征</div>
      <div>逻辑判断</div>
      <div>规则数值</div>
    </div>
    <div class="add_item c-mb-10" v-for="(item,index) in addList" :key="index" v-if="addList.length > 0">
      <div class="index">{{index+1}}</div>
      <a-select class="c-mr-10" placeholder="请选择1级品类" v-model="item.firstLevelCategory" @change="changeLevelCategory(item,1)" style="width:100px">
        <a-select-option :value="item" v-for="(item,index) in itemList" :key="index">{{item}}</a-select-option>
      </a-select>
      <a-select class="c-mr-10" placeholder="请选择2级品类" v-model="item.secondLevelCategory" @change="changeLevelCategory(item,2)" style="width:100px">
        <a-select-option :value="item" v-for="(item,index) in itemList2" :key="index">{{item}}</a-select-option>
      </a-select>
      <a-select class="c-mr-10" placeholder="请选择品牌" v-model="item.brand" @change="changeBrand" style="width:100px">
        <a-select-option :value="item" v-for="(item,index) in itemList3" :key="index">{{item}}</a-select-option>
      </a-select>
      <a-select class="c-mr-10" placeholder="请选择物品特征" v-model="item.itemProperty" @change="changeProperty" style="width:100px">
        <a-select-option :value="item.fieldValue" v-for="(item,index) in itemPropertiesList" :key="index">{{item.fieldValue}}</a-select-option>
      </a-select>
      <a-select class="c-mr-10" placeholder="请选择逻辑判断" v-model="item.logicCalc" @change="changeLogicCalc" style="width:100px">
        <a-select-option value="大于">大于</a-select-option>
        <a-select-option value="小于">小于</a-select-option>
        <a-select-option value="等于">等于</a-select-option>
        <a-select-option value="不包含">不包含</a-select-option>
      </a-select>
      <a-input class="c-mr-10" placeholder="请输入规则数值" v-model="item.value" :maxLength="14" style="width:100px"/>
      <a-popconfirm
        title="是否删除该条目?"
        ok-text="是"
        cancel-text="否"
        @confirm="del(index)">
        <a-button icon="close"/>
      </a-popconfirm>
    </div>
    <a-button type="dashed" class="add_btn" @click="add">
      <a-icon type="plus"/>
    </a-button>
  </div>
</template>

<script>
  import {getSceneItems} from "@/api/recommendation/index";

  export default {
    name: "AddGoods",
    props: {
      list: {
        type: Array,
        default: () => []
      },
      itemList: {
        type: Array,
        default: () => []
      },
      itemPropertiesList: {
        type: Array,
        default: () => []
      },
      //空:新建 edit: 编辑
      type: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        addList: this.list,
        itemList2: [],
        itemList3: [],
      }
    },
    created() {
      this.getSceneItems();
      if(this.type == 'edit'){ //编辑
        this.addList.forEach((item)=> {
          this.getSceneItems(item.firstLevelCategory, '', 1);
          this.getSceneItems(item.firstLevelCategory, item.secondLevelCategory, 2);
        });
      }
    },
    methods: {
      getSceneItems(firstLevel, secondLevel, type) {
        let params = {
          applicationId: this.$route.query.appId,
          sceneId: this.$route.query.sceneId,
          firstLevel: firstLevel,
          secondLevel: secondLevel,
          type: type // 0：一级品类 1:二级品类 2：品牌
        };
        getSceneItems(params).then(res => {
          if (res.code == 200000) {
            if (type == 1) {
              this.itemList2 = res.data.result;
            }
            if (type == 2) {
              this.itemList3 = res.data.result;
            }
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
      },
      add() {
        if (this.addList.length >= 10) {
          this.$message.warning('最多添加10条');
          return;
        }
        this.addList.push({
          brand: undefined, //品牌
          firstLevelCategory: undefined, //一级品类
          secondLevelCategory: undefined, //二级品类
          itemProperty: undefined, //物品特征
          itemPropertyField: undefined, //物品特征对应字段
          logicCalc: undefined, //逻辑判断
          value: '' //规则数值
        })
      },
      del(index) {
        this.addList.splice(index, 1);
      },
      changeLevelCategory(item, index) {
        this.getSceneItems(item.firstLevelCategory, item.secondLevelCategory, index);
      },
      changeBrand() {

      },
      changeProperty(value) {
        this.itemPropertiesList.forEach((item)=>{
          if(item.fieldValue == value){
            this.addList.forEach((item1,index1)=>{
              if(item1.itemProperty == item.fieldValue){
                this.addList[index1].itemPropertyField = item.fieldName;
              }
            });
          }
        });
      },
      changeLogicCalc() {

      }
    }
  }
</script>

<style scoped lang="scss">
  .add_box {

    .add_title {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      > div {
        width: 110px;

        &.index {
          width: 60px;
        }
      }
    }

    .add_item {
      margin-top: 10px;
      font-size: 0;

      .index {
        display: inline-block;
        vertical-align: -1px;
        width: 60px;
        font-size: 14px;
      }
    }

    .add_btn {
      margin-top: 10px;
      width: 100%;
    }
  }
</style>
