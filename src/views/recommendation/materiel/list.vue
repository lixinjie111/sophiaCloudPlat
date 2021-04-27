<template>
  <div class="data-admin">
    <div class="top">
      <div class="left">
        <a-button type="primary" style="margin-right: 10px">删除</a-button>
        <a-button type="primary" >必推物料池</a-button>
      </div>
      <div class="right">
        <div>
          应用名称：
          <a-select style="width: 140px" placeholder="请选择应用名称" v-model="appName" @change="appNameChange"
                    :getPopupContainer="triggerNode => {return triggerNode}">
            <a-select-option v-for="item in appNameList" :key="item.id">{{item.appName}}</a-select-option>
          </a-select>
        </div>
        <div>
          应用场景:
          <a-select style="width: 140px" placeholder="请选择应用场景" v-model="sceneId" @change="sceneTypeChange"
                    :getPopupContainer="triggerNode => {return triggerNode}">
            <a-select-option v-for="item in sceneList" :key="item.id" :value="item.id">{{item.title}}</a-select-option>
          </a-select>
        </div>
        <div>
          数据源表:
          <a-select style="width: 140px" placeholder="请选择数据源表" v-model="tableName"
                    :getPopupContainer="triggerNode => {return triggerNode}">
            <a-select-option v-for="item in dataSourceTable" :key="item.id" :value="item.tableName">{{item.userTableName}}</a-select-option>
          </a-select>
        </div>
        <div>
          关键词:
          <a-input v-model="searchText" placeholder="请输入关键词" style="width: 140px"/>
        </div>
        <a-button type="primary" @click="onSearch" style="margin-left: 10px">查询</a-button>
      </div>
    </div>
    <a-table
      :scroll="{ x: 1500}"
      :columns="columns"
      :data-source="tableList"
      :pagination="pagination">
      <template slot="operation" slot-scope="text, record, index">
        <a-button class="p0" type="link" disabled @click="goToDetail(record)">查看</a-button>
        <a-button class="p0" type="link" disabled>修改</a-button>
        <a-button class="p0" type="link" disabled>删除</a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
  import {getSceneAll,getDataByWord, getAllByApplication, getAllDataTablesInApp} from "@/api/recommendation/index"
  export default {
    name: "list",
    data() {
      return {
        tableList:[],
        columns: [
          {
            title: '序号',
            width: 60,
            fixed: "left",
            customRender: (text, record, index) => `${index + 1}`
          },
          {
            title: '物料ID',
            dataIndex: 'materiel_id'
          },
          {
            title: '物料名称',
            dataIndex: 'material_name',
            width: 200
          },
          {
            title: '物料类型',
            dataIndex: 'material_type'
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
            dataIndex: 'brand_name'
          },
          {
            title: '销售原价',
            dataIndex: 'selling_price'
          },
          {
            title: '发布时间',
            dataIndex: 'exposure_times'
          },
          {
            title: '商品销量',
            dataIndex: 'sales_volume'
          },
          {
            title: '商品库存',
            dataIndex: 'merchandise_inventory'
          },
          {
            title: '操作',
            dataIndex: 'operation',
            width: 200,
            fixed: "right",
            scopedSlots: {customRender: 'operation'},
          },
        ],
        appName: void 0,
        sceneId: void 0,
        tableName: void 0,
        appNameList:[],
        sceneList:[],
        dataSourceTable:[],
        pagination: {
          total: 0,
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
          onChange: (current, pageSize) => {
            this.pagination.current = current
            this.getDataList();
          },
          onShowSizeChange: (current, pageSize) => {
            this.pagination.pageSize = pageSize
            this.pagination.current = 1
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
        this.getAllByApplication(value)
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
          tableName:this.tableName,
          query:this.searchText,
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize
        }
        getDataByWord(params).then(res => {
          if (res.code == 200000) {
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
    .p0{
      padding: 0 20px 0 0;
    }
  }
</style>
