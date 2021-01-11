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
          <div class="table" v-if="!ifShowBeforTable && !ifShowAfterTable">
            <!-- 此元素作用就是在没有操作时，占位，撑高 -->
          </div>
          <div class="table" v-if="ifShowBeforTable">
            <!--处理前表格-->
            <vxe-table
              border
              resizable
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
          </div>
          <div class="img-box" v-if="ifShowAfterTable">
            <div v-for="item in imgs"  class="img-item" v-if="item.base64">
              <h1 class="img-title c-padding-10">{{item.title}}</h1>
              <img :src="'data:image/png;base64,'+item.base64" alt="" class="img" />
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
  import operate from '@/components/operate/boxFigure';
  import {tableEdit,downLoad} from '@/api/index';
  import { transformList, generateColumn } from '@/utils/common';
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
        tableName:'',
        imgs: []
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
        this.imgs = data2;
        this.ifShowBeforTable = false;
        this.ifShowAfterTable = true;
      },
      saveEditTable(){
        let selectRecords = this.$refs.xTable.getTableData().tableData;
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
          .img-box{
            width: 100%;
            height: 412px;
            overflow: auto;
            .img-item{
              text-align: center;
              border-bottom: 1px solid;
              padding-bottom: 8px;
            }
            .img-title{
              text-align: center;
              font-size: 18px;
              padding: 18px;
            }
            .img{
              margin: 0 auto;
            }
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

