<template>
  <a-modal v-model="visible" title="配置应用" @cancel="onCancel" :maskClosable="false" @ok="handleOk" width="976px" wrapClassName="wrapClassName">
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
            <span class="cursor content-item">
              <span class="check-box" @click="onSelect(item)">
                <a-icon type="check-square" class="icon" v-if="selectedKeys.includes(item.id)"/>
                <i aria-label="icon: check-square" class="icon anticon anticon-check-square" v-else>
                  <svg viewBox="64 64 896 896" data-icon="check-square" width="1em" height="1em" fill="currentColor"
                       aria-hidden="true" focusable="false" class="">
                    <path
                      d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path>
                  </svg>
                </i>
              </span>
              <span class="subject-text" @click="onLookOver(item)">{{item.serviceName}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="packageObj[currentSelected.serviceModel]">
      <div class="label must">文字识别包名</div>
      <div class="module-content">
        <a-radio-group name="radioGroup" :value="packageObj[currentSelected.serviceModel].need" @change="radioChange">
          <a-radio :value="1">需要</a-radio>
          <a-radio :value="0">不需要</a-radio>
        </a-radio-group>
        <template v-if="packageObj[currentSelected.serviceModel].need">
          <div class="package">
            <div class="package-name">
              <span>IOS: </span>
              <a-input class="input" v-model="packageObj[currentSelected.serviceModel].packageAndroid"></a-input>
            </div>
            <div class="package-name">
              <span>Android: </span>
              <a-input class="input" v-model="packageObj[currentSelected.serviceModel].packageIos"></a-input>
            </div>
          </div>
        </template>
      </div>
    </div>
    <template slot="footer">
      <a-button type="primary" @click="handleSubmit">
        完成
      </a-button>
    </template>
  </a-modal>
</template>

<script>
  import { getLoadConf, updateApplication, saveConf } from '@/api/application';
  export default {
    props: ['title', 'visible', 'interfaceList', 'record'],
    data() {
      return {
        openKeys: [],
        selectedKeys: [],
        selectedItems: [],
        data: this.record,
        packageObj: {},
        currentSelected: {},
      }
    },
    mounted(){
      this.getLoadConf()
    },
    methods: {
      openClick(key){
        if(this.openKeys.includes(key)){
          this.openKeys = this.openKeys.filter(e=>e !== key)
        }else {
          this.openKeys.push(key)
        }
      },
      onSelect(node){
        if(this.selectedKeys.includes(node.id)){
          this.selectedKeys = this.selectedKeys.filter(e=>e !== node.id);
          this.selectedItems = this.selectedItems.filter(e=>e.id !== node.id);
          this.currentSelected = {}
          // 是否还要显示识别包的小分类
          const has = this.selectedItems.find(e=>e.serviceModel === node.serviceModel)
          // 是否显示识别包
          if([2, 3].includes(node.serviceModel) && !has){
            delete this.packageObj[node.serviceModel]
          }
        }else {
          // 是否显示识别包
          if([2, 3].includes(node.serviceModel) && !this.packageObj[node.serviceModel]){
            this.packageObj[node.serviceModel] = {packageAndroid: '', packageIos: '', need: 0 };
          }
          this.selectedKeys.push(node.id);
          this.selectedItems.push(node)
          this.currentSelected = node
        }
      },
      onLookOver(node){
        this.currentSelected = node
      },
      onCancel(){
        this.$emit('cancel')
      },
      // 接口配置项
      getLoadConf(){
        getLoadConf({ id: this.data.id }).then((res)=>{
          this.selectedItems = res.data.appServiceList;
          this.selectedKeys = res.data.appServiceList.map(e=>e.id);
        })
      },
      // 提交接口配置项
      handleSubmit(){
        const { id, appId } = this.data;
        const packageList = this.selectedItems.map(({ id: serviceId, serviceModel })=>{
          if(this.packageObj[serviceModel] && this.packageObj[serviceModel].need){
            return { id, appId, serviceId, ...this.packageObj[serviceModel] }
          }
          return { id, appId, serviceId }
        });
        const moduleIds = this.selectedKeys;
        saveConf({ ...this.data, packageList, moduleIds }).then((res)=>{
          this.$message.success('配置成功');
          this.onCancel();
        })
      },
      // 提交接口配置项
      radioChange(e){
        this.packageObj[this.currentSelected.serviceModel].need = e.target.value;
        this.packageObj = JSON.parse(JSON.stringify(this.packageObj))
      },
    }
  }
</script>

<style scoped lang="scss">
  .wrapClassName {
    padding: 60px;
  }

  .row.mg0 {
    margin: 0;
  }

  .row {
    margin: 24px 0;
  }

  .must {
    &:before {
      content: '*';
      color: red;
    }
  }

  .icon {
    color: #1890FF;
  }

  .tips {
    font-size: 10px;
    color: #C1BEBE;
  }
  .interface-row{
    /*display: flex;*/
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
      span{
        display: inline-block;
        width: 60px;
      }
      .input{
        width: 300px;
      }
    }
  }
  .module-content{
    padding-left: 16px;
  }

</style>
