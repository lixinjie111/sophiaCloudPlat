import App from './App';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import Xui from 'x-intelligent-ui';
import 'x-intelligent-ui/dist/main.css';
Vue.use(Xui);

import echarts from "echarts";
Vue.prototype.$echarts = echarts;

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
axiosFilter(vm);