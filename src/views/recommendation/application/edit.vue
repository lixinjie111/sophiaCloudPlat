<template>
  <div class="app_edit_container">
    <a-card
      style="width:100%"
      :bordered="false"
      :tab-list="tabListNoTitle"
      :active-tab-key="noTitleKey"
      @tabChange="key => onTabChange(key, 'noTitleKey')"
    >
      <div v-if="noTitleKey === '1'">
        <a-card title="应用信息" size="small">
          <CreateForm></CreateForm>
        </a-card>
        <a-card title="业务场景" size="small" class="c-mt-20">
          <SceneForm></SceneForm>
        </a-card>
        <div class="basic-btn">
          <a-button type="primary" class="c-mr-20" @click="finish">完成</a-button>
          <a-button @click="cancel">取消</a-button>
        </div>
      </div>
      <div v-else-if="noTitleKey === '2'">
        <SetData type="edit"></SetData>
      </div>
      <div v-else="noTitleKey === '3'">
        <SetRules type="edit"></SetRules>
      </div>
    </a-card>
  </div>
</template>

<script>
  import CreateForm from "@/components/recommendation/CreateForm";
  import SceneForm from "@/components/recommendation/SceneForm";
  import SetData from "@/components/recommendation/SetData";
  import SetRules from "@/components/recommendation/SetRules";

  export default {
    name: "edit",
    components: {SetData, SetRules, SceneForm, CreateForm},
    data() {
      return {
        tabListNoTitle: [
          {
            key: '1',
            tab: '基本信息',
          },
          {
            key: '2',
            tab: '推荐数据',
          },
          {
            key: '3',
            tab: '推荐规则',
          },
        ],
        noTitleKey: '1'
      }
    },
    methods: {
      onTabChange(key, type) {
        console.log(key, type);
        this[type] = key;
      }
    }
  }
</script>

<style scoped lang="scss">
  .app_edit_container {
    padding: 20px;

    .basic-btn {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
