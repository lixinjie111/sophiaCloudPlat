<template>
  <div class="app_list_container">
    <div class="top">
      <div>应用列表</div>
      <div>
        <a-button :disabled="!hasSelected" :loading="exportLoading" @click="exportTable" style="margin-right: 10px">
          批量导出
        </a-button>
        <a-button type="primary" @click="add">
          添加应用
        </a-button>
      </div>
    </div>
    <a-table
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="columns"
      :data-source="data"
      :pagination="{showQuickJumper: true, showSizeChanger: true}">
      <template slot="operation" slot-scope="text, record, index">
        <a-button type="link">报表</a-button>
        <a-button type="link" @click="toDetail">详情</a-button>
        <a-button type="link" @click="sceneModalShow = true">配置</a-button>
        <a-button type="link" style="color:red;">删除</a-button>
      </template>
    </a-table>
    <a-modal v-model="createModalShow" title="创建应用">
      <template slot="footer">
        <a-button type="primary" :loading="createLoading" @click="create">
          创建
        </a-button>
        <a-button @click="next" :loading="nextLoading">
          下一步
        </a-button>
      </template>
      <CreateForm ref="createForm"></CreateForm>
    </a-modal>
  </div>
</template>
<script>
  import CreateForm from "@/components/recommendation/application/CreateForm";

  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      appId: i,
      api: i,
      secret: i,
      time: '2020-01-28 12:00:00',
      operation: i
    });
  }

  export default {
    components: {CreateForm},
    data() {
      return {
        data,
        columns: [
          {
            title: '应用名称',
            dataIndex: 'name'
          },
          {
            title: 'APP ID',
            dataIndex: 'appId',
            width: 120
          },
          {
            title: 'API Key',
            dataIndex: 'api',
            width: 120
          },
          {
            title: 'Secret Key',
            dataIndex: 'secret',
            width: 120
          },
          {
            title: '创建时间',
            dataIndex: 'time',
            width: 180
          },
          {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: {customRender: 'operation'},
            width: 300
          },
        ],
        selectedRowKeys: [],
        exportLoading: false,
        createModalShow: false,
        createLoading: false,
        nextLoading: false
      };
    },
    computed: {
      hasSelected() {
        return this.selectedRowKeys.length > 0;
      },
    },
    methods: {
      toDetail() {
        this.$router.push({
          path: '/recommendation/application/detail'
        });
      },
      add() {
        this.createModalShow = true;
      },
      exportTable() {
        this.exportLoading = true;
        setTimeout(() => {
          this.exportLoading = false;
          this.selectedRowKeys = [];
        }, 1000);
      },
      onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.selectedRowKeys = selectedRowKeys;
      },
      next() {
        this.$refs.createForm.$refs.createForm.validate(valid => {
          if (valid) {
            this.nextLoading = true;
            setTimeout(() => {
              this.nextLoading = false;
              this.createModalShow = false;
              this.$router.push({
                path: '/recommendation/scene/list'
              });
            }, 1000);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      create() {
        this.$refs.createForm.$refs.createForm.validate(valid => {
          if (valid) {
            this.createLoading = true;
            setTimeout(() => {
              this.createLoading = false;
              this.createModalShow = false;
            }, 1000);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      tradeChange(value) {
        console.log(value);
      }
    }
  };
</script>
<style scoped lang="scss">
  .app_list_container {
    padding: 20px;

    .top {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
