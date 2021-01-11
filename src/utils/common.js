/**
 * 转换数据格式  {col: ['filed1], 'field2, data: [[],[]]} 为 [ { filed1: '', filed2: '' } ]
 * @param res
 * @returns {*}
 */
export const transformList = (res) => {
  let col = res.col;
  return res.data.map(e=>{
    let row = {}
    e.forEach((it, i)=>{
      col[i] && (row[col[i]] = it)
    })
    return row
  })
}
/**
 * 生成列表表头
 * @param res
 * @returns {*}
 */
export const generateColumn = (res) => {
  let keyObj = res.data[0];
  const keyArr = []
  for(var attr in keyObj){
    let type1 = typeof keyObj[attr] == 'string' ? 'text' : 'number';
    keyArr.push({
      type:type1,
      key: res.col[attr]
    })
  }
  return keyArr
}
/**
 * 生成列表表头
 * @param res
 * @returns {*}
 */
export const generateColumn2 = (data2) => {
  let keyArr = [];
  let keyObj = data2[0];
  for(const attr in keyObj){
    let type1 = typeof keyObj[attr] == 'string' ? 'text' : 'number';
    keyArr.push({
      type:type1,
      key: attr
    })
  }
  return keyArr
}
