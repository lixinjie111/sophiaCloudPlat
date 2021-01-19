// 不在菜单导航里的路由
const Login = resolve => require(['@/views/login/index'], resolve)
const Home = resolve => require(['@/views/home'], resolve)

//产品服务模板页
const apiMan = resolve => require(['@/views/proSer/apiMan'], resolve);
const sdkMan = resolve => require(['@/views/proSer/sdkMan'], resolve);
// 我的应用
const applicationList = resolve => require(['@/views/application/list'], resolve);
//SDK申请页面
const sdkApply = resolve => require(['@/views/proSer/sdkApply'], resolve);

export const publicRouterMap = [
        { path: '/login', name: 'Login', component: Login },
        // { path: '*', redirect: '/404' }
    ]
    // 在菜单导航里的路由
export const menuRouterMap = [{
    path: "/",
    name: "home",
    component: Home,
    children: [{
            name: "applicationList",
            path: "application/list",
            component: applicationList
        },
        {
            name: "apiMan",
            path: "/apiMan",
            component: apiMan
        },
        {
            name: "sdkMan",
            path: "/sdkMan",
            component: sdkMan
        },
        {
            name: 'sdkApply',
            path: "/sdkApply",
            component: sdkApply
        }
    ]
}];
export default new VueRouter({
    // mode: 'history',
    routes: [
        ...publicRouterMap,
        ...menuRouterMap
    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})