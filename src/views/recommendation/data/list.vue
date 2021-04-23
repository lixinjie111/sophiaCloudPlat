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
      <template slot="operation" slot-scope="text,record">
        <a-button type="link" @click.stop="showDetail(record)">查看</a-button>
        <a-button type="link" disabled>修改</a-button>
        <a-button type="link" disabled>删除</a-button>
      </template>
    </a-table>
    <a-modal v-model="newFile" title="创建文件夹">
      <div class="data_new_file">
        <a-form-model ref="dataForm" :model="dataForm" v-bind="formItemLayout">
          <a-form-model-item label="文件夹名称" prop="name">
            <a-input placeholder="请输入文件夹名称" v-model="dataForm.name" :maxLength="14"/>
          </a-form-model-item>
          <a-form-model-item label="数据分类" prop="type">
            <a-select placeholder="请选择所属应用" v-model="dataForm.type" @change="applyChange">
              <a-select-option value="0">上传文件</a-select-option>
              <a-select-option value="1">同步文件</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="文件夹上级" prop="mould">
            <a-select placeholder="请选择场景模板" v-model="dataForm.superior" @change="mouldChange">
              <a-select-option value="0">推荐数据</a-select-option>
              <a-select-option value="1">营销数据</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="文件夹描述" prop="description">
            <a-textarea v-model="dataForm.description" :autoSize='{ minRows: 4, maxRows: 6}' placeholder="请输入应用描述"
                        :maxLength="100"/>
          </a-form-model-item>
        </a-form-model>
      </div>
      <template slot="footer">
        <a-button type="primary" :loading="setLoading" @click="create">
          创建
        </a-button>
        <a-button @click="cancelNew">
          取消
        </a-button>
      </template>
    </a-modal>
    <a-modal v-model="uploadData" title="上传数据" :footer="null" :width="860" destroyOnClose>
      <UploadData @close="close" :dataType="sceneList"></UploadData>
    </a-modal>
  </div>
</template>
 
<script>
  import UploadData from "@/components/recommendation/data/UploadData";
  import {getSceneAll,getDataTypes,getDataTableList,createDocument} from "@/api/recommendation/index"
  export default {
    name: "list",
    components: {UploadData},
    data() {
      return {
        formItemLayout: {
          labelCol: { span: 4 },
          wrapperCol: { span: 20 },
        },
        dataForm: {
          name: '',
          type: '0',
          superior: '0',
          description: ''
        },        
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
            width:100
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
      close(boolean){
        this.uploadData = false
        if(boolean){
          this.getDataList()
        }
      },
      upload(){
        this.uploadData = true
      },
      file(){
          this.newFile = true
      },
      appNameChange (value){
        this.appName = value
        this.getDataList(this.pagination.current)
      },
      sceneTypeChange (value){
        this.dataTypeDesc = value
        this.getDataList(this.pagination.current)
      },
      onSearch(){
        this.getDataList(this.pagination.current)
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
            res.data.slice(0,-1).forEach(item=>{
              ary.push(...item.subDataTypes)
            })
            this.sceneList = ary
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
          dataType:this.dataTypeDesc=="all"?"":this.dataTypeDesc,
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
        });        
      },
      // 查看
      showDetail(row){
        this.$router.push({path:"/recommendation/data/detail",query:{name:row.tableName}})
      },       
      // 创建
      create() {
        createDocument(this.dataForm).then(res=>{
          if(res.code == 200000){
            this.newFile = false
            this.$message.success('创建成功')
          }else{
            this.$message.error(res.message||"请求失败")
          }
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },
      // 取消
      cancelNew() {
        this.newFile = false;
      },      
      applyChange(val) {
        this.dataForm.type = val
      },
      mouldChange(val) {
        this.dataForm.superior = val
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
