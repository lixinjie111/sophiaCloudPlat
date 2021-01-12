<template>
  <a-layout id="components-layout-demo-custom-trigger" style="height:100%">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" >
        <template v-if="collapsed"  class="sidebar-logo-link" to="/">
            <div class="pic" v-if="logo">
                <img  :src="logo" class="sidebar-logo">
            </div>
            <h1 v-else class="sidebar-title">{{ title }} </h1>
        </template>
        <template v-else  class="sidebar-logo-link" to="/">
            <div class="pic" v-if="logo">
                <img :src="logo" class="sidebar-logo">
            </div>
            <h1 class="sidebar-title">{{ title }} </h1>
        </template>
      </div>
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item disabled="true">
          <span>应用管理</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="user" /><span>我的应用</span></span>
          <a-menu-item key="3">
            应用1
          </a-menu-item>
          <a-menu-item key="4">
            应用2
          </a-menu-item>
          <a-menu-item key="5">
            应用3
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" class="cloudHeader">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
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
      title: 'Vue Admin',
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
      collapsed: false,
    };
  },
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


#components-layout-demo-custom-trigger .ant-menu-dark.ant-menu-inline .ant-menu-submenu-title{
  padding-left: 44px !important;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
#components-layout-demo-custom-trigger  {
    .cloudHeader{
        
    }
    .logo{
        height: 50px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
        display: flex;
        color: #fff;
        align-items: center;
        justify-content: center;
        .pic{
            width: 30px;
        }
        .sidebar-title{
            margin-left: 12px;
            color: #fff;
            font-size: 14px;
            font-weight: 600;
        }
    }
  
}

</style>