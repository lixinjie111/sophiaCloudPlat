<template>
  <div class="add_box">
    <div class="add_item c-mb-10" v-for="(item,index) in addList" :key="index" v-if="addList.length > 0">
      <div class="index c-mr-20">{{index+1}}</div>
      <div class="c-mr-20">特征名称：</div>
      <a-select class="c-mr-20" placeholder="请选择特征名称" v-model="item.featureId" @change="featureChange(item)" style="width:140px"
                :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
        <a-select-option :value="item.id" v-for="(item,index) in dataTypeList" :key="index">{{item.name}}
        </a-select-option>
      </a-select>
      <div class="c-mr-20">抽取范围：</div>
      <a-select class="c-mr-20" placeholder="请选择抽取范围" v-model="item.scope" @change="scopeChange(item)" style="width:140px"
                :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
        <a-select-option :value="item.id + ''" v-for="(item,index) in scopeList" :key="index">{{item.userTableName}}
        </a-select-option>
      </a-select>
      <div class="c-mr-20">应用于：</div>
      <a-select class="c-mr-20" placeholder="请选择应用范围" v-model="item.applyTo" @change="applyChange" style="width:140px"
                :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
        <a-select-option :value="item.id" v-for="(item,index) in applyList" :key="index">{{item.value}}
        </a-select-option>
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
    name: "AddData",
    props: {
      // 数据列表
      list: {
        type: Array,
        default: () => []
      },
      //特征名称列表
      dataTypeList: {
        type: Array,
        default: () => []
      },
      //抽取范围列表
      scopeList: {
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
        applyList: [{
          id: 0,
          value: '仅抽取'
        },{
          id: 1,
          value: '历史记录'
        },{
          id: 2,
          value: '物流热度值'
        }]
      }
    },
    methods: {
      resetSceneFeatures() {
        this.addList.forEach((item)=> {
          item.featureId = undefined;
          item.scope = undefined;
          item.applyTo = undefined;
        });
      },
      add() {
        if (this.addList.length >= 10) {
          this.$message.warning('最多添加10条');
          return;
        }
        this.addList.push({
          featureId: undefined,
          scope: undefined,
          applyTo: undefined
        });
      },
      del(index) {
        this.addList.splice(index, 1);
      },
      featureChange(item) {

      },
      scopeChange(item) {

      },
      applyChange(item) {

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
