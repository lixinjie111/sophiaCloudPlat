// 不在菜单导航里的路由
const Login = resolve => require(['@/views/login/index'], resolve)
const alipay = resolve => require(['@/views/alipay/index'], resolve)
const register = resolve => require(['@/views/login/register'], resolve)
const Home = resolve => require(['@/views/home'], resolve)

//我的应用监控报表
const monRep = resolve => require(['@/views/proSer/monRep'], resolve);
const safeSet = resolve => require(['@/views/user/safeSet'], resolve);
const modifyPwd = resolve => require(['@/views/user/modifyPwd'], resolve);
const modifyTel = resolve => require(['@/views/user/modifyTel'], resolve);
const safeEmail = resolve => require(['@/views/user/safeEmail'], resolve);
const authentPop = resolve => require(['@/views/user/authentPop'], resolve);
const agmAndfd = resolve => require(['@/views/user/agmAndfd'], resolve);
const dashBaord = resolve => require(['@/views/dashBaord/index'], resolve);
const overview = resolve => require(['@/views/application/overview'], resolve);
const openMy = resolve => require(['@/views/application/openMy'], resolve);
const buyBag = resolve => require(['@/views/application/buyBag'], resolve);
const finance = resolve => require(['@/views/finance/index'], resolve);
const charge = resolve => require(['@/views/finance/charge'], resolve);
const barView = resolve => require(['@/components/echarts/barView'], resolve);

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
const Verified = resolve => require(['@/views/Verified/index'],resolve);

//数据服务智能推荐
const recommendationAppList = resolve => require(['@/views/recommendation/application/list'], resolve);
const recommendationAppDetail = resolve => require(['@/views/recommendation/application/detail'], resolve);
const recommendationSceneList = resolve => require(['@/views/recommendation/scene/list'], resolve);
const recommendationSceneEdit = resolve => require(['@/views/recommendation/scene/edit'], resolve);
const recommendationSceneDetail = resolve => require(['@/views/recommendation/scene/detail'], resolve);
const recommendationSceneData = resolve => require(['@/views/recommendation/scene/data'], resolve);
const recommendationSceneRule = resolve => require(['@/views/recommendation/scene/rule'], resolve);
const recommendationSceneFeature = resolve => require(['@/views/recommendation/scene/feature'], resolve);

//数据服务 数据管理
const recommendationDataList = resolve => require(['@/views/recommendation/data/list'], resolve);
const recommendationDataDetail = resolve => require(['@/views/recommendation/data/detail'], resolve);

// 黑名单管理
const recommendationDataBlacklist= resolve => require(['@/views/recommendation/data/blacklist'], resolve);
const recommendationDataBlacklistDetail= resolve => require(['@/views/recommendation/data/blacklistDetail'], resolve);

//数据服务 推荐运营
const recommendationOperationResult = resolve => require(['@/views/recommendation/operation/result'], resolve);

//发票管理
const invoiceMan = resolve => require(['@/views/invoiceMan/index'], resolve);
const invoiceDetail = resolve => require(['@/views/invoiceMan/invoiceDetail'], resolve);
const InvoiceReq = resolve => require(['@/views/invoiceMan/InvoiceReq'], resolve);
//收支明细
const Inexpdetails = resolve => require(['@/views/Inexpdetails/index'], resolve);
//推荐运营 物料及用户管理
const recommendationMateriel = resolve => require(['@/views/recommendation/materiel/list'], resolve);
//必推物品池
const recommendationMaterielWillPush = resolve => require(['@/views/recommendation/materiel/willPush'], resolve);
// 物料详情
const recommendationMaterielDetail = resolve => require(['@/views/recommendation/materiel/detail'], resolve);
// 资讯池
const recommendationInformationPool = resolve => require(['@/views/recommendation/informationPool'], resolve); // 资讯池
const recommendationInformationPoolWillPush = resolve => require(['@/views/recommendation/informationPool/willPush'], resolve); // 必推资讯池
// 场景更新记录
const sceneUpdateRecord = resolve => require(['@/views/recommendation/sceneUpdateRecord'], resolve); // 场景更新记录列表
//订单管理
const orderMan = resolve => require(['@/views/order/orderMan'], resolve);
const pay = resolve => require(['@/views/order/pay'], resolve);
const orderInfo = resolve => require(['@/views/order/orderInfo'], resolve);
const orderInfoLaterPaid = resolve => require(['@/views/order/orderInfoLaterPaid'], resolve); // 后付费已支付订单详情
export const publicRouterMap = [
        { path: '/login', name: 'Login', component: Login },
        { path: '/register', name: 'register', component: register },
        { path: '/alipay', name: 'alipay', component: alipay },
        // { path: '*', redirect: '/404' }
    ]
    // 在菜单导航里的路由
