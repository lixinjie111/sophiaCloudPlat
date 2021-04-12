<template>
  <div class="add_box">
    <div class="add_item c-mb-10" v-for="(item,index) in addList" :key="index" v-if="addList.length > 0">
      <a-select class="c-mr-10" placeholder="请选择品牌" v-model="item.property" @change="changeProperty" style="width:160px">
        <a-select-option :value="item.fieldValue" v-for="(item,index) in propertiesList" :key="index">{{item.fieldValue}}</a-select-option>
      </a-select>
      <a-select class="c-mr-10" placeholder="请选择条件" v-model="item.logicCalc" @change="change" style="width:160px">
        <a-select-option value="等于">等于</a-select-option>
        <a-select-option value="不等于">不等于</a-select-option>
        <a-select-option value="大于">大于</a-select-option>
        <a-select-option value="小于">小于</a-select-option>
        <a-select-option value="包含">包含</a-select-option>
        <a-select-option value="不包含">不包含</a-select-option>
        <a-select-option value="有值">有值</a-select-option>
        <a-select-option value="没值">没值</a-select-option>
        <a-select-option value="为空">为空</a-select-option>
        <a-select-option value="不为空">不为空</a-select-option>
      </a-select>
      <a-input class="c-mr-10" placeholder="请输入推荐位置" v-model="item.value" :maxLength="14" style="width:190px"/>
      <a-popconfirm
        title="是否删除该条目?"
        ok-text="是"
        cancel-text="否"
        @confirm="del(index)">
        <a-button icon="close"/>
      </a-popconfirm>
    </div>
    <a-button type="dashed" class="add_btn" @click="add">
      <a-icon type="plus"/>筛选条件
    </a-button>
  </div>
</template>

<script>
  export default {
    name: "AddGoods",
    props: {
      list: {
        type: Array,
        default: () => []
      },
      propertiesList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        addList: this.list,
      }
    },
    methods: {
      add() {
        if(this.addList.length >= 10){
          this.$message.warning('最多添加10条');
          return;
        }
        this.addList.push({
          property: '',
          propertyField: '',
          logicCalc: '',
          value: ''
        })
      },
      changeProperty(value) {
        this.propertiesList.forEach((item)=>{
          if(item.fieldValue == value){
            this.addList.forEach((item1,index1)=>{
              if(item1.property == item.fieldValue){
                this.addList[index1].propertyField = item.fieldName;
              }
            });
          }
        });
      },
      del(index) {
        this.addList.splice(index, 1);
      },
      change() {

      }
    }
  }
</script>

<style scoped lang="scss">
  .add_box {

    .add_item {
      margin-top: 10px;
      font-size: 0;
    }

    .add_btn {
      margin-top: 10px;
      width: 100%;
    }
  }
</style>
