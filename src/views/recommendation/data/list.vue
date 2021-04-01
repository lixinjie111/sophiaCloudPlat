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
          <a-select style="width: 160px" placeholder="请选择场景类型" v-model="sceneType" @change="sceneTypeChange">
            <a-select-option value="all">全部</a-select-option>
            <a-select-option v-for="item in sceneList" :key="item.id">{{item.dataTypeDesc}}</a-select-option>
          </a-select>
        </div>
        <div>
          <a-input-search :value="searchText" placeholder="数据表名称" style="width: 200px" @search="onSearch" />
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
        appName: "all",
        sceneType: "all",
        appNameList:[],
        sceneList:[],
        pagination: {
          total: 0,
          current: 1,
          pageSize: 10,
          showQuickJumper: true, 
          showSizeChanger: true,
          onChange: () => {
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
        console.log(value,option)
        this.appName = value
      },
      sceneTypeChange (value,option){
        this.sceneType = value
        console.log(value,option)
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
            console.log(this.appNameList)
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
            this.sceneList = []
            res.data.slice(0,-2).forEach(item=>{
              this.sceneList.push(...item.subDataTypes)
            })
            console.log(this.sceneList)
          }else{
            this.$message.error(res.message||"请求失败!")
          }
        }).catch(err=>{
          this.$message.error("请求失败!")
        })
      },      
      getDataList(){
        let params = {
          applicationId: this.appName=="all"?"":this.appName,
          dataType:this.sceneType="all"?"":this.sceneType,
          name:this.searchText,
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize
        }
        getDataTableList(params).then(res => {
          if (res.code == 200000) {
            res.data.list.forEach((item) => {
              
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
      }      
    },
    mounted(){
      this.getSceneAll()
      this.getAppList()
      this.getDataList()
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
