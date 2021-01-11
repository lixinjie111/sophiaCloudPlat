<template>
<div class="c-padding-10">
    <ul class="c-text-both">
        <li v-for="item in tabData" :class="{'tabActive':currentId==item.id}" :key="item.id" @click="handleClick(item)">{{item.name}}</li>
    </ul>
    <div class="opContent  c-mt-20 c-mb-10" v-show="currentId==1">
      <el-form ref="dialogForm1" :model="formParams1" label-width="90px" size="mini" :rules="rules1" label-position="top">
        <p class="c-text-center c-mb-10">数据源设置</p>
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
        <p class="c-text-center c-mb-10">数据集拆分</p>
        <el-form-item label="测试集比例"  prop='rate' >
          <el-input v-model="formParams1.rate" placeholder="请输入小于1的值"></el-input>
        </el-form-item>
        <el-form-item label="测试集随机种子数"  prop='randomState' >
          <el-input v-model="formParams1.randomState" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
       <div class="c-text-center">
            <el-button type="primary" size="small" @click="lookDetail">查看数据</el-button>
        </div>
    </div>
    <div class="opContent  c-mt-20 c-mb-10" v-show="currentId==2">
      <div class="c-text-center c-mb-10">运行配置</div>
      <el-form ref="dialogForm" :model="formParams" label-width="100px" size="mini" :rules="rules" label-position="top">
          <el-form-item label="隐藏层节点数"  prop='hidden_layer_sizes'>
            <el-input v-model="formParams.hidden_layer_sizes" placeholder="输入多个用“,”隔开 "></el-input>
          </el-form-item>
          <el-form-item label="激活函数"  prop='activation' >
            <el-select v-model="formParams.activation" placeholder="请选择">
              <el-option  v-for="item in activationList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="优化算法"  prop='solver' >
            <el-select v-model="formParams.solver" placeholder="请选择">
              <el-option  v-for="item in solverList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="惩罚项系数"  prop='alpha'>
            <el-input v-model="formParams.alpha" placeholder="请输入小数"></el-input>
          </el-form-item>
          <el-form-item label="批处理样本数"  prop='batch_size'>
            <el-input v-model="formParams.batch_size" placeholder="请输入整数"></el-input>
          </el-form-item>
          <el-form-item label="初始学习率"  prop='learning_rate_init'>
            <el-input v-model="formParams.learning_rate_init" placeholder="请输入小数"></el-input>
          </el-form-item>
           <el-form-item label="迭代停止条件"  prop='tol'>
            <el-input v-model="formParams.tol" placeholder="请输入小数" ></el-input>
          </el-form-item>
          <el-form-item label="最大迭代次数"  prop='max_iter'>
            <el-input v-model="formParams.max_iter" placeholder="请输入整数 " ></el-input>
          </el-form-item>
          <el-form-item label="结果展示选项"  prop='show_options' >
            <el-select v-model="formParams.show_options" placeholder="请选择" multiple>
              <el-option  v-for="item in show_optionsList" :key="item.value" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
      </el-form>
       <div class="c-text-center">
            <el-button type="primary" size="small" @click="submitForm">确定</el-button>
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
import {mlpClassifier} from '@/api/algorithm';
import {checkData} from '@/api/deduce';
  export default {
    data() {
      return {
          formParams: {
            hidden_layer_sizes:'10',
            activation:'relu',
            solver:'adam',//优化算法
            alpha:'0.0001',//惩罚项系数
            batch_size:'auto',
            learning_rate_init:'0.001',
            tol:'0.0001',//迭代停止条件
            max_iter:'200',//最大迭代次数
            show_options:["report", "matrix", "roc"],
          },
          typeList:[//操作类型
            {name:'训练',value:'1'},
            {name:'测试',value:'2'},
          ],
          activationList:["identity", "logistic", "tanh", "relu"], 
          penaltyList:[
            {name:'linear',value:'linear'},
            {name:'poly',value:'poly'},
            {name:'rbf',value:'rbf'},
            {name:'sigmoid',value:'sigmoid'},
          ],//惩罚项
          solverList:["lbfgs", "sgd", "adam"],//优化算法
          show_optionsList:[
             {name:'分类报告',value:'report'},
             {name:'混淆矩阵',value:'matrix'},
             {name:'roc曲线',value:'roc'},
            //  {name:'拟合优度',value:'r2'},
            //  {name:'系数解读',value:'coff'},
            //  {name:'独立性检验',value:'independence'},
            //  {name:'残差正态性检验',value:'resid_normal'},
            //  {name:'残差pp图',value:'pp'},
            //  {name:'残差qq图',value:'qq'},
            //  {name:'方差齐性检验',value:'var'},
            //  {name:'多重共线性检验',value:'vif'},
            //  {name:'异常值检测',value:'outliers'},
            //  {name:'预测值与真实值对比散点图',value:'pred_y_contrast'},
          ],//结果展示选项
          formParams1: {
            ku:'',
            cate1:[],
            cate2:'',
            rate:'0.3',
            randomState:'2020'
          },
          currentId:"1",
          tabData:[
              {name:"变量配置",id:1},
              {name:"参数配置",id:2},
              {name:"我的操作",id:3},
          ],
         
          designList:[],
          ClassifiyList:[],
          dataList:[],
          selfEl:'',
          rules:{
              hidden_layer_sizes: [
                 { required: true, message: '请输入内容', trigger: 'blur' },
              ],
              activation: [
                { required: true, message: '请选择', trigger: 'change' }
              ],
              solver: [
                { required: true, message: '请选择', trigger: 'change' }
              ],
              alpha: [
                 { required: true, message: '请输入内容', trigger: 'blur' },
              ],
              batch_size: [
                 { required: true, message: '请输入内容', trigger: 'blur' },
              ],
              learning_rate_init: [
                 { required: true, message: '请输入内容', trigger: 'blur' },
              ],
              tol: [
                 { required: true, message: '请输入内容', trigger: 'blur' },
              ],
              max_iter: [
                 { required: true, message: '请输入内容', trigger: 'blur' },
              ],
              show_options: [
                { type: 'array', required: true, message: '请至少选择一个因素', trigger: 'change' }
              ],
          },
          rules1:{
              ku: [
                { required: true, message: '请选择内容', trigger: 'change' }
              ],
              cate1: [
                {  type: 'array', required: true, message: '请选择内容', trigger: 'change' }
              ],
              cate2: [
                {  required: true, message: '请选择内容', trigger: 'change' }
              ],
              rate: [
                 { required: true, message: '请输入内容', trigger: 'blur' },
              ],
              randomState: [
                 { required: true, message: '请输入内容', trigger: 'blur' },
              ],
          },
          result:[],
          show1:false,
          show2:false,
      };
    },
    created(){
      if(this.$route.params.rowData){
        let _data=this.$route.params.rowData;
        let parameterConfig=JSON.parse(_data.parameterConfig);
        console.log(parameterConfig);
        this.formParams1.ku =parameterConfig.tableName?parameterConfig.tableName:'';
        this.selectTable(this.formParams1.ku)
        this.formParams1.cate1 =parameterConfig.X?parameterConfig.X:[];
        this.formParams1.cate2 =parameterConfig.Y?parameterConfig.Y[0]:'';
        this.formParams1.rate =parameterConfig.rate?parameterConfig.rate:'';
        this.formParams1.randomState =parameterConfig.randomState?parameterConfig.randomState:'';

        this.formParams.hidden_layer_sizes=parameterConfig.param.hidden_layer_sizes?parameterConfig.param.hidden_layer_sizes.join(','):'';
        this.formParams.activation=parameterConfig.param.activation?parameterConfig.param.activation:'';
        this.formParams.solver=parameterConfig.param.solver?parameterConfig.param.solver:'';
        this.formParams.alpha=parameterConfig.param.alpha?parameterConfig.param.alpha:'';
        this.formParams.batch_size=parameterConfig.param.batch_size?parameterConfig.param.batch_size:'';
        this.formParams.learning_rate_init=parameterConfig.param.learning_rate_init?parameterConfig.param.learning_rate_init:'';
        this.formParams.tol=parameterConfig.param.tol?parameterConfig.param.tol:'';
        this.formParams.max_iter=parameterConfig.param.max_iter?parameterConfig.param.max_iter:'';
        this.formParams.show_options=parameterConfig.show_options;
        setTimeout(()=>{
          this.submitForm();
        },500)
      }
      this.initData();
    },
    methods: {
      selectZu(){
        this.formParams1.cate1='';
        this.formParams1.cate2='';
      },
      realForm(){
        let params;
          params={
            "tableName": this.formParams1.ku,
            "X": this.formParams1.cate1,
            "Y": [this.formParams1.cate2],
            "rate": this.formParams1.rate,
            "randomState": this.formParams1.randomState,
            "cv": this.formParams.yan,
            "param": {
                "hidden_layer_sizes":this.formParams.hidden_layer_sizes.split(','),
                "activation":this.formParams.activation,
                "solver":this.formParams.solver,
                "alpha":this.formParams.alpha,
                "batch_size":this.formParams.batch_size,
                "learning_rate_init":this.formParams.learning_rate_init,
                "tol":this.formParams.tol,
                "max_iter":this.formParams.max_iter,
            },
            "show_options":this.formParams.show_options
          };
          mlpClassifier(params).then(res => {
            if(res.code == 200) {
                this.$emit('getRes',res)
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
         this.formParams1.cate1='';
         this.formParams1.cate2='';
         this.designList=[];
         this.ininSearch(val);
      },
      selectEl(val){
        console.log(val)
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