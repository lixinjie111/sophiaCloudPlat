
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