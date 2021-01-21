
import {HTTPURL} from '../requestUrl';

/**
 * 登录
 */
export const requestLogin = params => { return axios.post(`${HTTPURL}/ucenter/user/login`, params).then(res => res.data); };
/**
 * 获取图形验证码
 */
export const getVerificationCode = params => { return axios.get(`${HTTPURL}/ucenter/user/getVerificationCode`, {params: params, responseType: 'blob'}).then(res => res.data); };
/**
 * 校验电话号图形验证码
 */
export const verifyPhone = params => { return axios.get(`${HTTPURL}/ucenter/user/verifyPhone`, {params: params}).then(res => res.data); };
/**
 * 发送手机验证码
 */
export const sendMessage = params => { return axios.get(`${HTTPURL}/ucenter/user/sendMessage`, {params: params}).then(res => res.data); };
/**
 * 校验电话号短信验证码
 */
export const verifyPhoneNodeCode = params => { return axios.get(`${HTTPURL}/ucenter/user/verifyPhoneNodeCode`, {params: params}).then(res => res.data); };
/**
 * 重置密码
 */
export const resetPasswords = params => { return axios.get(`${HTTPURL}/ucenter/user/resetPasswords`, {params: params}).then(res => res.data); };