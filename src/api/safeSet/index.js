
import {HTTPURL} from '../requestUrl';

/**
 * 登录
 */
export const modifyPassword = params => { return axios.post(`${HTTPURL}/ucenter/modifyPassword`, params).then(res => res.data); };
export const changeMobile = params => { return axios.post(`${HTTPURL}/ucenter/changeMobile`, params).then(res => res.data); };
export const enableProtect = params => { return axios.post(`${HTTPURL}/ucenter/enableProtect`, params).then(res => res.data); };
export const disableProtect = params => { return axios.post(`${HTTPURL}/ucenter/disableProtect`, params).then(res => res.data); };

export const securityInfo = params => { return axios.get(`${HTTPURL}/ucenter/securityInfo`, {params: params}).then(res => res.data); };
export const truncAccount = params => { return axios.get(`${HTTPURL}/ucenter/truncAccount`, {params: params}).then(res => res.data); };
export const sendVerifyEmail = params => { return axios.get(`${HTTPURL}/ucenter/sendVerifyEmail`, {params: params}).then(res => res.data); };
export const verifyEmailCode = params => { return axios.get(`${HTTPURL}/ucenter/verifyEmailCode`, {params: params}).then(res => res.data); };
