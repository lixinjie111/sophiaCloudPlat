
import {HTTPURL} from '../requestUrl';

/**
 * 登录
 */
//export const userInfo = params => { return axios.post(`${HTTPURL}/ucenter/user/info`, params).then(res => res.data); };

export const appCount = params => { return axios.get(`${HTTPURL}/admin/app/count`, {params: params}).then(res => res.data); };
export const userServiceModels = params => { return axios.get(`${HTTPURL}/admin/service/userServiceModels`, {params: params}).then(res => res.data); };
export const apiVisitDosage = params => { return axios.post(`${HTTPURL}/admin/APIService/apiVisitDosage`, params).then(res => res.data); };