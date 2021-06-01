<template>
  <div class="app_edit_container">
    <a-card title="基本信息" size="small">
      <a-descriptions bordered :column="1" size="small">
        <a-descriptions-item label="应用名称">
          {{appDetail.appName}}
        </a-descriptions-item>
        <a-descriptions-item label="应用类型">
          {{appDetail.appType}}
        </a-descriptions-item>
        <a-descriptions-item label="所属行业">
          {{appDetail.industry}}
        </a-descriptions-item>
        <a-descriptions-item label="应用描述">
          {{appDetail.description}}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card title="业务场景" size="small" class="c-mt-20">
      <div class="scene_top">
        <p>共{{list.length}}个业务场景</p>
        <a-button type="primary" class="c-ml-20" @click="addScene">添加场景</a-button>
      </div>
      <a-table
        :columns="columns"
        :data-source="list"
        :rowKey="record=>record.id">
        <template slot="operation" slot-scope="text, record, index">
          <a-button type="link" @click="toDetail(record.applicationId,record.id)">详情</a-button>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
  import {getAppDetail} from "@/api/recommendation/index";

  export default {
    name: "detail",
    data() {
      return {
        appDetail: {},
        list:[],
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
            title: '推荐类型',
            dataIndex: 'recommendTypeDesc'
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
            width: 100
          },
        ],
      }
    },
    created() {
      this.getAppDetail();
    },
    methods: {
      toDetail(applicationId,id) {
        this.$router.push({
          path: '/recommendation/scene/detail?appId=' + applicationId + '&sceneId=' + id,
          query:{
            activekey:['tuijianchangjing'],
            openkey:['dataSer1']
          }
        });
      },
      getAppDetail (){
        let params = {
          id: this.$route.query.id
        };
        getAppDetail(params).then(res => {
          if (res.code == 200000) {
            this.appDetail = res.data;
            this.list = res.data.scenes;
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
      },
      addScene() {
        this.$router.push({
          path: '/recommendation/scene/list?show=1',
          query:{
            activekey:['tuijianchangjing'],
            openkey:['dataSer1']
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .app_edit_container {
    padding: 20px;

    .scene_top {
      margin-bottom: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
</style>
