<template>
<a-config-provider :locale="locale">
  <div id="app">
    <router-view></router-view>
  </div>
</a-config-provider>
</template>

<script>
import zhCN from 'x-intelligent-ui/lib/locale-provider/zh_CN'
export default {
  	name: 'App',
  	data() {
      return {
        locale:zhCN
      }
    },
}
</script>

<style lang="scss">
#app {
.el-step__head.is-success {
  color: #1890FF !important;
  border-color: #1890FF !important;
}

.el-step__title.is-success {
  color: #1890FF !important;
}
	height: 100%;
}
::-webkit-scrollbar {
    position: absolute;
    height: 8px;
    width: 8px;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    border-radius: 2px;
}
::-webkit-scrollbar-button {
    display: none;
}
::-webkit-scrollbar-thumb {
   position: absolute;
    width: 8px;
    min-height: 15px;
    background: rgba(122, 121, 121, 0.6) !important;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    border-radius: 2px;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  // 每页的标题
  .page-title {
    font-size: 14px;
    font-weight: 500;
    color: #676970;
    line-height: 20px;
  }
}

// 虚线分隔线表格
.dotted-line-table {
  .ant-table.ant-table-bordered {
    table,
    .ant-table-thead>tr>th,
    .ant-table-tbody>tr>td {
      border: none;
    }
    .ant-table-thead>tr>th {
      font-weight: 500;
    }
    .ant-table-tbody>tr:first-child>td {
      border-top: 1px solid #e8e8e8;
    }
    .ant-table-tbody>tr>td {
      border-bottom: 1px solid #e8e8e8;
      padding: 9px 16px;
    }
  }
}
</style>
