<template>
  <div class="c-wrapper-20">
    <div class="c-text-between">

      <!--左侧表格内容区-->
      <div class="operateTable_container">
        <div class="operateTable">
          <div class="c-button-wrapper c-text-left">
            <el-button size="mini" plain @click="exportExcel()">导出表格</el-button>
            <el-button size="mini" plain @click="handleAdd()">导出PDF</el-button>
          </div>
          <div class="table">
            <!--处理前表格-->
            <vxe-table
              border
              resizable
              v-if="ifShowBeforTable"
              :edit-config="{trigger: 'click', mode: 'cell'}"
              :data="beforeOperData"
              :ref="`xTable`"
            >
                <vxe-table-column type="seq" title="序号" width="60" sortable></vxe-table-column>
              <vxe-table-column
                :field="item.key"
                :title="item.key"
                v-for="(item) in beforeKey"
                :key="item.key"
                sortable
                :edit-render="{name: '$input',props: {type:item.type}}"
              >
              </vxe-table-column>
            </vxe-table>


            <!--处理后表格-->
            <div v-if="ifShowAfterTable" class="table">
              <div class="table" v-for="(item, i) in afterOperData">
                <h1 class="table-title">{{item.title}}</h1>
                <vxe-table
                  border
                  resizable
                  :ref="`xTable-${i}`"
                  :edit-config="{trigger: 'click', mode: 'cell'}"
                  :data="item.children"
                >
<!--                  <vxe-table-column type="seq" title="序号" width="60" sortable></vxe-table-column>-->
                  <vxe-table-column
                    :field="item.key"
                    :title="item.key"
                    v-for="(item) in afterKey"
                    :key="item.key"
                    sortable
                    :edit-render="{name: '$input',props: {type:item.type}}"
                  >
                  </vxe-table-column>
                </vxe-table>
              </div>
            </div>


          </div>
          <div class="c-button-wrapper c-text-left">
            <el-button size="mini" plain @click="saveEditTable">保存</el-button>
            <el-button size="mini" plain>帮助</el-button>
          </div>
        </div>
      </div>

      <!--右侧表格操作区-->
      <div class="operate">
        <operate @beforeOperData='fnBeforeData' @afterOperData='fnAfterData' @putChoiceTableId='getChoiceTableId'></operate>
      </div>
    </div>

  </div>
</template>
<script>
  import operate from '@/components/operate/frequency';
  import {tableEdit,downLoad} from '@/api/index';
  import { transformList, generateColumn, generateColumn2 } from '@/utils/common';

  export default {
    components: {
      operate
    },
    data(){
      return {
        beforeOperData:null,
        afterOperData:null,
        beforeKey:[],
        afterKey:[],
        ifShowBeforTable:false,
        ifShowAfterTable:false,
        choiceTableId:'',
        enCodeTableName:'',
        tableName:''
      }
    },
    created(){
    },
    methods: {
      getChoiceTableId(tbd,tInfo){
        this.choiceTableId = tbd;
        this.enCodeTableName = tInfo.encodeTableName || '';
        this.tableName = tInfo.Name;
      },
      fnBeforeData(data1){
        this.beforeOperData = transformList(data1);
        this.beforeKey = generateColumn(data1);
        this.ifShowBeforTable = true;
        this.ifShowAfterTable = false;
      },
      fnAfterData(data2){
        this.ifShowBeforTable = false;
        this.ifShowAfterTable = true;
        this.afterKey = generateColumn2(data2[0] ? data2[0].children : []);
        this.afterOperData = data2;
      },
      saveEditTable(){
        let arr = null
        if(this.ifShowBeforTable){
          arr = this.beforeOperData
        }else if(this.ifShowAfterTable){
          arr = this.afterOperData
        }
        // 每个表格投药进行修改提交
        (arr || []).forEach((e, i)=>{
          this.submitEditTable(i)
        })
      },
      submitEditTable(i){
        let selectRecords = this.$refs[`xTable-${i}`][0].getTableData().tableData;
        selectRecords.forEach(item=>{
          delete item['_XID']
        })
        let params={
          jsonArray:selectRecords,
          tableId:this.choiceTableId
        };
        tableEdit(params).then(res => {
          if(res.code == 200000) {
            this.$message({
              type: 'success',
              duration: '1500',
              message: "保存成功",
              showClose: true
            });
          }
          else{
            this.$message({
              type: 'error',
              duration: '1500',
              message:"保存失败",
              showClose: true
            });
          }
        }).catch(err => {
          this.$message({
            type: 'error',
            duration: '1500',
            message:"保存失败",
            showClose: true
          });
        });
      },
      exportExcel(){
        let Tname = this.enCodeTableName;
        if(!Tname){
          this.$message({
            type: 'error',
            duration: '1500',
            message:"请先选择要导出的表格",
            showClose: true
          })
        }
        downLoad({name:this.enCodeTableName}).then(res=>{
          var eleLink = document.createElement('a');
          eleLink.download = this.tableName;
          eleLink.style.display = 'none'
          var blob = new Blob([res],{type: 'application/vnd.ms-excel'});
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          // 然后移除
          document.body.removeChild(eleLink);
        }).catch(err => {
        });
      }
    },


  }
</script>
<style lang="scss" scoped>
  @import '@/assets/scss/theme.scss';
  .table-title{
    text-align: center;
    font-size: 18px;
    padding: 8px;
  }
  .c-wrapper-20{
    height: 85vh;
    .c-text-between{
      height: 100%;
      .operateTable_container{
        flex:1;
        background:#fff;
        li{
          flex:1;
          padding-bottom:10px;
          padding-top:10px;
          @include layoutMode(both);
          cursor: pointer;
          box-sizing: border-box;
        }
        .tabActive{
          position: relative;
          color:#409eff;
          &::after{
            content: "";
            display:block;
            position: absolute;
            bottom: 0;
            left: calc(50% - 15px);
            width: 30px;
            height: 2px;
            background: #409eff;
          }
        }
        .operateTable{
          height: 100%;
          .table{
            width: 100%;
            height: 412px;
            overflow: auto;
          }
        }
      }
      .operate{
        margin-left: 20px;
        width: 300px;
        background:#fff;
      }
    }
  }
</style>

