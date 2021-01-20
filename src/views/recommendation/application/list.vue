<template>
  <div class="best_list_container">
    <div class="top">
      <div>应用列表</div>
      <div>
        <a-button :disabled="!hasSelected" :loading="exportLoading" @click="exportTable" style="margin-right: 10px">
          批量导出
        </a-button>
        <a-button type="primary" @click="add">
          添加应用
        </a-button>
      </div>
    </div>
    <a-table
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="columns"
      :data-source="data"
      :pagination="{showQuickJumper: true, showSizeChanger: true}">
      <template slot="operation" slot-scope="text, record, index">
        <a-button type="link">报表</a-button>
        <a-button type="link">详情</a-button>
        <a-button type="link">配置</a-button>
        <a-button type="link" style="color:red;">删除</a-button>
      </template>
    </a-table>
    <a-modal v-model="createModalShow" title="创建应用">
      <template slot="footer">
        <a-button type="primary" :loading="createLoading" @click="create">
          创建
        </a-button>
        <a-button @click="next" :loading="nextLoading">
          下一步
        </a-button>
      </template>
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
    </a-modal>
    <a-modal v-model="sceneModalShow" title="创建应用">
      <template slot="footer">
        <a-button type="primary" :loading="setLoading" @click="setting">
          配置数据
        </a-button>
        <a-button @click="cancelSetting">
          取消
        </a-button>
      </template>
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
    </a-modal>
  </div>
</template>
<script>
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      appId: i,
      api: i,
      secret: i,
      time: '2020-01-28 12:00:00',
      operation: i
    });
  }

  export default {
    data() {
      return {
        data,
        columns: [
          {
            title: '应用名称',
            dataIndex: 'name'
          },
          {
            title: 'APP ID',
            dataIndex: 'appId',
            width: 120
          },
          {
            title: 'API Key',
            dataIndex: 'api',
            width: 120
          },
          {
            title: 'Secret Key',
            dataIndex: 'secret',
            width: 120
          },
          {
            title: '创建时间',
            dataIndex: 'time',
            width: 180
          },
          {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: {customRender: 'operation'},
            width: 300
          },
        ],
        selectedRowKeys: [],
        exportLoading: false,
        createModalShow: false,
        createLoading: false,
        nextLoading: false,
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
        },
        sceneModalShow: false,
        setLoading: false,
        sceneForm: {
          apply: '',
          scene: '',
          start:'',
          location: ''
        },
        applyList: [{
          label: '推荐商品',
          value:'1'
        },{
          label: '推荐用户',
          value:'2'
        },{
          label: '推荐用户',
          value:'3'
        }],
        sceneList: [{
          label: '个性化推荐',
          value:'1'
        },{
          label: '相关推荐',
          value:'2'
        },{
          label: '热点推荐',
          value:'3'
        }, {
          label: '主题推荐',
          value: '4'
        }],
        startList: [{
          label: '历史数据',
          value:'1'
        },{
          label: '增量数据',
          value:'2'
        },{
          label: '历史+增量数据',
          value:'3'
        }],
      };
    },
    computed: {
      hasSelected() {
        return this.selectedRowKeys.length > 0;
      },
    },
    methods: {
      add() {
        this.createModalShow = true;
      },
      exportTable() {
        this.exportLoading = true;
        setTimeout(() => {
          this.exportLoading = false;
          this.selectedRowKeys = [];
        }, 1000);
      },
      onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.selectedRowKeys = selectedRowKeys;
      },
      next(e) {
        this.$refs.createForm.validate(valid => {
          if (valid) {
            this.nextLoading = true;
            setTimeout(() => {
              this.nextLoading = false;
              this.createModalShow = false;
              this.sceneModalShow = true;
            }, 1000);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      create(e) {
        this.$refs.createForm.validate(valid => {
          if (valid) {
            this.createLoading = true;
            setTimeout(() => {
              this.createLoading = false;
              this.createModalShow = false;
            }, 1000);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      tradeChange(value) {
        console.log(value);
      },
      setting() {

      },
      cancelSetting() {
        this.sceneModalShow = false;
      }
    }
  };
</script>
<style scoped lang="scss">
  .best_list_container {
    .top {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
