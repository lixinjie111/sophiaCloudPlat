
import {HTTPURL} from '../requestUrl';

/**
 * 登录
 */
export const serviceModelList = params => { return axios.get(`${HTTPURL}/admin/service/serviceModelList`, {params: params}).then(res => res.data); };

export const getPostpaidFeeRule = params => { return axios.post(`${HTTPURL}/admin/serviceOrder/getPostpaidFeeRule`, params).then(res => res.data); };