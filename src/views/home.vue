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
        :default-selected-keys="['1']"
        @click="menuHandleClick"
        :inlineCollapsed="true"
      >
        <template v-for="item in menuList">
          <a-menu-item
            disabled="true"
            v-show="!collapsed"
            v-if="item.list.length>0"
            :key="item.moduleTitle"
          >
            <span>{{item.moduleTitle}}</span>
          </a-menu-item>
          <a-menu-item v-show="!collapsed" v-else :key="item.moduleTitle">
            <a-icon type="user" />
            <span>{{item.moduleTitle}}</span>
          </a-menu-item>
          <template v-if="item.moduleTitle == '系统管理'">
            <template v-for="subItem in item.list">
              <a-menu-item
                :key="subItem.title"
                v-if="subItem.title=='企业设置' "
                style="padding-left: 44px !important;"
              >
                <a-icon type="user" />
                <span v-if="!collapsed">{{ subItem.title }}</span>
              </a-menu-item>
              <a-sub-menu v-else :key="subItem.title">
                <span slot="title">
                  <a-icon type="user" />
                  <span>{{ subItem.title }}</span>
                </span>
                <a-menu-item
                  v-for="item1 in subItem.menuItmList"
                  :key="item1.itemKey"
                >{{ item1.title}}</a-menu-item>
              </a-sub-menu>
            </template>
          </template>
          <template v-else>
            <a-sub-menu v-for="subItem in item.list" :key="subItem.title">
              <span slot="title">
                <a-icon type="user" />
                <span>{{ subItem.title }}</span>
              </span>
              <a-menu-item
                v-for="item1 in subItem.menuItmList"
                :key="item1.itemKey"
              >{{ item1.title}}</a-menu-item>
            </a-sub-menu>
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout class="cloudContainer">
      <a-layout-header class="cloudHeader">
        <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="collapse" />
        <div class="headerRight"></div>
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
export default {
  data() {
    return {
      title: "Shopia云服务平台",
      logo:
        "https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png",
      collapsed: false,
      breadArr: [],
      menuList: [
        {
          moduleTitle: "概览",
          list: []
        },
        {
          moduleTitle: "应用管理",
          list: [
            {
              subKey: "myYingyong",
              title: "我的应用",
              menuItmList: [
                {
                  title: "概览",
                  itemKey: "yingyong1",
                  path: ""
                },
                {
                  title: "应用列表",
                  itemKey: "yingyong2",
                  path: "/application/list"
                },

                {
                  title: "监控报表",
                  itemKey: "yingyong3",
                  path: "/monRep"
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
              menuItmList: [
                {
                  title: "API管理",
                  itemKey: "yuyanAPI",
                  path: "/apiMan",
                  serviceModel: 1
                },
                {
                  title: "SDK管理",
                  itemKey: "yuyanSDK",
                  path: "/sdkMan",
                  serviceModel: 1
                }
              ]
            },
            {
              subKey: "pro2",
              title: "语音技术",
              menuItmList: [
                {
                  title: "API管理",
                  itemKey: "yuyinAPI",
                  path: "/apiMan",
                  serviceModel: 2
                },
                {
                  title: "SDK管理",
                  itemKey: "yuyinSDK",
                  path: "/sdkMan",
                  serviceModel: 2
                }
              ]
            },
            {
              subKey: "pro3",
              title: "人脸识别",
              menuItmList: [
                {
                  title: "API管理",
                  itemKey: "renlianAPI",
                  path: "/apiMan",
                  serviceModel: 3
                },
                {
                  title: "SDK管理",
                  itemKey: "renlianSDK",
                  path: "/sdkMan",
                  serviceModel: 3
                }
              ]
            },
            {
              subKey: "pro4",
              title: "人体分析",
              menuItmList: [
                {
                  title: "API管理",
                  itemKey: "rentiAPI",
                  path: "/apiMan",
                  serviceModel: 4
                },
                {
                  title: "SDK管理",
                  itemKey: "rentiSDK",
                  path: "/sdkMan",
                  serviceModel: 4
                }
              ]
            },
            {
              subKey: "pro5",
              title: "文字识别",
              menuItmList: [
                {
                  title: "API管理",
                  itemKey: "wenziAPI",
                  path: "/apiMan",
                  serviceModel: 5
                },
                {
                  title: "SDK管理",
                  itemKey: "wenziSDK",
                  path: "/sdkMan",
                  serviceModel: 5
                }
              ]
            },
            {
              subKey: "pro6",
              title: "图像技术",
              menuItmList: [
                {
                  title: "API管理",
                  itemKey: "tuxiangAPI",
                  path: "/apiMan",
                  serviceModel: 6
                },
                {
                  title: "SDK管理",
                  itemKey: "tuxiangSDK",
                  path: "/sdkMan",
                  serviceModel: 6
                }
              ]
            },
            {
              subKey: "pro7",
              title: "视频技术",
              menuItmList: [
                {
                  title: "API管理",
                  itemKey: "shipinAPI",
                  path: "/apiMan",
                  serviceModel: 7
                },
                {
                  title: "SDK管理",
                  itemKey: "shipinSDK",
                  path: "/sdkMan",
                  serviceModel: 7
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
              menuItmList: [
                {
                  title: "推荐应用",
                  itemKey: "tuijianyingyong",
                  path: "/recommendation/application/list"
                },
                {
                  title: "获取推荐结果"
                },
                {
                  title: "数据管理"
                },
                {
                  title: "推荐池物品"
                }
              ]
            },
            {
              subKey: "dataSer2",
              title: "用户画像"
            }
          ]
        },
        {
          moduleTitle: "工具服务",
          list: [
            {
              subKey: "toolSer1",
              title: "风控管理"
            },
            {
              subKey: "toolSer2",
              title: "财税计算"
            },
            {
              subKey: "toolSer3",
              title: "出行工具"
            }
          ]
        },
        {
          moduleTitle: "系统管理",
          list: [
            {
              subKey: "sys1",
              title: "企业设置",
              path: "/businessSet"
            },
            {
              subKey: "sys2",
              title: "个人设置",
              menuItmList: [
                {
                  title: "基本资料",
                  itemKey: "ziliao",
                  path: "/user"
                },
                {
                  title: "实名认证",
                  itemKey: "renzheng"
                },

                {
                  title: "安全设置",
                  itemKey: "safeSet"
                }
              ]
            },
            {
              subKey: "sys3",
              title: "消息中心"
            },
            {
              subKey: "sys4",
              title: "日志管理"
            }
          ]
        }
      ]
    };
  },
  mounted() {
    this.showHeader();
  },
  methods: {
    collapse() {
      this.collapsed = !this.collapsed;
      this.showHeader();
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
      console.log(e);
      this.breadArr = [];
      if (e.key == "企业设置") {
        this.breadArr.splice(0, 0, "系统管理", "企业设置");
        this.$router.push({
          path: "/businessSet"
        });
      } else if (e.key == "概览") {
        this.breadArr.push("概览");
        this.$router.push({
          path: ""
        });
      } else {
        this.menuList.forEach(item => {
          if (item.list.length > 0) {
            item.list.forEach(subItem => {
              if (subItem.title == e.keyPath[1]) {
                this.breadArr.push(item.moduleTitle);
                this.breadArr.push(subItem.title);
                subItem.menuItmList.forEach(child => {
                  if (child.itemKey == e.keyPath[0]) {
                    this.breadArr.push(child.title);
                    console.log(child, "child");
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
      z-index: 1 !important;
      .headerRight {
        margin-right: 24px;
        width: 500px;
        height: 100%;
        background: #000;
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
