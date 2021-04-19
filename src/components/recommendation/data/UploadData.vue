<template>
  <div class="data_upload">
    <a-steps :current="current" size="small">
      <a-step v-for="item in steps" :key="item.title" :title="item.title"></a-step>
    </a-steps>
    <div class="steps_content" v-if="current==0">
      <div class="click_upload">
        <!-- <span>点击上传文件</span> -->
                  <!-- accept=".csv,.xls,.xlsx,.txt" -->
        <a-upload
        :data="uploadData"
          :action="uploadUrl"
          method="post"
          :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload"
          @change="handleChange"
        >
          <a-button> <a-icon type="upload" /> 点击上传文件 </a-button>
        </a-upload>      
        <p>支持csv、xls、xlsx、txt日志等文件形式（单个文件最大100M ）</p>
        <!-- <p>支持批量上传</p> -->
      </div>
      <div class="upload_remark">
        <p>备注:</p>
        <ul>
          <li>1、csv、xls、xlsx文件只获取第一个sheet表格；</li>
          <li>2、请上传有标准行列的一维数据表格。有合并单元格的数据请处理过后再上传，否则可能出现表头识别有误。</li>
          <li>3、日期字段需包含年月日（如2021/1/1），或年月日时分秒。（如2021/1/1 00:00:00）</li>
        </ul>
      </div>
      <!-- <div class="upload-table">
        <p>上传表格:</p>
        <span>2019年河北GDP.xlsx</span>
      </div> -->
    </div>    
    <div class="steps_content" v-if="current==1">
        <a-form-model ref="dataForm" :model="dataForm" v-bind="formItemLayout">
        <a-form-model-item label="表名" prop="name">
          <a-input placeholder="请输入表名" v-model="dataForm.name" :maxLength="14"/>
        </a-form-model-item>
        <a-form-model-item label="添加文件夹" prop="file">
          <a-select label-in-value placeholder="请选择所属文件夹" @change="fileChange">
            <a-select-option v-for="item in filePackageList" :key="item.id">{{item.name}}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="数据类型" prop="type">
          <a-select label-in-value placeholder="请选择数据类型" @change="dataTypeChange">
            <a-select-option v-for="item in dataType" :key="item.id">{{item.dataTypeDesc}}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="数据描述" prop="description">
          <a-textarea v-model="dataForm.description" :autoSize='{ minRows:4, maxRows:6 }' placeholder="请输入应用描述"
                      :maxLength="100"/>
        </a-form-model-item>
      </a-form-model>
    </div>    
    <div class="steps_content" v-if="current==2">
      <div>{{dataForm.name}}</div>
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
    </div>    
    <div class="steps_content" v-if="current==3">
      3
    </div>    
    <div class="steps_action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">
        下一步
      </a-button>
      <a-button v-if="current < steps.length - 1" style="margin-left: 8px" @click="cancel">
        取消
      </a-button>      
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="$message.success('文件上传完成')">
        完成
      </a-button>
    </div>
  </div>
</template>

