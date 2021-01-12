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
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']" @click="menuHandleClick">
        <!--应用管理部分-->
        <a-menu-item disabled="true" v-if="!collapsed">
          <span>应用管理</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="user" />
            <span>我的应用</span>
          </span>
          <a-menu-item key="1">应用1</a-menu-item>
          <a-menu-item key="2">应用2</a-menu-item>
          <a-menu-item key="3">应用3</a-menu-item>
        </a-sub-menu>
        <!--产品服务部分-->
        <a-menu-item disabled="true" v-if="!collapsed">
          <span>产品服务</span>
        </a-menu-item>
        <a-sub-menu v-for="item in proServiceList" :key="item.subKey">
          <span slot="title">
            <a-icon type="user" />
            <span>{{ item.title }}</span>
          </span>
          <a-menu-item v-for="item1 in item.menuItmList" :key="item1.itemKey">
            {{
            item1.title
            }}
          </a-menu-item>
        </a-sub-menu>
        <!--数据服务部分-->
        <a-menu-item disabled="true" v-if="!collapsed">
          <span>数据服务</span>
        </a-menu-item>
        <a-sub-menu v-for="item in dataSericeList" :key="item.subKey">
          <span slot="title">
            <a-icon type="user" />
            <span>{{ item.title }}</span>
          </span>
        </a-sub-menu>
        <!--工具服务部分-->
        <a-menu-item disabled="true" v-if="!collapsed">
          <span>工具服务</span>
        </a-menu-item>
        <a-sub-menu v-for="item in toolSericeList" :key="item.subKey">
          <span slot="title">
            <a-icon type="user" />
            <span>{{ item.title }}</span>
          </span>
        </a-sub-menu>
        <!--系统管理部分-->
        <a-menu-item disabled="true" v-if="!collapsed">
          <span>系统管理</span>
        </a-menu-item>
        <a-sub-menu v-for="item in systemManList" :key="item.subKey">
          <span slot="title">
            <a-icon type="user" />
            <span>{{ item.title }}</span>
          </span>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout class="cloudContainer">
      <a-layout-header class="cloudHeader">
        <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="collapse" />
        <div class="headerRight"></div>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '84px 16px 24px 16px',
          padding: '24px',
          background: '#fff'
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
      title: "Vue Admin",
      logo:
        "https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png",
      collapsed: false,
      proServiceList: [
        {
          subKey: "pro1",
          title: "自然语言处理",
          menuItmList: [
            {
              title: "API管理",
              itemKey: "yuyanAPI"
            },
            {
              title: "SDK管理",
              itemKey: "yuyanSDK"
            }
          ]
        },
        {
          subKey: "pro2",
          title: "语音技术",
          menuItmList: [
            {
              title: "API管理",
              itemKey: "yuyinAPI"
            },
            {
              title: "SDK管理",
              itemKey: "yuyinSDK"
            }
          ]
        },
        {
          subKey: "pro3",
          title: "人脸识别",
          menuItmList: [
            {
              title: "API管理",
              itemKey: "renlianAPI"
            },
            {
              title: "SDK管理",
              itemKey: "renlianSDK"
            }
          ]
        },
        {
          subKey: "pro4",
          title: "人体分析",
          menuItmList: [
            {
              title: "API管理",
              itemKey: "rentiAPI"
            },
            {
              title: "SDK管理",
              itemKey: "rentiSDK"
            }
          ]
        },
        {
          subKey: "pro5",
          title: "文字识别",
          menuItmList: [
            {
              title: "API管理",
              itemKey: "wenziAPI"
            },
            {
              title: "SDK管理",
              itemKey: "wenziSDK"
            }
          ]
        },
        {
          subKey: "pro6",
          title: "图像技术",
          menuItmList: [
            {
              title: "API管理",
              itemKey: "tuxiangAPI"
            },
            {
              title: "SDK管理",
              itemKey: "tuxiangSDK"
            }
          ]
        },
        {
          subKey: "pro7",
          title: "视频技术",
          menuItmList: [
            {
              title: "API管理",
              itemKey: "shipinAPI"
            },
            {
              title: "SDK管理",
              itemKey: "shipinSDK"
            }
          ]
        }
      ],
      dataSericeList: [
        {
          subKey: "dataSer1",
          title: "智能推荐"
        },
        {
          subKey: "dataSer2",
          title: "用户画像"
        }
      ],
      toolSericeList: [
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
      ],
      systemManList: [
        {
          subKey: "sys1",
          title: "企业设置"
        },
        {
          subKey: "sys2",
          title: "个人设置"
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
        cloudHeaderDom.style = ` width: calc(100% - 80px);transition: width 0.2s cubic-bezier(0.2, 0, 0, 1) 0s;`;
      } else {
        cloudHeaderDom.style = ` width: calc(100% - 250px);transition: width 0.2s cubic-bezier(0.2, 0, 0, 1) 0s;`;
      }
    },
    menuHandleClick(e) {
      var keyPathList = e.keyPath || [];
      console.log(keyPathList, "keyPathList");
      for (var i = 0; i < keyPathList.length; i++) {
        if (keyPathList[1].indexOf("pro") != -1) {
          if (keyPathList[0].indexOf("API") != -1) {
            this.$router.push({
              path: "/apiMan"
            });
          } else if (keyPathList[0].indexOf("SDK") != -1) {
            this.$router.push({
              path: "/sdkMan"
            });
          }
        }
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
    background: rgba(255, 255, 255, 0.2);
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
