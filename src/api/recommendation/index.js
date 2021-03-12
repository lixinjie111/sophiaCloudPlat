
import {HTTPURL} from '../requestUrl';
let totalUrl = HTTPURL + '/admin';

// 应用列表
export const getAppList = params => {
  return axios.get(`${totalUrl}/app/list`, {params: params}).then(res => res.data);
};
// 删除应用
export const delApp = params => {
    return axios.post(`${totalUrl}/app/del`, params).then(res => res.data);
};
