
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
