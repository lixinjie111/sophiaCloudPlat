<template>
  <div class="scene_list_container">
    <div class="top">
      <div class="left">
        <a-button type="primary" @click="add">
          新增
        </a-button>
      </div>
      <div class="right">
        <div>
          应用名称：
          <a-select placeholder="请选择应用名称" v-model="applicationId" @change="appNameChange" style="width: 120px;">
            <a-select-option value="">全部</a-select-option>
            <a-select-option :value="app.id" v-for="(app,index) in appList" :key="index">{{app.appName}}
            </a-select-option>
          </a-select>
        </div>
        <div>
          推荐类型：
          <a-select placeholder="请选择推荐类型" v-model="recommendType" @change="recommendTypeChange" style="width: 120px;">
            <a-select-option value="">全部</a-select-option>
            <a-select-option :value="item.value" v-for="(item,index) in typeList" :key="index">{{item.label}}
            </a-select-option>
          </a-select>
        </div>
        <div>
          场景类型：
          <a-select placeholder="请选择场景类型" v-model="sceneType" @change="sceneTypeChange" style="width: 120px;">
            <a-select-option value="">全部</a-select-option>
            <a-select-option :value="item.value" v-for="(item,index) in sceneList" :key="index">{{item.label}}
            </a-select-option>
          </a-select>
        </div>
        <div>
          <a-input-search v-model="keyword" placeholder="业务场景名称" style="width: 200px" @search="onSearch"/>
        </div>
      </div>
    </div>
    <a-table
      :columns="columns"
      :data-source="list"
      :pagination="pagination">
      <template slot="operation" slot-scope="text, record, index">
        <a-button type="link" @click="toDetail">详情</a-button>
        <a-button type="link" @click="toEdit">编辑</a-button>
        <a-button type="link">测试</a-button>
        <a-button type="link">删除</a-button>
      </template>
    </a-table>
    <a-modal v-model="sceneModalShow" title="创建业务场景" :width="640">
      <template slot="footer">
        <a-button type="primary" :loading="setLoading" @click="setting">
          配置数据
        </a-button>
        <a-button @click="cancelSetting">
          取消
        </a-button>
      </template>
      <SceneForm ref="sceneForm" :app-list="appList"></SceneForm>
    </a-modal>
  </div>
</template>

<script>
  import SceneForm from "@/components/recommendation/scene/SceneForm";
  import {getSceneList, getSceneAll, addScene} from "@/api/recommendation/index";

  export default {
    name: "list",
    components: {SceneForm},
    data() {
      return {
        list: [],
        pagination: {
          total: 0,
          current: 1,
          pageSize: 10,
          onChange: (pageNumber) => {
            this.getList(pageNumber);
          }
        },
        columns: [
          {
            title: '序号',
            customRender: (text, record, index) => `${index + 1}`
          },
          {
            title: '场景名称',
            dataIndex: 'title'
          },
          {
            title: '所属应用',
            dataIndex: 'applicationName'
          },
          {
            title: '推荐类型',
            dataIndex: 'recommendTypeDesc'
          },
          {
            title: '场景类型',
            dataIndex: 'sceneTypeDesc'
          },
          {
            title: '推荐种类',
            dataIndex: 'recommendObjectTypeDesc'
          },
          {
            title: '调用次数',
            dataIndex: 'recallTimes'
          },
          {
            title: '创建时间',
            dataIndex: 'createTime'
          },
          {
            title: '创建人',
            dataIndex: 'creator'
          },
          {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: {customRender: 'operation'},
            width: 300
          },
        ],
        appList: [],
        applicationId: '',
        sceneList: [
          {
            label: '智能场景',
            value: '0',
            disabled: false
          }, {
            label: '自定义场景',
            value: '1',
            disabled: false
          }, {
            label: '模板场景',
            value: '2',
            disabled: true
          }
        ],
        typeList: [
          {
            label: '个性化推荐',
            value: '0',
            disabled: false
          }, {
            label: '相关推荐',
            value: '1',
            disabled: false
          }, {
            label: '热点推荐',
            value: '2',
            disabled: false
          }, {
            label: '主题推荐',
            value: '3',
            disabled: true
          }
        ],
        recommendType: '',
        sceneType: '',
        keyword: '',
        sceneModalShow: false,
        setLoading: false
      }
    },
    created() {
      this.getSceneAll();
      this.getList();
    },
    methods: {
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
      getList(current) {
        let params = {
          applicationId: this.applicationId,
          keyword: this.keyword,
          page: current || 1,
          pageSize: this.pagination.pageSize,
          recommendType: this.recommendType,
          sceneType: this.sceneType
        };
        getSceneList(params).then(res => {
          if (res.code == 200000) {
            this.list = res.data.list;
            this.pagination.current = current || 1;
            this.pagination.total = res.data.total;
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
      },
      toDetail() {
        this.$router.push({
          path: '/recommendation/scene/detail'
        });
      },
      toEdit() {
        this.$router.push({
          path: '/recommendation/scene/edit'
        });
      },
      add() {
        this.sceneModalShow = true;
      },
      onSearch() {
        this.getList();
      },
      appNameChange() {
        this.getList();
      },
      recommendTypeChange() {
        this.getList();
      },
      sceneTypeChange() {
        this.getList();
      },
      setting() {
        this.$refs.sceneForm.$refs.sceneForm.validate(valid => {
          if (valid) {
            let params = this.$refs.sceneForm.$refs.sceneForm.model;
            addScene(params).then(res => {
              if (res.code == 200000) {
                this.$message.success("添加成功！");
                this.$router.push({
                  path: '/recommendation/scene/data'
                });
              } else {
                this.$message.error(res.message || "请求失败！");
              }
            }).catch(err => {
              this.$message.error("请求失败！");
              console.log(err, "err");
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      cancelSetting() {
        this.sceneModalShow = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  .scene_list_container {
    padding: 20px;

    .top {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .right {
        display: flex;
        justify-content: space-between;
        align-items: center;

        > div {
          margin-left: 10px;
        }
      }
    }
  }
</style>
