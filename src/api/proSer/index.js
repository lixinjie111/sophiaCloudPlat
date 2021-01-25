
import {devUrl} from '../requestUrl';

//SDK部分

//SDK申请
export const sdkApply = params => { 
    return axios.post(`${devUrl}/sdk/apply`, params).then(res => res.data);
};
//获取SDK申请列表
export const getSdkApplyList = params => { 
    return axios.get(`${devUrl}/sdk/applyList`, {params: params}).then(res => res.data);
};
//SDK授权
export const sdkAuth = params => { 
    return axios.post(`${devUrl}/sdk/authorization`, params).then(res => res.data);
};
//获取SDK授权列表
export const getSdkAuthList = params => { 
    return axios.get(`${devUrl}/sdk/authorizationList`, {params: params}).then(res => res.data);
};
//获取SDK申请SDK选择数据  
export const getSdkmodeList = params => { 
    return axios.get(`${devUrl}/service/modelList`, {params: params}).then(res => res.data);
};
//SDK管理 
export const getSdkManagement = params => { 
    return axios.get(`${devUrl}/sdk/sdkManagement`, {params: params}).then(res => res.data);
};
//企业应用列表   
export const getAppList = params => { 
    return axios.get(`${devUrl}/app/list`, {params: params}).then(res => res.data);
};
//获取SDK名称列表接口
export const getSdkNameList = params => {
    return axios.get(`${devUrl}/sdk/authorizationSDK`, {params: params}).then(res => res.data);
}
//SDK资源列表
export const getSdkSourceList = params => {
    return axios.get(`${devUrl}/sdk/sdkResource`, {params: params}).then(res => res.data);
}

//API部分

//api访问趋势
export const apiVisitTrend = params => { 
    return axios.post(`${devUrl}/APIService/apiVisitTrend`, params).then(res => res.data);
};
//api访问趋势详情
export const apiVisitTrendInfo = params => {
    return axios.get(`${devUrl}/APIService/apiVisitTrendInfo`, {params: params}).then(res => res.data);
}
//能力服务列表
export const serviceList = params => { 
    return axios.post(`${devUrl}/APIService/serviceList`, params).then(res => res.data);
};