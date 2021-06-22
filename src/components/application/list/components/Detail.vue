<template>
  <a-modal v-model="visible" title="应用信息" :footer="null" @cancel="onCancel" @ok="handleOk" width="976px" wrapClassName="wrapClassName">
    <div class="row mg0">
      <div class="label must">应用名称</div>
      <div><a-input placeholder="请输入应用名称" :disabled="disabled" v-model="record.appName"/></div>
    </div>
    <div class="row">
      <div class="label must">所属行业</div>
      <div>
        <a-select style="width: 100%" :disabled="disabled" placeholder="请选择所属行业" v-model="data.industry">
          <a-select-option  :value="it.industry" v-for="it in industryList" :key="it.industry">{{it.industry}}</a-select-option>
        </a-select>
      </div>
    </div>
    <div class="row">
      <div class="label must">应用描述</div>
      <div> <a-textarea :disabled="disabled" placeholder="请输入应用描述" style="height: 96px" v-model="record.description">
      </a-textarea></div>
    </div>
    <div class="row mg0">
      <div class="label must">接口选择 <span class="tips">（勾选以下接口，使此应用可以请求已勾选的接口服务）</span></div>
      <div v-for="(it, key) in interfaceList" :key="i" class="interface-row module-content">
        <div class="subject">
          <span class="subject-name cursor" @click="openClick(key)">
            <span>
              <a-icon type="minus-square" class="icon" v-if="openKeys.includes(key)"/>
              <a-icon type="plus-square" v-else class="icon"/>
            </span>
            <span>
              {{key}}
            </span>

          </span>
        </div>
        <div :class="['subject-content', {show: openKeys.includes(key)}]">
          <div v-for="(item, k) in it" class="subject-content-item" :key="k">
            <span class="cursor content-item" >
              <span class="check-box">
                <a-icon type="check-square" class="icon" v-if="selectedKeys.includes(item.id)"/>
                <i aria-label="icon: check-square" class="icon anticon anticon-check-square" v-else>
                  <svg viewBox="64 64 896 896" data-icon="check-square" width="1em" height="1em" fill="currentColor"
                       aria-hidden="true" focusable="false" class="">
                    <path
                      d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path>
                  </svg>
                </i>
              </span>

              <span class="subject-text">{{item.serviceName}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="label must">文字识别包名</div>
      <div class="module-content">
        <a-radio-group name="radioGroup" :disabled="disabled" :default-value="1">
          <a-radio :value="1">需要</a-radio>
          <a-radio :value="0">不需要</a-radio>
        </a-radio-group>
        <div class="package">
          <div class="package-name">
            <span>IOS:{{IOS}}</span>
          </div>
          <div class="package-name">
            <span>Android:{{Android}}</span>
          </div>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
  import { getApplicationList, getIndustryOptions, getServiceList, getLoadConf, getAppDetail } from '@/api/application';

  export default {
    props: ['title', 'visible', 'type', 'record', 'interfaceList', 'industryList'],
    data(){
      return{
        industry: [],
        name: '',
        desc: '',
        openKeys: [],
        selectedKeys: [],
        data: this.record
      }
    },
    mounted(){
      this.getLoadConf()
    },
    methods: {
      // 接口配置项
      getLoadConf(){
        getLoadConf({ id: this.data.id }).then((res)=>{
          this.selectedKeys = res.data.appServiceList.map(e=>e.id);
        })
      },
      onCancel(){
        this.$emit('cancel')
      },
      verification(){
        if(!this.industry){
          this.$message.warning('请选择行业')
          return
        }else if(!this.name){
          this.$message.warning('请输入应用名称')
          return
        }else if(!this.desc) {
          this.$message.warning('请输入应用描述')
          return
        }
        return true
      },
      openClick(key){
        if(this.openKeys.includes(key)){
          this.openKeys = this.openKeys.filter(e=>e !== key)
        }else {
          this.openKeys.push(key)
        }
      },
    },
    computed: {
      disabled(){
        return true
      },
      IOS(){
        return this.data.packageIos || '-'
      },
      Android(){
        return this.data.packageAndroid || '-'
      }
    }
  }
</script>

<style scoped lang="scss">
  .wrapClassName{
    padding: 60px;
  }
  .row.mg0{
    margin: 0;
  }
  .row{
    margin: 24px 0;
  }
  .must{
    &:before{
      content: '*';
      color: red;
    }
  }
  .subject {
    width: 200px;
    line-height: 26px;
  }
  .cursor{
    cursor: pointer;
  }
  .subject-content{
    display: none;
    padding-left: 80px;
    transition: height 0.5s;
    overflow: hidden;
    flex-wrap: wrap;
    .subject-content-item{
      flex: 0 0 33.33%;
      .content-item{
        position: relative;
        padding-left: 20px;
        display: flex;
        .check-box{
          position: absolute;
          left: 0;
          /*top: 2px;*/
          display: flex;
        }
      }
    }
    .subject-text{
      font-size: 12px;
    }
  }
  .subject-content.show{
    display: flex;
    /*height: calc(100% - 21px);*/
  }
  .package{
    margin-top: 20px;
    .package-name{
      line-height: 32px;
    }
  }
  .module-content{
    padding-left: 16px;
  }
</style>
