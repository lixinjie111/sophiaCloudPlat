
import {HTTPURL} from '../requestUrl';
let totalUrl = HTTPURL + '/admin';
/**
 * 应用列表
 */
export const getApplicationList = params => { return axios.get(`${totalUrl}/app/list`, { params }).then(res => res.data); };
/**
 * 新建保存应用
 */
export const saveApplication = params => { return axios.post(`${totalUrl}/app/add`, params); };
/**
 * 删除应用
 */
export const delApplication = params => { return axios.get(`${totalUrl}/app/del`, { params }) };
/**
 * 编辑应用
 */
export const updateApplication = params => { return axios.post(`${totalUrl}/app/update`, params).then(res => res.data); };
/**
 * 获取行业下拉选项列表
 */
export const getIndustryOptions = params => { return axios.get(`${totalUrl}/industry/list`, params).then(res => res.data); };
/**
 * 获取接口项列表
 */
export const getServiceList = params => { return axios.get(`${totalUrl}/service/listBySetup`, params).then(res => res.data); };
/**
 * 获取应用服务配置
 */
export const getLoadConf = params => { return axios.get(`${totalUrl}/app/loadConf`, { params }).then(res => res.data); };
/**
 * 保存应用服务配置
 */
export const saveConf = params => { return axios.post(`${totalUrl}/app/config`, params).then(res => res.data); };
