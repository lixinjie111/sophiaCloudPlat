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
        <el-form-item label="选择数据表"  prop='ku'>
          <el-select v-model="formParams1.ku" placeholder="请选择" @change="selectTable">
            <el-option  v-for="item in dataList" :key="item.id" :label="item.userTableName" :value="item.tableName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择自变量"  prop='cate1'>
          <el-select v-model="formParams1.cate1" placeholder="请选择" @change="selectEl" multiple>
            <el-option  v-for="item in designList" :key="item.column_name" :label="item.column_name" :value="item.column_name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择因变量"  prop='cate2'>
          <el-select v-model="formParams1.cate2" placeholder="请选择">
            <el-option  v-for="item in designList" :key="item.column_name" :label="item.column_name" :value="item.column_name" :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结果展示选项"  prop='show_options' >
          <el-select v-model="formParams1.show_options" placeholder="请选择" multiple>
            <el-option  v-for="item in show_optionsList" :key="item.value" :label="item.name" :value="item.value" :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
       <div class="c-text-center">
            <el-button type="primary" size="small" @click="lookDetail">查看数据</el-button>
        </div>
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
import {train,evaluate,logisticRegression,checkModelFeatures} from '@/api/algorithm';
import {checkData} from '@/api/deduce';
  export default {
    data() {
      return {
          typeList:[//操作类型
            {name:'训练',value:'1'},
            {name:'测试',value:'2'},
          ],
          penaltyList:[
            {name:'l1',value:'l1'},
            {name:'l2',value:'l2'},
          ],//惩罚项
          solverList:[
            {disabled:false, name:'newton-cg',value:'newton-cg'},
            {disabled:false, name:'lbfgs',value:'lbfgs'},
            {disabled:false, name:'liblinear',value:'liblinear'},
            {disabled:false, name:'sag',value:'sag'},
            {disabled:false, name:'saga',value:'saga'},
          ],//优化算法
          show_optionsList:[
             {disabled:true,name:'分类报告',value:'report'},
             {disabled:true,name:'混淆矩阵',value:'matrix'},
             {disabled:true,name:'roc曲线',value:'roc'},
             {disabled:true,name:'拟合优度',value:'r2'},
             {disabled:true,name:'系数解读',value:'coff'},
             {disabled:true,name:'独立性检验',value:'independence'},
             {disabled:true,name:'残差正态性检验',value:'resid_normal'},
             {disabled:true,name:'残差pp图',value:'pp'},
             {disabled:true,name:'残差qq图',value:'qq'},
             {disabled:true,name:'方差齐性检验',value:'var'},
             {disabled:true,name:'多重共线性检验',value:'vif'},
             {disabled:true,name:'异常值检测',value:'outliers'},
             {disabled:true,name:'预测值与真实值对比散点图',value:'pred_y_contrast'},
          ],//结果展示选项
          formParams1: {
            algorithm:'',
            model:'',
            ku:'',
            cate1:[],
            cate2:'',
            show_options:[],
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
             {disabled:true,name:'kMeans聚类',value:'kMeans'},
             {disabled:true,name:'层级聚类',value:'hierarchicalCluster'},
             {disabled:false,name:'支持向量机',value:'svmClassifier'},
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
              ku: [
                { required: true, message: '请选择内容', trigger: 'change' }
              ],
              cate1: [
                {  type: 'array', required: true, message: '请选择内容', trigger: 'change' }
              ],
              // cate2: [
              //   {  required: true, message: '请选择内容', trigger: 'change' }
              // ],
              show_options: [
                { type: 'array', required: true, message: '请至少选择一个因素', trigger: 'change' }
              ],
          },
          result:[],
      };
    },
    created(){
      if(this.$route.params.rowData){
        let _data=this.$route.params.rowData;
        let parameterConfig=JSON.parse(_data.parameterConfig);
        this.formParams1.algorithm=_data.secondtype;
        this.selecAlog(_data.type)
        this.formParams1.model = _data.name;
        this.formParams1.ku =parameterConfig.tableName?parameterConfig.tableName:'';
        this.selectTable(this.formParams1.ku)
        this.formParams1.cate1 =parameterConfig.X?parameterConfig.X:[];
        this.formParams1.cate2 =parameterConfig.Y?parameterConfig.Y[0]:'';
        this.formParams1.show_options=parameterConfig.show_options;
        setTimeout(()=>{
          this.submitForm();
        },500)
      }
      this.initData();
    },
    methods: {
      selecAlog(val){
        this.formParams1.model='';
        this.model_name_list=[];
        this.show_optionsList.forEach(item=>{
            item.disabled=true;
        })
        this.show_optionsList.forEach(item=>{
          if(val=='decisionTree'||val=='randomForest'||val=='svmClassifier'){
            if(item.value=='report'){
              item.disabled=false;
            }
            if(item.value=='matrix'){
              item.disabled=false;
            }
            if(item.value=='roc'){
              item.disabled=false;
            }
          }
          if(val=='logisticRegression'){
            if(item.value=='report'){
              item.disabled=false;
            }
            if(item.value=='matrix'){
              item.disabled=false;
            }
            if(item.value=='roc'){
              item.disabled=false;
            }
            if(item.value=='r2'){
              item.disabled=false;
            }
            if(item.value=='coff'){
              item.disabled=false;
            }
            if(item.value=='independence'){
              item.disabled=false;
            }
          }
        })
         logisticRegression(val).then(res => {
            if(res.code == 200) {
              this.model_name_list=res.model_name_list;
            }
          }).catch(err => {

          });
      },
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
      selectZu(){
        this.formParams1.cate1='';
        this.formParams1.cate2='';
      },
      realForm(){
         let params={
            "algorithm": this.formParams1.algorithm,
            "model": this.formParams1.model,
            "tableName": this.formParams1.ku,
            "X": this.formParams1.cate1,
            "Y": [this.formParams1.cate2],
            "show_options":this.formParams1.show_options
          };
          evaluate(params).then(res => {
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
          Y:[this.formParams1.cate2],
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
         this.formParams1.cate2='';
         this.designList=[];
         this.ininSearch(val);
      },
      selectEl(val){
        this.selfEl=val
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
        this.solverList.forEach(subItem=>{
          if(subItem.disabled){
            subItem.disabled=false;
          }
        })
        if(val.length==1){
          val.forEach(item=>{
            if(item=='l1'){
              this.solverList.forEach(subItem=>{
                if(subItem.value=='lbfgs'){
                  subItem['disabled']=true;
                }
                if(subItem.value=='sag'){
                  subItem['disabled']=true;
                }
                if(subItem.value=='newton-cg'){
                  subItem['disabled']=true;
                }
                
              })
            }
            if(item=='l2'){
              this.solverList.forEach(subItem=>{
              if(subItem.value=='liblinear'){
                  subItem['disabled']=true;
                }
                if(subItem.value=='saga'){
                  subItem['disabled']=true;
                }
              })
            }
          })
        }
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
                  if(this.$route.params.rowData){
                     this.selectEl(this.formParams1.cate1)
                  }
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