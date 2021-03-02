
import {HTTPURL} from '../requestUrl';

/**
 * 登录
 */
export const userInfo = params => { return axios.post(`${HTTPURL}/ucenter/user/info`, params).then(res => res.data); };
/**
 * 登录
 */
export const updateInfo = params => { return axios.post(`${HTTPURL}/ucenter/user/updateInfo`, params).then(res => res.data); };
/**
 * 获取图形验证码
 */
//export const updateInfo = params => { return axios.get(`${HTTPURL}/ucenter/user/updateInfo`, {params: params, responseType: 'blob'}).then(res => res.data); };
