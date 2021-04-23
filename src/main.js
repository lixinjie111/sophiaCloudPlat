import App from './App';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import Xui from 'x-intelligent-ui';
import 'x-intelligent-ui/dist/main.css';
Vue.use(Xui);

import 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
//vxetable 全局格式化处理函数
const XEUtils = require('xe-utils');
VXETable.formats.mixin({
    // 格式化性别
    formatSex ({ cellValue }) {
      return cellValue ? (cellValue === '1' ? '男' : '女') : ''
    },
    // 格式化下拉选项
    formatSelect ({ cellValue }, list) {
      const item = list.find(item => item.value === cellValue)
      return item ? item.label : ''
    },
    // 格式化日期，默认 yyyy-MM-dd HH:mm:ss
    formatDate ({ cellValue }, format) {
      return XEUtils.toDateString(cellValue, format || 'yyyy-MM-dd HH:mm:ss')
    },
    // 四舍五入金额，每隔3位逗号分隔，默认2位数,格式化金额
    formatAmount ({ cellValue }, digits = 2) {
      return '¥' + XEUtils.commafy(XEUtils.toNumber(cellValue), { digits })
    },
    // 格式化银行卡，默认每4位空格隔开
    formatBankcard ({ cellValue }) {
      return XEUtils.commafy(XEUtils.toValueString(cellValue), { spaceNumber: 4, separator: ' ' })
    },
    // 四舍五入,默认两位数
    formatFixedNumber ({ cellValue }, digits = 2) {
      return XEUtils.toFixed(XEUtils.round(cellValue, digits), digits)
    },
    // 向下舍入,默认两位数
    formatCutNumber ({ cellValue }, digits = 2) {
      return XEUtils.toFixed(XEUtils.floor(cellValue, digits), digits)
    },
    // 转换 moment 类型为字符串
    toMomentString ({ cellValue }, format) {
      return cellValue ? cellValue.format(format) : ''
    }
});
Vue.use(VXETable);
// 全局修改message距离顶部高度
import { message } from 'x-intelligent-ui';
message.config({
  top: `100px`
});

import lxjData from "./utils/lxjData.js"
import fjData from "./utils/fjData.js"

import echarts from "echarts";
Vue.prototype.$echarts = echarts;
Vue.prototype.$lxjData = lxjData;
Vue.prototype.$fjData = fjData;
Vue.prototype.$myUtilsFn = XEUtils;

// 进度条
// 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// 设置进度条
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

Vue.config.productionTip = false;


// 全局静态资源
// import $ from 'jquery';
// import htmlToPdf from '@/assets/js/utils/htmlToPdf';
// Vue.use(htmlToPdf);
import '@/assets/scss/reset.scss';
import '@/assets/scss/public.scss';
// import '@/assets/scss/element-ui-reset.scss';
// import '@/assets/icon-font/iconfont.css';

// 权限
import { setAuthInfo, getAdminId, getAuthInfo, removeAuthInfo } from '@/session/index';
// 在免登录白名单，直接进入
const whiteList = ['/login', '/404'];

//取消请求的对象
window.cancleSource = {};
window.cancelToken = axios.CancelToken;

// import saveModel from '@/components/model/saveModel';
// Vue.component('save-model',saveModel)
router.beforeEach((to, from, next) => {
    window.cancleSource.cancel && window.cancleSource.cancel()
    window.cancleSource = window.cancelToken.source()
    NProgress.start();
    var ykToken=localStorage.getItem('yk-token')
    if(ykToken) {
        next();
    }else {
        if(to.path === '/login') {
            next();
        }else if(to.path === '/register') {
            next();
        }else{
            next('/login');
        }
    }
     NProgress.done()
});
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
router.afterEach(() => {
    NProgress.done()
});

/* eslint-disable no-new */
const vm = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})

// axios 过滤器
import axiosFilter from './api/axiosConfig.js';
import Vue from 'vue';
axiosFilter(vm);
