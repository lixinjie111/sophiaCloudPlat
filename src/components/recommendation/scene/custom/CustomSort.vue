<template>
  <div class="custom_sort">
    请添加排序策略，您最多能创建3个排序策略，系统将按您创建的顺序执行排序策略
    <div class="method_list">
      <p>排序策略</p>
      <div class="line"></div>
      <ul>
        <li>
          <div>
            <span>排序策略1:</span>
            <span class="item_name">逻辑回归01</span>
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
  name: "CustomSort",
  props: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.custom_sort {
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