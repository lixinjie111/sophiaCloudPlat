<template>
  <div class="data_center_detail">
    <a-tabs default-active-key="1" @change="callback" v-model="activeKey">
      <a-tab-pane key="1" tab="基本信息">
          <ul class="table_base_info">
            <li v-for="(value,key,index) in baseInfo" :key="index">
              <span>{{key}}:</span><span>{{value}}</span>
            </li>
          </ul>
      </a-tab-pane>
      <a-tab-pane key="2" tab="表结构" force-render class="tabs_item">
        <a-table :columns="columns" :data-source="tableColumn"></a-table>
      </a-tab-pane>
      <a-tab-pane key="3" tab="数据预览" class="tabs_item">
        <a-table :columns="showColumns" :data-source="showData" :pagination="pagination"></a-table>
      </a-tab-pane>
    </a-tabs>
    <div class="back" @click="back">返回</div>
  </div>
</template>
<script>
import {getTableDetail,getTableColumn,getFileDetail} from "@/api/recommendation/index"
import moment from "moment"
export default {
  name: "detail",
  data() {
    return {
      activeKey:"1",
      baseInfo:{},
      columns:[
        {
          title:"序号",
          dataIndex:"index"
        },
        {
          title:"字段名",
          dataIndex:"columnName"
        },
        {
          title:"类型",
          dataIndex:"dataType"
        }
      ],
      tableColumn:[],
      showColumns:[
        {

        }
      ],
      showData:[],
      pagination:{
        total:0,
        current:1,
        pageSize:10,
        showQuickJumper:true,
        onChange:(pageNum)=>{
          this.getFileDetail(pageNum)
        }
      }
    };
  },
  methods:{
    back(){
      this.$router.push({name:"recommendationDataList"})
    },
    callback(key) {
      this.activeKey = key
      if(key==2){
        this.getTableColumn()
      }else if(key==3){
        this.getFileDetail()
      }
    },
    getTableDetail(){
      let params = {
        tableName:this.$route.query.name||''
      }
      getTableDetail(params).then(res=>{
        if(res.code == 200000){
          this.baseInfo = res.data
          this.baseInfo.createTime = moment(this.baseInfo.createTime).format("YYYY-MM-DD")
          this.baseInfo.updateTime = moment(this.baseInfo.updateTime).format("YYYY-MM-DD")
        }else{
          this.baseInfo = {}
          this.$message.error(res.message||"请求失败")
        }
      }).catch(err=>{
        this.$message.error(err.message)
      })
    },
    getTableColumn(){
      let params = {
        tableName:this.$route.query.name||""
      }
      getTableColumn(params).then(res=>{
        if(res.code == 200000){
          this.tableColumn = res.data.map((item,index)=>{
            item.index = index + 1
            return item
          })
        }else{
          this.tableColumn = []
          this.$message.error(res.message||"请求失败")
        }
      }).catch(err=>{
        this.$message.error(err.message)
      })
    },
    getFileDetail(pageNum){
      let params = {
        pageNum:pageNum||1,
        pageSize:this.pagination.pageSize,
        tableName:this.$route.query.name
      }
      getFileDetail(params).then(res=>{
        if(res.code == 200000){
          this.showData = res.data.list
          this.pagination.total = res.data.total
          this.pagination.current = pageNum||1
          Object.keys(this.showData[0]).forEach((item,index)=>{
            this.showColumns[index] = {
              title:item,
              dataIndex:item,
              key:item,
              ellipsis:true
            }
          })
        }else{
          this.showColumns = []
          this.showData = []
          this.$message.error(res.message||"请求失败")
        }
      }).catch(err=>{
        this.$message.error("请求失败")
      })
    }
  },
  mounted(){
    this.getTableDetail()
  }
};
</script>
<style scoped lang="scss">
.data_center_detail {
  position: relative;
  .table_base_info{
    padding: 0 20px;
    li{
      margin: 6px 0;
      font-size: 14px;
      >span{
        font-weight: 500;
        &:first-child{
          margin-right: 6px;
          font-weight: 600;
        }
      }
    }
  }
  .back{
    position: absolute;
    top: 12px;
    right: 16px;
    cursor: pointer;
  }
  .tabs_item{
    padding: 0 16px;
  }
}
</style>