<template>
  <a-modal
    :footer="null"
    centered
    destroyOnClose
    v-model="addModal"
    title="梯度下降树(GBDT)"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <a-row class="mb24">
        <a-col :span="6">策略名称:</a-col>
        <a-col :span="18">{{detailData.name}}</a-col>
    </a-row>
    <a-row class="mb24">
      <a-col :span="6">选择算法模式:</a-col>
      <a-col :span="18">
          <div v-if="detailData.algorithmMode">测试模式</div>
          <div v-else>训练模式</div>
          <!-- <a-select-option :value="0">训练模式</a-select-option> -->
          <!-- <a-select-option :value="1">测试模式</a-select-option> -->
      </a-col>
    </a-row>
    <a-row class="mb24">
      <a-col :span="6">时间跨度(天):</a-col>
      <a-col :span="18">
        {{detailData.daySpan}}
      </a-col>
    </a-row>
    <a-row class="mb24">
      <a-col :span="6">是否重新训练:</a-col>
      <a-col :span="18">
          <div v-if="detailData.retrainFlag">关闭</div>
          <div v-else>开启</div>
      </a-col>
    </a-row>
    <a-row class="mb24">
      <a-col :span="8">商品参与训练得特征:</a-col>
      <a-col :span="16">
          <div
            v-for="item in detailData.goodsFeatures"
            :key="item.goodsFeatureField"
            >{{ item.goodsFeature }}</div
          >
      </a-col>
    </a-row>
    <a-row class="mb24">
      <a-col :span="8">用户参与训练得特征:</a-col>
      <a-col :span="16">
          <div
            v-for="item in userFeatures"
            :key="item.userFeatureField"
            >{{ item.userFeature}}</div
          >
      </a-col>
    </a-row>
    <a-row class="mb24">
      <a-col :span="6">随机种子数:</a-col>
      <a-col :span="18">
        {{detailData.randomSeedNum}}
      </a-col>
    </a-row>
    <a-row class="mb24">
      <a-col :span="6">学习率:</a-col>
      <a-col :span="18">
        {{detailData.learningRate}}
      </a-col>
    </a-row>
    <a-row class="mb24">
      <a-col :span="6">决策数深度:</a-col>
      <a-col :span="18">
        {{detailData.tree_depth}}
      </a-col>
    </a-row>
    <a-row class="mb24">
      <a-col :span="6">迭代步数:</a-col>
      <a-col :span="18">
        {{detailData.iterations}}
      </a-col>
    </a-row>
    <a-row class="mb24">
      <a-col :span="6">商品筛选SQL:</a-col>
      <a-col :span="18">
        <a-textarea :row="6" v-model="detailData.filterSql" disabled></a-textarea>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
export default {
  name: "Sort",
  props: {
    detailData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      addModal: true,
    };
  },
  methods: {
    handleCancel() {
      this.addModal = false;
      this.$emit("initType");
    },
    handleOk() {
      this.addModal = false;
      this.$emit("initType");
    },
  },
};
</script>
<style scoped lang="scss">
  .mb24{
    margin-bottom: 24px;
  }
</style>