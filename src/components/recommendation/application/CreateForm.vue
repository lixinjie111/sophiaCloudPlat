<template>
  <div class="create_form_box">
    <a-form-model ref="createForm" :model="createForm" :rules="createFormRules">
      <a-form-model-item label="应用名称" prop="name">
        <a-input placeholder="请输入应用名称" v-model="createForm.name" :maxLength="14"/>
      </a-form-model-item>
      <a-form-model-item label="所属行业" prop="trade">
        <a-select placeholder="请选择行业" v-model="createForm.trade" @change="tradeChange">
          <a-select-option value="1">教育培训</a-select-option>
          <a-select-option value="2">文化娱乐</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="应用描述" prop="description">
        <a-textarea v-model="createForm.description" :autoSize='{ minRows: 4, maxRows: 6}' placeholder="请输入应用描述"
                    :maxLength="100"/>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
  export default {
    name: "CreateForm",
    data() {
      return {
        createForm: {
          name: '',
          trade: '',
          description: ''
        },
        createFormRules: {
          name: [
            {required: true, message: '请输入应用名称', trigger: 'blur'}
          ],
          trade: [
            {required: true, message: '请选择行业', trigger: 'change'}
          ],
          description: [
            {required: true, message: '请输入应用描述', trigger: 'blur'}
          ],
        }
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
