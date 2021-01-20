<template>
    <div class="busEt">
        <a-modal
            title="添加预警通知联系人"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
            ok-text="确定" cancel-text="取消"
            >
           <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="tel">
                    <el-input v-model="ruleForm.tel"></el-input>
                </el-form-item>
            </el-form>    
        </a-modal>
          <a-page-header
            style="borderBottom: 1px solid rgb(235, 237, 240)"
            title="组织设置"
         />
        <div class="content">
            <a-row type="flex">
                <a-card title="基本信息" :bordered="false" style="width: 400px">
                    <div style="display:flex;padding:1px 0">
                        <p class="name" style="width:150px">企业名称</p>
                        <p class="name">北京好生活网络科技有限公司</p>
                    </div>
                    <div style="display:flex;padding:10px 0">
                        <p class="name" style="width:150px">账号</p>
                        <p class="name">143256789</p>
                    </div>
                    <div style="display:flex;padding:10px 0">
                        <p class="name" style="width:150px">省份/城市</p>
                        <p class="name">北京/北京</p>
                    </div>
                </a-card>
                <a-col flex="auto" style="margin-left:40px">
                    <a-tabs default-active-key="1" @change="callback" size="large">
                        <a-tab-pane key="1" tab="预警通知" >
                           <div class="c-text-between">
                               <a-input-search placeholder="输入姓名或手机号" style="width: 250px" @search="onSearch" />
                                <a-button icon="plus" @click="showModal">
                                预警通知联系人
                                </a-button>
                           </div>
                           <div class="busTable" style="margin-top:20px">
                               <a-table :columns="columns" :data-source="data">
                                    <span slot="reveive" slot-scope="isCheck,record">
                                       <a-switch :checked="isCheck" @change="onChange(record)" />
                                    </span>
                                    <span slot="action">
                                        <a>编辑</a>
                                        <a-divider type="vertical" />
                                        <a>删除</a>
                                    </span>
                                </a-table>
                           </div>
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="故障通知" force-render style="height:56px">
                            Content of Tab Pane 2
                        </a-tab-pane>
                    </a-tabs>
                </a-col>
            </a-row>
	    </div>
	</div>
</template>

<script>
export default {
    data() {
        return {
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
            columns : [
                {
                    dataIndex: 'name',
                    key: 'name',
                    title: '姓名'
                },
                {
                    title: '号码',
                    dataIndex: 'number',
                    key: 'number',
                },
                {
                    title: '创建时间',
                    dataIndex: 'creatTime',
                    key: 'creatTime',
                },
                {
                    title: '接受消息',
                    key: 'reveive',
                    dataIndex: 'isCheck',
                    scopedSlots: { customRender: 'reveive' },
                },
                {
                    title: '操作',
                    key: 'action',
                    scopedSlots: { customRender: 'action' },
                },
            ],
            data : [
                {
                    name: 'John Brown',
                    number: 13232345432,
                    creatTime: '2020-12-26 11:43:25',
                    isCheck: true,
                },
                {
                    name: 'Jim Green',
                    number: 13232345432,
                    creatTime:  '2020-12-26 11:43:25',
                    isCheck: true,
                },
                {
                    name: 'Joe Black',
                    number: 13232345432,
                    creatTime: '2020-12-26 11:43:25',
                    isCheck: false,
                },
            ],
            ruleForm: {
                name: '',
                tel: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                tel: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                ],
            }
            
        }
    },
    created() {
    },
    methods: {
       callback(key) {
            console.log(key);
       },
       onSearch(value) {
        console.log(value);
        },
        onChange(checked,ev) {
            checked.isCheck = !checked.isCheck;
            console.log(checked,ev);
        },
        showModal() {
            this.visible = true;
        },
        handleOk(e) {
            this.ModalText = 'The modal will be closed after two seconds';
            this.confirmLoading = true;
            setTimeout(() => {
                this.visible = false;
                this.confirmLoading = false;
            }, 2000);
        },
        handleCancel(e) {
            console.log('Clicked cancel button');
            this.visible = false;
        },
    }
}
</script>
<style lang="scss" scoped>
	.busEt{
        color:rgba(103,105,112,1);
        .content{
            padding:0 24px;
            
        }
    }		
	
</style>