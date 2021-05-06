
import {HTTPURL} from '../requestUrl';

/**
 * 登录
 */
export const userAccountSummary = params => { return axios.get(`${HTTPURL}/admin/service/userAccountSummary`, {params: params}).then(res => res.data); };
export const getPrepaidFeePackage = params => { return axios.post(`${HTTPURL}/admin/serviceOrder/getPrepaidFeePackage`, params).then(res => res.data); };