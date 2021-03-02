<template>
  <div class="scene_form_box">
    <a-form-model ref="sceneForm" :model="sceneForm">
      <a-form-model-item label="应用类型">
        <a-radio-group v-model="sceneForm.apply">
          <a-radio :value="item.value" v-for="(item,index) in applyList" :key="index">
            {{item.label}}
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="场景类型">
        <a-radio-group v-model="sceneForm.scene">
          <a-radio :value="item.value" v-for="(item,index) in sceneList" :key="index">
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
    </a-form-model>
  </div>
</template>

<script>
  export default {
    name: "SceneForm",
    data() {
      return {
        sceneForm: {
          apply: '',
          scene: '',
          start: '',
          location: ''
        },
        applyList: [{
          label: '推荐商品',
          value: '1'
        }, {
          label: '推荐用户',
          value: '2'
        }, {
          label: '推荐用户',
          value: '3'
        }],
        sceneList: [{
          label: '个性化推荐',
          value: '1'
        }, {
          label: '相关推荐',
          value: '2'
        }, {
          label: '热点推荐',
          value: '3'
        }, {
          label: '主题推荐',
          value: '4'
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
    }
  }
</script>

<style scoped lang="scss">

</style>
