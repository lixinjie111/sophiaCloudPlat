<template>
  <div class="c-padding-10">
    <ul class="c-text-both">
      <li v-for="item in tabData" :class="{'tabActive':currentId===item.id}" :key="item.id" @click="handleClick(item)">
        {{item.name}}
      </li>
    </ul>
    <!--参数部分-->
    <div class="opContent c-mt-20 c-mb-10 box" v-show="currentId === 2">
      <div class="c-text-center" style="margin-top: 20px">
        <el-button type="primary" size="small" @click="submitFunc1">确定</el-button>
      </div>
    </div>
    <!--数据部分-->
    <div class="opContent  c-mt-20 c-mb-10" v-show="currentId===1">
      <el-form ref="dialogForm" :model="formParams1" label-width="120px" size="mini">
        <el-form-item label="选择数据表">
          <el-select v-model="formParams1.data" placeholder="我的数据" value-key="id" @change="selectMydata($event)">
            <el-option v-for="(item,index) in dataList" :key="index" :label="item.userTableName"
                       :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择因变量">
          <el-select :multiple="true" v-model="formParams1.field" placeholder="因变量" value-key="id">
            <el-option v-for="(item,index) in options" :disabled="(formParams1.fieldY || []).includes(item.value)" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择自变量">
          <el-select :multiple="true" v-model="formParams1.fieldY" placeholder="自变量" value-key="id">
            <el-option v-for="(item,index) in options" :disabled="(formParams1.field || []).includes(item.value)" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="c-text-center">
        <el-button type="primary" size="small" @click="chakan">查看数据</el-button>
        <el-button type="primary" size="small" @click="submitData">确定</el-button>
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
  import {getDataAnalysis} from '@/api/describe'
  import {checkData} from '@/api/deduce';

  export default {
    data() {
      return {
        formParams1: {
          data: null,
          field: null,
          fieldY: null,
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
        this.formParams1.field = []
        this.formParams1.fieldY = []
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
            this.dataList = res.data.tableInfo;
          }
        }).catch(err => {
        });
      },
      chakan(){
        let params={
          table_name:this.tableName,
          X:this.formParams1.field,
          Y:this.formParams1.fieldY,
        };
        checkData(params).then(res => {
          if(res.code == 200) {
            this.$emit('beforeOperData', res.res);
          }
        }).catch(err => {

        });
      },
      submitData() {
        let kuName = this.formParams1.data.tableName;
        let X = this.formParams1.field;
        let Y = this.formParams1.fieldY;
        this.tableKayName = kuName;
        let parm = {
          tableName: kuName,
          crosstab: {
            X,
            Y
          },
          statistic: true
        };
        getDataAnalysis(parm).then(res => {
          if (res.code == '200') {
            this.$emit('afterOperData', res.res);
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
        // const parmsData = { tableId: this.tableName, encoder: this.encoder };
        // submitAlgorithm(parmsData).then(res => {
        //   if (res.code == '200') {
        //     let detailData = res.res.data;
        //     let col = res.res.col;
        //     detailData = detailData.map(e=>{
        //       let row = {}
        //       e.forEach((it, i)=>{
        //         col[i] && (row[col[i]] = it)
        //       })
        //       return row
        //     })
        //     this.$emit('afterOperData', detailData);
        //   } else {
        //     this.$message({
        //       type: 'error',
        //       duration: '1500',
        //       message: "获取数据失败",
        //       showClose: true
        //     });
        //   }
        // }).catch(err => {
        //   this.$message({
        //     type: 'error',
        //     duration: '1500',
        //     message: "获取数据失败",
        //     showClose: true
        //   });
        // })
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
