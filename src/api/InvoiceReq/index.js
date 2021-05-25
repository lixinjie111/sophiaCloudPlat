
import {HTTPURL} from '../requestUrl';

/**
 * 登录
 */
export const queryEnableOrderList = params => { return axios.post(`${HTTPURL}/admin/Invoice/queryEnableOrderList`, params).then(res => res.data); };
export const queryDisableOrderList = params => { return axios.post(`${HTTPURL}/admin/Invoice/queryDisableOrderList`, params).then(res => res.data); };
export const pretreatInvoice = params => { return axios.post(`${HTTPURL}/admin/Invoice/pretreatInvoice`, params).then(res => res.data); };
export const queryEmailList = params => { return axios.post(`${HTTPURL}/admin/Invoice/queryEmailList`, params).then(res => res.data); };
export const addInvoice = params => { return axios.post(`${HTTPURL}/admin/Invoice/addInvoice`, params).then(res => res.data); };