
import {HTTPURL} from '../requestUrl';
let totalUrl = HTTPURL + '/admin';

//SDK部分

//SDK申请
export const sdkApply = params => { 
    return axios.post(`${totalUrl}/sdk/apply`, params).then(res => res.data);
};
//获取SDK申请列表
export const getSdkApplyList = params => { 
    return axios.get(`${totalUrl}/sdk/applyList`, {params: params}).then(res => res.data);
};
//SDK授权
export const sdkAuth = params => { 
    return axios.post(`${totalUrl}/sdk/authorization`, params).then(res => res.data);
};
//获取SDK授权列表
export const getSdkAuthList = params => { 
    return axios.get(`${totalUrl}/sdk/authorizationList`, {params: params}).then(res => res.data);
};
//获取SDK申请SDK选择数据  
export const getSdkmodeList = params => { 
    return axios.get(`${totalUrl}/service/modelListSDK`, {params: params}).then(res => res.data);
};
//SDK管理 
export const getSdkManagement = params => { 
    return axios.get(`${totalUrl}/sdk/sdkManagement`, {params: params}).then(res => res.data);
};
//企业应用列表   
export const getAppList = params => { 
    return axios.get(`${totalUrl}/app/list`, {params: params}).then(res => res.data);
};
//获取SDK名称列表接口
export const getSdkNameList = params => {
    return axios.get(`${totalUrl}/sdk/authorizationSDK`, {params: params}).then(res => res.data);
}
//SDK资源列表
export const getSdkSourceList = params => {
    return axios.get(`${totalUrl}/sdk/sdkResource`, {params: params}).then(res => res.data);
}

//API部分

//api访问趋势
export const apiVisitTrend = params => { 
    return axios.post(`${totalUrl}/APIService/apiVisitTrend`, params).then(res => res.data);
};
//api访问趋势详情
export const apiVisitTrendInfo = params => {
    return axios.get(`${totalUrl}/APIService/apiVisitTrendInfo`, {params: params}).then(res => res.data);
}
//能力服务列表
export const serviceList = params => { 
    return axios.post(`${totalUrl}/APIService/serviceList`, params).then(res => res.data);
};
//监控报表选择API
export const getRepApiList = params => {
    return axios.get(`${totalUrl}/app/loadConf`, {params: params}).then(res => res.data);
}
//监控报表查询接口 
export const getMonitorData = params => {
    return axios.get(`${HTTPURL}/ai/statistics/monitorReport`, {params: params}).then(res => res.data);
}
//企业认证   
export const comAuthentication = params => { 
    return axios.post(`${HTTPURL}/ucenter/enterpriseAuthentication`, params).then(res => res.data);
};
//企业认证信息查询   
export const getAuthInfo = params => { 
    return axios.post(`${HTTPURL}/ucenter/enterpriseAuthenticationInfo`, params).then(res => res.data);
};
