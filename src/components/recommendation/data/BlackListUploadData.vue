<template>
  <div class="data_upload">
    <a-steps :current="current" size="small">
      <a-step v-for="item in steps" :key="item.title" :title="item.title"></a-step>
    </a-steps>
    <div class="steps_content" v-if="current==0">
      <a-form-model ref="dataForm" :model="dataForm" v-bind="formItemLayout">
        <a-form-model-item :isRequired="true"  label="黑名单名称" prop="userTableName">
          <a-input placeholder="请输入黑名单名称" v-model="dataForm.userTableName" :maxLength="14"/>
        </a-form-model-item>
        <a-form-model-item :isRequired="true"  label="黑名单类型" prop="blacklistType">
          <a-radio-group v-model="dataForm.blacklistType" >
            <a-radio v-for="it in blackListTypeOptions" :key="it.id" :value="it.id">
              {{ it.name }}
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
<!--        <a-form-model-item label="数据描述" prop="description">-->
<!--          <a-textarea v-model="dataForm.description" :autoSize='{ minRows:4, maxRows:6 }' placeholder="请输入应用描述"-->
<!--                      :maxLength="100"/>-->
<!--        </a-form-model-item>-->
      </a-form-model>
      <div class="click_upload">
        <!-- <span>点击上传文件</span> -->
        <a-upload
          name="files"
          accept=".csv,.xls,.xlsx,.txt"
          :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload">
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
          <a-input placeholder="请输入表名" :disabled="true" v-model="dataForm.name" :maxLength="14"/>
        </a-form-model-item>
        <a-form-model-item label="表头设置" prop="haveHeader">
          <a-checkbox  v-model="dataForm.haveHeader">
            自带表头设置
          </a-checkbox>
        </a-form-model-item>
        <a-form-model-item label="数据描述" prop="description">
          <a-textarea v-model="dataForm.description" :autoSize='{ minRows:4, maxRows:6 }' placeholder="请输入应用描述"
                      :maxLength="100"/>
        </a-form-model-item>
      </a-form-model>
      <div class="upload_remark">
        <p>备注:</p>
        <ul>
          <li>表头设置：上传文件建议包含表头，系统默认自带表头，否则请取消【自带表头】勾选，系统会给每列添加_c0,_c1...的表头名称。</li>
          <li>主键设置：上传文件建议选择主键字段，否则请选择系统默认。</li>
        </ul>
      </div>
    </div>
    <div class="steps_content" v-if="current==2">
      <div class="table_name">{{dataForm.name}}</div>
      <a-table
        :scroll="{x:2400}"
        :columns="columns"
        :data-source="viewList"
        :pagination="pagination">
      </a-table>
    </div>
    <div class="steps_content" v-if="current==3">
      <div class="upload_suc">文件上传成功!</div>
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
        @click="uploadSuc">
        完成
      </a-button>
    </div>
  </div>
</template>

<script>
import {getFilePackage,getFileDetail,loadBlacklist} from "@/api/recommendation"
export default {
  name: "UploadData",
  props:{
    dataType:{
      type:Array
    }
  },
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      },
      blackListTypeOptions:[
        { name: '商品黑名单', id: 1 },
        { name: '咨询黑名单', id: 2 },
        { name: '活动黑名单', id: 3 },
        { name: '用户黑名单', id: 4 },
      ],
      dataForm: {
        haveHeader: true,
        userTableName: '',
        blacklistType: 1,
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
      filePackageList:[],
      tableName:"",
      columns:[],
      viewList:[],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        onChange: (pageNum) => {
          this.getFileDetail(pageNum);
        }
      },
    };
  },
  methods: {
    // 下一步
    next() {
      // 第一步时，没有上传文件,没有输入用户表名
      // 第三步，上传请求失败时
      // 以上均不允许点击下一步
      if(this.current==0&&this.fileList.length==0 && !this.userTableName || this.current === 2 && !this.tableName){
        return
      }
      if(this.current==1){
        let obj = JSON.parse(JSON.stringify(this.dataForm))
        delete(obj.description)
        for(let key in obj){
          let boolean = obj[key]+"";
          if(!boolean){
            return
          }
        }
      }
      this.current++;
      if(this.current==1){
        // 设置属性
      }else if(this.current==2){
        // 上传并预览
        this.uploadFileData().then(()=>{
          this.getFileDetail()
        })
      }else if(this.current==3){
        this.$message.success('文件上传完成')
      }
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
          this.filePackageList = []
        }
      }).catch(err=>{
        this.$message.error('请求失败')
      })
    },
    // 获取上传文件详情
    async getFileDetail(pageNum){
      let params = {
        pageNum:pageNum||1,
        pageSize:this.pagination.pageSize,
        tableName:this.tableName
      }
      try{
        let res = await getFileDetail(params)
        if(res.code == 200000){
          this.viewList = res.data.list
          this.pagination.total = res.data.total
          this.pagination.current = pageNum||1
          Object.keys(this.viewList[0]).forEach((item,index)=>{
            if(item=="id"){
              this.columns.unshift({
                title:item,
                dataIndex:item,
                key:item,
                width:60
              })
            }else{
              this.columns[index] = {
                title:item,
                dataIndex:item,
                key:item,
                ellipsis:true
              }
            }

          })
        }else{
          this.$message.error(res.message||'请求失败')
          this.viewList= []
          this.viewTotal = 0
        }
      }catch(err){
        this.$message.error('请求失败')
      }
    },
    // 上传
    uploadFileData(){
      let formData = new FormData()
      formData.append('files',this.fileList[0]);
      const data = {
        haveHeader: Number(this.dataForm.haveHeader),
        userTableName: this.dataForm.userTableName,
        blacklistType: this.dataForm.blacklistType,
        description: this.dataForm.description,
      }
      return new Promise((resolve, reject)=>{
        loadBlacklist(formData, data).then((res)=>{
          if(res.data.code == 200000){
            this.tableName = res.data.data;
            resolve(res);
          }else{
            this.$message.error(res.message||'请求失败');
            this.tableName = "";
            reject();
          }
        })
      })
    },
    uploadSuc(){
      // this.current = 0;
      this.$emit('close',true)
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

  .table_name{
    height: 22px;
    margin: 2px 0;
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
  }

  .upload_suc{
    height: 260px;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    line-height: 260px;
  }
}

.steps_action {
  margin-top: 24px;
  text-align: center;
}
</style>
