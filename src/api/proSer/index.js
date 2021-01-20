
import {devUrl} from '../requestUrl';
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
