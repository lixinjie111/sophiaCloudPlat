import {HTTPURL} from '../requestUrl';
import qs from 'qs'

let totalUrl = HTTPURL + '/admin';
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
// 获取后付费订单详情
export const getPostOrderInfo = params => {
  return axios.post(`${totalUrl}/serviceOrder/getPostOrderInfo`, params);
};
export const batchOrderInfoList = params => {
  return axios.post(`${totalUrl}/serviceOrder/batchOrderInfoList`, params);
};
export const payBulk = params => {
  return axios.post(`${totalUrl}/service/userAccount/payBulk`, params);
};
export const userAccount = params => {
  return axios.get(`${totalUrl}/service/userAccount`, params);
};
