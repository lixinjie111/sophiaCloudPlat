<template>
  <div class="c-padding-10">
    <ul class="c-text-both">
      <li v-for="item in tabData" :class="{'tabActive':currentId===item.id}" :key="item.id" @click="handleClick(item)">
        {{item.name}}
      </li>
    </ul>
    <!--参数部分-->
    <div class="opContent c-mt-20 c-mb-10 box" v-show="currentId === 2">

      <div class="opContent-col-row">
        <span class="opContent-col-label">
          请选择字段
        </span>
        <span class="opContent-col-item">
          <el-select v-model="encoder.tableColumns " placeholder="请选择字段" style="width: 100%;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
        </span>

      </div>
      <div class="opContent-col-row">
        <span class="opContent-col-label">
          转化项目
        </span>
        <span class="opContent-col-item">
          <el-select v-model="encoder.transformatIterm" placeholder="请选择" style="width: 80%;" class="opContent-col-item-select">
            <el-option
              v-for="item in options2"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
      </div>
      <div class="opContent-col-row">
        <span class="opContent-col-label">
          全部变为
        </span>
        <span class="opContent-col-item">
          <el-select v-model="encoder.transformatWay" placeholder="请选择" style="width: 80%;" class="opContent-col-item-select">
            <el-option
              v-for="item in options3.filter(e=>e.shows.includes(encoder.transformatIterm))"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
      </div>
      <div class="c-text-center" style="margin-top: 20px">
        <el-button type="primary" size="small" @click="submitFunc1">确定</el-button>
      </div>
    </div>
    <!--数据部分-->
    <div class="opContent  c-mt-20 c-mb-10" v-show="currentId===1">
      <el-form ref="dialogForm" :model="formParams1" label-width="90px" size="mini">
        <el-form-item label="选择数据表">
          <el-select v-model="formParams1.data" placeholder="我的数据" value-key="id" @change="selectMydata($event)">
            <el-option v-for="(item,index) in dataList" :key="index" :label="item.userTableName"
                       :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="c-text-center">
        <el-button type="primary" size="small" @click="chakanFunc">查看数据</el-button>
      </div>
    </div>
    <!--路径部分-->
    <div class="opContent  c-mt-20 c-mb-10" v-show="currentId==3">
      <div class="c-text-center c-mb-20">tab3</div>
      <div class="c-text-center">
        <el-button type="primary" size="small">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {myDataList, getTableData, getTableCosumn} from '@/api/index'
  import {tractionTransformationSubmit} from '@/api/dataDeal/index'

  export default {
    data() {
      return {
        formParams1: {
          data: null
        },
        currentId: 1,
        tabData: [
          {name: "数据", id: 1},
          {name: "参数", id: 2},
          {name: "路径", id: 3},
        ],
        dataList: null,
        choicedTableId: '',
        options: [],
        options2: [
          { label: '小数', value: '01' },
          { label: '分率', value: '02' }
        ],
        options3:  [
          { label: '百分数', value: 'percent', shows: ['01', '02'] },
          { label: '千分数', value: 'millesimal', shows: ['01', '02'] },
          { label: '万分数', value: 'grades', shows: ['01', '02'] },
          { label: '小数', value: 'xiaoshu', shows: ['02'] }
        ] ,
        encoder: { tableColumns : '', transformatIterm: '', transformatWay: ''}
      };
    },
    created() {
      this.initData();
    },
    methods: {
      selectMydata(e) {
        this.choicedTableId = e.id;
        const encodeTableName = this.tableName = e.tableName;
        let Name = this.userTableName = e.userTableName;
        let tableInfo = {
          encodeTableName,
          Name
        };
        this.ininSearch(encodeTableName)
        this.$emit('putChoiceTableId', e.id, tableInfo);
      },
      handleClick(item) {
        this.currentId = item.id
      },
      initData() {
        this.dataList = [];
        myDataList().then(res => {
          if (res.code == 200000) {
            this.ClassifiyList = res.data.tableClassification;
            this.dataList = res.data.tableInfo;
          }
        }).catch(err => {
        });
      },
      chakanFunc() {
        let kuName = this.formParams1.data.tableName;
        this.tableKayName = kuName;
        let parm = {
          name: kuName
        };
        this.encoder.transformatIterm = ''
        this.encoder.transformatWay = ''
        this.encoder.tableColumns = ''
        getTableData(parm).then(res => {
          if (res.code == 200000) {
            let detailData = res.data.list;
            this.$emit('beforeOperData', detailData);
          } else {
            this.$message({
              type: 'error',
              duration: '1500',
              message: "获取数据失败",
              showClose: true
            });
          }
        }).catch(err => {
          this.$message({
            type: 'error',
            duration: '1500',
            message: "获取数据失败",
            showClose: true
          });
        });
      },
      ininSearch(code){
        this.options = []
        getTableCosumn({'name': code}).then(res=>{
          if (res.code == 200000) {
            this.options = res.data.filter(e=>e.column_name !== 'id').map(e=>({ label: e.column_name, value: e.column_name }));
          }
        }).catch(err => {

        });
      },
      submitFunc1() {
        // const parmsData = { tableId: this.tableName, ...this.encoder };
        const parmsData = new FormData()
        parmsData.append('tableName',this.tableName);
        parmsData.append('tableColumns',this.encoder.tableColumns);
        parmsData.append('transformatIterms',this.encoder.transformatIterm );
        parmsData.append('transformatWay',this.encoder.transformatWay );
        tractionTransformationSubmit(parmsData).then(res => {
          if (res.code == 200000) {
            let detailData = res.data;
            this.$emit('afterOperData', detailData);
          } else {
            this.$message({
              type: 'error',
              duration: '1500',
              message: "获取数据失败",
              showClose: true
            });
          }
        }).catch(err => {
          this.$message({
            type: 'error',
            duration: '1500',
            message: "获取数据失败",
            showClose: true
          });
        })
      },
    },
    computed: {
    }
  };
</script>
<style lang="scss" scoped>
  @import '@/assets/scss/theme.scss';

  li {
    flex: 1;
    padding-bottom: 10px;
    padding-top: 5px;
    @include layoutMode(both);
    cursor: pointer;
    box-sizing: border-box;
  }

  .tabActive {
    color: #409eff;
    position: relative;
    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: -2px;
      left: calc(50% - 15px);
      width: 30px;
      height: 2px;
      background: #409eff;
    }
  }

  .checkBox_container {
    display: flex;
    margin-bottom: 10px;
    font-size: 14px;
    color: #606266;
    .fanwei_title {
      margin-right: 16px;
    }
    .fanwei_content {
      .allTable {
        margin-bottom: 10px;
      }
    }
  }

  .box.opContent {
    height: 412px;
    overflow-y: auto;
  }

  .opContent-col-row {
    display: flex;
    margin-bottom: 12px;
    .opContent-col-label {
      width: 100px;
      display: flex;
      align-items: center;
      margin-right: 8px;
    }
  }

  .opContent-col-item {
    display: flex;
    align-items: center;
    .opContent-col-item-select {
      margin-right: 8px;
    }
    .operation {
      width: 20px;
      height: 20px;
      cursor: pointer;
      font-size: 16px;
      margin-right: 10px;
    }
  }

  .operation-text {
    font-size: 20px;
  }
</style>
