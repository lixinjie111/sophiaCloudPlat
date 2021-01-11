
import {HTTPURL,urlData1} from '../requestUrl';
 //逻辑回归训练 
export const train = params => { return axios.post(`${urlData1}/algorithm/logisticRegression/train`, params).then(res => res.data); };
 //线性回归训练 
 export const polyRegression = params => { return axios.post(`${urlData1}/algorithm/polyRegression/train`, params).then(res => res.data); };
//模型评估
export const evaluate = params => { return axios.post(`${urlData1}/algorithm/evaluate`, params).then(res => res.data); };
//模型预测
export const predict = params => { return axios.post(`${urlData1}/algorithm/predict`, params).then(res => res.data); };
//模型查询
export const logisticRegression = params => { return axios.get(`${urlData1}/algorithm/selectModel/${params}`, {params: {}}).then(res => res.data); };
//线性回归训练 
export const lineTrain = params => { return axios.post(`${urlData1}/algorithm/linerRegression/train`, params).then(res => res.data); };
//决策树
export const decisionTree = params => { return axios.post(`${urlData1}/algorithm/decisionTree/train`, params).then(res => res.data); };
//随机森林
export const randomForest = params => { return axios.post(`${urlData1}/algorithm/randomForest/train`, params).then(res => res.data); };
//多项式回归
export const polyLinerRegression = params => { return axios.post(`${urlData1}/algorithm/polyLinerRegression/train`, params).then(res => res.data); };
//kMeans
export const kMeans = params => { return axios.post(`${urlData1}/algorithm/kMeans/train`, params).then(res => res.data); };
//特征查询
export const checkModelFeatures = params => { return axios.post(`${urlData1}/algorithm/checkModelFeatures`, params).then(res => res.data); };
//模型列表
export const modelList = params => { return axios.post(`${urlData1}/sophiaManager/api/algorithmmodel/list`, params).then(res => res.data); };
//支持向量机
export const svmClassifier = params => { return axios.post(`${urlData1}/algorithm/svmClassifier/train`, params).then(res => res.data); };
//数据探索
export const dataAnalysis = params => { return axios.post(`${urlData1}/algorithm/dataAnalysis`, params).then(res => res.data); };
//层次聚类-训练
export const hierarchicalCluster = params => { return axios.post(`${urlData1}/algorithm/hierarchicalCluster/train`, params).then(res => res.data); };
//层次聚类-训练
export const mlpClassifier = params => { return axios.post(`${urlData1}/algorithm/mlpClassifier/train`, params).then(res => res.data); };
//模型保存
export const saveModel = params => { return axios.post(`${urlData1}/algorithm/saveModel`, params).then(res => res.data); };
//模型删除
export const deleteModel = params => { return axios.post(`${urlData1}/sophiaManager/api/algorithmmodel/delete`, params).then(res => res.data); };
//查看算法一级分类
export const getOneType = params => { return axios.get(`${urlData1}/sophiaManager/api/algorithmmodel/getOneType`, {params: {}}).then(res => res.data); };
//查看算法二级分类
export const getSecondType = params => { return axios.get(`${urlData1}/sophiaManager/api/algorithmmodel/getSecondType`, {params: {}}).then(res => res.data); };