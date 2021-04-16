<template>
  <div class="app_list_container">
    <div class="top">
      <div>应用列表</div>
      <div>
        <!--        <a-button :disabled="!hasSelected" :loading="exportLoading" @click="exportTable" style="margin-right: 10px">-->
        <!--          批量导出-->
        <!--        </a-button>-->
        <a-button type="primary" @click="add">
          添加应用
        </a-button>
      </div>
    </div>
    <!-- :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"-->
    <a-table
      :columns="columns"
      :data-source="list"
      :rowKey="record=>record.id"
      :pagination="pagination">
      <template slot="appKey" slot-scope="text, record, index">
        <span v-if="record.isAppKeyShow">{{text}}</span>
        <span v-else>******</span>
        <span class="app-key-show" v-if="record.isAppKeyShow" @click="appKeyShow(record.isAppKeyShow,index)">隐藏</span>
        <span class="app-key-show" v-else @click="appKeyShow(record.isAppKeyShow,index)">显示</span>
      </template>
      <template slot="createTime" slot-scope="text, record, index">
        {{formatTime(text)}}
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <a-button type="link">报表</a-button>
        <a-button type="link" @click="toDetail(record.id)">详情</a-button>
        <a-button type="link" @click="toScene">配置</a-button>
        <a-popconfirm
          title="是否删除该应用?"
          ok-text="是"
          cancel-text="否"
          @confirm="del(record.id)">
          <a-button type="link" style="color:red;">删除</a-button>
        </a-popconfirm>
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
  import {getAppList, delApp, addApp} from "@/api/recommendation/index";
  import moment from "moment";

  export default {
    components: {CreateForm},
    data() {
      return {
        list: [],
        columns: [
          {
            title: '应用名称',
            dataIndex: 'appName'
          },
          {
            title: 'APP ID',
            dataIndex: 'appId',
            width: 180
          },
          {
            title: 'API Key',
            dataIndex: 'appKey',
            scopedSlots: {customRender: 'appKey'},
            width: 160
          },
          {
            title: 'Secret Key',
            dataIndex: 'appSecret',
            width: 160
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            scopedSlots: {customRender: 'createTime'}
          },
          {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: {customRender: 'operation'}
          },
        ],
        pagination: {
          total: 0,
          current: 1,
          pageSize: 10,
          onChange: (pageNumber) => {
            this.getList(pageNumber);
          }
        },
        // exportLoading: false,
        createModalShow: false,
        createLoading: false,
        nextLoading: false
      };
    },
    computed: {
      // hasSelected() {
      //   return this.selectedRowKeys.length > 0;
      // },
    },
    created() {
      this.getList();
    },
    methods: {
      formatTime(time) {
        return time ? moment(time).format("YYYY-MM-DD") : '';
      },
      appKeyShow(isAppKeyShow, index) {
        return this.list[index].isAppKeyShow = !isAppKeyShow;
      },
      toDetail(id) {
        this.$router.push({
          path: '/recommendation/application/detail?id=' + id
        });
      },
      toScene() {
        this.$router.push({
          path: '/recommendation/scene/list'
        });
      },
      add() {
        this.createModalShow = true;
      },
      // exportTable() {
      //   this.exportLoading = true;
      //   setTimeout(() => {
      //     this.exportLoading = false;
      //     this.selectedRowKeys = [];
      //   }, 1000);
      // },
      // onSelectChange(selectedRowKeys) {
      //   this.selectedRowKeys = selectedRowKeys;
      // },
      next() {
        this.$refs.createForm.$refs.createForm.validate(valid => {
          if (valid) {
            this.nextLoading = true;
            setTimeout(() => {
              this.addApp();
              this.getList();
              this.nextLoading = false;
              this.createModalShow = false;
              this.$router.push({
                path: '/recommendation/scene/list?show=1'
              });
            }, 1000);
          } else {
            console.log('提交失败!');
            return false;
          }
        });
      },
      create() {
        this.$refs.createForm.$refs.createForm.validate(valid => {
          if (valid) {
            this.createLoading = true;
            setTimeout(() => {
              this.addApp();
              this.getList();
              this.createLoading = false;
              this.createModalShow = false;
            }, 1000);
          } else {
            console.log('提交失败!');
            return false;
          }
        });
      },
      tradeChange(value) {
        // console.log(value);
      },
      getList(current) {
        let params = {
          appType: 1,//应用类型, 0普通，1推荐
          pageIndex: current || 1,
          pageSize: this.pagination.pageSize
        }
        getAppList(params).then(res => {
          if (res.code == 200000) {
            res.data.list.forEach((item) => {
              item.isAppKeyShow = false;
            })
            this.list = res.data.list;
            this.pagination.current = res.data.pageNum;
            this.pagination.total = res.data.total;
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
      },
      del(id) {
        delApp({id: id}).then(res => {
          if (res.code == 200000) {
            this.$message.success("删除成功！");
            this.getList();
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
      },
      addApp() {
        let params = Object.assign(this.$refs.createForm.$refs.createForm.model, { appType: "1" });
        addApp(params).then(res => {
          if (res.code == 200000) {
            this.$message.success("添加成功！");
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
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

    .app-key-show {
      cursor: pointer;
      color: #2373FF;
    }
  }
</style>
