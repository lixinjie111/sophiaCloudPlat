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
          <a-select placeholder="请选择应用名称" v-model="applicationId" @change="appNameChange" style="width: 120px;"
                    :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
            <a-select-option value="">全部</a-select-option>
            <a-select-option :value="app.id" v-for="(app,index) in appList" :key="index">{{app.appName}}
            </a-select-option>
          </a-select>
        </div>
        <div>
          推荐类型：
          <a-select placeholder="请选择推荐类型" v-model="recommendType" @change="recommendTypeChange" style="width: 120px;"
                    :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
            <a-select-option value="">全部</a-select-option>
            <a-select-option :value="item.value" v-for="(item,index) in typeList" :key="index">{{item.label}}
            </a-select-option>
          </a-select>
        </div>
        <div>
          场景类型：
          <a-select placeholder="请选择场景类型" v-model="sceneType" @change="sceneTypeChange" style="width: 120px;"
                    :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
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
      :rowKey="record=>record.id"
      :scroll="{ x: 1500}"
      :pagination="pagination">
      <template slot="operation" slot-scope="text, record, index">
        <div class="operate">
<!--        <a-button class="p0" type="link" @click="toPublish">发布</a-button>-->
        <a-button class="p0" type="link" @click="toDetail(record.applicationId,record.id)">详情</a-button>
        <a-button class="p0" type="link" @click="toEdit(record.applicationId,record.id)">编辑</a-button>
        <a-button class="p0" type="link" @click="toTest">测试</a-button>
        <a-popconfirm
          title="是否删除该应用?"
          ok-text="是"
          cancel-text="否"
          @confirm="del(record.id)">
          <a-button class="p0" type="link" style="color:red;">删除</a-button>
        </a-popconfirm>
        </div>

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
  import {getSceneList, getSceneAll, addScene, deleteScene} from "@/api/recommendation/index";

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
            customRender: (text, record, index) => `${index + 1}`,
            width: 60,
            fixed: 'left'
          },
          {
            title: '场景名称',
            dataIndex: 'title'
          },
          {
            title: '场景ID',
            dataIndex: 'id'
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
          // {
          //   title: '发布状态',
          //   dataIndex: ''
          // },
          {
            title: '调用次数',
            dataIndex: 'recallTimes'
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 200
          },
          {
            title: '创建人',
            dataIndex: 'creator'
          },
          {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: {customRender: 'operation'},
            width: 260,
            fixed: 'right'
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
        sceneModalShow: this.$route.query.show == 1 ? true : false,
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
      toPublish() {

      },
      toDetail(applicationId,id) {
        const {href} = this.$router.resolve({
          name: "recommendationSceneDetail",
          query: {applicationId: applicationId,sceneId: id}
        });
        window.open(href, '_blank');
        // this.$router.push({
        //   path: '/recommendation/scene/detail?appId=' + applicationId + '&sceneId=' + id
        // });
      },
      toEdit(applicationId,id) {
        const {href} = this.$router.resolve({
          name: "recommendationSceneEdit",
          query: {applicationId: applicationId,sceneId: id}
        });
        window.open(href, '_blank');
        // this.$router.push({
        //   path: '/recommendation/scene/edit?appId=' + applicationId + '&sceneId=' + id
        // });
      },
      toTest() {
        this.$router.push({
          path: '/recommendation/operation/result',
          query:{
            activekey:['tuijianceshijijieguo'],
            openkey:['dataSer1',"tuijianyunying"]
          }
        });
        // const {href} = this.$router.resolve({
        //   name: "recommendationOperationResult",
        //   query: {activekey: ['tuijianceshijijieguo'],openkey: ['dataSer1', 'tuijianyunying']}
        // });
        // window.open(href, '_blank');
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
      del(id) {
        deleteScene({id: id}).then(res => {
          if (res.code == 200000) {
            this.$message.success("删除成功！");
            this.getList();
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
      },
      setting() {
        this.$refs.sceneForm.$refs.sceneForm.validate(valid => {
          if (valid) {
            let params = this.$refs.sceneForm.$refs.sceneForm.model;
            addScene(params).then(res => {
              if (res.code == 200000) {
                this.$message.success("添加成功！");
                let sceneInfo= {
                  sceneType: params.sceneType,// 场景类型 0-智能场景 1-自定义场景 2-模板场景
                  recommendObjectType: params.recommendObjectType // 推荐种类 0-推荐商品 1-推荐用户 2-推荐资讯 3-推荐活动
                };
                localStorage.setItem("sceneInfo",JSON.stringify(sceneInfo));
                this.$router.push({
                  path: '/recommendation/scene/data?appId='+ this.$refs.sceneForm.$refs.sceneForm.model.applicationId + '&sceneId=' + res.data
                });
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
          position: relative;
          margin-left: 10px;
        }
      }
    }
    .p0{
      padding: 0 20px 0  0;
    }
    .operate{
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
    }
  }
</style>
