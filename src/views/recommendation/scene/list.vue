<template>
  <div class="scene_list_container">
    <div class="top">
      <div class="left">
        <a-button type="primary" @click="add">
          新增
        </a-button>
      </div>
      <div class="right">
        <div>
          应用名称：
          <a-select placeholder="请选择应用名称" v-model="appName" @change="appNameChange">
            <a-select-option value="0">全部</a-select-option>
            <a-select-option value="1">1</a-select-option>
            <a-select-option value="2">2</a-select-option>
          </a-select>
        </div>
        <div>
          推荐类型：
          <a-select placeholder="请选择推荐类型" v-model="recType" @change="recTypeChange">
            <a-select-option value="0">全部</a-select-option>
            <a-select-option value="1">1</a-select-option>
            <a-select-option value="2">2</a-select-option>
          </a-select>
        </div>
        <div>
          场景类型：
          <a-select placeholder="请选择场景类型" v-model="sceneType" @change="sceneTypeChange">
            <a-select-option value="0">全部</a-select-option>
            <a-select-option value="1">1</a-select-option>
            <a-select-option value="2">2</a-select-option>
          </a-select>
        </div>
        <div>
          <a-input-search placeholder="业务场景名称" style="width: 200px" @search="onSearch"/>
        </div>
      </div>
    </div>
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="{showQuickJumper: true, showSizeChanger: true}">
      <template slot="operation" slot-scope="text, record, index">
        <a-button type="link" @click="toDetail">详情</a-button>
        <a-button type="link" @click="toEdit">编辑</a-button>
        <a-button type="link">测试</a-button>
        <a-button type="link">删除</a-button>
      </template>
    </a-table>
    <a-modal v-model="sceneModalShow" title="创建业务场景" :width="640">
      <template slot="footer">
        <a-button type="primary" :loading="setLoading" @click="setting">
          配置数据
        </a-button>
        <a-button @click="cancelSetting">
          取消
        </a-button>
      </template>
      <SceneForm ref="sceneForm"></SceneForm>
    </a-modal>
  </div>
</template>

<script>
  import SceneForm from "@/components/recommendation/scene/SceneForm";

  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      index: i + 1,
      name: `商场热门商品推荐`,
      app: `合生汇商品推荐`,
      type1: '个性化推荐',
      type2: '智能场景',
      kind: '商品推荐',
      num: i + 1,
      time: '2020-01-28 12:00:00',
      people: 'demo',
      operation: i
    });
  }

  export default {
    name: "list",
    components: {SceneForm},
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
            title: '所属应用',
            dataIndex: 'app'
          },
          {
            title: '推荐类型',
            dataIndex: 'type1'
          },
          {
            title: '场景类型',
            dataIndex: 'type2'
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
            width: 300
          },
        ],
        appName: "0",
        recType: "0",
        sceneType: "0",
        sceneModalShow: false,
        setLoading: false
      }
    },
    methods: {
      toDetail() {
        this.$router.push({
          path: '/recommendation/scene/detail'
        });
      },
      toEdit() {
        this.$router.push({
          path: '/recommendation/scene/edit'
        });
      },
      add() {
        this.sceneModalShow = true;
      },
      appNameChange() {

      },
      recTypeChange() {

      },
      sceneTypeChange() {

      },
      setting() {
        this.$router.push({
          path: '/recommendation/scene/data'
        });
      },
      cancelSetting() {
        this.sceneModalShow = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  .scene_list_container {
    padding: 20px;

    .top {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .right {
        display: flex;
        justify-content: space-between;
        align-items: center;

        > div {
          margin-left: 10px;
        }
      }
    }
  }
</style>
