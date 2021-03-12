
import {HTTPURL} from '../requestUrl';

/**
 * 登录
 */
//export const userInfo = params => { return axios.post(`${HTTPURL}/ucenter/user/info`, params).then(res => res.data); };

export const securityInfo = params => { return axios.get(`${HTTPURL}/ucenter/securityInfo`, {params: params}).then(res => res.data); };
