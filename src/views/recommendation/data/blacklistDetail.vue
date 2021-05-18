<template>
  <div class="data-admin">
    <div class="top">
      <div class="left">
        <span>共 <span>{{pagination.total}}</span> 个{{typeConfig[type]}}在黑名单中</span>
      </div>
      <div class="right">
        <div>
          黑名单表:
          <a-select style="width: 140px" placeholder="请选择黑名单表" v-model="tableName"
                    :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
            <a-select-option v-for="item in dataSourceTable" :key="item.id" :value="item.tableName">{{item.userTableName}}</a-select-option>
          </a-select>
        </div>
        <div>
          关键词:
          <a-input v-model="searchText" placeholder="物品名称、品类等" style="width: 140px"/>
        </div>
        <a-button type="primary" style="margin-left: 10px" @click="onSearch">高级查询</a-button>
      </div>
    </div>
    <a-table
      :columns="columns"
      :data-source="tableList"
      :pagination="pagination">
      <template slot="status" slot-scope="text,record">
        <a-select v-if="pageType === 'edit'" class="c-mr-10" style="width:160px" v-model="text"
                  :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
          <a-select-option :value="key" v-for="(value, key) in statusConfig" :key="key">{{value}}</a-select-option>
        </a-select>
        <span v-else>{{statusConfig[text]}}</span>
      </template>
      <template slot="operation" slot-scope="text,record">
        <a-button class="p0" type="link" @click.stop="showDetail(record)">查看</a-button>
        <a-button class="p0" type="link" disabled>修改</a-button>
        <a-button class="p0" type="link" disabled>删除</a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
  import {getSceneAll, getAllByApplication, getFeaturesDataTables, getDataByWord} from "@/api/recommendation"
  export default {
    name: "blacklistDetail",
    data() {
      return {
        tableList:[],
        columns: [
          {
            title: '序号',
            dataIndex: 'index',
            width: 60,
            fixed: 'left'
          },
          {
            title: '物料ID',
            dataIndex: 'materiel_id'
          },
          {
            title: '物料名称',
            dataIndex: 'material_name'
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
            title: '激活',
            dataIndex: 'recommendation_status',
            scopedSlots: {customRender: 'status'},
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
        typeConfig: {
          '1': '商品',
          '2': '咨询',
          '3': '活动',
          '4': '用户',
        },
        type: this.$route.query.type,
        pageType: this.$route.query.pageType,
        statusConfig: {'0': '否', '1': '是' },
        appName: void 0,
        sceneId: void 0,
        tableName: void 0,
        appNameList: [],
        sceneList: [],
        dataSourceTable: [],
      }
    },
    methods: {
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
      getFeaturesDataTables(){
        const { appName: applicationId, sceneId } =  this;
        getFeaturesDataTables({ applicationId, sceneId, dataType: 7 }).then(res=>{
          if(res.code === 200000){
            this.dataSourceTable = res.data
          }else{
            this.$message.error(res.message||"请求失败!")
          }
        }).catch(err=>{
          this.$message.error("请求失败!")
        })
      },
      appNameChange (value,option){
        this.appName = value;
        this.sceneId = void 0;
        this.tableName = void 0;
        this.getAllByApplication(value)
      },
      sceneTypeChange (value,option){
        this.sceneId = value;
        this.getFeaturesDataTables()
      },
      onSearch(){
        // this.getDataList(this.pagination.current)
      },
      getDataList(pageNum){
        let params = {
          tableName: this.tableName,
          query: this.searchText,
          pageNum: pageNum||1,
          pageSize: this.pagination.pageSize
        }
        getDataByWord(params).then(res => {
          if (res.code == 200000) {
            res.data.list.forEach((item,index) => {
              item.index = index + 1
            });
            this.tableList = res.data.list;
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
    },
    mounted(){
      // this.getFeaturesDataTables()
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
