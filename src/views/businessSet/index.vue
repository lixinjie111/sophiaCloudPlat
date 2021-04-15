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
                        <p class="name">{{info.enterpriseName}}</p>
                    </div>
                    <div style="display:flex;padding:10px 0">
                        <p class="name" style="width:150px">账号</p>
                        <p class="name">{{info.businessLicenseNumber}}</p>
                    </div>
                    <div style="display:flex;padding:10px 0">
                        <p class="name" style="width:150px">认证时间</p>
                        <p class="name">{{info.createTime}}</p>
                    </div>
                </a-card>
                <a-col flex="1" style="margin-left:40px">
                    <a-tabs default-active-key="1" @change="callback" size="large">
                        <a-tab-pane key="1" tab="预警通知" >
                           <div class="c-text-between">
                                <a-input-search placeholder="输入手机号" v-model="telInput" style="width: 250px" @search="onSearch" />
                                <a-button icon="plus" @click="showModal">
                                预警通知联系人
                                </a-button>
                           </div>
                           <div class="busTable" style="margin-top:20px">
                               <a-table :columns="columns" :data-source="userIndata" :pagination="false">
                                    <span slot="reveive" slot-scope="push,record">
                                       <a-switch :checked="push==0" @change="onChange(record)" />
                                    </span>
                                    <span slot="action"  slot-scope="record">
                                        <a @click="update(record)">编辑</a>
                                        <a-divider type="vertical" />
                                        <a @click="remove(record)">删除</a>
                                    </span>
                                </a-table>
                           </div>
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="故障通知" force-render style="height:56px">
                            <!-- Content of Tab Pane 2 -->
                        </a-tab-pane>
                    </a-tabs>
                </a-col>
            </a-row>
	    </div>
	</div>
</template>

<script>
import { warningPushDelete,warningPushList,warningPushAdd,warningPushUpdate,getAuthInfo} from '@/api/businessSet';
export default {
    data() {
        return {
            telInput:'',
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
                    dataIndex: 'phone',
                    key: 'phone',
                },
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    key: 'createTime',
                },
                {
                    title: '接受消息',
                    key: 'reveive',
                    dataIndex: 'push',
                    scopedSlots: { customRender: 'reveive' },
                },
                {
                    title: '操作',
                    key: 'action',
                    scopedSlots: { customRender: 'action' },
                },
            ],
            userIndata : [
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
            },
            info:{},
            isAdd:true,
            updateInfo:{},
            
        }
    },
    created() {
        this.initInfo();
        this.initList();
    },
    methods: {
        initInfo(){
            getAuthInfo().then(res=>{
                if(res.code==200000){
                 this.info=res.data;
                }
            })
        },
        initList(){
            warningPushList({phone:this.telInput}).then(res=>{
                if(res.code==200000){
                //this.userIndata=res.data;
                let result=res.data.data;
                result.forEach((item,index)=>{
                    item['key']=index
                })
                this.userIndata=result;
                console.log(this.userIndata)
                }
            })
        },
       callback(key) {
            console.log(key);
       },
       onSearch(value) {
            this.initList();
        },
        onChange(row) {
            let isPush=row.push;
            if(row.push==0){
               isPush = 1;
            }else{
               isPush = 0;
            }
            let _param={
                id:row.id,
                name:row.name,
                phone:row.phone,
                push:isPush,
            }
            warningPushUpdate(_param).then(res=>{
                if(res.code==200000){
                    this.$message.success('更新成功');
                    this.initList();
                }
            })
        },
        update(row) {
            this.isAdd=false;
            this.ruleForm.name=row.name;
            this.ruleForm.tel=row.phone;
            this.visible = true;
            this.updateInfo={
                id:row.id,
                push:row.push,
            };
           
        },
        remove(row) {
             let _param={
                warningPushId:row.id,
            }
            warningPushDelete(_param).then(res=>{
                if(res.code==200000){
                    this.$message.success('更新成功');
                    this.initList();
                }
            })
        },
        showModal() {
            this.visible = true;
            this.isAdd=true;
            this.ruleForm.name='';
            this.ruleForm.tel='';
        },
        handleOk(e) {
            if(this.isAdd){
                this.confirmLoading = true;
                let _param={
                    name:this.ruleForm.name,
                    phone:this.ruleForm.tel,
                    push:0,
                }
                warningPushAdd(_param).then(res=>{
                    if(res.code==200000){
                    this.visible = false;
                    this.confirmLoading = false;
                    this.$message.success('添加成功');
                    this.initList();
                    }
                })
            }else{
                this.confirmLoading = true;
                let _param={
                    id:this.updateInfo.id,
                    name:this.ruleForm.name,
                    phone:this.ruleForm.tel,
                    push:this.updateInfo.push,
                }
                warningPushUpdate(_param).then(res=>{
                    if(res.code==200000){
                    this.visible = false;
                    this.confirmLoading = false;
                    this.$message.success('更新成功');
                    this.initList();
                    }
                })
            }
        },
        handleCancel(e) {
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