<template>
  <div class="result_box">
    <div class="result_top">
      <sapn class="result_top_item">测试结果</sapn>
      <div class="result_top_item">
        推荐应用:
        <a-select v-model="param1.applicationId" style="width: 120px" @select="onSelect"
                  :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
          <a-select-option v-for="it in tools" :key="it.id" :value="it.id">
            {{it.appName}}
          </a-select-option>
        </a-select>
      </div>
      <div class="result_top_item">
        业务场景:
        <a-select v-model="param1.sceneId" style="width: 120px"
                  :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
          <a-select-option v-for="it in scenes" :key="it.id" :value="it.id">
            {{it.title}}
          </a-select-option>
        </a-select>
      </div>
      <div class="result_top_item">
        测试方式:
        <a-radio-group v-model="param1.type">
          <a-radio v-for="it in types" :key="it.value" :value="it.value">
            {{ it.title }}
          </a-radio>
        </a-radio-group>
      </div>
    </div>
    <div class="result_middle">
      <div class="result_middle_left">
        <div class="result_middle_title">{{leftTitle}}
          <a-button type="primary" :disabled="disabledSubmit" @click="onSubmit">预测</a-button>
        </div>
        <div class="code_box" v-if="param1.type === 1">
          <a-textarea
            v-model="param1.code"
            placeholder="Controlled autosize"
            class="code_text"
            auto-size
          />
        </div>
        <div class="form_box" v-else>
          <div class="form_item"> <span class="form_item_label">用户ID: </span><a-input class="form_item_input" v-model="param2.id"></a-input></div>
          <div class="form_item"><span class="form_item_label">推荐物品数量: </span> <a-input-number  class="form_item_input" :min="1" v-model="param2.recNum"></a-input-number></div>
        </div>
      </div>
      <div class="result_middle_left">
        <div class="result_middle_title">预测结果</div>
        <div class="result_middle_code"><pre>{{result}}</pre></div>
      </div>
    </div>
    <div class="result_bottom">
      <span class="result_bottom_label">API接口地址</span>
      <div class="result_bottom_url">{{url}}</div>
      <a-button type="primary" v-clipboard:copy="url">复制</a-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Clipboard from 'v-clipboard'
import {getSceneAll, getAllByApplication, getRecommendResult} from "@/api/recommendation";

Vue.use(Clipboard)
export default {
  data(){
    return{
      tools: [],
      scenes: [],
      types: [
        { title: '代码预测', value: 1 },
        { title: '表单预测', value: 2 },
      ],
      param1: {
        applicationId: null,
        sceneId: null,
        type: 1,
        code: JSON.stringify({"recNum": "", "id": ""}, null, 2)
      },
      param2: {
        "recNum": "",
        "id": ""
      },
      result: null,
      url: 'https://www.yzsophia.com/recommend/recommend/result'
    }
  },
  mounted(){
    this.getSceneAll()
  },
  computed:{
    leftTitle(){
      return this.types.find(e=>e.value === this.param1.type).title
    },
    disabledSubmit(){
      return !(this.param1.applicationId && this.param1.sceneId)
    },
  },
  methods: {
    onSubmit() {
      const { applicationId, sceneId, type } = this.param1;

      const json = type === 1 ? this.getParams() : this.param2;
      if(!json){
        return
      }
      const { recNum, id } = json
      if(!recNum || !id){
        this.$message.error('请输入查询参数');
        return;
      }
      getRecommendResult({ ...json, applicationId, sceneId }).then((res)=>{
        if(res.code === 200000){
          let result = JSON.stringify(res.data, null, 2);
          this.result = result
        }else {
          let result = JSON.stringify(res.data, null, 2);
          this.result = result
          this.$message.error('查询错误')
        }
      })
    },
    getParams(){
      try {
        return JSON.parse(this.param1.code)
      }catch (e) {
        this.$message.error('输入的代码不正确')
      }
    },
    getSceneAll(){
      getSceneAll().then((res)=>{
        if(res.code === 200000){
          this.tools = res.data
        }
      })
    },
    onSelect(applicationId){
      this.param1.sceneId = null;
      this.getSceneByApp(applicationId)
    },
    getSceneByApp(applicationId){
      getAllByApplication({ applicationId }).then((res)=>{
        if(res.code === 200000){
          this.scenes = res.data
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.result_box {
  background-color: rgb(240, 242, 245);
  height: 100%;
  .result_top{
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: #ffffff;
    .result_top_item{
      position: relative;
      margin-right: 30px;
    }
  }
  .result_middle{
    display: flex;
    align-items: center;
    margin-top: 20px;
    .result_middle_left{
      margin-right: 20px;
      .code_box{
        height: calc(100% - 53px);
        .code_text{
          height: 100% !important;
          padding-left: 20px;
          padding-right: 20px;
        }
      }
      .form_box{
        .form_item{
          width: 300px;
          display: flex;
          align-items: center;
          margin: 10px 20px;
          .form_item_label{
            width: 100px !important;
            text-align: right;
          }
          .form_item_input{
            width: 100px !important;
            flex: 1 1;
            margin-left: 10px;
          }
        }
      }
    }
    .result_middle_left, .result_middle_right{
      width: 50%;
      height: 500px;
      background-color: #ffffff;
      .result_middle_title{
        padding: 10px 20px;
        height: 52px;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgb(240, 242, 245);
      }
      .result_middle_code{
        padding: 4px 20px;
        border: 1px solid #d9d9d9;
        height: 448px;
        pre{
          height: 100%;
          overflow-y: auto;
        }
      }
    }
  }
  .result_bottom{
    margin-top: 10px;
    display: flex;
    align-items: center;
    background-color: rgba(129, 211, 248, 0.5);
    padding: 10px 20px;
    height: 52px;
    .result_bottom_label{
      font-size: 16px;
      font-weight: 700;
    }
    .result_bottom_url{
      width: 500px;
      height: 100%;
      border: 1px solid rgb(240, 242, 245);
      margin: 0 10px;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      padding-left: 10px;
    }
  }
}
</style>
