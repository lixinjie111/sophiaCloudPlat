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
              :edit-config="{trigger: 'click', mode: 'cell'}"
              v-if="ifShowBeforTable"
              :data="beforeOperData.data"
              ref="xTable"
            >
              <vxe-table-column type="seq" title="序号" width="60" sortable></vxe-table-column>
              <vxe-table-column  :field="subKey" :title="subItem.title" v-for="(subItem,subKey) in beforeOperData.col" :key="subKey"  :edit-render="{name: '$input',props: {type:subItem.type}}"></vxe-table-column>
            </vxe-table>

            <!--处理后表格-->
            <vxe-table
              border
              resizable
              ref="xTable"
              :edit-config="{trigger: 'click', mode: 'cell'}"
              v-if="ifShowAfterTable"
              :data="afterOperData.data"
            >
              <vxe-table-column type="seq" title="序号" width="60" sortable></vxe-table-column>
              <vxe-table-column  :field="subKey" :title="subItem.title" v-for="(subItem,subKey) in afterOperData.col" :key="subKey" :edit-render="{name: '$input',props: {type:subItem.type}}"></vxe-table-column>
            </vxe-table>
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
  import operate from '@/components/operate/crosstab';
  import {tableEdit,downLoad} from '@/api/index';
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
      // 转换数据
      transformList(res){
        let obj={};
        res.col.forEach((item,index)=>{
          let newkey='colName'+index;
          obj[newkey]={ type: typeof res.data[0][index],title: item };
        })
        res.col = obj;
        let arr=[];
        res.data.forEach(item1=>{
          let obj1={};
          item1.forEach((item2,index2)=>{
            let newkey1='colName'+index2;
            obj1[newkey1]=item2;
          })
          arr.push(obj1)
          res.data=arr;
        })
        return res
      },
      getChoiceTableId(tbd,tInfo){
        this.choiceTableId = tbd;
        this.enCodeTableName = tInfo.encodeTableName || '';
        this.tableName = tInfo.Name;
      },
      fnBeforeData(data1){
        this.beforeOperData = this.transformList(data1);
        this.ifShowBeforTable = true;
        this.ifShowAfterTable = false;
      },
      fnAfterData(data2){
        this.ifShowBeforTable = false;
        this.ifShowAfterTable = true;
        this.afterOperData = this.transformList(data2[0] || {});
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

