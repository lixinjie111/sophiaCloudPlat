<template>
<div class="c-padding-10">
    <ul class="c-text-both">
        <li v-for="item in tabData" :class="{'tabActive':currentId==item.id}" :key="item.id" @click="handleClick(item)">{{item.name}}</li>
    </ul>
    <div class="opContent  c-mt-20 c-mb-10" v-show="currentId==2">
      <div class="c-text-center c-mb-20">异常值处理</div>
      <el-form ref="dialogForm" :model="formParams" label-width="70px" size="mini" :rules="rules">
        <el-form-item label="选择字段">
          <el-select v-model="formParams.choiceField" placeholder="选择字段">
            <el-option v-for="(item,index) in choiceFieldArr" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标准">
          <el-checkbox-group v-model="formParams.standardType" @change="handleClickStandType">
            <el-checkbox label="missNumber">缺失数字</el-checkbox>
            <el-checkbox label="numberLess">
              <el-form-item prop="numLtValue">
                数字&lt; <el-input v-model="formParams.numLtValue" :disabled="numLtValueDis" style="width:92px" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-checkbox>
            <el-checkbox label="numberGreater"> 
              <el-form-item prop="numGtValue">
                数字&gt; <el-input  v-model="formParams.numGtValue" :disabled="numGtValueDis" style="width:92px" placeholder="请输入内容"></el-input>
              </el-form-item> 
            </el-checkbox>
            <el-checkbox label="standardDev">  
              <el-form-item prop="numPlusValue">
                数字+/- <el-input v-model="formParams.numPlusValue" :disabled="numPlusValueDis" style="width:92px" placeholder="请输入内容"></el-input>标准差
              </el-form-item>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="处理方法">
          <el-radio-group v-model="formParams.resource">
            <el-radio label="01" class="c-mb-20" checked>删除异常值</el-radio>
            <el-radio label="02" class="c-mb-20">设置为NULL</el-radio>
            <el-radio label="03">
              填补
              <el-select v-model="formParams.deal" placeholder="请选择" style="width:120px;display:inline-block">
                <el-option label="locf法" value="01">locf法</el-option>
                <el-option label="平均值" value="02">平均值</el-option>
                <el-option label="中位数" value="03">中位数</el-option>
                <el-option label="众数" value="04">众数</el-option>
              </el-select>
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
       <div class="c-text-center">
            <el-button type="primary" size="small" @click="submitFunc">确定</el-button>
        </div>
    </div>
    <div class="opContent  c-mt-20 c-mb-10" v-show="currentId==1">
      <el-form ref="dialogForm" :model="formParams1" label-width="90px" size="mini">
        <el-form-item label="选择数据表">
          <el-select v-model="formParams1.data" placeholder="我的数据" value-key="id" @change="selectMydata($event)">
            <el-option v-for="item in myDataList" :key="item.id" :label="item.userTableName" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="c-text-center">
            <el-button type="primary" size="small" @click="chakanFunc">查看数据</el-button>
      </div>
    </div>
    <div class="opContent  c-mt-20 c-mb-10" v-show="currentId==3">
      <div class="c-text-center c-mb-20">tab3</div>
       <div class="c-text-center">
            <el-button type="primary" size="small" @click="submitFunc1">确定</el-button>
        </div>
    </div>
