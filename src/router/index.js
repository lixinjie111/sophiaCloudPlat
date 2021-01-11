// import Vue from 'vue'  //加载优化
// import VueRouter from 'vue-router'  //加载优化
// Vue.use(VueRouter)  //加载优化

// 不在菜单导航里的路由
const Login = resolve => require(['@/views/login/index'], resolve)
const Home = resolve => require(['@/views/home'], resolve)

// 在菜单导航里的路由
// 我的数据集
// const Index = resolve => require(['@/views/index/index'], resolve)
// const indexList = resolve => require(['@/views/index/components/list'], resolve)
    // 不在菜单导航里的路由
export const publicRouterMap = [
        { path: '/login', name: 'Login', component: Login },
        // { path: '*', redirect: '/404' }
    ]
    // 在菜单导航里的路由
export const menuRouterMap = [{
    path: "/",
    name: "home",
    component: Home,
    // redirect: "/index",
    // children: [{
    //         name: "Index",
    //         path: "/index",
    //         component: Index,
    //         redirect: "/index/list",
    //         meta: {
    //             title: "我的数据集",
    //             icon: "el-icon-mc-app",
    //             enable: "Y"
    //         },
    //         children: [{
    //                 name: "indexList",
    //                 path: "/index/list",
    //                 component: indexList,
    //                 meta: {
    //                     title: "数据列表",
    //                     enable: "Y"
    //                 },
    //                 children: [],
    //             },
               
    //         ]
    //     },
    //]
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