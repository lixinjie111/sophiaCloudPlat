// 不在菜单导航里的路由
const Login = resolve => require(['@/views/login/index'], resolve)
const Home = resolve => require(['@/views/home'], resolve)

//产品服务模板页
const apiMan = resolve => require(['@/views/proSer/apiMan'], resolve);
const sdkMan = resolve => require(['@/views/proSer/sdkMan'], resolve);
//SDK申请页面
const sdkApply = resolve => require(['@/views/proSer/sdkApply'],resolve);

//系统管理
const businessSet = resolve => require(['@/views/businessSet/index'],resolve);
const user = resolve => require(['@/views/user/index'],resolve);

export const publicRouterMap = [
        { path: '/login', name: 'Login', component: Login },
        // { path: '*', redirect: '/404' }
    ]
    // 在菜单导航里的路由
export const menuRouterMap = [{
    path: "/",
    name: "home",
    component: Home,
    children: [
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
            name:'sdkApply',
            path: "/sdkApply",
            component: sdkApply
        },
        {
            name:'businessSet',
            path: "/businessSet",
            component: businessSet
        },
        {
            name:'user',
            path: "/user",
            component: user
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