</div>
</template>
<script>
import {myDataList,getTableData} from '@/api/index';
import {getDataList,OutliersDel} from '@/api/dataDeal/index'
// import { delete } from 'vue/types/umd';
  export default {
    data() {
      return {
          formParams: {
            numGtValue: '',
            numLtValue:'',
            numPlusValue:'',
            choiceField:[],
            standardType: ['missNumber'],
            resource:'01',
            deal:''
          },
          formParams1: {
            data:null,
          },
          currentId:"2",
          tabData:[
              {name:"数据",id:1},
              {name:"参数",id:2},
              {name:"路径",id:3},
          ],
          myDataList:[],
          choiceFieldArr:[],
          choicedTableName:'',
          rules:{
            numLtValue: [
              { required: false,message: '请输入内容'}
            ],
            numGtValue:[
              { required: false,message: '请输入内容'}
            ],
            numPlusValue:[
              { required: false,message: '请输入内容'}
            ]
          },
          numLtValueDis:true,
          numGtValueDis:true,
          numPlusValueDis:true
      };
    },
    created(){
        this.initData();
    },
    methods: {
      handleClickStandType(e){
        let choiceSrr = e;
        if(choiceSrr.includes('numberLess')){
          this.rules.numLtValue[0].required = true;
          this.numLtValueDis = false;
        }
        else{
          this.rules.numLtValue[0].required = false;
          this.numLtValueDis = true;
        }
        if(choiceSrr.includes('numberGreater')){
          this.rules.numGtValue[0].required = true;
          this.numGtValueDis = false;
        }
        else{
          this.rules.numGtValue[0].required = false;
          this.numGtValueDis = true;
        }
        if(choiceSrr.includes('standardDev')){
          this.rules.numPlusValue[0].required = true;
          this.numPlusValueDis = false;
        }
        else{
          this.rules.numPlusValue[0].required = false;
          this.numPlusValueDis = true;
        }
      },
      selectMydata(e){
        this.choicedTableName = e.tableName;
        let encodeTableName = e.tableName;
        let Name = e.userTableName;
        let tableInfo = {
          encodeTableName,
          Name
        };
        this.$emit('putChoiceTableId',e.id,tableInfo);
        let parms = {
          tableId:e.id
        };
        this.choiceFieldArr = [];
        getDataList(parms).then(res=>{
          if(res.code == 200000){
            let resObj = res.data[0];
            for(var attr in resObj){
              this.choiceFieldArr.push({
                label:attr,
                value:attr
              });
            }
          }
          else{
            this.$message({
                type: 'error',
                duration: '1500',
                message: "获取数据失败",
                showClose: true
            });
          }
        }).catch(err=>{
            this.$message({
                type: 'error',
                duration: '1500',
                message: "获取数据失败",
                showClose: true
            });
        });
      },
      chakanFunc(){
        let kuName = this.formParams1.data.tableName;
        this.tableKayName = kuName;
        let parm = {
          name:kuName
        };
        getTableData(parm).then(res=>{
          if(res.code == 200000){
            let detailData = res.data.list;
            console.log(detailData,'detailData')
            this.$emit('beforeOperData',detailData);
          }
          else{
            this.$message({
                type: 'error',
                duration: '1500',
                message: "获取数据失败",
                showClose: true
            });
          }
        }).catch(err=>{
          console.log(err)
        });
      },
      submitFunc(){
        var operData = this.formParams;
        var missNumber,numLess,numGreater,standard,fillUpWay;
        var standardTypeArr = operData.standardType;
        console.log(operData,'operData')
        if(standardTypeArr.includes('numberLess')){
          numLess = operData.numLtValue;
        }
        else{
          numLess = '';
        }

        if(standardTypeArr.includes('missNumber')){
          missNumber = '1';
        }
        else{
          missNumber = '2';
        }

        if(standardTypeArr.includes('numberGreater')){
          numGreater = operData.numGtValue;
        }
        else{
          numGreater = '';
        }

        if(standardTypeArr.includes('standardDev')){
          standard = operData.numPlusValue;
        }
        else{
          standard = '';
        }
        if(operData.resource == '03'){
          fillUpWay = operData.deal;
        }
        else{
          fillUpWay = '';
        }
        let unitChangeParm = new FormData();
        unitChangeParm.append('tableName',this.choicedTableName || '');
        unitChangeParm.append('fieldScope',operData.choiceField || '');
        unitChangeParm.append('missNumber',missNumber);
        unitChangeParm.append('numberLess',numLess);
        unitChangeParm.append('numberGreater',numGreater);
        unitChangeParm.append('standardDev',standard);
        unitChangeParm.append('dealMethod',operData.resource);
        unitChangeParm.append('fillUpWay',fillUpWay);
        // let unitChangeParm = {
        //     tableName:this.choicedTableName || '', 
        //     fieldScope:operData.choiceField || '',  
        //     missNumber:missNumber,
        //     numberLess:numLess,
        //     numberGreater:numGreater,
        //     standardDev:standard,
        //     dealMethod :operData.resource,
        //     fillUpWay:fillUpWay                    
        // };
        OutliersDel(unitChangeParm).then(res=>{
          console.log(res,'res')
          if(res.code == 200000){
            let afterOperData = res.data;
            this.$emit('afterOperData',afterOperData);
          }
          else{
            let errMsg = res.message;
            this.$message({
                type: 'error',
                duration: '1500',
                message: errMsg || "获取数据失败",
                showClose: true
            });
          }
        }).catch(err=>{
            this.$message({
                type: 'error',
                duration: '1500',
                message:"获取数据失败",
                showClose: true
            });
        });
        console.log(operData,'operData')
      },
      handleClick(item) {
        this.currentId=item.id;
        this.formParams={
          choiceField:[],
          standardType: ['missNumber'],
          resource:'01',
          deal:''
        }
      },
      initData(){
          myDataList().then(res=>{
              if (res.code == 200000) {
                this.myDataList = res.data.tableInfo;
              }
          }).catch(err => {
            console.log(err)
          });
      }
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