<template>
  <a-modal v-model="visible" title="创建应用" @cancel="onCancel" :maskClosable="false" @ok="handleOk" width="488px" wrapClassName="wrapClassName">
    <div class="row mg0">
      <div class="label must">接口选择 <span class="tips">（勾选以下接口，使此应用可以请求已勾选的接口服务）</span></div>
      <div v-for="(it, key) in config" :key="i" class="interface-row module-content">
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
            <span class="cursor content-item" @click="onSelect(item)">
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
        <a-radio-group name="radioGroup" :default-value="1">
          <a-radio :value="1">需要</a-radio>
          <a-radio :value="0">不需要</a-radio>
        </a-radio-group>
        <div class="package">
          <div class="package-name">
            <span>IOS:</span>
          </div>
          <div class="package-name">
            <span>Android:</span>
          </div>
        </div>

      </div>
    </div>
    <template slot="footer">
      <a-button type="primary" @click="handleCancel">
        创建
      </a-button>
      <a-button @click="handleOk">
        下一步
      </a-button>
    </template>
  </a-modal>
</template>

<script>
  import config from './config'
  export default {
    props: ['title', 'visible'],
    data() {
      return {
        interfaceList: [
          {
            name: '语音技术',
            value: '语音技术',
            children: [
              {name: '短语音识别', value: '短语音识别'},
              {name: '短语音识别极速版', value: '短语音识别极速版'},
              {name: '远场语音识别', value: '远场语音识别'},
              {name: '呼叫中心语音解决方案', value: '呼叫中心语音解决方案'},
              {name: '语音自训练平台', value: '语音自训练平台'},
            ]
          }
        ],
        openKeys: [],
        selectedKeys: [],
        config
      }
    },
    methods: {
      openClick(key){
        console.log(key)
        if(this.openKeys.includes(key)){
          this.openKeys = this.openKeys.filter(e=>e !== key)
        }else {
          this.openKeys.push(key)
        }
      },
      onSelect(node){
        if(this.selectedKeys.includes(node.id)){
          this.selectedKeys = this.selectedKeys.filter(e=>e !== node.id)
        }else {
          this.selectedKeys.push(node.id)
        }
      },
      onCancel(){
        this.$emit('cancel')
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
