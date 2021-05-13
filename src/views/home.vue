<template>
  <a-layout id="components-layout-demo-custom-trigger" style="height:100%">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible width="250">
      <div class="logo">
        <template v-if="collapsed" class="sidebar-logo-link" to="/">
          <div class="pic" v-if="logo">
            <img :src="logo" class="sidebar-logo" />
          </div>
          <h1 v-else class="sidebar-title">{{ title }}</h1>
        </template>
        <template v-else class="sidebar-logo-link" to="/">
          <div class="pic" v-if="logo">
            <img :src="logo" class="sidebar-logo" />
          </div>
          <h1 class="sidebar-title">{{ title }}</h1>
        </template>
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        :default-selected-keys="defaultChoiceList"
        :default-open-keys="defaultopenkeys"
        @click="menuHandleClick"
        :inlineCollapsed="true"
        v-if="ifShowMenu"
      >
        <template v-for="item in menuList">
          <a-menu-item
            disabled="true"
            v-show="!collapsed"
            v-if="item.list.length>0"
            :key="item.firstkey"
          >
            <span>{{item.moduleTitle}}</span>
          </a-menu-item>
          <a-menu-item v-show="!collapsed" v-else :key="item.firstkey">
            <a-icon type="user" />
            <span>{{item.moduleTitle}}</span>
          </a-menu-item>
          <template v-if="item.moduleTitle == '财务中心'">
            <template v-for="subItem in item.list">
              <a-menu-item
                :key="subItem.seckey"
              >
                <a-icon type="user" />
                <span v-if="!collapsed">{{ subItem.title }}</span>
              </a-menu-item>
            </template>
          </template>
          <template v-else-if="item.moduleTitle == '系统管理'">
            <template v-for="subItem in item.list">
              <a-menu-item
                :key="subItem.seckey"
                v-if="subItem.title=='企业设置'&& $store.state.busSet==2"
              >
                <a-icon type="user" />
                <span v-if="!collapsed">{{ subItem.title }}</span>
              </a-menu-item>
              <a-sub-menu v-else :key="subItem.seckey">
                <span slot="title">
                  <a-icon type="user" />
                  <span>{{ subItem.title }}</span>
                </span>
                <a-menu-item
                  v-for="item1 in subItem.menuItmList"
                  :key="item1.threekey"
                >{{ item1.title}}</a-menu-item>
              </a-sub-menu>
            </template>
          </template>
          <template v-else>
            <a-sub-menu v-for="subItem in item.list" :key="subItem.seckey">
              <span slot="title">
                <a-icon type="user" />
                <span>{{ subItem.title }}</span>
              </span>
              <template v-for="item1 in subItem.menuItmList">
                <a-sub-menu :title="item1.title" v-if="item1.children" :key="item1.threekey">
                  <a-menu-item v-for="child in item1.children" :key="child.fourkey">
                    {{child.title}}
                  </a-menu-item>
                </a-sub-menu>
                <a-menu-item v-else :key="item1.threekey">{{item1.title}}</a-menu-item>
              </template>
            </a-sub-menu>
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout class="cloudContainer">
      <a-layout-header class="cloudHeader">
        <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="collapse" />
        <div class="headerRight">
          <div class="avtor"><img :src="$store.state.userInfo.icon" alt=""></div>
          <a-dropdown>
            <div class="ant-dropdown-link" @click="e => e.preventDefault()">
              {{$store.state.userInfo.username}}<a-icon type="down" />
            </div>
            <a-menu slot="overlay">
              <a-menu-item @click="logout">
                退出
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-breadcrumb :style="{
          margin: '84px 16px 24px 16px',
        }">
        <a-breadcrumb-item v-for="item in breadArr" :key="item">{{item}}</a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout-content
        :style="{
          margin: '0px 16px 24px 16px',
          background: '#fff',
          minHeight:'auto'
        }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
  import { userInfo } from '@/api/user';
  export default {
    data() {
      return {
        userInfomation:{},
        title: "Sophia云服务平台",
        logo:"https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png",
        collapsed: false,
        breadArr: [],
        menuList: [
          {
            moduleTitle: "概览",
            list: [],
            firstkey:'gailan'
          },
          {
            moduleTitle: "应用管理",
            list: [
              {
                subKey: "myYingyong",
                title: "我的应用",
                seckey:'myYingyong',
                menuItmList: [
                  {
                    title: "概览",
                    itemKey: "yingyong1",
                    path: "/overview",
                    threekey:'yingyong1'
                  },
                  {
                    title: "应用列表",
                    itemKey: "yingyong2",
                    path: "/application/list",
                    threekey:'yingyong2'
                  },
                  {
                    title: "监控报表",
                    itemKey: "yingyong3",
                    path: "/monRep",
                    threekey:'yingyong3'
                  }
                ]
              }
            ]
          },
          {
            moduleTitle: "产品服务",
            list: [
              {
                subKey: "pro1",
                title: "自然语言处理",
                seckey:'pro1',
                menuItmList: [
                  {
                    title: "API管理",
                    itemKey: "yuyanAPI",
                    path: "/apiMan",
                    serviceModel: 1,
                    threekey:'apiMan1'
                  },
                  {
                    title: "SDK管理",
                    itemKey: "yuyanSDK",
                    path: "/sdkMan",
                    serviceModel: 1,
                    threekey:'sdkMan1'
                  }
                ]
              },
              {
                subKey: "pro2",
                title: "语音技术",
                seckey:'pro2',
                menuItmList: [
                  {
                    title: "API管理",
                    itemKey: "yuyinAPI",
                    path: "/apiMan",
                    serviceModel: 2,
                    threekey:'apiMan2'
                  },
                  {
                    title: "SDK管理",
                    itemKey: "yuyinSDK",
                    path: "/sdkMan",
                    serviceModel: 2,
                    threekey:'sdkMan2'
                  }
                ]
              },
              {
                subKey: "pro3",
                title: "人脸识别",
                seckey:'pro3',
                menuItmList: [
                  {
                    title: "API管理",
                    itemKey: "renlianAPI",
                    path: "/apiMan",
                    serviceModel: 6,
                    threekey:'apiMan3'
                  },
                  {
                    title: "SDK管理",
                    itemKey: "renlianSDK",
                    path: "/sdkMan",
                    serviceModel: 6,
                    threekey:'sdkMan3'
                  }
                ]
              },
              {
                subKey: "pro4",
                title: "人体分析",
                seckey:'pro4',
                menuItmList: [
                  {
                    title: "API管理",
                    itemKey: "rentiAPI",
                    path: "/apiMan",
                    serviceModel: 7,
                    threekey:'apiMan4'
                  },
                  {
                    title: "SDK管理",
                    itemKey: "rentiSDK",
                    path: "/sdkMan",
                    serviceModel: 7,
                    threekey:'sdkMan4'
                  }
                ]
              },
              {
                subKey: "pro5",
                title: "文字识别",
                seckey:'pro5',
                menuItmList: [
                  {
                    title: "API管理",
                    itemKey: "wenziAPI",
                    path: "/apiMan",
                    serviceModel: 3,
                    threekey:'apiMan5'
                  },
                  {
                    title: "SDK管理",
                    itemKey: "wenziSDK",
                    path: "/sdkMan",
                    serviceModel: 3,
                    threekey:'sdkMan5'
                  }
                ]
              },
              {
                subKey: "pro6",
                title: "图像技术",
                seckey:'pro6',
                menuItmList: [
                  {
                    title: "API管理",
                    itemKey: "tuxiangAPI",
                    path: "/apiMan",
                    serviceModel: 4,
                    threekey:'apiMan6'
                  },
                  {
                    title: "SDK管理",
                    itemKey: "tuxiangSDK",
                    path: "/sdkMan",
                    serviceModel: 4,
                    threekey:'sdkMan6'
                  }
                ]
              },
              {
                subKey: "pro7",
                title: "视频技术",
                seckey:'pro7',
                menuItmList: [
                  {
                    title: "API管理",
                    itemKey: "shipinAPI",
                    path: "/apiMan",
                    serviceModel: 5,
                    threekey:'apiMan7'
                  },
                  {
                    title: "SDK管理",
                    itemKey: "shipinSDK",
                    path: "/sdkMan",
                    serviceModel: 5,
                    threekey:'sdkMan7'
                  }
                ]
              }
            ]
          },
          {
            moduleTitle: "数据服务",
            list: [
              {
                subKey: "dataSer1",
                title: "智能推荐",
                seckey:'dataSer1',
                menuItmList: [
                  {
                    title: "推荐应用管理",
                    itemKey: "tuijianyingyong",
                    path: "/recommendation/application/list",
                    threekey:'tuijianyingyong'
                  },
                  {
                    title: "推荐场景管理",
                    itemKey: "tuijianchangjing",
                    path: "/recommendation/scene/list",
                    threekey:'tuijianchangjing'
                  },
                  {
                    title: "数据中心",
                    itemKey: "shujuzhongxin",
                    threekey:'shujuzhongxin',
                    children: [
                      {
                        title: "数据管理",
                        itemKey: "shujuguanli",
                        path: "/recommendation/data/list",
                        fourkey:'shujuguanlik'
                      },
                      // {
                      //   title: "数据详情",
                      //   itemKey: "shujuxiangqing",
                      //   path: "/recommendation/data/detail",
                      //   fourkey:'shujuxiangqing'
                      // }
                    ]
                  },
                  {
                    title: "推荐运营",
                    itemKey: "tuijianyunying",
                    threekey:'tuijianyunying',
                    children: [
                      {
                        title: "推荐测试及结果",
                        itemKey: "tuijianceshijijieguo",
                        path: "/recommendation/operation/result",
                        fourkey:'tuijianceshijijieguo'
                      },
                      {
                        title: "物料及用户管理",
                        itemKey: "wupinguanli",
                        path: "/recommendation/materiel",
                        fourkey:'wupinguanli'
                      },
                      {
                        title: "必推物品池",
                        itemKey: "bitui",
                        path: "/recommendation/materiel/willPush",
                        fourkey:'bitui'
                      }
                    ]
                  }
                ]
              },
              {
                subKey: "dataSer2",
                title: "用户画像",
                seckey:'dataSer2',
              }
            ]
          },
          {
            moduleTitle: "工具服务",
            list: [
              {
                subKey: "toolSer1",
                title: "风控管理",
                seckey:'toolSer1',
              },
              {
                subKey: "toolSer2",
                title: "财税计算",
                seckey:'toolSer2',
              },
              {
                subKey: "toolSer3",
                title: "出行工具",
                seckey:'toolSer3',
              }
            ]
          },
          {
            moduleTitle: "财务中心",
            list: [
              {
                subKey: "caiwu1",
                title: "财务总览",
                path: "/caiwu1",
                seckey:'caiwu1',
              },
              {
                subKey: "caiwu2",
                title: "消费中心",
                path: "",
                seckey:'caiwu2',
              },
              {
                subKey: "caiwu3",
                title: "成本账单",
                path: "",
                seckey:'caiwu3',
              },
              {
                subKey: "caiwu4",
                title: "收支明细",
                path: "",
                seckey:'caiwu4',
              },
              {
                subKey: "caiwu5",
                title: "订单管理",
                path: "/orderMan",
                seckey:'caiwu5',
              },
              {
                subKey: "caiwu6",
                title: "续费管理",
                path: "",
                seckey:'caiwu6',
              },
              {
                subKey: "caiwu7",
                title: "退订管理",
                path: "",
                seckey:'caiwu7',
              },
              {
                subKey: "caiwu8",
                title: "发票管理",
                path: "",
                seckey:'caiwu8',
              },
              {
                subKey: "caiwu9",
                title: "合同管理",
                path: "",
                seckey:'caiwu9',
              }
            ]
          },
          {
            moduleTitle: "系统管理",
            list: [
              {
                subKey: "sys1",
                title: "企业设置",
                path: "/businessSet",
                seckey:'sys1',
              },
              {
                subKey: "sys2",
                title: "用户中心",
                seckey:'sys2',
                menuItmList: [
                  {
                    title: "基本资料",
                    itemKey: "ziliao",
                    path: "/user",
                    threekey:'jibenziliao'
                  },
                  {
                    title: "实名认证",
                    itemKey: "renzheng",
                    path: "/Verified",
                    threekey:'smrenzheng'
                  },
                  {
                    title: "安全设置",
                    itemKey: "safeSet",
                    path: "/safeSet",
                    threekey:'safeSet'
                  }
                ]
              },
              {
                subKey: "sys3",
                seckey:'sys3',
                title: "消息中心"
              },
              {
                subKey: "sys4",
                seckey:'sys4',
                title: "日志管理"
              }
            ]
          }
        ],
        defaultChoiceList:['gailan'],
        defaultopenkeys:['gailan'],
        ifShowMenu:true
      };
    },
    watch:{
      $route(newVal,oldVal){
        var routerParm = this.$route.query;
        if(routerParm.activekey && routerParm.activekey.length){
          this.ifShowMenu = false;
          this.defaultChoiceList = routerParm.activekey;
          this.defaultopenkeys = routerParm.openkey;
          setTimeout(()=>{
            this.ifShowMenu = true;
          },100);
          localStorage.setItem('activKey',routerParm.activekey)
          localStorage.setItem('openkey',routerParm.openkey)
        }
        this.$forceUpdate();
      }
    },
    created(){
      this.$store.dispatch('getUserInfo');
      this.$store.dispatch('setBusInfo');
      var routerobj = this.$route.path;
      if(routerobj == '/dashBaord'){
        this.defaultChoiceList = ['gailan'];
        this.defaultopenkeys = ['gailan']
      }
      else{
        this.defaultChoiceList = [];
        this.defaultopenkeys = [];
        var activKey = localStorage.getItem('activKey');
        var openkey = localStorage.getItem('openkey').split(',');
        this.defaultChoiceList.push(activKey);
        this.defaultopenkeys = openkey;
        this.$forceUpdate();
      }
    },
    mounted() {
      this.showHeader();
    },
    methods: {
      getUserInfo(){
        userInfo().then(res => {
          if(res.code == 200000) {
            this.userInfomation=res.data;
            localStorage.setItem("yk-userInfo",JSON.stringify(res.data));
          }else {

          }
        }).catch(err => {
          console.log(err)
        })
      },
      logout(){
        this.$router.push({path:"/login"})
        localStorage.removeItem('yk-token');
      },
      collapse() {
        this.collapsed = !this.collapsed;
        this.showHeader();
        this.$store.commit('set_collapsed', this.collapsed);
      },
      showHeader() {
        var cloudHeaderDom = document.getElementsByClassName("cloudHeader")[0];
        if (this.collapsed) {
          cloudHeaderDom.style = ` width: calc(100% - 80px);transition: width 0.29s cubic-bezier(0.2, 0, 0, 1) 0s;`;
        } else {
          cloudHeaderDom.style = ` width: calc(100% - 250px);transition: width 0.2s cubic-bezier(0.2, 0, 0, 1) 0s;`;
        }
      },
      menuHandleClick(e) {
        this.breadArr = [];
        if (e.key == "sys1") {
          this.breadArr.splice(0, 0, "系统管理", "企业设置");
          this.$router.push({
            path: "/businessSet"
          });
        }
        else if(e.key.indexOf('caiwu') != -1){
          var keyVal = e.key;
          if(keyVal == 'caiwu1'){
            this.breadArr.splice(0, 0, "财务中心", "财务总览");
            // this.$router.push({
            //   path: "/businessSet"
            // });
          }
          else if(keyVal == 'caiwu2'){
            this.breadArr.splice(0, 0, "财务中心", "消费中心");
            // this.$router.push({
            //   path: "/businessSet"
            // });
          }
          else if(keyVal == 'caiwu3'){
            this.breadArr.splice(0, 0, "财务中心", "成本账单");
            // this.$router.push({
            //   path: "/businessSet"
            // });
          }
          else if(keyVal == 'caiwu4'){
            this.breadArr.splice(0, 0, "财务中心", "收支明细");
            // this.$router.push({
            //   path: "/businessSet"
            // });
          }
          else if(keyVal == 'caiwu5'){
            this.breadArr.splice(0, 0, "财务中心", "订单管理");
             this.$router.push({
               path: "/orderMan"
             });
          }
          else if(keyVal == 'caiwu6'){
            this.breadArr.splice(0, 0, "财务中心", "续费管理");
            // this.$router.push({
            //   path: "/businessSet"
            // });
          }
          else if(keyVal == 'caiwu7'){
            this.breadArr.splice(0, 0, "财务中心", "退订管理");
            // this.$router.push({
            //   path: "/businessSet"
            // });
          }
          else if(keyVal == 'caiwu8'){
            this.breadArr.splice(0, 0, "财务中心", "发票管理");
            this.$router.push({
              path: "/invoiceMan"
            })
          }
          else if(keyVal == 'caiwu9'){
            this.breadArr.splice(0, 0, "财务中心", "合同管理");
            // this.$router.push({
            //   path: "/businessSet"
            // });
          }
        }
        else if (e.key == "gailan") {
          this.breadArr.push("概览");
          this.$router.push({
            path: "/dashBaord"
          });
        } else {
          this.menuList.forEach(item => {
            if (item.list.length > 0) {
              item.list.forEach(subItem => {
                if (subItem.seckey == e.keyPath[e.keyPath.length-1]) {
                  this.breadArr.push(item.moduleTitle);
                  this.breadArr.push(subItem.title);
                  subItem.menuItmList.forEach(child => {
                    if(child.children){
                      child.children.forEach(ele=>{
                        if(ele.fourkey == e.keyPath[0]){
                          this.breadArr.push(child.title);
                          this.breadArr.push(ele.title)
                          if(ele.path){
                            this.$router.push({path:ele.path})
                          }
                        }
                      })
                    }else if (child.threekey == e.keyPath[0]) {
                      this.breadArr.push(child.title);
                      if (child.path) {
                        this.$router.push({
                          path: child.path,
                          query:{
                            serviceModel:child.serviceModel
                          }
                        });
                      }
                    }
                  });
                }
              });
            }
          });
        }
        localStorage.setItem('activKey',e.key);
        var openPath = e.keyPath;
        var inx = openPath.indexOf(e.key);
        openPath.splice(inx,1);
        var operPatnlist = openPath.reverse();
        localStorage.setItem('openkey',operPatnlist)
      }
    }
  };
