<template>
  <div class="add_box">
    <div class="add_item c-mb-10" v-for="(item,index) in addList" :key="index" v-if="addList.length > 0">
      <div class="index c-mr-20">{{index+1}}</div>
      <div class="c-mr-20">数据类型：</div>
      <a-select class="c-mr-20" placeholder="请选择数据类型" v-model="item.dataType" @change="dataTypeChange(item)"
                style="width:140px">
        <a-select-option :value="item.id" v-for="(item,index) in dataTypeList" :key="index">{{item.dataTypeDesc}}
        </a-select-option>
      </a-select>
      <div class="c-mr-20">数据源：</div>
      <a-select class="c-mr-20" placeholder="请选择数据源" v-model="item.folderId" @change="sourceChange(item)" style="width:140px">
        <a-select-opt-group v-for="(sources,index) in sourcesList" :key="index">
          <span slot="label">{{sources.folderName}}</span>
          <a-select-option :value="item.folderId" v-for="(item,index1) in sources.subDataSources" :key="index1">
            {{item.folderName}}
          </a-select-option>
        </a-select-opt-group>
      </a-select>
      <div class="c-mr-20">数据源表：</div>
      <a-select class="c-mr-20" placeholder="请选择数据源表" v-model="item.sourceTableId" @change="tableChange" style="width:140px">
        <a-select-option :value="item.sourceTableId" v-for="(item,index) in sourceTablesList" :key="index">{{item.sourceUserTableName}}
        </a-select-option>
      </a-select>
      <a-button type="primary" icon="profile" class="c-mr-20">详情</a-button>
      <a-popconfirm
        title="是否删除该条目?"
        ok-text="是"
        cancel-text="否"
        @confirm="del(index)">
        <a-button icon="close"/>
      </a-popconfirm>
    </div>
    <a-button type="dashed" class="add_btn" @click="add">
      <a-icon type="plus"/>
    </a-button>
  </div>
</template>

<script>
  import {getSceneSourceTables} from "@/api/recommendation/index";

  export default {
    name: "AddData",
    props: {
      list: {
        type: Array,
        default: () => []
      },
      dataTypeList: {
        type: Array,
        default: () => []
      },
      sourcesList: {
        type: Array,
        default: () => []
      },
    },
    data() {
      return {
        addList: this.list,
        curDataType: '',
        curDataSourceId: '',
        sourceTablesList: []
      }
    },
    methods: {
      getSceneSourceTables() {
        let params = {
          dataSourceId: this.curDataSourceId.length > 0 ? this.curDataSourceId : '', //文件夹id
          dataType: this.curDataType, //数据类型（0：用户数据 1：商品数据 2：行为数据 3：商业服务数据 4：店铺数据 5：资讯数据 6：活动数据 7：黑名单)
          dataHistoryType: 1 //0:历史数据 1：新增数据
        };
        getSceneSourceTables(params).then(res => {
          if (res.code == 200000) {
            this.sourceTablesList = res.data;
          } else if (res.code == 500000) {
            this.sourceTablesList = [];
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
      },
      add() {
        if (this.addList.length >= 10) {
          this.$message.warning('最多添加10条');
          return;
        }
        this.addList.push({
          dataType: '',
          folderId: '',
          sourceTableId: ''
        })
      },
      del(index) {
        this.addList.splice(index, 1);
      },
      dataTypeChange(item) {
        this.curDataType = item.dataType;
        item.sourceTableId = '';
        item.folderId = '';
        this.sourceTablesList = [];
        this.getSceneSourceTables()
      },
      sourceChange(item) {
        this.curDataSourceId = item.folderId;
        item.sourceTableId = '';
        this.sourceTablesList = [];
        this.getSceneSourceTables()
      },
      tableChange() {

      }
    }
  }
</script>

<style scoped lang="scss">
  .add_box {
    width: 100%;

    .add_item {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .index {
        width: 30px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #cccccc;
        border-radius: 5px;
        text-align: center;
      }
    }

    .add_btn {
      width: 100%;
    }
  }
</style>
