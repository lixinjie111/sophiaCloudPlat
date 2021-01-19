<template>
  <div class="container">
    <div class="page-header">
      <h1 class="page-title">应用列表</h1>
      <div v-if="data.length">
        <a-button>批量导出</a-button>
        <a-button class="" type="primary" @click="openModal(1)">添加应用</a-button>
      </div>
    </div>
    <init-page v-if="!data.length"></init-page>
    <template v-else>
      <a-table :columns="columns" :data-source="data" @change="tableChange" bordered class="dotted-line-table" :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        <template slot="name" slot-scope="text">
          <a class="c-blue name" @click="openModal(2)">{{ text }}</a>
        </template>
        <template slot="secretKey" slot-scope="text, record">
          <div>
            <span v-if="showSecretKey.includes(record.key)">{{ text }}</span>
            <span v-else>******</span>
            <a-button type="link" @click="onShowSecretKey(record.key)">显示</a-button>
          </div>
        </template>
        <span slot="action" slot-scope="text, record">
          <a class="action c-blue" @click="onReport(record.key)">报表</a>
          <a class="action c-blue" @click="onDetail(record.key)">详情</a>
          <a class="action c-blue" @click="onConfiguration(record.key)">配置</a>
          <a-popconfirm
             title="是否删除该应用?"
             ok-text="是"
             cancel-text="否"
             @confirm="onDel(record.key)">
            <a class="action action-del">删除</a>
          </a-popconfirm>

        </span>
        <a-pagination
          v-model="current"
          :total="total"
          show-size-changer
          :page-size="pageSize"
          :show-total="(total, range) => `第 ${range[0]}-${range[1]} / 共计 ${total} 条`"
          @change="pageChange"
        >
        </a-pagination>
      </a-table>
      <create-app-modal :visible="true" title="" v-if="showModal === 1" @cancel="closeModal" @next="onNext" @create="onCreate"/>
      <connector-modal :visible="true" title=""  v-if="showModal === 2" @cancel="closeModal"/>
    </template>
  </div>
</template>

<script>
  import moment from 'moment'
  import service from '@/utils/request'
  import CreateAppModal from './components/CreateAppModal.vue'
  import ConnectorModal from './components/ConnectorModal'
  import InitPage from './InitPage.vue'
  const columns = [
    {
      title: '应用名称',
      dataIndex: 'name',
      scopedSlots: {customRender: 'name'},
    },
    {
      title: 'APP ID',
      className: 'column-money',
      dataIndex: 'appId',
    },
    {
      title: 'APP Key',
      dataIndex: 'appKey',
    },
    {
      title: 'Secret Key',
      dataIndex: 'secretKey',
      scopedSlots: {customRender: 'secretKey'},
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      sorter: true,
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 230,
      scopedSlots: {customRender: 'action'},
    },
  ];
  const data = [];
  for(let i = 0; i< 100; ++i){
    data.push({
      key: i,
      name: '好生活',
      appId: '2141',
      appKey: 'appKey',
      secretKey: '123456',
      createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    })
  }

  export default {
    components: { CreateAppModal, ConnectorModal, InitPage },
    data() {
      return{
        columns,
        pageSize: 10,
        current: 1,
        total: 0,
        selectedRowKeys: [],
        sorter: {},
        data,
        showModal: null,
        showSecretKey: [], // 显示secretKey的数据的id集合
      }
    },
    methods: {
      onShowSecretKey(key){
        if(this.showSecretKey.includes(key)){
          this.showSecretKey = this.showSecretKey.filter(e=>e !== key)
        }else {
          this.showSecretKey.push(key)
        }
      },
      // 报表列操作列点击事件
      onReport(key){},
      // 详情操作列点击事件
      onDetail(key){
        this.openModal(1)
      },
      // 配置操作列点击事件
      onConfiguration(key){
        this.openModal(2)
      },
      // 删除操作列点击事件
      onDel(key){
        console.log(this.$axios)
      },
      pageChange(pagination, a){
        console.log('pageChange', a)
        this.current = pagination.current;
        this.pageSize = pagination.pageSize;
        this.getList()
      },
      tableChange(pagination, filters, sorter){
        this.sorter = sorter
        console.log('tableChange', pagination, filters, sorter)
        this.getList()
      },
      // 行选择事件
      onSelectChange(a, b){
        console.log(a, b)
        this.selectedRowKeys = a
      },
      getList(){
        const parmas = { current: this.current, pageSize: this.pageSize }
        console.log('请求参数为===》', JSON.stringify(parmas))
      },
      openModal(showModal){
        this.showModal = showModal
      },
      closeModal(){
        this.showModal = null
      },
      onNext(values){
        console.log('onNext', values)
        this.showModal = 2
      },
      onCreate(values){
        console.log('onCreate', values)
      }
    }
  }
</script>

<style lang="scss" scoped>
  $color: #c3cfe9;
  .container {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    /deep/.ant-table{
      color: #676970;
    }
  }
  /deep/.dotted-line-table .ant-table.ant-table-bordered .ant-table-thead>tr>th{
    font-weight: 700;
  }
  .name{
    cursor: pointer;
    font-weight: 700;
  }
  .action{
    padding: 0 6px;
    cursor: pointer;
  }
  .action-del{
    color: red;
  }
  .gary {
    color: $color;
  }

  .init-page-title {
    width: 500px;
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    margin: 20px auto;
  }

  .init-page-content {
    width: 900px;
    margin: 0 auto;
    padding: 20px 0;
    display: flex;
    .init-page-content-l {
      padding-left: 50px;
      position: relative;
      width: 60%;
    }
    .init-page-content-title {
      font-size: 20px;
      font-weight: 700;
      margin: 20px 0;
    }
    .init-page-content-l-m {
      margin: 20px 0;
    }
    .create-btn {
      margin-right: 10px;
    }
    .init-page-content-r {
      border-left: 1px solid $color;
      padding: 0 30px;
      width: 40%;
      ul {
        list-style-type: disc;
        padding-left: 20px;
      }
    }
  }

  .border {
    border: 1px solid $color;
  }
</style>
