<template>
  <div class="app_edit_container">
    <div class="app_edit_top c-mb-10">
      <a-button type="primary" @click="toTest">
        测试
      </a-button>
      <a-button type="primary" @click="toDetail">
        详情
      </a-button>
    </div>
    <a-card
      style="width:100%"
      :bordered="false"
      :tab-list="tabListNoTitle"
      :active-tab-key="noTitleKey"
      @tabChange="key => onTabChange(key, 'noTitleKey')">
      <div v-if="noTitleKey === '1'">
        <a-card title="业务场景" size="small">
          <div style="width: 500px">
            <SceneForm ref="sceneForm" :sceneForm="sceneForm" :app-list="appList" type="edit"></SceneForm>
          </div>
        </a-card>
        <div class="basic-btn">
          <a-button type="primary" class="c-mr-20" @click="finish">完成</a-button>
          <a-button @click="cancel">取消</a-button>
        </div>
      </div>
      <div v-else-if="noTitleKey === '2'">
        <SetData type="edit" :dataInfo="dataInfo"></SetData>
      </div>
      <div v-else="noTitleKey === '3'">
        <SetRules type="edit" :ruleInfo="ruleInfo"></SetRules>
      </div>
    </a-card>
  </div>
</template>

<script>
  import CreateForm from "@/components/recommendation/application/CreateForm";
  import SceneForm from "@/components/recommendation/scene/SceneForm";
  import SetData from "@/components/recommendation/scene/SetData";
  import SetRules from "@/components/recommendation/scene/SetRules";
  import {getSceneDetail, addScene, getSceneAll} from "@/api/recommendation/index";

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
        sceneForm: {},
        appList:[],
        dataInfo: {},
        ruleInfo: {}
      }
    },
    created() {
      this.getSceneDetail();
      this.getSceneAll();
    },
    methods: {
      toDetail() {
        this.$router.push({
          path: '/recommendation/scene/detail?appId=' + this.$route.query.appId + '&sceneId=' + this.$route.query.sceneId
        });
      },
      toTest() {
        this.$router.push({
          path: '/recommendation/operation/result'
        });
      },
      getSceneAll() {
        getSceneAll({}).then(res => {
          if (res.code == 200000) {
            this.appList = res.data;
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
      },
      getSceneDetail() {
        let params = {
          id: this.$route.query.sceneId,
          hasDataFlag: 1
        };
        getSceneDetail(params).then(res => {
          if (res.code == 200000) {
            this.sceneForm = {
              id: res.data.id,
              title: res.data.title,
              applicationId: Number(res.data.applicationId),
              sceneType: res.data.sceneType + '',
              recommendObjectType: res.data.recommendObjectType + '',
              recommendType: res.data.recommendType + '',
              startType: res.data.startType + '',
              place: res.data.place,
              description: res.data.description
            };
            this.dataInfo = res.data.dataInfo;
            this.ruleInfo = res.data.ruleInfo;
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

    .app_edit_top {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      >button {
        &:last-child {
          margin-left: 10px;
        }
      }
    }
  }
</style>
