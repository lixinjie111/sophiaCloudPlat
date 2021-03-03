<template>
  <div class="data-admin">
    <div class="top">
      <div class="left">
        <a-button type="primary" @click="upload" style="margin-right: 10px">上传数据</a-button>
        <a-button type="primary" @click="file" icon="plus">文件夹</a-button>
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
            数据类型:
          <a-select placeholder="请选择场景类型" v-model="sceneType" @change="sceneTypeChange">
            <a-select-option value="0">全部</a-select-option>
            <a-select-option value="1">1</a-select-option>
            <a-select-option value="2">2</a-select-option>
          </a-select>
        </div>
        <div>
          <a-input-search placeholder="数据表名称" style="width: 200px" @search="onSearch" />
        </div>
      </div>
    </div>
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="{showQuickJumper: true, showSizeChanger: true}">
      <template slot="operation" slot-scope="text, record, index">
        <a-button type="link">查看</a-button>
        <a-button type="link">修改</a-button>
        <a-button type="link">删除</a-button>
      </template>
    </a-table>
    <a-modal v-model="newFile" title="选择业务场景">
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
      name: `北京合生汇数据`,
      fileName: `合生汇`,
      type1: '商品数据',
      owner: '合生通',
      creater:"ampm",
      kind: '同步',
      time: '2020-01-28 12:00:00',
      update: '2020-02-28 12:00:00',
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
            title: '表名',
            dataIndex: 'name'
          },
          {
            title: '文件夹',
            dataIndex: 'fileName'
          },
          {
            title: '数据类型',
            dataIndex: 'type1'
          },
          {
            title: '所属租户',
            dataIndex: 'owner'
          },
          {
            title: '创建人',
            dataIndex: 'creater'
          },
          {
            title: '分类',
            dataIndex: 'kind'
          },
          {
            title: '创建时间',
            dataIndex: 'time'
          },
          {
            title: '更新时间',
            dataIndex: 'update'
          },
          {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: {customRender: 'operation'},
          },
        ],
        appName: "0",
        recType: "0",
        sceneType: "0",
        newFile: false,
        setLoading: false
      }
    },
    methods: {
      upload(){},
      file(){
          this.newFile = true
      },
      appNameChange (){

      },
      recTypeChange (){

      },
      sceneTypeChange (){

      },
      setting() {
        this.$router.push({
          path: '/recommendation/application/data'
        });
      },
      cancelSetting() {
        this.newFile = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  .data-admin {
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
