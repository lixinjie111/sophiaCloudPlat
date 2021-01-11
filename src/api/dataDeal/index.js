import { HTTPURL, urlData1 } from '../requestUrl';
import { urlData } from "../../../src/api/requestUrl";

//列合并
export const columnMerge = params => {
    return axios.post(`${HTTPURL}/data/column/columntransfer`, params).then(res => res.data);
};

//单位转换
export const unitChange = params => {
    return axios.post(`${HTTPURL}/data/excelCalculation/conversion`, params).then(res => res.data);
};
export const anovaOneWay = params => {
    return axios.post(`${urlData}/anovaOneWay`, params).then(res => res.data);
};
//添加分类
export const checkData = params => {
    return axios.post(`${urlData}/checkData`, params).then(res => res.data);
};
//添加分类
export const tSingle = params => {
    return axios.post(`${urlData}/tSingle`, params).then(res => res.data);
};
//添加分类
export const tTwoPair = params => {
    return axios.post(`${urlData}/tTwoPair`, params).then(res => res.data);
};
//添加分类
export const tTwoIndependent = params => {
    return axios.post(`${urlData}/tTwoIndependent`, params).then(res => res.data);
};
// 获取查询数据表中的数据
export const getDataList = params => {
    return axios
        .get(`${HTTPURL}/data/myData/dataList`, { params: params })
        .then(res => res.data);
};
//获取计算单位列表 
export const getUnitList = params => {
    return axios.post(`${HTTPURL}/data/excelCalculation/getCalList`, params).then(res => res.data);
};

//行合并
export const rowMerge = params => {
    return axios.post(`${HTTPURL}/data/column/rowtransfer`, params).then(res => res.data);
};
//列计算操作
export const colCalculate = params => {
    return axios.post(`${HTTPURL}/data/excelCalculation/Calculation`, params).then(res => res.data);
};

//异常值处理
export const OutliersDel = params => {
    return axios.post(`${HTTPURL}/data/abnormalValue/abnormalHandle`, params).then(res => res.data);
};
//分率转化提交
export const tractionTransformationSubmit = params => {
    return axios.post(`${HTTPURL}/data/abnormalValue/tractionTransformation`, params).then(res => res.data);
};
//提交算法数据编码
export const submitAlgorithm = params => {
    return axios.post(`${urlData1}/algorithm/dataProcess/encoder`, params).then(res => res.data);
};
//提交归一化
export const submitUnification = params => {
    return axios.post(`${urlData1}/algorithm/dataProcess/normalize`, params).then(res => res.data);
};
//获取去重编码内容
export const getDistinctcolumn = params => {
    return axios.get(`${HTTPURL}/data/column/distinctcolumn`, { params: params }).then(res => res.data);
};
//提交编码
export const submitColumnenCode = params => {
    return axios.post(`${HTTPURL}/data/column/columnencode`, params).then(res => res.data);
};