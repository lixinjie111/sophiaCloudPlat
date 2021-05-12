
import {HTTPURL} from '../requestUrl';
let totalUrl = HTTPURL;

// ----公共枚举-----
// 业务场景中的所属应用枚举接口
export const getSceneAll = params => {
  return axios.post(`${totalUrl}/recommend/recommend/getAll`, params).then(res => res.data);
};

// 全部数据类型枚举
export const getDataTypes = params => {
  return axios.post(`${totalUrl}/recommend/enum/getDataTypes`, params).then(res => res.data);
};

// 获得应用下的所有业务场景
export const getAllByApplication = params => {
  return axios.post(`${totalUrl}/recommend/scene/getAllByApplication`, params).then(res => res.data);
};


// 根据应用和业务场景获得应用源表下拉项
/**
 *
 * @param params
 * @returns {*}
 */
export const getAllDataTablesInApp = params => {
  return axios.post(`${totalUrl}/recommend/excel/getAllDataTablesInApp`, params).then(res => res.data);
};

// -------------------------推荐应用管理-----------------------------
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

// 获得推荐应用详情
export const getAppDetail = params => {
  return axios.post(`${totalUrl}/recommend/recommend/detail`, params).then(res => res.data);
};

// -------------------------推荐场景管理-----------------------------
// 业务场景列表接口
export const getSceneList = params => {
  return axios.post(`${totalUrl}/recommend/scene/getList`, params).then(res => res.data);
};

// 创建推荐应用业务场景
export const addScene = params => {
  return axios.post(`${totalUrl}/recommend/scene/add`, params).then(res => res.data);
};

// 删除业务场景
export const deleteScene = params => {
  return axios.post(`${totalUrl}/recommend/scene/delete`, params).then(res => res.data);
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

// 配置规则中的过滤物品部分获取品类等信息
export const getSceneItems = params => {
  return axios.post(`${totalUrl}/recommend/scene/getItems`, params).then(res => res.data);
};

// 获得场景配置规则中的物品特征
export const getSceneItemProperties = params => {
  return axios.post(`${totalUrl}/recommend/scene/getItemProperties`, params).then(res => res.data);
};

// 获得场景配置规则中的必推物品筛选条件
export const getSceneMustPushProperties = params => {
  return axios.post(`${totalUrl}/recommend/scene/getMustPushProperties`, params).then(res => res.data);
};

// 保存配置的场景规则
export const saveSceneConfigRule = params => {
  return axios.post(`${totalUrl}/recommend/scene/saveConfigRule`, params).then(res => res.data);
};

// 业务场景详情
export const getSceneDetail = params => {
  return axios.post(`${totalUrl}/recommend/scene/get`, params).then(res => res.data);
};

// 根据一级数据类型获得子数据类型
export const getFeaturesDataType = params => {
  return axios.post(`${totalUrl}/recommend/enum/getByParentDataType`, params).then(res => res.data);
};

// 获得特征名称
export const getSceneFeatures = params => {
  return axios.post(`${totalUrl}/recommend/enum/getFeatures`, params).then(res => res.data);
};

// 根据应用和业务场景以及数据类型获得数据源表信息
export const getFeaturesDataTables = params => {
  return axios.post(`${totalUrl}/recommend/excel/getDataTablesByDataType`, params).then(res => res.data);
};

// 保存特征抽取
export const saveSceneFeatures = params => {
  return axios.post(`${totalUrl}/recommend/scene/saveFeatures`, params).then(res => res.data);
};

// 获得运营策略中的物品类型
export const getItemTypes = params => {
  return axios.post(`${totalUrl}/recommend/enum/getItemTypes`, params).then(res => res.data);
};

// -------------------------数据中心-----------------------------
// 推荐数据管理列表
export const getDataTableList = params => {
  return axios.post(`${totalUrl}/recommend/excel/getDataTableList`,params).then(res => res.data)
};

// 获取用户文件夹
export const getFilePackage = params => {
  return axios.post(`${totalUrl}/recommend/excel/getDocument`,params).then(res => res.data)
}

// 上传数据
export const uploadFileData = params => {
  return axios.post(`${totalUrl}/recommend/excel/load`,params).then(res => res.data)
}

// 数据详情预览
export const getFileDetail = params => {
  return axios.post(`${totalUrl}/recommend/excel/getTableData`,params).then(res => res.data)
}

// 新建文件夹
export const createDocument = params => {
  return axios.post(`${totalUrl}/recommend/excel/addDocument`,params).then(res => res.data)
}

// 数据管理基本信息
export const getTableDetail = params => {
  return axios.post(`${totalUrl}/recommend/excel/getTableDetail`,params).then(res => res.data)
}

// 数据详情表结构
export const getTableColumn = params => {
  return axios.post(`${totalUrl}/recommend/excel/getTableColumn`,params).then(res => res.data)
}

// ------------------------推荐运营------------------------------
// 获得推荐结果
export const getRecommendResult = params => {
  return axios.post(`${totalUrl}/recommend/recommend/result`, params).then(res => res.data);
};
// 获得推荐物品池列表数据
export const getDataByWord = params => {
  return axios.post(`${totalUrl}/recommend/excel/getDataByWord`, params).then(res => res.data);
};
// 获得必推物品池列表数据
export const getTableData = params => {
  return axios.post(`${totalUrl}/recommend/recommendGoods/getTableData`, params).then(res => res.data);
};
