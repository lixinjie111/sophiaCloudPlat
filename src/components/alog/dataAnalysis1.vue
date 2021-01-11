<template>
<div class="c-padding-10">
    <ul class="c-text-both">
        <li v-for="item in tabData" :class="{'tabActive':currentId==item.id}" :key="item.id" @click="handleClick(item)">{{item.name}}</li>
    </ul>
    <div class="opContent  c-mt-20 c-mb-10" v-show="currentId==1">
      <el-form ref="dialogForm1" :model="formParams1" label-width="90px" size="mini" :rules="rules1" label-position="top">
        <el-form-item label="选择数据表"  prop='ku'>
          <el-select v-model="formParams1.ku" placeholder="请选择" @change="selectTable">
            <el-option  v-for="item in dataList" :key="item.id" :label="item.userTableName" :value="item.tableName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择算法"  prop='type'>
            <el-select v-model.trim="formParams1.type" placeholder="请选择">
                <el-option :key="key" :label="item" :value="key"  v-for="(item,key) in filterList1">{{item}}</el-option>
            </el-select>
        </el-form-item>
      </el-form>
       <div class="c-text-center">
            <el-button type="primary" size="small" @click="lookDetail">查看数据</el-button>
        </div>
    </div>
    <div class="opContent  c-mt-20 c-mb-10" v-show="currentId==2">
      <el-form ref="dialogForm" :model="formParams" label-width="100px" size="mini" :rules="rules" label-position="top">
          <el-form-item label="频率分布直方图"  prop='cate1'>
            <el-select v-model="formParams.cate1" placeholder="请选择" @change="selectEl" multiple>
              <el-option  v-for="item in designList" :key="item.column_name" :label="item.column_name" :value="item.column_name"></el-option>
            </el-select>
          </el-form-item>
          <template v-if="formParams1.type=='decisionTree'||formParams1.type=='logisticRegression'||formParams1.type=='randomForest'||formParams1.type=='svmClassifier'||formParams1.type=='adaboost'||formParams1.type=='mlpClassifier'">
            <el-form-item label="频率直方图分类字段"  prop='cate2'>
              <el-select v-model="formParams.cate2" placeholder="请选择">
                <el-option  v-for="item in designList" :key="item.column_name" :label="item.column_name" :value="item.column_name" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
           </template>
          <el-form-item label="数据分布图"  prop='cate3'>
            <el-select v-model="formParams.cate3" placeholder="请选择" multiple>
              <el-option  v-for="item in designList" :key="item.column_name" :label="item.column_name" :value="item.column_name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="箱型图"  prop='cate4'>
            <el-select v-model="formParams.cate4" placeholder="请选择" multiple>
              <el-option  v-for="item in designList" :key="item.column_name" :label="item.column_name" :value="item.column_name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="饼图"  prop='cate5'>
            <el-select v-model="formParams.cate5" placeholder="请选择" multiple>
              <el-option  v-for="item in designList" :key="item.column_name" :label="item.column_name" :value="item.column_name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="特征矩形图"  prop='cate6'>
            <el-select v-model="formParams.cate6" placeholder="请选择" multiple>
              <el-option  v-for="item in designList" :key="item.column_name" :label="item.column_name" :value="item.column_name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="相关系数热度图"  prop='cate7'>
            <el-select v-model="formParams.cate7" placeholder="请选择" multiple>
              <el-option  v-for="item in designList" :key="item.column_name" :label="item.column_name" :value="item.column_name"></el-option>
            </el-select>
          </el-form-item>
         <template v-if="formParams1.type=='linerRegression'||formParams1.type=='polyLinerRegression'">
          <el-form-item label="因变量和各自变量相关系数图"  prop='cate8'>
            <el-select v-model="formParams.cate8" placeholder="请选择自变量" multiple @change="selectE2">
              <el-option  v-for="item in designList1" :key="item.column_name" :label="item.column_name" :value="item.column_name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=""  prop='cate9'>
            <el-select v-model="formParams.cate9" placeholder="请选择因变量">
              <el-option  v-for="item in designList1" :key="item.column_name" :label="item.column_name" :value="item.column_name" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
          </template>
      </el-form>
       <div class="c-text-center">
            <el-button type="primary" size="small" @click="submitForm" :loading="subloading">确定</el-button>
        </div>
    </div>
    <div class="opContent  c-mt-20 c-mb-10" v-show="currentId==3">
      <div class="c-text-center c-mb-20"></div>
       <div class="c-text-center">
            <el-button type="primary" size="small" @click="submitForm">确定</el-button>
        </div>
    </div>
