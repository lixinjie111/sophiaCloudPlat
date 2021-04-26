
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
/*订单列表*/
export const orderList = params => {
    return axios.post(`${totalUrl}/serviceOrder/queryOrderList`, params);
  };
  export const cancelOrder = params => {
    return axios.post(`${totalUrl}/serviceOrder/cancelOrder`, params);
  };
  export const getOrderInfo = params => {
    return axios.post(`${totalUrl}/serviceOrder/getOrderInfo`, params);
  };
  export const batchOrderInfoList = params => {
    return axios.post(`${totalUrl}/serviceOrder/batchOrderInfoList`, params);
  };
  export const payBulk = params => {
    return axios.post(`${totalUrl}/service/userAccount/payBulk`, params);
  };
  export const userAccount = params => {
    return axios.get(`${totalUrl}/service/userAccount`, {params}).then(res => res.data);
};