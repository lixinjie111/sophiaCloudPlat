
import {HTTPURL} from '../requestUrl';
let toUrl = HTTPURL+'/admin';
//发票管理搜索接口
export const fapSearch = params => {
    return axios.post(`${toUrl}/Invoice/queryInvoiceInfoList`, params).then(res => res.data);
}
//发票基本信息查询  
export const queryInvoiceBase = params => {
    return axios.post(`${toUrl}/Invoice/queryInvoiceBase`, params).then(res => res.data);
}
//发票详情查询接口    
export const queryInvoiceDetail = params => {
    return axios.post(`${toUrl}/Invoice/queryInvoiceInfo`, params).then(res => res.data);
}