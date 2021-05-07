<template>
  <div class="custom_recall">
    请至少添加一个召回策略，您最多能创建5个召回策略，系统将按您创建的顺序执行召回策略
    <div class="method_list">
      <p>召回策略</p>
      <div class="line"></div>
      <ul>
        <li>
          <div>
            <span>召回策略1:</span>
            <span class="item_name">基于物品的协同过滤01</span>
          </div>
          <span class="item_del">删除</span>
        </li>
      </ul>
      <a-button class="add_btn" @click="add" :width="100">
        <a-icon type="plus" />
      </a-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "CustomRecall",
  props: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.custom_recall {
  .method_list {
    padding: 0 24px;
    > p {
      margin: 12px 0;
      font-weight: 600;
    }
    .line {
      width: 100%;
      height: 0;
      border-top: 1px dashed #666;
    }
    ul {
      > li {
        display: flex;
        margin: 16px 0;
        .item_name {
          font-weight: 600;
        }
        .item_del {
          margin-left: 40px;
          color: #2373ff;
          cursor: pointer;
        }
      }
    }
    .add_btn {
      width: 50%;
    }
  }
}
</style>