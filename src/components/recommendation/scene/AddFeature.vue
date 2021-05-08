<template>
  <div class="add_box">
    <div class="add_item c-mb-10" v-for="(item,index) in addList" :key="index" v-if="addList.length > 0">
      <div class="index c-mr-20">{{index+1}}</div>
      <div class="c-mr-20">特征名称：</div>
      <a-select class="c-mr-20" placeholder="请选择特征名称" v-model="item.featureId" @change="featureChange(item)" style="width:140px"
                :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
        <a-select-option :value="item.id" v-for="(item,index) in dataTypeList" :key="index">{{item.fieldValue}}
        </a-select-option>
      </a-select>
      <div class="c-mr-20">抽取范围：</div>
      <a-select class="c-mr-20" placeholder="请选择抽取范围" v-model="item.scope" @change="scopeChange(item)" style="width:140px"
                :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
        <a-select-option :value="item.id" v-for="(item,index) in scopeList" :key="index">{{item.tableName}}
        </a-select-option>
      </a-select>
      <div class="c-mr-20">应用于：</div>
      <a-select class="c-mr-20" placeholder="请选择应用范围" v-model="item.applyTo" @change="applyChange" style="width:140px"
                :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
        <a-select-option :value="item.id" v-for="(item,index) in applyList" :key="index">{{item.value}}
        </a-select-option>
      </a-select>
      <a-button type="primary" icon="profile" class="c-mr-20" @click="toDetail(item.id)">详情</a-button>
      <a-popconfirm
        title="是否删除该条目?"
        ok-text="是"
        cancel-text="否"
        @confirm="del(index)">
        <a-button icon="close"/>
      </a-popconfirm>
    </div>
    <a-button type="dashed" class="add_btn" @click="add">
      <a-icon type="plus"/>
    </a-button>
  </div>
</template>

<script>
  import {getFeaturesDataTables} from "@/api/recommendation/index";

  export default {
    name: "AddData",
    props: {
      // 用户数据列表
      list: {
        type: Array,
        default: () => []
      },
      //特征列表
      dataTypeList: {
        type: Array,
        default: () => []
      },
      //空:新建 edit: 编辑
      type: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        addList: this.list,
        scopeList: [],
        applyList: [{
          id: 0,
          value: '仅抽取'
        },{
          id: 1,
          value: '历史记录'
        },{
          id: 2,
          value: '物流热度值'
        }]
      }
    },
    created() {
    //   if(this.type == 'edit'){ //编辑
    //     this.addList.forEach((item)=> {
    //       this.getScopeList(item.folderId,item.dataType)
    //     });
    //   }
    },
    methods: {
      // toDetail(id) {
      //   let name = this.sourceTablesList.find((item)=>{
      //     return item.sourceTableId == id
      //   })
      //   this.$router.push({
      //     path: '/recommendation/data/detail?name='+ name.sourceTableName,
      //     query:{
      //       activekey:['shujuguanlik'],
      //       openkey:['dataSer1','shujuzhongxin']
      //     }
      //   });
      // },
      getScopeList(dataType) {
        let params = {
          applicationId: this.$route.query.appId,
          dataType: dataType,
          sceneId: this.$route.query.sceneId,
        };
        getFeaturesDataTables(params).then(res => {
          if (res.code == 200000) {
            this.scopeList = res.data;
          } else if (res.code == 500000) {
            this.scopeList = [];
          } else {
            this.$message.error(res.message || "请求失败！");
          }
        }).catch(err => {
          this.$message.error("请求失败！");
          console.log(err, "err");
        });
      },
      add() {
        if (this.addList.length >= 10) {
          this.$message.warning('最多添加10条');
          return;
        }
        this.addList.push({
          featureId: undefined,
          scope: undefined,
          applyTo: undefined
        })
      },
      del(index) {
        this.addList.splice(index, 1);
      },
      featureChange(item) {
        item.scope = undefined;
        this.getScopeList(item.id);
      },
      scopeChange(item) {

      },
      applyChange(item) {

      }
    }
  }
</script>

<style scoped lang="scss">
  .add_box {
    width: 100%;

    .add_item {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .index {
        width: 30px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #cccccc;
        border-radius: 5px;
        text-align: center;
      }
    }

    .add_btn {
      width: 100%;
    }
  }
</style>
