
import {HTTPURL} from '../requestUrl';

/**
 * 登录
 */
export const userOverview = params => { return axios.get(`${HTTPURL}/admin/service/userOverview`, {params: params}).then(res => res.data); };
export const warning = params => { return axios.post(`${HTTPURL}/admin/service/userAccount/warning`, params).then(res => res.data); };
export const overdraft = params => { return axios.post(`${HTTPURL}/admin/service/userAccount/overdraft`, params).then(res => res.data); };