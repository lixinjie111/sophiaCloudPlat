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
        <a-card title="业务场景" size="small">
          <div style="width: 500px">
            <SceneForm ref="sceneForm" :sceneForm="sceneForm"></SceneForm>
          </div>
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
  import CreateForm from "@/components/recommendation/application/CreateForm";
  import SceneForm from "@/components/recommendation/scene/SceneForm";
  import SetData from "@/components/recommendation/scene/SetData";
  import SetRules from "@/components/recommendation/scene/SetRules";
  import {getSceneDetail, addScene} from "@/api/recommendation/index";

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
        noTitleKey: '1',
        sceneForm: {}
      }
    },
    created() {
      this.getSceneDetail();
    },
    methods: {
      getSceneDetail() {
        let params = {
          id: this.$route.query.id
        };
        getSceneDetail(params).then(res => {
          if (res.code == 200000) {
            this.sceneForm = {
              id: res.data.id,
              title: res.data.title,
              applicationId: res.data.applicationId,
              sceneType: res.data.sceneType + '',
              recommendObjectType: res.data.recommendObjectType + '',
              recommendType: res.data.recommendType + '',
              startType: res.data.startType + '',
              place: res.data.place,
              description: res.data.description
            };
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
      },
      finish() {
        this.$refs.sceneForm.$refs.sceneForm.validate(valid => {
          if (valid) {
            let params = this.$refs.sceneForm.$refs.sceneForm.model;
            addScene(params).then(res => {
              if (res.code == 200000) {
                this.$message.success("编辑成功！");
                // this.$router.push({
                //   path: '/recommendation/scene/data?appId='+ this.$refs.sceneForm.$refs.sceneForm.model.applicationId + '&sceneId=' + res.data
                // });
              } else {
                this.$message.error(res.message || "请求失败！");
              }
            }).catch(err => {
              this.$message.error("请求失败！");
              console.log(err, "err");
            });
          } else {
            console.log('提交失败!');
            return false;
          }
        });
      },
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