<script>
import {getFilePackage,getFileDetail,uploadFileData} from "@/api/recommendation/index"
import {HTTPURL} from "@/api/requestUrl"
export default {
  name: "UploadData",
  props:{
    dataType:{
      type:Array
    }
  },
  computed:{
    rowSelection(){
      return {
        selectedRowKeys:this.selectedRowKeys
      }
    },
    
  },
  data() {
    return {
      uploadData:{},
      uploadUrl:`${HTTPURL}/recommend/excel/load`,
        formItemLayout: {
          labelCol: { span: 4 },
          wrapperCol: { span: 20 },
        },
        dataForm: {
          name: '',
          file: '',
          fileName:'',
          type: '',
          description: ''
        },
      current: 0,
      steps: [
        {
          title: "上传文件",
          content: "First-content",
        },
        {
          title: "设置属性",
          content: "Second-content",
        },
        {
          title: "预览",
          content: "Last-content",
        },
        {
          title: "完成",
          content: "Last-content",
        },
      ],
      fileList: [],
      columns:[
        {
          title:"序号",
          dataIndex:"num",
          key :"num"
        },
        {
          title:"表名",
          dataIndex:"name",
          key:"name",
          scopedSlots:{customRender:"name"}
        },
        {
          title:"添加文件夹",
          dataIndex:"file",
          key:"file",
          scopedSlots:{customRender:"file"}
        },
        {
          title:"表头设置",
          dataIndex:"setting",
          key:"setting",
        },
        {
          title:"数据类型",
          dataIndex:"type",
          key:"type",
          scopedSlots:{customRender:"type"}
        },
        {
          title:"数据描述",
          dataIndex:"description",
          key:"description",
          scopedSlots:{customRender:"description"}
        }
      ], 
      selectedRowKeys:[],   
      filePackageList:[],
      tableName:"",
    };
  },
  methods: {   
    handleChange(obj){
      console.log(obj)
    },
    // 下一步
    next() {
      this.current++;
      if(this.current==1){
        // 设置属性
        console.log('1',this.current)
      }else if(this.current==2){
        // 预览
        console.log('2')
        this.uploadFileData()
      };
      console.log('table',this.dataForm)
    },
    //取消 
    cancel() {
      this.current = 0;
      this.$emit('close')
    },
    // 单个删除上传文件
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    // 上传后文件列表
    beforeUpload(file) {
      this.fileList = [file];
      console.log('sdfsdfsfd',file)
      this.dataForm.name = file.name
      return false;
    },        
    //获取文件名
    getFilePackage(){
      getFilePackage({}).then(res=>{
        if(res.code == 200000){
          this.filePackageList = res.data
        }else{
          this.$message.error(res.message||'请求失败')
        }
      }).catch(err=>{
        this.$message.error('请求失败')
      })
    },
    // 文件选择
    fileChange(val){
      this.dataForm.file = val.key
      this.dataForm.fileName = val.label
    },
    // 数据类型选择
    dataTypeChange(val){
      this.dataForm.type = val.key
    },     
    // 获取上传文件详情
    getFileDetail(){
      let params = {
        pageNum:1,
        pageSize:10,
        tableName:this.tableName
      }
      getFileDetail(params).then(res=>{
        if(res.code == 200000){

        }else{
          this.$message.error(res.message||'请求失败')
        }
      }).catch(err=>{
        this.$message.error('请求失败')
      })
    },
    // 上传
    uploadFileData(){
      let params = {
        haveHeader:0,
        dataType:this.dataForm.type,
        description:this.dataForm.description,
        documentId:this.dataForm.file,
        documentName:this.dataForm.fileName,
        userTableName:this.dataForm.name
      }
            this.uploadData = params
      // console.log(this.fileList[0])
      // let formData = new FormData()
      // formData.append('haveHeader',params.haveHeader)
      // formData.append('dataType',params.dataType)
      // formData.append('description',params.description)
      // formData.append('documentId',params.documentId)
      // formData.append('documentName',params.documentName)
      // formData.append('userTableName',params.userTableName)
      // formData.append('files',this.fileList[0])
      // let config = {
      //   headers: {
      //     // 'Content-Type': 'application/x-www-form-urlencoded'
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }
      // uploadFileData(formData).then(res=>{
      //   if(res.code == 200000){
      //     this.tableName = res.data
      //   }else{
      //     this.$message.error(res.message||'请求失败')
      //     this.tableName = ""
      //   }
      // }).catch(err=>{
      //   this.$message.error('请求失败')
      // })
    }
  },
  mounted(){
    this.getFilePackage()
  }
};
</script>

<style scoped lang="scss">
.data_upload{
  // width: 860px;
  // height: 800px;
}
.steps_content {
  margin-top: 16px;
  // background-color: #fafafa;
  min-height: 200px;
  .click_upload{
    width: 100%;
    max-height: 350px;
    overflow-y: scroll;
    padding: 20px;
    text-align: center;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    >p{
      width: 400px;
      margin:10px auto;
      text-align: left;
    }
  }

  .upload_remark{
    padding: 20px 0;
    >p{
      font-size: 14px;
      font-weight: 600;
    }
      >ul{
        >li{
          margin:4px 0;
        }
      }
  }

  .upload-table{
    margin-bottom: 32px;
    >p{
      font-size: 14px;
      font-weight: 600;
    }
    >span{
      margin: 2px 0;
      font-size: 14px;
    }
  }
}

.steps_action {
  margin-top: 24px;
  text-align: center;
}
</style>
