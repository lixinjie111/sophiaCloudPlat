<template>
  <div class="data_new_file">
    <a-form-model ref="dataForm" :model="dataForm" v-bind="formItemLayout">
      <a-form-model-item label="文件夹名称" prop="name">
        <a-input placeholder="请输入文件夹名称" v-model="dataForm.name" :maxLength="14"/>
      </a-form-model-item>
      <a-form-model-item label="数据分类" prop="type">
        <a-select placeholder="请选择所属应用" v-model="dataForm.type" @change="applyChange">
          <a-select-option value="0">上传文件</a-select-option>
          <a-select-option value="1">同步文件</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="文件夹上级" prop="mould">
        <a-select placeholder="请选择场景模板" v-model="dataForm.mould" @change="mouldChange">
          <a-select-option value="0">推荐数据</a-select-option>
          <a-select-option value="1">营销数据</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="文件夹描述" prop="description">
        <a-textarea v-model="dataForm.description" :autoSize='{ minRows: 4, maxRows: 6}' placeholder="请输入应用描述"
                    :maxLength="100"/>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
  export default {
    name: "NewFile",
    data() {
      return {
        formItemLayout: {
          labelCol: { span: 4 },
          wrapperCol: { span: 20 },
        },
        dataForm: {
          name: '',
          type: '0',
          mould: '0',
          description: ''
        },
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
