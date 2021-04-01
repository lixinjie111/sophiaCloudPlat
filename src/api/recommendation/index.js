
import {HTTPURL} from '../requestUrl';
let totalUrl = HTTPURL;

// 应用列表
export const getAppList = params => {
  return axios.get(`${totalUrl}/admin/app/list`, {params: params}).then(res => res.data);
};

// 删除应用
export const delApp = params => {
  return axios.get(`${totalUrl}/admin/app/del`, {params: params}).then(res => res.data);
};

// 行业列表枚举接口
export const getIndustryList = params => {
  return axios.get(`${totalUrl}/admin/industry/list`, {params: params}).then(res => res.data);
};

// 新增应用
export const addApp = params => {
  return axios.post(`${totalUrl}/admin/app/add`, params).then(res => res.data);
};

// 业务场景列表接口
export const getSceneList = params => {
  return axios.post(`${totalUrl}/recommend/scene/getList`, params).then(res => res.data);
};

// 业务场景中的所属应用枚举接口
export const getSceneAll = params => {
  return axios.post(`${totalUrl}/recommend/recommend/getAll`, params).then(res => res.data);
};

// 创建推荐应用业务场景
export const addScene = params => {
  return axios.post(`${totalUrl}/recommend/scene/add`, params).then(res => res.data);
};

// 删除业务场景
export const deleteScene = params => {
  return axios.post(`${totalUrl}/recommend/scene/delete`, params).then(res => res.data);
};

// 全部数据类型枚举
export const getDataTypes = params => {
  return axios.post(`${totalUrl}/recommend/enum/getDataTypes`, params).then(res => res.data);
};

// 获得数据源列表
export const getSceneSources = params => {
  return axios.post(`${totalUrl}/recommend/scene/getSources`, params).then(res => res.data);
};

// 获得数据源表列表
export const getSceneSourceTables = params => {
  return axios.post(`${totalUrl}/recommend/scene/getSourceTables`, params).then(res => res.data);
};

// 保存配置应用数据操作
export const saveSceneConfigData = params => {
  return axios.post(`${totalUrl}/recommend/scene/saveConfigData`, params).then(res => res.data);
};
