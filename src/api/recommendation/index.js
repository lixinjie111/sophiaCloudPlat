
import {HTTPURL} from '../requestUrl';
let totalUrl = HTTPURL + '/admin';

// export const getAppList = params => {
//     return axios.get(`${totalUrl}/app/list`, params).then(res => res.data);
// };

//应用列表
export const getAppList = params => {
  return axios.get(`${totalUrl}/app/list`, {params: params}).then(res => res.data);
};