</div>
</template>
<script>
import {myDataList} from '@/api/index';
import {getTableData,getTableCosumn} from '@/api/index';
import {dataAnalysis,getSecondType} from '@/api/algorithm';
import {checkData} from '@/api/deduce';
  export default {
    data() {
      return {
          subloading:false,
          formParams: {
            cate1:[],
            cate2:'',
            cate3:[],
            cate4:[],
            cate5:[],
            cate6:[],
            cate7:[],
            cate8:[],
            cate9:'',
          },
          formParams1: {
            ku:'',
            type:'',
            
          },
          currentId:"1",
          tabData:[
              {name:"变量配置",id:1},
              {name:"参数配置",id:2},
              {name:"我的操作",id:3},
          ],
         
          designList:[],
          designList1:[],
          ClassifiyList:[],
          dataList:[],
          selfEl:'',
          rules:{
              // cate1: [
              //   {  type: 'array', required: true, message: '请选择内容', trigger: 'change' }
              // ],
              // cate2: [
              //   {  required: true, message: '请选择内容', trigger: 'change' }
              // ],
              // cate3: [
              //   {  type: 'array', required: true, message: '请选择内容', trigger: 'change' }
              // ],
              // cate4: [
              //   {  type: 'array', required: true, message: '请选择内容', trigger: 'change' }
              // ],
              // cate5: [
              //   {  type: 'array', required: true, message: '请选择内容', trigger: 'change' }
              // ],
              // cate6: [
              //   {  type: 'array', required: true, message: '请选择内容', trigger: 'change' }
              // ],
              // cate7: [
              //   {  type: 'array', required: true, message: '请选择内容', trigger: 'change' }
              // ],
              // cate8: [
              //   {  type: 'array', required: true, message: '请选择内容', trigger: 'change' }
              // ],
              // cate9: [
              //   {  required: true, message: '请选择内容', trigger: 'change' }
              // ],

          },
          rules1:{
              ku: [
                { required: true, message: '请选择内容', trigger: 'change' }
              ],
              type: [
                { required: true, message: '请选择内容', trigger: 'change' }
              ],
             
          },
          result:[],
          show1:false,
          show2:false,
          filterList1:[],
      };
    },
    created(){
      this.getSecondType();
      this.initData();
    },
    methods: {
      getSecondType(){
          getSecondType({}).then(res=>{
              if (res.code == 200) {
                  this.filterList1 = res.result;
              }
          }).catch(err => {
          });
      },
      selectZu(){
        this.formParams1.cate1='';
        this.formParams1.cate2='';
      },
      realForm(){
        let params;
        if(this.formParams1.type=='linerRegression'||this.formParams1.type=='polyLinerRegression'){
          params={
            "tableName": this.formParams1.ku,
            "count": this.formParams.cate1,
            "count_hue": this.formParams.cate2,
            "dist": this.formParams.cate3,
            "box": this.formParams.cate4,
            "pie": this.formParams.cate5,
            "pairPlot": this.formParams.cate6,
            "heatMap": this.formParams.cate7,
            "yCorr":{
              "X":this.formParams.cate8,
              "Y":[this.formParams.cate9]
            }
          };
        }else{
           params={
            "tableName": this.formParams1.ku,
            "count": this.formParams.cate1,
            "count_hue": this.formParams.cate2,
            "dist": this.formParams.cate3,
            "box": this.formParams.cate4,
            "pie": this.formParams.cate5,
            "pairPlot": this.formParams.cate6,
            "heatMap": this.formParams.cate7,
          };
        }
        this.subloading=true;
        dataAnalysis(params).then(res => {
          if(res.code == 200) {
              this.subloading=false;
              this.$emit('getRes',res)
          }
        }).catch(err => {
          this.subloading=false;
        });
      },
      lookForm(){
        let params={
          table_name:this.formParams1.ku,
          // X:this.formParams1.cate1,
          // Y:[this.formParams1.cate2],
        };
        checkData(params).then(res => {
            if(res.code == 200) {
                this.$emit('lookRes',res.res)
            }
        }).catch(err => {
          
        });
      },
      lookDetail(formName) {
        this.$refs.dialogForm1.validate((valid1) => {
          if (valid1) {
            this.lookForm();
          } else {
            return false;
          }
        });
      },
      submitForm(formName) {
        this.$refs.dialogForm.validate((valid) => {
          if (valid) {
            this.$refs.dialogForm1.validate((valid1) => {
              if (valid1) {
                this.realForm();
              } else {
                this.$message({
                    type: 'info',
                    duration: '1500',
                    message: "请填写变量配置",
                    showClose: true
                });
                 return false;
              }
            });
          } else {
            return false;
          }
        });
      },
      handleClick(item) {
       this.currentId=item.id
      },
      selectTable(val){
         this.designList=[];
         this.ininSearch(val);
      },
      selectEl(val){
        this.designList.forEach(subItem=>{
          if(subItem.disabled){
            subItem.disabled=false;
          }
        })
        val.forEach(item=>{
          this.designList.forEach(subItem=>{
            if(item==subItem.column_name){
              subItem['disabled']=true;
            }
          })
        })
      },
      selectE2(val){
        this.designList1.forEach(subItem=>{
          if(subItem.disabled){
            subItem.disabled=false;
          }
        })
        val.forEach(item=>{
          this.designList1.forEach(subItem=>{
            if(item==subItem.column_name){
              subItem['disabled']=true;
            }
          })
        })
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
      ininSearch(code){
          getTableCosumn({'name':code}).then(res=>{
              if (res.code == 200000) {
                  this.designList=res.data;
                  this.designList1=JSON.parse(JSON.stringify(res.data))
              }
          }).catch(err => {

          });
      },
    }
  };
</script>
<style lang="scss" scoped>
@import '@/assets/scss/theme.scss';
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