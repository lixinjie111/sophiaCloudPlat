// 不在菜单导航里的路由
const Login = resolve => require(['@/views/login/index'], resolve)
const Home = resolve => require(['@/views/home'], resolve)

//我的应用监控报表
const monRep = resolve => require(['@/views/proSer/monRep'], resolve);

//产品服务模板页
const apiMan = resolve => require(['@/views/proSer/apiMan'], resolve);
const sdkMan = resolve => require(['@/views/proSer/sdkMan'], resolve);
// 我的应用
const applicationList = resolve => require(['@/views/application/list'], resolve);
//SDK申请页面
const sdkApply = resolve => require(['@/views/proSer/sdkApply'], resolve);

//系统管理
const businessSet = resolve => require(['@/views/businessSet/index'],resolve);
const user = resolve => require(['@/views/user/index'],resolve);

//数据服务智能推荐
const recommendationAppList = resolve => require(['@/views/recommendation/application/list'], resolve);
const recommendationAppDetail = resolve => require(['@/views/recommendation/application/detail'], resolve);
const recommendationSceneList = resolve => require(['@/views/recommendation/scene/list'], resolve);
const recommendationSceneEdit = resolve => require(['@/views/recommendation/scene/edit'], resolve);
const recommendationSceneDetail = resolve => require(['@/views/recommendation/scene/detail'], resolve);
const recommendationSceneData = resolve => require(['@/views/recommendation/scene/data'], resolve);
const recommendationSceneRule = resolve => require(['@/views/recommendation/scene/rule'], resolve);

//数据服务 数据管理
const recommendationDataList = resolve => require(['@/views/recommendation/data/list'], resolve);

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
        },
        {
            name:'monRep',
            path: "/monRep",
            component: monRep
        },
        {
          name: "recommendationAppList",
          path: "/recommendation/application/list",
          component: recommendationAppList
        },
        {
          name: "recommendationAppDetail",
          path: "/recommendation/application/detail",
          component: recommendationAppDetail
        },
        {
          name: "recommendationSceneList",
          path: "/recommendation/scene/list",
          component: recommendationSceneList
        },
      {
        name: "recommendationSceneDetail",
        path: "/recommendation/scene/detail",
        component: recommendationSceneDetail
      },
        {
          name: "recommendationSceneData",
          path: "/recommendation/scene/data",
          component: recommendationSceneData
        },
        {
          name: "recommendationSceneRule",
          path: "/recommendation/scene/rule",
          component: recommendationSceneRule
        },
        {
          name: "recommendationSceneEdit",
          path: "/recommendation/scene/edit",
          component: recommendationSceneEdit
        },
        {
          name: "recommendationDataList",
          path: "/recommendation/data/list",
          component: recommendationDataList
        },
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
