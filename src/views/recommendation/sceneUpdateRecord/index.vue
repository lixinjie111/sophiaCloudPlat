<template>
  <div class="data_admin">
    <div class="top">
      <div class="left">
        <a-button type="primary" style="margin-right: 10px">删除</a-button>
      </div>
      <div class="right">
        <div>
          应用名称：
          <a-select style="width: 140px" placeholder="请选择应用名称" v-model="appName" @change="appNameChange"
                    :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
            <a-select-option v-for="item in appNameList" :key="item.id">{{item.appName}}</a-select-option>
          </a-select>
        </div>
        <div>
          推荐类型：
          <a-select style="width: 140px" placeholder="请选择推荐类型" v-model="type"
                    :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
            <a-select-option v-for="item in typeList" :key="item.value">{{item.name}}</a-select-option>
          </a-select>
        </div>
        <div>
          更新时间:
          <a-range-picker style="width: 200px"></a-range-picker>
        </div>
        <div>
          <a-input v-model="searchText" placeholder="场景名称" style="width: 140px"/>
        </div>
        <a-button type="primary" @click="onSearch" style="margin-left: 10px">查询</a-button>
      </div>
    </div>
    <a-table
      :scroll="{ x: 1500}"
      :columns="columns"
      :data-source="tableList"
      :row-selection="rowSelection"
      :pagination="pagination">
      <template slot="operation" slot-scope="text, record, index">
        <a-button class="p0" type="link" disabled>更新详情</a-button>
        <a-button class="p0" type="link" disabled>回滚到此版本</a-button>
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
            title: '场景名称',
            dataIndex: 'material_name',
          },
          {
            title: '场景ID',
            dataIndex: 'materiel_id'
          },
          {
            title: '发布人',
            dataIndex: 'material_type'
          },
          {
            title: '发布状态',
            dataIndex: 'category1'
          },
          {
            title: '创建时间',
            dataIndex: 'category2'
          },
          {
            title: '更新时间',
            dataIndex: 'brand_name'
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
        type: void 0,
        appNameList:[],
        typeList:[
          { name: '个性化推荐', value: '1' },
          { name: '相关推荐', value: '2' },
          { name: '热门推荐', value: '3' },
        ],
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
        rowSelection: {
          type: 'checkbox',
          onChange: ()=>{}
        },
      }
    },
    methods: {
      appNameChange (value,option){
        this.appName = value
        this.type = void 0;
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
      getDataList(){
        let params = {
          query:this.searchText,
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize
        }
        // getDataByWord(params).then(res => {
        //   if (res.code == 200000) {
        //     this.tableList = res.data.list;
        //     this.pagination.total = res.data.total;
        //   } else {
        //     this.$message.error(res.message || "请求失败！");
        //   }
        // }).catch(err => {
        //   this.$message.error("请求失败！");
        //   console.log(err, "err");
        // });
      },
      onSearch(){
        this.getDataList()
      },
    },
    mounted(){
      this.getSceneAll()
    }
  }
</script>

<style scoped lang="scss">
  .data_admin {
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
    .p0{
      padding: 0 20px 0 0;
    }
  }
</style>
