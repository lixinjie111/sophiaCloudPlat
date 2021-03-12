<template>
  <div class="add_box">
    <div class="add_item c-mb-10" v-for="(item,index) in addList" :key="index" v-if="addList.length > 0">
      <div class="index c-mr-20">{{index+1}}</div>
      <div class="c-mr-20">数据类型：</div>
      <a-select class="c-mr-20" placeholder="请选择数据类型" v-model="item.source" @change="sourceChange" style="width:140px">
        <a-select-option value="1">用户数据</a-select-option>
        <a-select-option value="2">行为数据</a-select-option>
      </a-select>
      <div class="c-mr-20">数据源：</div>
      <a-select class="c-mr-20" placeholder="请选择数据源" v-model="item.source" @change="sourceChange" style="width:140px">
        <a-select-option value="1">合生通数据01</a-select-option>
        <a-select-option value="2">合生通数据02</a-select-option>
      </a-select>
      <div class="c-mr-20">数据源表：</div>
      <a-select class="c-mr-20" placeholder="请选择数据源表" v-model="item.table" @change="tableChange" style="width:140px">
        <a-select-option value="1">商管专题数据1</a-select-option>
        <a-select-option value="2">商管专题数据2</a-select-option>
      </a-select>
      <a-button type="primary" icon="profile" class="c-mr-20">详情</a-button>
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
  export default {
    name: "AddData",
    props: {
      list: {
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
          source: '1',
          table: '1'
        })
      },
      del(index) {
        this.addList.splice(index, 1);
      },
      sourceChange() {

      },
      tableChange() {

      }
    }
  }
</script>

<style scoped lang="scss">
  .add_box {
    width: 100%;

    .add_item {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .index {
        width: 30px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #cccccc;
        border-radius: 5px;
        text-align: center;
      }
    }

    .add_btn {
      width: 100%;
    }
  }
</style>
