import { HTTPURL, urlData, urlData1 } from '../requestUrl';

// 获取简单描述的列表
export const getSimpleness = params => { return axios.post(`${urlData}/describe`, params).then(res => res.data); };


// 获取简频数分布列表
export const getFrequency = params => { return axios.post(`${urlData}/frequency`, params).then(res => res.data); };
// 获取直方图图片// 获取箱型图图片/相关系数矩阵
export const getDataAnalysis = params => { return axios.post(`${urlData1}/algorithm/dataAnalysis`, params).then(res => res.data); };