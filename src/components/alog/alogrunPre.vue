<template>
<div class="c-padding-10">
    <ul class="c-text-both">
        <li v-for="item in tabData" :class="{'tabActive':currentId==item.id}" :key="item.id" @click="handleClick(item)">{{item.name}}</li>
    </ul>
    <div class="opContent  c-mt-20 c-mb-10" v-show="currentId==1">
      <el-form ref="dialogForm1" :model="formParams1" label-width="90px" size="mini" :rules="rules1" label-position="top">
        <p class="c-text-center c-mb-10">数据源设置</p>
        <el-form-item label="选择算法"  prop='algorithm'>
          <el-select v-model="formParams1.algorithm" placeholder="请选择" @change="selecAlog">
            <el-option  v-for="item in alogList" :key="item.value" :label="item.name" :value="item.value" :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择模型"  prop='model'>
          <el-select v-model="formParams1.model" placeholder="请选择">
            <el-option  v-for="item in model_name_list" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <div class="c-text-center">
            <el-button type="primary" size="small" @click="checkModelFeatures">查看特征</el-button>
        </div>
        <el-form-item label="选择变量类型" prop='oneSample'>
            <el-radio-group v-model="formParams1.oneSample">
                <el-radio label="1">单样本</el-radio>
                <el-radio label="2">多样本</el-radio>
            </el-radio-group>
        </el-form-item>
        <template v-if="formParams1.oneSample==1">
          <el-form-item label="输入特征向量" prop='factor'>
              <el-input v-model.trim="formParams1.factor" placeholder="向量之间，请用逗号“,”隔开"></el-input>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="选择数据表"  prop='ku'>
            <el-select v-model="formParams1.ku" placeholder="请选择" @change="selectTable">
              <el-option  v-for="item in dataList" :key="item.id" :label="item.userTableName" :value="item.tableName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择自变量"  prop='cate1'>
            <el-select v-model="formParams1.cate1" placeholder="请选择" multiple>
              <el-option  v-for="item in designList" :key="item.column_name" :label="item.column_name" :value="item.column_name"></el-option>
            </el-select>
          </el-form-item>
          <div class="c-text-center">
            <el-button type="primary" size="small" @click="lookDetail">查看数据</el-button>
         </div>
        </template>
      </el-form>
    </div>
    <div class="opContent  c-mt-20 c-mb-10" v-show="currentId==2">
       <div class="c-text-center">
            <el-button type="primary" size="small" @click="submitForm">确定</el-button>
        </div>
    </div>
    <div class="opContent  c-mt-20 c-mb-10" v-show="currentId==3">
    </div>
</div>
</template>
<script>
import {myDataList} from '@/api/index';
import {getTableData,getTableCosumn} from '@/api/index';
import {train,predict,logisticRegression,checkModelFeatures} from '@/api/algorithm';
import {checkData} from '@/api/deduce';
  export default {
    data() {
      return {
          formParams1: {
            algorithm:'',
            model:'',
            oneSample:'1',
            factor:'',
            ku:'',
            cate1:[],
          },
          currentId:"1",
          tabData:[
              {name:"变量配置",id:1},
              {name:"参数配置",id:2},
              {name:"我的操作",id:3},
          ],
          alogList:[
             {disabled:false,name:'逻辑回归',value:'logisticRegression'},
             {disabled:true,name:'线性回归',value:'linerRegression'},
             {disabled:true,name:'多项式回归',value:'polyLinerRegression'},
             {disabled:false,name:'决策树',value:'decisionTree'},
             {disabled:false,name:'随机森林',value:'randomForest'},
             {disabled:true,name:'聚类',value:'kMeans'},
             {disabled:true,name:'层级聚类',value:'hierarchicalCluster'},
             {disabled:false,name:'支持向量机',value:'svmClassifier'},
             {disabled:false,name:'多层感知机',value:'mlpClassifier'},
          ],
          model_name_list:[],
          designList:[],
          ClassifiyList:[],
          dataList:[],
          selfEl:'',
          rules1:{
              algorithm: [
                { required: true, message: '请选择内容', trigger: 'change' }
              ],
              model: [
                { required: true, message: '请选择内容', trigger: 'change' }
              ],
              factor: [
                { required: true, message: '请输入', trigger: 'blur' }
              ],
              ku: [
                { required: true, message: '请选择内容', trigger: 'change' }
              ],
              cate1: [
                {  type: 'array', required: true, message: '请选择内容', trigger: 'change' }
              ],
          },
          result:[],
      };
    },
    created(){
      this.initData();
    },
    methods: {
      checkModelFeatures(){
          let params={
            "algorithm":this.formParams1.algorithm,
            "model":this.formParams1.model,
          };
          checkModelFeatures(params).then(res => {
            if(res.code == 200) {
             this.$message({
                  type: 'success',
                  duration: '2000',
                  message: res.res,
                  offset:'250',
                  showClose: true
              });
            }
          }).catch(err => {

          });
      },
      selecAlog(val){
        this.formParams1.model='';
        this.model_name_list=[];
         logisticRegression(val).then(res => {
            if(res.code == 200) {
              this.model_name_list=res.model_name_list;
            }
          }).catch(err => {

          });
      },
      realForm(){
         let params={
            "algorithm": this.formParams1.algorithm,
            "model": this.formParams1.model,
            "oneSample": this.formParams1.oneSample==1?true:false,
            "tableName": this.formParams1.ku,
            "X": this.formParams1.oneSample==1?this.formParams1.factor.split(','):this.formParams1.cate1,
          };
          predict(params).then(res => {
              if(res.code == 200) {
                  this.$emit('getRes',res.res)
              }
          }).catch(err => {

          });
      },
      lookForm(){
        let params={
          table_name:this.formParams1.ku,
          X:this.formParams1.cate1,
          Y:[],
        };
        console.log()
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
      },
      handleClick(item) {
       this.currentId=item.id
      },
      selectTable(val){
         this.formParams1.cate1=[];
         this.designList=[];
         this.ininSearch(val);
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