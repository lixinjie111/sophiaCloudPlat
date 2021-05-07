import {HTTPURL} from '../requestUrl';
import qs from 'qs';

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