export const menuRouterMap = [{
    path: "/",
    name: "home",
    component: Home,
    redirect: "/dashBaord",
    children: [
      {
        name: 'orderMan',
        path: '/orderMan',
        component: orderMan
      },
      {
        name: 'pay',
        path: '/pay',
        component: pay
      },
      {
        name: 'orderInfo',
        path: '/orderInfo',
        component: orderInfo
      },
      {
        name: 'orderInfoLaterPaid',
        path: '/orderInfoLaterPaid',
        component: orderInfoLaterPaid
      },
        {
            name: "applicationList",
            path: "application/list",
            component: applicationList
        },
        {
            name: "safeSet",
            path: "/safeSet",
            component: safeSet
        },
        {
            name: "modifyPwd",
            path: "/modifyPwd",
            component: modifyPwd
        },
        {
            name: "modifyTel",
            path: "/modifyTel",
            component: modifyTel
        },
        {
            name: "safeEmail",
            path: "/safeEmail",
            component: safeEmail
        },
        {
          name:'authentPop',
          path:"/authentPop",
          component:authentPop
        },
        {
          name:'agmAndfd',
          path:'/agmAndfd',
          component:agmAndfd
        },
        {
            name: "overview",
            path: "/overview",
            component: overview
        },
        {
            name: "openMy",
            path: "/openMy",
            component: openMy
        },
        {
            name: "buyBag",
            path: "/buyBag",
            component: buyBag
        },
        {
            name: "finance",
            path: "/finance",
            component: finance
        },
        {
            name: "charge",
            path: "/charge",
            component: charge
        },
        {
            name: "dashBaord",
            path: "/dashBaord",
            component: dashBaord
        },
        {
            name: "barView",
            path: "/barView",
            component: barView
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
          name:'Verified',
          path: "/Verified",
          component: Verified
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
          name: "recommendationSceneFeature",
          path: "/recommendation/scene/feature",
          component: recommendationSceneFeature
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
        {
          name: "recommendationDataDetail",
          path: "/recommendation/data/detail",
          component: recommendationDataDetail
        },
        {
          name: "recommendationDataBlacklist",
          path: "/recommendation/data/blacklist",
          component: recommendationDataBlacklist
        },
        {
          name: "recommendationDataBlacklistDetail",
          path: "/recommendation/data/blacklist/detail",
          component: recommendationDataBlacklistDetail
        },
        {
          name: "recommendationOperationResult",
          path: "/recommendation/operation/result",
          component: recommendationOperationResult
        },
        {
          name:'Inexpdetails',
          path:'/Inexpdetails',
          component:Inexpdetails
        },
        {
          name:'invoiceMan',
          path:'/invoiceMan',
          component:invoiceMan
        },
        {
          name:'invoiceDetail',
          path:'/invoiceDetail',
          component:invoiceDetail
        },
        {
          name:'InvoiceReq',
          path:'/InvoiceReq',
          component:InvoiceReq
        },
        {
          name: "recommendationMateriel",
          path: "/recommendation/materiel",
          component: recommendationMateriel
        },
        {
          name: "recommendationMaterielDetail",
          path: "/recommendation/materiel/detail",
          component: recommendationMaterielDetail
        },
        {
          name: "recommendationMaterielWillPush",
          path: "/recommendation/materiel/willPush",
          component: recommendationMaterielWillPush
        },
        {
          name: "recommendationInformationPool",
          path: "/recommendation/informationPool",
          component: recommendationInformationPool
        },
        {
          name: "recommendationInformationPoolWillPush",
          path: "/recommendation/informationPool/willPush",
          component: recommendationInformationPoolWillPush
        },
        {
          name: "sceneUpdateRecord",
          path: "/recommendation/jiluguanl/sceneUpdateRecord",
          component: sceneUpdateRecord
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