</script>
<style lang="scss" scoped>
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #components-layout-demo-custom-trigger {
    /deep/ .ant-layout-sider-dark {
      /deep/ .ant-layout-sider-children {
        /deep/ .ant-menu-dark {
          /deep/ .ant-menu-submenu-inline {
            /deep/ .ant-menu-submenu-title {
              padding-left: 44px !important;

            }
          }
        }
      }
    }
  }

  #components-layout-demo-custom-trigger {
    /deep/ .ant-menu-dark {
      /deep/ .ant-menu-inline {
        /deep/ .ant-menu-item {
          padding-left: 70px !important;
        }
        /deep/ .ant-menu-submenu {
          padding-left: 26px !important;
        }
      }
    }
  }

  #components-layout-demo-custom-trigger {
    /deep/ .ant-layout-sider {
      height: 100%;
      overflow-y: scroll;
    }
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }
  #components-layout-demo-custom-trigger {
    width: 100%;
    .cloudContainer {
      flex: 1;
      .cloudHeader {
        position: fixed;
        right: 0;
        display: flex;
        background: #fff;
        justify-content: space-between;
        padding: 0;
        z-index: 9999 !important;
        .headerRight {
          margin-right: 24px;
          width: 50%;
          height: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .avtor{
            width: 43px;
            height: 43px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            border:1px solid #ccc;
          }
          .ant-dropdown-link{
            cursor: pointer;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #494A4B;
          }
        }
      }
    }
    .logo {
      height: 50px;
      margin: 16px;
      display: flex;
      color: #fff;
      align-items: center;
      justify-content: center;
      .pic {
        width: 30px;
      }
      .sidebar-title {
        margin-left: 12px;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
</style>
