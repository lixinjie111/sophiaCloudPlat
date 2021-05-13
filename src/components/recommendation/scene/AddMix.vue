<template>
  <div class="add_mix_box">
    <div class="add_item c-mb-10" v-for="(item,index) in addList" :key="index" v-if="addList.length > 0">
      <span>{{title}}类型为</span>
      <a-select class="c-mr-10" placeholder="请选择物品类型" v-model="item.t" @change="changeType" style="width:160px"
                :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
        <a-select-option :value="item.id" v-for="(item,index) in itemList" :key="index">{{item.name}}</a-select-option>
      </a-select>
      <span>的{{title}}占比为</span>
      <a-input class="c-mr-10" v-model="item.c" :maxLength="14" style="width:60px"/>
      <a-popconfirm
        title="是否删除该条目?"
        ok-text="是"
        cancel-text="否"
        @confirm="del(index)">
        <a-button icon="close"/>
      </a-popconfirm>
    </div>
    <a-button type="dashed" class="add_btn" @click="add">
      <a-icon type="plus"/>增加混排规则
    </a-button>
  </div>
</template>

<script>
  export default {
    name: "AddMix",
    props: {
      list: {
        type: Array,
        default: () => []
      },
      itemList: {
        type: Array,
        default: () => []
      },
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        addList: this.list,
        value: ''
      }
    },
    methods: {
      resetList(){
        this.addList.forEach((item)=> {
          item.t = undefined;
          item.c = '';
          item.d = '';
        });
      },
      add() {
        if(this.addList.length >= 10){
          this.$message.warning('最多添加10条');
          return;
        }
        this.addList.push({
          t: undefined,
          c: '',
          d: ''
        })
      },
      changeType(value) {
        this.itemList.forEach((item)=>{
          if(item.id == value){
            this.addList.forEach((item1,index1)=>{
              if(item1.t == item.id){
                this.addList[index1].d = item.name;
              }
            });
          }
        });
      },
      del(index) {
        this.addList.splice(index, 1);
      }
    }
  }
</script>

<style scoped lang="scss">
  .add_mix_box {

    .add_item {
      margin-top: 10px;
    }

    .add_btn {
      margin-top: 10px;
      width: 446px;
    }
  }
</style>
