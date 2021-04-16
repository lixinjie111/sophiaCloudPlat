
import {HTTPURL} from '../requestUrl';

/**
 * 登录
 */
export const warningPushDelete = params => { return axios.get(`${HTTPURL}/ucenter/warningPushDelete`, {params: params}).then(res => res.data); };
export const warningPushList = params => { return axios.get(`${HTTPURL}/ucenter/warningPushList`, {params: params}).then(res => res.data); };
export const warningPushAdd = params => { return axios.post(`${HTTPURL}/ucenter/warningPushAdd`, params).then(res => res.data); };
export const warningPushUpdate = params => { return axios.post(`${HTTPURL}/ucenter/warningPushUpdate`, params).then(res => res.data); };
export const getAuthInfo = params => { return axios.post(`${HTTPURL}/ucenter/enterpriseAuthenticationInfo`, params).then(res => res.data); };