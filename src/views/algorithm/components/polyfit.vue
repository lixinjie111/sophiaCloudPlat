<template>
    <div class="c-wrapper-20">
        <div class="c-text-between">
            <div class="operateTable">
                 <ul class="c-text-both c-pdl-20">
                    <li v-for="item in tabData" :class="{'tabActive':currentId==item.id}" :key="item.id" @click="handleClick(item)">{{item.name}}</li>
                </ul>
                <div v-show="currentId==3">
                    <div class="c-mt-20 c-mb-20" v-if="resFlag">
                        <div id="pdfDom">
                            <div >
                                <p style="text-align:center;" class="c-padding-20"><el-tag type="success">结果分析</el-tag></p>
                                <div v-for="(item,index) in resultArr" :key="index" v-if="!item.is_test">
                                    <div v-if="item.str">
                                        <p style="text-align:center;" class="c-padding-20">{{item.title}}</p>
                                        <p style="text-align:left;" class="c-padding-10 cmm-wrapper" v-html="item.str"></p>
                                    </div>
                                    <div v-if="item.base64">
                                        <p style="text-align:center;" class="c-padding-20">{{item.title}}</p>
                                        <p class="c-padding-10">
                                            <img :src="'data:image/png;base64,'+item.base64" alt="" style="margin:auto;width:100%">
                                        </p>
                                    </div>
                                    <div v-if="item.col">
                                        <p style="text-align:center;" class="c-padding-20">{{item.title}}</p>
                                        <vxe-table
                                            border
                                            stripe
                                            align="center"
                                            resizable
                                            max-height="500"
                                            ref="xTable"
                                            :data="item.data"
                                            >
                                            <vxe-table-column  :field="subKey" :title="subItem" v-for="(subItem,subKey) in item.col" :key="subKey"></vxe-table-column>
                                        </vxe-table>
                                        <p style="text-align:left;" class="c-padding-10" v-if="item.remarks">{{item.remarks}}</p>
                                    </div>
                                </div> 
                            </div>
                            <div style="height:2px;background:#f00"></div>
                            <div>
                                <p style="text-align:center;" class="c-padding-20"><el-tag type="success">前提假设</el-tag></p>
                                <div v-for="(item,index) in resultArr" :key="index" v-if="item.is_test">
                                    <div v-if="item.str">
                                        <p style="text-align:center;" class="c-padding-20">{{item.title}}</p>
                                        <p style="text-align:left;" class="c-padding-10 cmm-wrapper" v-html="item.str"></p>
                                    </div>
                                    <div v-if="item.base64">
                                        <p style="text-align:center;" class="c-padding-20">{{item.title}}</p>
                                        <p  class="c-padding-10">
                                            <img :src="'data:image/png;base64,'+item.base64" alt="" style="margin:auto;width:100%">
                                        </p>
                                    </div>
                                    <div v-if="item.col">
                                        <p style="text-align:center;" class="c-padding-20">{{item.title}}</p>
                                        <vxe-table
                                            border
                                            stripe
                                            align="center"
                                            resizable
                                            max-height="500"
                                            ref="xTable"
                                            :data="item.data"
                                            >
                                            <vxe-table-column  :field="subKey" :title="subItem" v-for="(subItem,subKey) in item.col" :key="subKey"></vxe-table-column>
                                        </vxe-table>
                                        <p style="text-align:left;" class="c-padding-10" v-if="item.remarks">{{item.remarks}}</p>
                                    </div>
                                </div> 
                            </div>
                        </div>
                        <div class="c-button-wrapper c-text-center c-border-top">
                            <save-model :saveData="saveData"></save-model>
                        </div> 
                    </div>
                    <div class="c-mt-20 c-mb-20" v-else-if="lookresult">
                        <p style="text-align:center;" class="c-padding-20">{{lookresult.title}}</p>
                        <vxe-table
                            border
                            stripe
                            resizable
                            align="center"
                            ref="xTable"
                            max-height="427"
                            :data="lookresult.data"
                            >
                            <vxe-table-column  :field="subKey" :title="subItem" v-for="(subItem,subKey) in lookresult.col" :key="subKey"></vxe-table-column>
                        </vxe-table>
                    </div>
                </div>
            </div>
           
            <div class="operate">
                <operate @getRes="getRes" @lookRes="lookRes"></operate>
            </div>
        </div>
    </div>
