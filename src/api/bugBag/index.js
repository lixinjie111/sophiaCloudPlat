
import {HTTPURL} from '../requestUrl';

/**
 * 登录
 */
export const userAccountSummary = params => { return axios.get(`${HTTPURL}/admin/service/userAccountSummary`, {params: params}).then(res => res.data); };
export const userAccount = params => { return axios.get(`${HTTPURL}/admin/service/userAccount`, {params: params}).then(res => res.data); };
export const getPrepaidFeePackage = params => { return axios.post(`${HTTPURL}/admin/serviceOrder/getPrepaidFeePackage`, params).then(res => res.data); };
export const createOrder = params => { return axios.post(`${HTTPURL}/admin/serviceOrder/createOrder`, params).then(res => res.data); };
export const createPreOderVerify = params => { return axios.post(`${HTTPURL}/admin/serviceOrder/createPreOderVerify`, params).then(res => res.data); };
export const getOrderInfo = params => { return axios.post(`${HTTPURL}/admin/serviceOrder/getOrderInfo`, params).then(res => res.data); };
export const payBulk = params => { return axios.post(`${HTTPURL}/admin/service/userAccount/payBulk`, params).then(res => res.data); };