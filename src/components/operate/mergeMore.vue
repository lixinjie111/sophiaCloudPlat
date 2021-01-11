<template>
<div class="c-padding-10">
    <ul class="c-text-both">
        <li v-for="item in tabData" :class="{'tabActive':currentId==item.id}" :key="item.id" @click="handleClick(item)">{{item.name}}</li>
    </ul>
    <div class="opContent  c-mt-20 c-mb-10" v-show="currentId==3">
      <el-form ref="dialogForm1" :model="formParams1" label-width="90px" size="mini" :rules="rules1" label-position="top">
        <el-form-item label="合并形式" prop='direction'>
            <el-radio-group v-model="formParams1.direction">
                <!-- <el-radio label="1">水平</el-radio> -->
                <el-radio label="2">垂直</el-radio>
            </el-radio-group>
        </el-form-item>
        <template v-if="formParams1.direction==2">
            <el-form-item label="选择表格"  prop='ku'>
              <el-select v-model="formParams1.ku" placeholder="请选择"  multiple value-key="tableName">
                  <el-option  v-for="item in dataList" :key="item.id" :label="item.userTableName" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <div class="c-text-center" style="margin-top: 20px">
                <el-button type="primary" size="small" @click="checkMerge">合并检测</el-button>
            </div>
            <el-form-item label="检测结果">
              <div class="tag-group c-mb-10" v-for="(item,index) in checkList"  :key="index">
                <el-tag
                  closable
                  :disable-transitions="false"
                  :type="item.value==true?'success':'danger'"
                  @close="handleClose(item)">
                  {{item.name}}
                </el-tag>
              </div>
            </el-form-item>
            <el-form-item label="主表设置"  prop='tag'>
                <el-select v-model="formParams1.tag" placeholder="请选择">
                    <el-option  v-for="item in checkList" :key="item.tableName" :label="item.name" :value="item.tableName" v-if="item.value"></el-option>
                </el-select>
            </el-form-item>
        </template>
        <el-form-item label="添加表名" prop='newTableName'>
            <el-input v-model.trim="formParams1.newTableName"></el-input>
        </el-form-item>
        <el-form-item label="添加分类"  prop='cate'>
            <el-select v-model="formParams1.cate" placeholder="请选择">
                <el-option  v-for="item in categoryList" :key="item.id" :label="item.classificationName" :value="item.id"></el-option>
            </el-select>
        </el-form-item>   
        <el-form-item label="数据描述" prop='desc'>
            <el-input
                type="textarea"
                :rows="3"
                placeholder=""        
                v-model.trim="formParams1.desc">
            </el-input>
        </el-form-item>  
      </el-form>
      <div class="c-text-center" style="margin-top: 20px">
          <el-button type="primary" size="small" @click="submitForm">确定</el-button>
      </div>
    </div>
</div>
</template>
<script>
import {myDataList,verticalCheck,getTableData,getTableCosumn,getUserClassification,verticalConsolidationList,horizontalConsolidationList} from '@/api/index';
import {crosstable,checkData} from '@/api/deduce';
  export default {
    data() {
      return {
          formParams: {
            type: [],
            alpha:''
          },
          formParams1: {
            direction:'2',
            newTableName:'',
            cate:'',
            desc:'',
            ku:[],
            tag:'',
          },
          formParams2: {
           
          },
          formParams3: {
            ku:'',
          },
          currentId:"3",
          tabData:[
              // {name:"设置主表",id:1},
              // {name:"设置副表",id:2},
              {name:"合并配置",id:3},
          ],
          designList2:[],
          designList3:[],
          keyList:[],
          ClassifiyList:[],
          dataList:[],
          NewDataList:[],
          zunList:[
            {name:'自变量在一列内',value:'v'},
            {name:'自变量为字段名',value:'h'},
          ],
          checkList:[],
          rules1:{
              direction: [
                { required: true, message: '请选择内容', trigger: 'change' }
              ],
              ku: [
                {  type: 'array', required: true, message: '请选择内容', trigger: 'change' }
              ],
              newTableName: [
                { required: true, message: '请输入', trigger: 'blur' }
              ],
              cate: [
                { required: true, message: '请选择内容', trigger: 'change' }
              ],
              tag: [
                { required: true, message: '请选择内容', trigger: 'change' }
              ],
          },
          result:[],
          categoryList:[],
      };
    },
    created(){
      this.initData();
      this.ininCate();
    },
    methods: {
      checkMerge(){
        let arr=this.formParams1.ku;
        let newArr=[];
        // arr.forEach(item=>{
        //   if(item.tableName==this.formParams1.tag){
        //       var index = arr.indexOf(item)
        //       arr.splice(index, 1)
        //       arr.unshift(item);
        //   }
        // })
        arr.forEach(item=>{
          newArr.push(item.tableName)
        })
        let params={
            "tableName": newArr,
        };
        this.checkList=[];
        verticalCheck(params).then(res => {
            if(res.code == 200000) {
              for(var key in res.data){
                this.dataList.forEach(item=>{
                  if(item.tableName==key){
                    this.checkList.push({
                      name:item.userTableName,
                      value:res.data[key],
                      tableName:key
                    })
                  }
                })
               
              }
              
            }
        }).catch(err => {

        });
      },
      handleClose(tag) {
        this.checkList.splice(this.checkList.indexOf(tag), 1);
      },
      ininCate(){
          this.categoryList=[];
          getUserClassification().then(res=>{
              if (res.code == 200000) {
                this.categoryList=res.data;
              }
          }).catch(err => {

          }); 
      },
      realForm2(){
        let arr=this.checkList;
        let newArr=[];
        arr.forEach(item=>{
             if(item.tableName==this.formParams1.tag){
                var index = arr.indexOf(item)
                arr.splice(index, 1)
                arr.unshift(item);
            }
        })
        arr.forEach(item=>{
          if(item.value){
            newArr.push(item.tableName)
          }
        })
        let params={
            "newTableName": this.formParams1.newTableName,
            "tableName": newArr,
            'tableRemark':this.formParams1.desc,
            'classId':this.formParams1.cate
        };
        verticalConsolidationList(params).then(res => {
            if(res.code == 200000) {
                this.$emit('getCode',res.data)
            }
        }).catch(err => {

        });
      },
      submitForm(formName) {
        this.$refs.dialogForm1.validate((valid1) => {
          if (valid1) {
            this.realForm2();
          } else {
            this.$message({
                type: 'info',
                duration: '1500',
                message: "请填写合并配置",
                showClose: true
            });
            return false;
          }
        });
      },
      handleClick(item) {
       this.currentId=item.id
      },
      initData(){
          this.dataList=[];
          myDataList().then(res=>{
              if (res.code == 200000) {
                  this.ClassifiyList=res.data.tableClassification;
                  this.dataList = res.data.tableInfo;
              }
          }).catch(err => {
          });
      },
    }
  };
</script>
<style lang="scss" scoped>
@import '@/assets/scss/theme.scss';
.tag-group{
  .el-tag{
    height: auto;
    white-space: normal;
    word-wrap:break-word;
    word-break:normal;
    max-width: 100%;
  }
}
li{
    flex:1;
    padding-bottom:10px;
    padding-top:5px;
    @include layoutMode(both);
    cursor: pointer;
    box-sizing: border-box;
}
.tabActive{
        color:#409eff;
        position: relative;
            &::after{
               content: "";
                display:block;
                position: absolute;
                bottom: -2px;
                left: calc(50% - 15px);
                width: 30px;
                height: 2px;
                background: #409eff;
            }
    }
</style>