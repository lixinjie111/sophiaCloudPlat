<template>
  <div class="app_edit_container">
    <a-card title="基本信息" size="small">
      <a-descriptions bordered :column="1" size="small">
        <a-descriptions-item label="应用名称">
          合生通数据01
        </a-descriptions-item>
        <a-descriptions-item label="应用类型">
          数据服务
        </a-descriptions-item>
        <a-descriptions-item label="所属行业">
          零售
        </a-descriptions-item>
        <a-descriptions-item label="应用描述">
          合生通提供给元知智能研究院的一部分业务数据，可以用来进行业务分析
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card title="业务场景" size="small" class="c-mt-20">
      <div class="scene-top">
        <p>共20个业务场景</p>
        <a-button type="primary" class="c-ml-20" @click="addScene">添加场景</a-button>
      </div>
      <a-table
        :columns="columns"
        :data-source="data"
        :rowKey="record=>record.id"
        :pagination="{showQuickJumper: true, showSizeChanger: true}">
        <template slot="operation" slot-scope="text, record, index">
          <a-button type="link">详情</a-button>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>

  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      key: i,
      index: i + 1,
      name: `商场热门商品推荐`,
      type1: '个性化推荐',
      kind: '商品推荐',
      num: i + 1,
      time: '2020-01-28 12:00:00',
      people: 'demo',
      operation: i
    });
  }

  export default {
    name: "detail",
    data() {
      return {
        data,
        columns: [
          {
            title: '序号',
            dataIndex: 'index'
          },
          {
            title: '场景名称',
            dataIndex: 'name'
          },
          {
            title: '推荐类型',
            dataIndex: 'type1'
          },
          {
            title: '推荐种类',
            dataIndex: 'kind'
          },
          {
            title: '调用次数',
            dataIndex: 'num'
          },
          {
            title: '创建时间',
            dataIndex: 'time'
          },
          {
            title: '创建人',
            dataIndex: 'people'
          },
          {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: {customRender: 'operation'},
            width: 100
          },
        ],
      }
    },
    methods: {
      addScene() {
        this.$router.push({
          path: '/recommendation/scene/list'
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .app_edit_container {
    padding: 20px;

    .scene-top {
      margin-bottom: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
</style>
