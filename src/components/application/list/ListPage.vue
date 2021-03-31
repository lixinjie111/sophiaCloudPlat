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
      <a-table :pagination="{ current, pageSize, total, showTotal:(total, range) => `第 ${range[0]}-${range[1]} / 共计 ${total} 条` }" :columns="columns" rowKey="id" :data-source="data" @change="tableChange" bordered class="dotted-line-table" :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        <template slot="appName" slot-scope="text, record">
          <a class="c-blue name" @click="openModal(3, record)">{{ text }}</a>
        </template>
        <div
          slot="filterDropdown"
          slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
          style="padding: 8px;"
        >
          <a-input
            placeholder="搜索应用名称"
            v-model="searchInputValue"
            style="width: 188px; margin-bottom: 8px; display: block; border-radius: 5px"
          >
            <a-icon slot="suffix" type="search" />
          </a-input>
          <div style="border-top: 1px solid #e8e8e8; padding-top: 6px;">
            <a-button
              type="link"
              size="small"
              @click="onSearch"
              style="width: 90px; margin-right: 8px"
            >
              搜索
            </a-button>
            <span style="width: 90px; display: inline-block; cursor: pointer; text-align: center" @click="() => searchInputValue = null">
            重置
          </span>
          </div>

        </div>
        <template slot="appSecret" slot-scope="text, record">
          <div v-if="text">
            <span v-if="showSecretKey.includes(record.id)">{{ text }}</span>
            <span v-else>******</span>
            <a-button type="link" @click="onShowSecretKey(record.id)">显示</a-button>
          </div>
          <template v-else>-</template>
        </template>
        <template slot="createTime" slot-scope="text, record">
          <div v-if="text">
            {{moment(text).format('YYYY-MM-DD HH:mm:ss')}}
          </div>
          <template v-else>-</template>
        </template>
        <span slot="action" slot-scope="text, record">
          <a class="action c-blue" @click="onReport(record.key)">报表</a>
          <a class="action c-blue" @click="onDetail(record)">详情</a>
          <a class="action c-blue" @click="onConfiguration(record)">配置</a>
          <a-popconfirm
             title="是否删除该应用?"
             ok-text="是"
             cancel-text="否"
             @confirm="onDel(record)">
            <a class="action action-del">删除</a>
          </a-popconfirm>

        </span>
      </a-table>
      <create-app-modal :visible="true" :industryList="industryList" title="" v-if="showModal === 1" @cancel="closeModal" @refreshList="refreshList"/>
      <connector-modal :visible="true" :interfaceList="interfaceList" :record="record" :interfaceData="interfaceData" title=""  v-if="showModal === 2" @cancel="closeModal"/>
      <detail :visible="true" title="" :interfaceList="interfaceList" :industryList="industryList" :record="record" :interfaceData="interfaceData" v-if="showModal === 3" @cancel="closeModal"/>
    </template>
  </div>
</template>

<script>
  import moment from 'moment'
  import service from '@/utils/request'
  import CreateAppModal from './components/CreateAppModal.vue'
  import ConnectorModal from './components/ConnectorModal'
  import Detail from './components/Detail'
  import InitPage from './InitPage.vue'
  import { getApplicationList, getIndustryOptions, getServiceList, delApplication } from '@/api/application';
  const columns = [
    {
      title: '应用名称',
      dataIndex: 'appName',
      scopedSlots: {customRender: 'appName', filterDropdown: 'filterDropdown' },
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
      dataIndex: 'appSecret',
      scopedSlots: {customRender: 'appSecret'},
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      sorter: true,
      scopedSlots: {customRender: 'createTime'},
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 230,
      scopedSlots: {customRender: 'action'},
    },
  ];
  export default {
    components: { CreateAppModal, ConnectorModal, InitPage, Detail },
    data() {
      return{
        moment,
        columns,
        pageSize: 10,
        current: 1,
        total: 0,
        selectedRowKeys: [],
        sorter: {},
        data: [],
        record: {},
        showModal: null,
        showSecretKey: [], // 显示secretKey的数据的id集合
        interfaceList: [], // 服务接口列表
        industryList: [], // 行业下啦
        interfaceData: {}, // 配置信息
        searchInputValue: null, // 搜索输入框的值
      }
    },
    mounted(){
      this.getList()
      this.getIndustryOptions()
      this.getServiceList()
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
      onDetail(record){
        this.openModal(3, record)
      },
      // 配置操作列点击事件
      onConfiguration(record){
        this.openModal(2, record)
      },
      // 删除操作列点击事件
      onDel(record){
        delApplication({ id: record.id }).then(()=>{
          this.$message.success('删除应用成功')
          this.getList()
        })
      },
      pageChange(pagination){
        this.current = pagination.current;
        this.pageSize = pagination.pageSize;
        this.getList()
      },
      tableChange(pagination, filters, sorter){
        this.sorter = sorter;
        this.pageChange(pagination)
      },
      // 行选择事件
      onSelectChange(a, b){
        this.selectedRowKeys = a
      },
      // 获取应用列表
      getList(){
        const parmas = { pageIndex: this.current, pageSize: this.pageSize, appName: this.searchInputValue };
        getApplicationList(parmas).then((res)=>{
          this.data = res.data.list
          console.log('res.data.total', res.data.total)
          this.total = res.data.total
        })
      },
      // 刷新应用列表
      refreshList(){
        this.current = 1;
        this.getList()
      },
      openModal(showModal, record = {}){
        this.record = record;
        this.showModal = showModal;
      },
      closeModal(){
        this.record = {}
        this.showModal = null
      },
      // 获取行业下拉选项
      getIndustryOptions(){
        getIndustryOptions().then((res)=>{
          this.industryList = res.data
        })
      },
      // 接口配置项
      getServiceList(){
        getServiceList().then((res)=>{
          this.interfaceList = res
        })
      }, // 搜索事件
      onSearch(){
        this.pageIndex = 1;
        this.getList()
      },
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
