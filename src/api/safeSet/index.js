
import {HTTPURL} from '../requestUrl';

/**
 * 登录
 */
export const sendVerifyEmail = params => { return axios.post(`${HTTPURL}/ucenter/sendVerifyEmail`, params).then(res => res.data); };
export const verifyEmailCode = params => { return axios.post(`${HTTPURL}/ucenter/verifyEmailCode`, params).then(res => res.data); };
export const modifyPassword = params => { return axios.post(`${HTTPURL}/ucenter/modifyPassword`, params).then(res => res.data); };
export const changeMobile = params => { return axios.post(`${HTTPURL}/ucenter/changeMobile`, params).then(res => res.data); };
export const enableProtect = params => { return axios.post(`${HTTPURL}/ucenter/enableProtect`, params).then(res => res.data); };
export const disableProtect = params => { return axios.post(`${HTTPURL}/ucenter/disableProtect`, params).then(res => res.data); };

export const securityInfo = params => { return axios.get(`${HTTPURL}/ucenter/securityInfo`, {params: params}).then(res => res.data); };
