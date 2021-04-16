
import {HTTPURL} from '../requestUrl';

/**
 * 登录
 */
export const userAccountSummary = params => { return axios.get(`${HTTPURL}/admin/service/userAccountSummary`, {params: params}).then(res => res.data); };
export const userConsumeTrend = params => { return axios.get(`${HTTPURL}/admin/service/userConsumeTrend`, {params: params}).then(res => res.data); };
export const distribution = params => { return axios.get(`${HTTPURL}/admin/service/userConsumeDistribution`, {params: params}).then(res => res.data); };
export const appCount = params => { return axios.get(`${HTTPURL}/admin/app/count`, {params: params}).then(res => res.data); };
export const stisticsCallInfo = params => { return axios.get(`${HTTPURL}/admin/APIService/stisticsCallInfo`, {params: params}).then(res => res.data); };
export const statisticsVistedInfo = params => { return axios.get(`${HTTPURL}/ai/statistics/statisticsVistedInfo`, {params: params}).then(res => res.data); };
export const applist = params => { return axios.get(`${HTTPURL}/admin/app/listModelApp`, {params: params}).then(res => res.data); };
export const userServiceList = params => { return axios.get(`${HTTPURL}/admin/service/userServiceList`, {params: params}).then(res => res.data); };