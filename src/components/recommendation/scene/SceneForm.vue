<template>
  <div class="scene_form_box">
    <a-form-model ref="sceneForm" :model="sceneForm" v-bind="formItemLayout">
      <a-form-model-item label="应用名称" prop="name">
        <a-input placeholder="请输入应用名称" v-model="sceneForm.name" :maxLength="14"/>
      </a-form-model-item>
      <a-form-model-item label="所属应用" prop="apply">
        <a-select placeholder="请选择所属应用" v-model="sceneForm.apply" @change="applyChange">
          <a-select-option value="1">个性推荐01</a-select-option>
          <a-select-option value="2">个性推荐02</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="场景类型">
        <a-radio-group v-model="sceneForm.scene">
          <a-radio :value="item.value" v-for="(item,index) in sceneList" :key="index" :disabled="item.disabled">
            {{item.label}}
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="推荐种类">
        <a-radio-group v-model="sceneForm.kind">
          <a-radio :value="item.value" v-for="(item,index) in kindList" :key="index">
            {{item.label}}
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="推荐类型">
        <a-radio-group v-model="sceneForm.type">
          <a-radio :value="item.value" v-for="(item,index) in typeList" :key="index" :disabled="item.disabled">
            {{item.label}}
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="启动方式">
        <a-radio-group v-model="sceneForm.start">
          <a-radio :value="item.value" v-for="(item,index) in startList" :key="index">
            {{item.label}}
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="推荐位置">
        <a-input placeholder="请输入推荐位置" v-model="sceneForm.location" :maxLength="14"/>
      </a-form-model-item>
      <a-form-model-item label="场景模板" prop="mould">
        <a-select placeholder="请选择场景模板" v-model="sceneForm.mould" @change="mouldChange">
          <a-select-option value="1">个性推荐模板01</a-select-option>
          <a-select-option value="2">个性推荐模板02</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="场景描述" prop="description">
        <a-textarea v-model="sceneForm.description" :autoSize='{ minRows: 4, maxRows: 6}' placeholder="请输入应用描述"
                    :maxLength="100"/>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
  export default {
    name: "SceneForm",
    data() {
      return {
        formItemLayout: {
          labelCol: { span: 4 },
          wrapperCol: { span: 20 },
        },
        sceneForm: {
          name: '',
          apply: '',
          scene: '',
          kind: '',
          type: '',
          start: '',
          location: '',
          mould: '',
          description: ''
        },
        sceneList: [{
          label: '智能场景',
          value: '1',
          disabled: false
        }, {
          label: '自定义场景',
          value: '2',
          disabled: false
        }, {
          label: '模板场景',
          value: '3',
          disabled: true
        }],
        kindList: [{
          label: '推荐商品',
          value: '1'
        }, {
          label: '推荐用户',
          value: '2'
        }, {
          label: '推荐资讯',
          value: '3'
        }, {
          label: '推荐活动',
          value: '4'
        }],
        typeList: [{
          label: '个性化推荐',
          value: '1',
          disabled: false
        }, {
          label: '相关推荐',
          value: '2',
          disabled: false
        }, {
          label: '热点推荐',
          value: '3',
          disabled: false
        }, {
          label: '主题推荐',
          value: '4',
          disabled: true
        }],
        startList: [{
          label: '历史数据',
          value: '1'
        }, {
          label: '增量数据',
          value: '2'
        }, {
          label: '历史+增量数据',
          value: '3'
        }]
      }
    },
    methods: {
      applyChange() {

      },
      mouldChange() {

      },
    }
  }
</script>

<style scoped lang="scss">

</style>
