
import {HTTPURL} from '../requestUrl';
//发票管理搜索接口
export const fapSearch = params => {
    return axios.post(`${HTTPURL}/Invoice/queryInvoiceInfoList`, params).then(res => res.data);
}
