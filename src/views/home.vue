<template>
  <a-layout id="components-layout-demo-custom-trigger" style="height:100%">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
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
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout class="cloudContainer">
      <a-layout-header class="cloudHeader">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="collapse"
        />
        <div class="headerRight"></div>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '88px 16px 24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px'
        }"
      >
        Content
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
      collapsed: false
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
        cloudHeaderDom.style = ` width: calc(100% - 200px);transition: width 0.2s cubic-bezier(0.2, 0, 0, 1) 0s;`;
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
