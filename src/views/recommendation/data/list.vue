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
          <a-select style="width:160px" placeholder="请选择应用名称" v-model="appName" @change="appNameChange">
            <a-select-option value="all">全部</a-select-option>
            <a-select-option v-for="item in appNameList" :key="item.id">{{item.appName}}</a-select-option>
          </a-select>
        </div>
        <div>
            数据类型:
          <a-select style="width: 160px" placeholder="请选择场景类型" v-model="dataTypeDesc" @change="sceneTypeChange">
            <a-select-option value="all">全部</a-select-option>
            <a-select-option v-for="item in sceneList" :key="item.id">{{item.dataTypeDesc}}</a-select-option>
          </a-select>
        </div>
        <div>
          <a-input-search v-model="searchText" placeholder="数据表名称" style="width: 200px" @search="onSearch" />
        </div>
      </div>
    </div>
    <a-table
      :columns="columns"
      :data-source="tableList"
      :pagination="pagination">
      <template slot="operation" slot-scope="text, record, index">
        <a-button type="link">查看</a-button>
        <a-button type="link" disabled>修改</a-button>
        <a-button type="link" disabled>删除</a-button>
      </template>
    </a-table>
    <a-modal v-model="newFile" title="创建文件夹">
      <template slot="footer">
        <a-button type="primary" :loading="setLoading" @click="create">
          创建
        </a-button>
        <a-button @click="cancelNew">
          取消
        </a-button>
      </template>
      <NewFile></NewFile>
    </a-modal>
    <a-modal v-model="uploadData" title="上传数据" :footer="null">
      <UploadData></UploadData>
    </a-modal>
  </div>
</template>
 
<script>
  import NewFile from "@/components/recommendation/data/NewFile";
  import UploadData from "@/components/recommendation/data/UploadData";
  import {getSceneAll,getDataTypes,getDataTableList} from "@/api/recommendation/index"
  export default {
    name: "list",
    components: {NewFile,UploadData},
    data() {
      return {
        tableList:[],
        columns: [
          {
            title: '序号',
            dataIndex: 'index'
          },
          {
            title: '表名',
            dataIndex: 'userTableName'
          },
          {
            title: '文件夹',
            dataIndex: 'documentName'
          },
          {
            title: '数据类型',
            dataIndex: 'dataTypeDesc'
          },
          {
            title: '所属租户',
            dataIndex: 'tenant'
          },
          {
            title: '创建人',
            dataIndex: 'tenant'
          },
          // {
          //   title: '分类',
          //   dataIndex: 'kind'
          // },
          {
            title: '创建时间',
            dataIndex: 'createdTime'
          },
          {
            title: '更新时间',
            dataIndex: 'updatedTime'
          },
          {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: {customRender: 'operation'},
          },
        ],
        appName: "all",
        dataTypeDesc: "all",
        appNameList:[],
        sceneList:[],
        pagination: {
          total: 0,
          current: 1,
          pageSize: 10,
          showQuickJumper: true, 
          showSizeChanger: true,
          onChange: (pageNum) => {
            this.getDataList(pageNum);
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
      appNameChange (value){
        this.appName = value
        console.log(value)
        this.getDataList(this.pagination.current)
      },
      sceneTypeChange (value){
        this.dataTypeDesc = value
        console.log(value)
        this.getDataList(this.pagination.current)
      },
      onSearch(){
        console.log(this.searchText)
        this.getDataList(this.pagination.current)
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
      // 数据类型
      getAppList(){
        getDataTypes({}).then(res=>{
          if(res.code == 200000){
            let ary = []
            res.data.slice(0,-2).forEach(item=>{
              ary.push(...item.subDataTypes)
            })
            this.sceneList = ary
            console.log(this.sceneList)
          }else{
            this.$message.error(res.message||"请求失败!")
          }
        }).catch(err=>{
          this.$message.error("请求失败!")
        })
      },      
      getDataList(pageNum){
        let params = {
          applicationId: this.appName=="all"?"":this.appName,
          dataType:this.dataTypeDesc="all"?"":this.dataTypeDesc,
          name:this.searchText,
          pageNum: pageNum||1,
          pageSize: this.pagination.pageSize
        }
        getDataTableList(params).then(res => {
          if (res.code == 200000) {
            res.data.list.forEach((item,index) => {
              item.index = index + 1
            })
            this.tableList = res.data.list
            this.pagination.current = pageNum||1;
            this.pagination.total = res.data.total;
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });        
      }      
    },
    mounted(){
      Promise.all([this.getSceneAll(),this.getAppList()]).then(res=>{
        this.getDataList()
      })
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
