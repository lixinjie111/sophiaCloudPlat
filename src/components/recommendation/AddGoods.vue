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
      <div>找回状态</div>
    </div>
    <div class="add_item c-mb-10" v-for="(item,index) in addList" :key="index" v-if="addList.length > 0">
      <div class="index">{{index+1}}</div>
      <a-select class="c-mr-10" placeholder="请选择1级品类" v-model="item.source" @change="change" style="width:100px">
        <a-select-option value="1">食品</a-select-option>
      </a-select>
      <a-select class="c-mr-10" placeholder="请选择2级品类" v-model="item.source" @change="change" style="width:100px">
        <a-select-option value="1">食品</a-select-option>
      </a-select>
      <a-select class="c-mr-10" placeholder="请选择品牌" v-model="item.source" @change="change" style="width:100px">
        <a-select-option value="1">食品</a-select-option>
      </a-select>
      <a-select class="c-mr-10" placeholder="请选择物品特征" v-model="item.source" @change="change" style="width:100px">
        <a-select-option value="1">食品</a-select-option>
      </a-select>
      <a-select class="c-mr-10" placeholder="请选择逻辑判断" v-model="item.source" @change="change" style="width:100px">
        <a-select-option value="1">食品</a-select-option>
      </a-select>
      <a-select class="c-mr-10" placeholder="请选择规则数值" v-model="item.source" @change="change" style="width:100px">
        <a-select-option value="1">食品</a-select-option>
      </a-select>
      <a-select class="c-mr-10" placeholder="请选择召回状态" v-model="item.source" @change="change" style="width:100px">
        <a-select-option value="1">食品</a-select-option>
      </a-select>
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
    name: "AddGoods",
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
          source: '1'
        })
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

    .add_title {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      >div {
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
