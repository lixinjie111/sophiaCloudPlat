<template>
  <div class="data-admin">
    <div class="top">
      <div class="left">
        <a-button type="primary" @click="upload" style="margin-right: 10px">上传黑名单</a-button>
      </div>
      <div class="right">
        <div>
          黑名单类型：
          <a-select style="width:160px" placeholder="请选择黑名单类型" v-model="blacklistType"
                    :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
            <a-select-option v-for="item in blackListTypeOptions" :key="item.id">{{item.name}}</a-select-option>
          </a-select>
        </div>
        <div>
          <a-input v-model="searchText" placeholder="数据表名称" style="width: 200px" />
        </div>
        <a-button type="primary" style="margin-left: 10px" @click="onSearch">高级查询</a-button>
      </div>
    </div>
    <a-table
      :columns="columns"
      :data-source="tableList"
      :pagination="pagination">
      <template slot="operation" slot-scope="text,record">
        <a-button class="p0" type="link" @click.stop="showDetail(record)">查看</a-button>
        <a-button class="p0" type="link" @click.stop="showDetail(record, 'edit')">修改</a-button>
        <a-button class="p0" type="link" disabled>删除</a-button>
      </template>
    </a-table>
    <a-modal v-model="newFile" title="创建文件夹">
      <div class="data_new_file">
        <a-form-model ref="dataForm" :model="dataForm" v-bind="formItemLayout">
          <a-form-model-item label="文件夹名称" prop="name">
            <a-input placeholder="请输入文件夹名称" v-model="dataForm.name" :maxLength="14"/>
          </a-form-model-item>
          <a-form-model-item label="数据分类" prop="type">
            <a-select placeholder="请选择所属应用" v-model="dataForm.type" @change="applyChange"
                      :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
              <a-select-option value="0">上传文件</a-select-option>
              <a-select-option value="1">同步文件</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="文件夹上级" prop="mould">
            <a-select placeholder="请选择场景模板" v-model="dataForm.superior" @change="mouldChange"
                      :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
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
<!--    <a-modal v-model="uploadData" title="上传数据" :footer="null" :width="860" destroyOnClose>-->
<!--      <BlackListUploadData @close="close" ></BlackListUploadData>-->
<!--    </a-modal>-->
  </div>
</template>

<script>
  // import BlackListUploadData from "@/components/recommendation/data/BlackListUploadData";
  import {getSceneAll,getDataTypes,getDataTableList,createDocument, getBlacklists} from "@/api/recommendation/index"
  export default {
    name: "blacklist",
    // components: {BlackListUploadData},
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
            dataIndex: 'index',
            width: 60,
            fixed: 'left'
          },
          {
            title: '表名',
            dataIndex: 'userTableName'
          },
          {
            title: '黑名单类型',
            dataIndex: 'blacklistTypeDesc'
          },
          {
            title: '所属租户',
            dataIndex: 'tenant'
          },
          {
            title: '创建人',
            dataIndex: 'username'
          },
          {
            title: '创建时间',
            dataIndex: 'createdTime'
          },
          {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: {customRender: 'operation'},
            width: 200,
            fixed: 'right'
          },
        ],
        blacklistType: 1,
        blackListTypeOptions:[
          { name: '商品黑名单', id: 1 },
          { name: '咨询黑名单', id: 2 },
          { name: '活动黑名单', id: 3 },
          { name: '用户黑名单', id: 4 },
        ],
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
        uploadData:this.$route.query.show||false
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
      onSearch(){
        this.getDataList(this.pagination.current)
      },
      getDataList(pageNum){
        let params = {
          blacklistType: this.blacklistType,
          name:this.searchText,
          pageNum: pageNum||1,
          pageSize: this.pagination.pageSize
        }
        getBlacklists(params).then(res => {
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
      /**
       * 查看和编辑跳转
       * @param row
       * @param pageType： { String } edit为编辑，空则为查看
       */
      showDetail(row, pageType){
        // this.$router.push({path:"/recommendation/data/blacklist/detail",query:{name:row.tableName, type: this.blacklistType, pageType: pageType}})
        const { href } = this.$router.resolve({
          name: "recommendationDataBlacklistDetail",
          query: {name:row.tableName, type: this.blacklistType, pageType: pageType}
        });
        window.open(href, '_blank');
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
          position: relative;
          margin-left: 10px;
        }
      }
    }

    .p0 {
      padding: 0 20px 0 0;
    }
  }
</style>
