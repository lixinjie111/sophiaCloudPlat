<template>
  <div class="data-admin">
    <div class="top">
      <div class="left"></div>
      <div class="right">
        <div>
          推荐应用：
          <a-select style="width:160px" placeholder="请选择推荐应用" v-model="appName" @change="appNameChange">
            <a-select-option value="all">全部</a-select-option>
            <a-select-option v-for="item in appNameList" :key="item.id">{{item.appName}}</a-select-option>
          </a-select>
        </div>
        <div>
          业务场景:
          <a-select disabled style="width: 160px" placeholder="请选择业务场景" v-model="sceneId" @change="sceneTypeChange">
            <a-select-option v-for="item in sceneList" :key="item.id" :value="item.id">{{item.title}}</a-select-option>
          </a-select>
        </div>
        <div>
          关键词:
          <a-input-search @search="onSearch" v-model="searchText" placeholder="物料名称/ID" style="width: 160px"/>
        </div>
        <a-button type="primary" disabled style="margin-left: 10px">高级查询</a-button>
      </div>
    </div>
    <a-table
      :columns="columns"
      :data-source="tableList"
      :pagination="pagination">
      <template slot="operation" slot-scope="text, record, index">
        <a-button type="link" disabled>查看</a-button>
        <a-button type="link" disabled>修改</a-button>
        <a-button type="link" disabled>删除</a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
  import {getSceneAll,getTableData, getAllByApplication, getAllDataTablesInApp} from "@/api/recommendation"
  import {showTotal} from "@/utils/common"
  export default {
    name: "list",
    data() {
      return {
        tableList:[],
        columns: [
          {
            title: '序号',
            customRender: (text, record, index) => `${index + 1}`
          },
          {
            title: '物料ID',
            dataIndex: 'goodsId'
          },
          {
            title: '物料名称',
            width: 300,
            dataIndex: 'goodsName'
          },
          {
            title: '物料类型',
            dataIndex: 'type'
          },
          {
            title: '品类1',
            dataIndex: 'category1'
          },
          {
            title: '品类2',
            dataIndex: 'category2'
          },
          {
            title: '品牌',
            dataIndex: 'brand'
          },
          {
            title: '销售原价',
            dataIndex: 'price'
          },
          {
            title: '发布时间',
            dataIndex: 'createdTime'
          },
          {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: {customRender: 'operation'},
          },
        ],
        appName: 'all',
        sceneId: void 0,
        appNameList:[],
        sceneList:[],
        dataSourceTable:[],
        pagination: {
          total: 0,
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal,
          onChange: (current, pageSize) => {
            this.pagination.current = current;
            this.getDataList();
          },
          onShowSizeChange: (current, pageSize) => {
            this.pagination.pageSize = pageSize;
            this.pagination.current = 1;
            this.getDataList();
          }
        },
        searchText:"",
        newFile: false,
        setLoading: false,
        uploadData:false
      }
    },
    methods: {
      upload(){
        this.uploadData = true
      },
      file(){
          this.newFile = true
      },
      appNameChange (value,option){
        this.appName = value
        // this.getAllByApplication(value)
      },
      sceneTypeChange (value,option){
        this.sceneId = value;
        this.getAllDataTablesInApp()
      },
      create() {
        this.$router.push({
          path: '/recommendation/application/data'
        });
      },
      cancelNew() {
        this.newFile = false;
      },
      nextStep(){

      },
      // 应用名称
      getSceneAll(){
        getSceneAll({}).then(res=>{
          if(res.code == 200000){
            this.appNameList = res.data.map(item=>{
              return {id:item.id,appName:item.appName}
            })
          }else {
            this.$message.error(res.message||"请求失败!")
          }
        }).catch(err=>{
          this.$message.error("请求失败!")
        })
      },
      // 应用场景
      getAllByApplication(applicationId){
        getAllByApplication({ applicationId }).then(res=>{
          if(res.code === 200000){
            this.sceneList = res.data
          }else{
            this.$message.error(res.message||"请求失败!")
          }
        }).catch(err=>{
          this.$message.error("请求失败!")
        })
      },
      // 应用源表
      getAllDataTablesInApp(){
        const { appName: applicationId, sceneId } =  this
        getAllDataTablesInApp({ applicationId, sceneId }).then(res=>{
          if(res.code === 200000){
            this.dataSourceTable = res.data
          }else{
            this.$message.error(res.message||"请求失败!")
          }
        }).catch(err=>{
          this.$message.error("请求失败!")
        })
      },
      getDataList(){
        let params = {
          applicationId: this.appName === 'all' ? null : this.appName,
          goodsName:this.searchText,
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize
        }
        getTableData(params).then(res => {
          if (res.code === 200000) {
            this.tableList = res.data.list;
            this.pagination.total = res.data.total;
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
      },
      onSearch(){
        this.getDataList()
      },
      goToDetail(){
        this.$router.push('/recommendation/application/data');
      },
    },
    mounted(){
      this.getSceneAll()
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