</template>
<script>
import operate from '@/components/alog/polyfit1';

export default {
    components: {
        operate
    },
    data(){
        return {
            saveData:null,
            currentId:'3',
            tableLoading: false,
            addFlag:false,
            dialogData:{
                title:'',
                data:'',
                type:'',    //type 1：新增，2：编辑
                viewFlag: false,
            },
            tabData:[
                {name:"数据探索",id:1},
                {name:"数据处理",id:2},
                {name:"算法运行",id:3},
            ],
            formParams: {
                type:'',
            },
            tableDemo1:[
                {self:1,other:2},
                {self:1,other:2},
                {self:1,other:2},
                {self:1,other:2},
            ],
            tableDemo2:[
                {self1:1,self2:2,self3:3},
                {self1:1,self2:2,self3:3},
                {self1:1,self2:2,self3:3},
                {self1:1,self2:2,self3:3},
            ],
            result:[],
            lookresult:null,
            stResult:[],
            baseResult:[],
            resFlag:false,
            showIndex:1,
            resultArr:[],
        }
    },
    methods: {
        resFenxi(){
           this.showIndex=1; 
        },
        jiase(){
            this.showIndex=2; 
        },
        getRes(res){
            this.resFlag=true;
            this.result=[];
            this.stResult=[];
            this.baseResult=[];
            this.lookresult=null;
            this.saveData={
                data:res.model_info,
                title:'多项式回归算法训练',
                dom:'pdfDom',
                doc:'polyLinerRegression'
            }
            var res=res.res;
            for(var key in res){
                if(res[key].data){
                    if(Object.prototype.toString.call(res[key].data) =='[object Array]'){
                        let obj={};
                        res[key].col.forEach((item,index)=>{
                            let newkey='colName'+index;
                            obj[newkey]=item;
                        })
                        res[key].col = obj;
                        let arr=[];
                        res[key].data.forEach(item1=>{
                            let obj1={};
                            item1.forEach((item2,index2)=>{
                                let newkey1='colName'+index2;
                                obj1[newkey1]=item2;
                            })
                            arr.push(obj1)
                            res[key].data=arr;
                        })
                        this.result.push(res[key]);
                    }
                }else{
                    if(res[key].base64){
                        this.baseResult.push(res[key]);
                    }
                    if(res[key].str){
                        this.stResult.push(res[key]);
                    }
                }
                this.resultArr=res;
            }
            
            
        },
        lookRes(res){
            this.resFlag=false;
            this.result=[];
            this.lookresult=null;
            let obj={};
            res.col.forEach((item,index)=>{
                    let newkey='colName'+index;
                    obj[newkey]=item;
            })
            res.col = obj;
            let arr=[];
            res.data.forEach(item1=>{
                let obj1={};
                item1.forEach((item2,index2)=>{
                    let newkey1='colName'+index2;
                    obj1[newkey1]=item2;
                })
                arr.push(obj1)
                res.data=arr;
            })
            this.lookresult=res;
        },
        handleClick(item) {
            this.currentId=item.id
        },
    },
   

}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/theme.scss';
.operateTable{
    flex:1;
    background:#fff;
    padding:0 10px;
    li{
        flex:1;
        padding-bottom:10px;
        padding-top:10px;
        @include layoutMode(both);
        cursor: pointer;
        box-sizing: border-box;
       
    }
    .tabActive{
            position: relative;
            color:#409eff;
             &::after{
               content: "";
                display:block;
                position: absolute;
                bottom: 0;
                left: calc(50% - 15px);
                width: 30px;
                height: 2px;
                background: #409eff;
            }
        }
}
.operate{
    margin-left: 20px;
    width: 300px;
    background:#fff;
}
.cmm-wrapper{
  white-space: pre-wrap; //解决的关键就是这一句,
}
</style>

