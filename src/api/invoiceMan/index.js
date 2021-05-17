import {HTTPURL} from '../requestUrl';
let totalUrl = HTTPURL+'/admin';
//发票管理搜索接口
export const fapSearch = params => {
    return axios.post(`${totalUrl}/Invoice/queryInvoiceInfoList`, params).then(res => res.data);
}
//发票基本信息查询  
export const queryInvoiceBase = params => {
    return axios.post(`${totalUrl}/Invoice/queryInvoiceBase`, params).then(res => res.data);
}
//发票详情查询接口    
export const queryInvoiceDetail = params => {
    return axios.post(`${totalUrl}/Invoice/queryInvoiceInfo`, params).then(res => res.data);
}
//发票详情，订单信息接口
export const queryInvoiceOrderList = params => {
    return axios.post(`${totalUrl}/Invoice/queryInvoiceOrderList`, params).then(res => res.data);
}
//导出开票订单信息
export const exportInvoiceDetail = params => { return axios.get(`${totalUrl}/Invoice/exportInvoiceOrder`, {params: params,responseType: "blob"}).then(res => res.data); };
//发票操作接口   
export const operateInvoice = params => {
    return axios.post(`${totalUrl}/Invoice/operateInvoice`, params).then(res => res.data);
}
//获取用户信息
export const getUserInfo = params => { return axios.post(`${HTTPURL}/ucenter/user/info`, params).then(res => res.data); };

//发票基本信息修改
export const editInvoiceBase = params => {
    return axios.post(`${totalUrl}/Invoice/updateInvoiceBase`, params).then(res => res.data);
}
//查询寄送地址列表信息
export const queryPostAddressList = params => {
    return axios.post(`${totalUrl}/Invoice/queryPostAddressList`, params).then(res => res.data);
}
//删除寄送地址  
export const deletePostAddress = params => {
    return axios.post(`${totalUrl}/Invoice/deletePostAddress`, params).then(res => res.data);
}
//获取省信息列表
export const getProvince = params => {
    return axios.post(`${totalUrl}/Area/getProvince`, params).then(res => res.data);
}
//获得市信息列表    
export const getCity = params => {
    return axios.post(`${totalUrl}/Area/getCity`, params).then(res => res.data);
}
//新增寄送地址信息   
export const addPostAddress = params => {
    return axios.post(`${totalUrl}/Invoice/addPostAddress`, params).then(res => res.data);
}
//修改寄送地址    
export const updatePostAddress = params => {
    return axios.post(`${totalUrl}/Invoice/updatePostAddress`, params).then(res => res.data);
}